const jwt = require('jsonwebtoken')

function getToken(req) {
    return req.cookies?.userToken || req.cookies?.adminToken || null
}

const protectedAuth =async (req, res, next) => {

    const token =await getToken(req)

    console.log('Token  found', token);
     
    if (!token) {
        console.log('No token found', token);
        
        return res.redirect('/login')
    }
    try {
        const payload = jwt.verify(token, process.env.secretKey)

        req.auth = payload
        console.log('Token worked')
        next()
    } catch (error) {
        console.error("JWT verification failed:", error.message);

        return res.redirect("/login")
    }
}

const protectedAuthAdmin = (req, res, next) => {
    const adminToken = req.cookies?.adminToken

    if (!adminToken) res.status(401).render('/admin')
    try {
        const payload = jwt.verify(adminToken, process.env.secretKey)
        

        req.auth = payload

        next()

    } catch (error) {
        console.error('JWT verification failed:', error.message)
        res.redirect('/admin')

    }

}

module.exports = {
    protectedAuth,
    protectedAuthAdmin
}