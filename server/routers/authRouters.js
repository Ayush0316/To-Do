const authRouter = require("express").Router();
const authControllers = require("../controllers/authController");

authRouter.post("/signup", authControllers.signUp);
authRouter.post('/signin', authControllers.signIn);

module.exports = authRouter