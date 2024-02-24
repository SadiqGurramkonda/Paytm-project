const { JWT_SECRET } = require("./config");
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            message: " Authentication error"
        })
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        //console.log(decoded);
        if(decoded.userId){
            req.userId = decoded.userId
            next();
        }
        else{
            return res.json({
                message: "Authentication error"
            })
        }
    } catch (err) {
        return res.json(403).json({
            message: "something went wrong"
        })
    }

};

module.exports = {
    authMiddleware
}