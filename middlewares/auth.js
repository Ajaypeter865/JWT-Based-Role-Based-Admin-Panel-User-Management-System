const jwt = require('jsonwebtoken')

function getToken(req) {
    return req.cookies?.userToken
}

const protectedAuth = (req, res, next) => {
    // console.log("Incoming cookies:", req.cookies);

    const token = getToken(req)
    // console.log("Extracted token:", token);

    // const loginPath = req.originalUrl.startsWith('/login')
    // const loginpath = req.originalUrl.startsWith('/login')

    if (!token) {
        console.log("No token found → redirecting to login");
        return res.redirect('/login')
    }
    try {
        const payload = jwt.verify(token, process.env.secretKey)

        req.auth = payload

        // console.log('Payload', req.auth);

        next()

    } catch (error) {
        console.error("JWT verification failed:", error.message);

        return res.redirect("/login")

    }
}

module.exports = {
    protectedAuth
}