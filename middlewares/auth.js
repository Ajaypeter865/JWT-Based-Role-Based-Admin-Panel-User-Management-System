const jwt = require('jsonwebtoken')

function getToken(req) {
    return req.cookies?.userToken || req.cookies?.adminToken || null
}

const protectedAuth = (req, res, next) => {

    const token = getToken(req)


    if (!token) {
        console.log("No token found → redirecting to login");
        return res.redirect('/login')
    }
    try {
        const payload = jwt.verify(token, process.env.secretKey)

        req.auth = payload


        next()

    } catch (error) {
        console.error("JWT verification failed:", error.message);

        return res.redirect("/login")

    }
}

const protectedAuthAdmin = (req, res, next) => {
    const token = getToken(req)
    console.log('Token =', token);

    if (!token) res.status(401).render('/admin')
    try {
        const payload = jwt.verify(token, process.env.secretKey)
        console.log('payload =', payload );
        
        
        // if(payload.role !== 'admin') {
        //     res.status(401).render('/admin', error: null)
        // }
     

        req.auth = payload
        next()

    } catch (error) {
        console.error('JWT verification failed:', error.message);

    }

}

module.exports = {
    protectedAuth,
    protectedAuthAdmin
}