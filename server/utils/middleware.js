const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
    
const tokenExtractor = (req, res, next) => {
    const auth = req.get("auth");
    if (auth && auth.startsWith("Bearer ")) {
        req.token = auth.replace("Bearer ", "");
    } else req.token = null;
    next();
};

const userExtractor = async (req,res,next) => {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            msg: "token invalid",
        });
    }
    req.user = await User.findbyId(token.id).toObject()
    if(!req.user){
        return res.status(401).json({
            msg: "User Invalid",
        });
    }
    next()
}

const requestLogger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("Path:  ", req.path);
    console.log("Body:  ", req.body);
    console.log("---");
    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
};