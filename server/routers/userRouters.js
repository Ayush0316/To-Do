const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/",userController.getItems)
userRouter.post("/changecontent",userController.updateItem)
userRouter.post("/deleteitem", userController.removeItem)
userRouter.post("/additem",userController.addItem)
userRouter.post("/markitem",userController.markDone)
userRouter.post("/unmarkitem", userController.unMarkDone)

module.exports = userRouter;