// Imports dependency
require("dotenv").config();
const express = require("express");
const { connectMongoDB } = require("./connect");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

// Module exports
const staticRouter = require("./routes/staticRouter");
const registerRouter = require("./routes/registerRouter");
const adminLoginRouter = require("./routes/adminLoginRouter");

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set ejs
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// App routes
app.use("/", staticRouter);
app.use("/", registerRouter);
app.use("/", adminLoginRouter);

// Connect mongoDb
connectMongoDB(process.env.DB_URI).then(() => {
  console.log("mongodb conneted");
});

app.listen(PORT, () => {
  console.log(`Server start at PORT ${PORT}`);
});

