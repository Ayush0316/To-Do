const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post("/items",userController.getItems)
userRouter.post("/changecontent",userController.updateItem)
userRouter.post("/deleteitem", userController.removeItem)
userRouter.post("/additem",userController.addItem)
userRouter.post("/markitem",userController.markDone)
userRouter.post("/unmarkitem", userController.unMarkDone)
userRouter.post("/addList", userController.addList)
userRouter.post("/getListData", userController.getListsData)
userRouter.post("/getlists", userController.getLists)

module.exports = userRouter;