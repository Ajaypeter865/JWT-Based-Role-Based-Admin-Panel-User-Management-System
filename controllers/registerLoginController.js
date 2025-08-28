const registerUser = require("../models/User");

const bcrypt = require("bcrypt");
const { error } = require("console");
const saltRound = 10;

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const userModel = require("../models/User");
const SMTPTransport = require("nodemailer/lib/smtp-transport");
const { use } = require("../routes/staticRouter");
const { emit } = require("process");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

async function postRegisterUser(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render("auth/register", {
      error: "Password do not match",
      success: null,
    });
  }

  try {
    //   NEED TO CHECK EXISTING USER HERE
    const existingUser = await registerUser.findOne({ email });
    if (existingUser) {
      return res.render("auth/register", {
        success: null,
        error: "User already exists",
      });
    }

    if(password.length < 5){
      return res.render('auth/register', {success: null, error: 'Password must have 5 charaters'})
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    await registerUser.create({
      user_name: username,
      email: email,
      password: hashedPassword,
    });
    return res.redirect("/login?Success=Account Created Succesfully");
  } catch (error) {
    console.error("Error is post register user = ", error.message, error.stack);

    return res.status(403).redirect("auth/register", {
      error: "Signup failed, Please try again",
      success: null,
    });
  }
}

async function postLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    const signupUser = await registerUser.findOne({ email });
    if (!signupUser)
      return res.render("auth/login", {
        error: "User do not exist",
        success: null,
      });

    if (signupUser.isBlock)
      return res.render("auth/login", {
        error: "You are blocked by admin",
        success: null,
      });

    const isMatch = await bcrypt.compare(password, signupUser.password);
    if (!isMatch)
      return res.render("auth/login", {
        error: "Password do not match",
        success: null,
      });

    const token = jwt.sign(
      {
        id: signupUser._id,
        email: signupUser.email,
        role: "user",
        user_name: signupUser.user_name,
      },
      process.env.secretKey,
      { expiresIn: "1d" }
    );

    res.cookie("userToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.render("dashboard/dashboard", {
      user: signupUser,
      success: null,
      error: null,
    });
  } catch (error) {
    console.error("Error is postloginuser = ", error.message, error.stack);
    return res.status(500).send("Server error");
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.render("auth/login", { message: "No user found " });

    const otp = Math.floor(100000 + Math.random() * 90000);
    console.log("The otp is = ", otp);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.restOtp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.emailUser,
        pass: process.env.emailPassword,
      },
    });

    await transporter.sendMail({
      from: `"My app" <${process.env.emailUser}>`,
      to: email,
      subject: "Your otp",
      html: ` <p>Your otp is <b>${otp}</b>.it experies in 5mins </p>`,
    });

    res.render("auth/enterOtp", {
      email,
      message: "Your otp send successfully to your mail",
    });
  } catch (error) {
    console.error("Error from forgot password =", error.message, error.stack);

    return res.render("auth/forgotPassword", {
      message: "Something went wrong",
    });
  }
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;


  const otpJoin = otp.join('')

  try {
    const user = await userModel.findOne({ email });

    if (!user || Number(otpJoin) !== user.restOtp || user.otpExpires < new Date()) {
      return res.render("auth/forgotPassword", {
        message: "Invalid otp or email",
      });
    }
    console.log('Rendering resetPassword with:', {
      email: user.email,
      userId: user._id
    });

    return res.render("auth/restPassword", { email, userId: user.id, message: "Otp verified" });
  } catch (error) {
    console.error("Error from verify otp = ", error.message, error.stack);
    res.render("auth/forgotPassword", { message: "Something went wrong" });
  }
}


async function restPassword(req, res) {
  const { id, email, password, confirmPassword } = req.body
  console.log('req body =', req.body);
  try {

    if (password !== confirmPassword) {
      return res.render('auth/restPassword',
        { email, userId: id, message: 'Password do not match' })

    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.findByIdAndUpdate(id, { password: hashedPassword },
      { new: true })

    if (!user) {
      return res.status(404).render('auth/restPassword',
        { email, userId: id, meessage: 'No user found' })
    }
    console.log('Password updated for = ', user.email);

    return res.render('auth/login',
      { email, success: 'Password reset successfully - Please log in', error: null })


  } catch (error) {
    console.error('Error in restpassword = ', error.meessage, error.stack);
    res.status(500).render('auth/restPassword',
      { email, userId: id, message: 'Something went wrong' })

  }
}



module.exports = {
  postRegisterUser,
  postLoginUser,
  forgotPassword,
  verifyOtp,
  restPassword,
};
