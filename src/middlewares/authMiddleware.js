const jwt = require('jsonwebtoken')

const verify = (req, res, next, token) => {
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' })
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
        } 

        req.user = decoded.user

        next()
    })
}

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']

    verify(req, res, next, token)
}

const verifyJWTQueryString = (req, res, next) => {
    const token = req.query['x-access-token']

    verify(req, res, next, token)
}

module.exports = {
    verifyJWT,
    verifyJWTQueryString
}