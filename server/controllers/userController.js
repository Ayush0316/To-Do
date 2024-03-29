const Item = require("../models/itemModel")
const List = require("../models/listModel")
const User = require("../models/userModel")

exports.getItems = (req,res) => {
    console.log("route hit")
    const listId = req.body.listId;
    if(!listId){
        return res.status(400).json({
            msg: "Please provide the list id"
        })
    }

    List.findOne({ _id: listId })
    .populate({path:'items', model: Item})
    .exec()
    .then(list => {
        if (!list) {
          return res.status(404).json({
            msg: "List not found",
          });
        }

        console.log("Got items successfully");
        console.log(JSON.stringify(list));

        return res.status(200).json({
          msg: "Got items successfully",
          items: list.items,
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({
        msg: "Internal Server Error",
        error: err,
      });
    });
}

exports.getLists = async (req,res) => {
    const userId = req.body.userID
    if(!userId){
        return res.status(400).json({
            msg: "User id needed"
        })
    }

    User.findById({_id: userId})
    .then(user =>{
        console.log("Got user successfully")
        user = user.toObject();
        console.log(user.lists)
        return res.status(200).json({
            msg: "Got user successfully",
            lists: user.lists
        })
    }).catch(err=> {
        console.log(err);
        res.status(400).json({
            msg: "Unable to find the user"
        })
    })

}

const getListData = async (listId) => {
    const listData = await List.findById({_id:listId});
    return listData.toObject()
}

exports.getListsData = async (req,res) => {
    const listsIds = req.body.listsIds;
    if (listsIds.length < 1 ){
        return res.status(400).json({
            msg: "List ids needed"
        })
    }
    const listsData = await Promise.all(listsIds.map(getListData))
    if(!listsData){
        return res.status(400).json({
            msg: "Unable to get list data"
        })
    }else{
        return res.status(200).json({
            msg: "Got data successfully",
            data: listsData
        })
    }
}

exports.addList = (req,res) => {
    const listName = req.body.listName;
    const userId = req.body.userId;
    if(!listName || !userId){
        return res.status(400).json({
            msg: "New List name and userID needed"
        })
    }

    console.log(")))))))))))))))))))))))))))))))))))))))))))))))))))))")

    List.create({
        name: listName
    }).then(createdList=>{
        console.log("List created successfully")
        console.log(userId);
        User.updateOne({_id: userId},{$push: {lists: createdList._id}})
        .then(result=>{
            console.log("User update successfully");
            return res.status(200).json({
                msg: "List added Successfully",
                data: createdList
            })
        }).catch(err=>{
            console.log("error while updating the user")
            return res.status(400).json({
                msg: "Error while updating the user"
            })
        })
    }).catch(err=>{
        console.log("error while creting the list")
        return res.status(400).json({
            msg: "Error while creting the list"
        })
    })
    
}

exports.addItem = (req,res) => {
    console.log("controller hit")
    const {content, listId} = req.body
    
    if(!content || !content.length > 0){
        return res.status(400).json({
            msg: "Please provide the content"
        })
    }

    if(!listId){
        return res.status(500).json({
            msg: "Please provide list id"
        })
    }

    Item.create({
        content: content
    }).then(createdItem => {
        console.log("Item created successfully")
        console.log(createdItem)
        List.updateOne({_id:listId},{$push: {"items": createdItem.id}})
        .then(doc=>{
            console.log("list updated successfully")
            return res.status(200).json({
                msg: "Item added successfully",
                item: createdItem
            })
        }).catch(err=>{
            console.error(err);
            return res.status(400).json({
                msg: "Unable to add the item to list",
                error: err
            })
        })
    }).catch(err=>{
        return res.status(400).json({
            msg: "Unable to add the item",
            error: err
        })
    })
}

exports.markDone = (req,res) => {
    const itemID = req.body.itemID;
    if(!itemID){
        return res.status(400).json({
            msg: "please provide the item id"
        })
    }

    Item.updateOne({_id: itemID},{completed: true}).then(result=>{
        return res.status(200).json({
            msg: "Item marked as done",
            item : result
        })
    }).catch(err=>{
        console.error(err);
            return res.status(400).json({
                msg: "Unable to mark item as done"
            })
    })
}

exports.unMarkDone = (req,res) => {
    const itemID = req.body.itemID;
    if(!itemID){
        return res.status(400).json({
            msg: "please provide the item id"
        })
    }

    Item.updateOne({_id: itemID},{completed: false}).then(result=>{
        return res.status(200).json({
            msg: "Item unmarked as done",
            item : result
        })
    }).catch(err=>{
        console.error(err);
        return res.status(400).json({
            msg: "Unable to unmark item as done"
        })
    })
}

exports.removeItem = (req,res) => {
    const {itemID, listID} = req.body;

    if(!itemID || !listID){
        return res.status(400).json({
            msg: "Please provide the itemId and listID"
        })
    }

    Item.deleteOne({_id: itemID}).then(()=>{
        console.log("Item deleted successfully")
        List.updateOne({_id: listID},{$pull: {items: itemID}}).then(()=>{
            return res.status(200).json({
                msg: "Item deleted successfully",
            })
        }).catch(err=> {
            console.log(err);
            return res.status(400).json({
                msg: "Unable to delete the item",
                error: err
            })
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            msg: "Unable to delete the item",
            error: err
        })
    })
}

exports.updateItem = (req,res) => {
    const itemID = req.body.itemID;
    const content = req.body.content;
    if(!itemID){
        return res.status(400).json({
            msg: "please provide the item id"
        })
    }

    Item.updateOne({_id: itemID},{content: content}).then(result=>{
        return res.status(200).json({
            msg: "Item content changed",
            item : result
        })
    }).catch(err=>{
        console.error(err);
        return res.status(400).json({
            msg: "Unable to change the content"
        })
    })
}