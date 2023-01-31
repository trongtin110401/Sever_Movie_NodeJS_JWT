const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = (req,res,next) =>{
    const authHearder = req.header('Authorization')
    const token = authHearder && authHearder.split(' ')[1]
    if(!token) return res.sendStatus(401)
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.Account = decoded.Account
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}
module.exports = verifyToken