const jwt = require('jsonwebtoken')

function getToken(req) {
    return req.cookie?.userToken
}

const protectedAuth = (req, res, next) => {
    const token = getToken(req)
    const loginPath = req.orginalUrl.startsWith('/login')

    if (!token) {
        return res.redirect(loginPath)
    }
    try {
        const payload = jwt.verify(token, process.env.secretKey)

        req.auth = payload

        next()

    } catch (error) {
        console.error(error)

        return res.redirect(loginPath)

    }
}

module.exports = {
    protectedAuth
}