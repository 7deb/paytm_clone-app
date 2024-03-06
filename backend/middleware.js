const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("bearer ")){
        return res.status(403).json({})
    }

    token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,JWT_SECRET);

        req.userID = decoded.userID;

        next();
    } catch (error) {
        return res.status(403).json({
            message:"internal server issue",
        })
    }
}

module.exports = authMiddleware;