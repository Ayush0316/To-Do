const Item = require("../models/itemModel")
const List = require("../models/listModel")

exports.getItems = (req,res) => {
    const listId = req.body.listID;
    if(!listId){
        res.status(400).json({
            msg: "Please provide the list id"
        })
    }

    List.findOne({_id: listId}).then(items =>{
        List.populate(items).then(items => {
            console.log("Got items successfully");
            console.log(JSON.stringify(items))
            res.status(200).json({
                msg: "Got items successfully",
                items: items
            })
        }).catch(err=>{
            console.error(err)
            res.status(400).json({
                msg: "Unable to populated items",
                error: err
            })
        })
    }).catch(err=>{
        console.error(err);
        res.status(400).json({
            msg:"Unable to get the items",
            error: err
        })
    })
}

exports.addItem = (req,res) => {
    const {content, listId} = req.body
    
    if(!content || context.length > 0){
        res.status(400).json({
            msg: "Please provide the context"
        })
    }

    if(!listId){
        res.status(500).json({
            msg: "Please provide list id"
        })
    }

    Item.create({
        content: content
    }).then(createdItem => {
        console.log("Item created successfully")
        console.log(createdItem)
        List.updateOne({_id:listId},{$push: {"items": createdItem.id}},(err,doc)=>{
            if (err){
                console.error(err);
                res.status(400).json({
                    msg: "Unable to add the item to list",
                    error: err
                })
            }
            res.status(200).json({
                msg: "Item added successfully",
                item: createdItem
            })
        })
    }).catch(error=>{
        res.status(400).json({
            msg: "Unable to add the item",
            error: err
        })
    })
}

exports.markDone = (req,res) => {
    const itemID = req.body.itemID;
    if(!itemID){
        res.status(400).json({
            msg: "please provide the item id"
        })
    }

    Item.updateOne({_id: itemID},{completed: true}, (err,result)=>{
        if(err){
            console.error(err);
            res.status(400).json({
                msg: "Unable to mark item as done"
            })
        }
        res.status(200).json({
            msg: "Item marked as done",
            item : result
        })
    })
}

exports.unMarkDone = (req,res) => {
    const itemID = req.body.itemID;
    if(!itemID){
        res.status(400).json({
            msg: "please provide the item id"
        })
    }

    Item.updateOne({_id: itemID},{completed: false}, (err,result)=>{
        if(err){
            console.error(err);
            res.status(400).json({
                msg: "Unable to unmark item as done"
            })
        }
        res.status(200).json({
            msg: "Item unmarked as done",
            item : result
        })
    })
}

exports.removeItem = (req,res) => {
    const {itemID, listID} = req.body;

    if(!itemID || !listID){
        res.status(400).json({
            msg: "Please provide the itemId and listID"
        })
    }

    Item.deleteOne({_id: itemID}).then(()=>{
        console.log("Item deleted successfully")
        List.updateOne({_id: listID},{$pull: {items: itemID}}).then(()=>{
            res.status(200).json({
                msg: "Item deleted successfully",
            })
        }).catch(err=> {
            console.log(err);
            res.status(400).json({
                msg: "Unable to delete the item",
                error: err
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            msg: "Unable to delete the item",
            error: err
        })
    })
}

exports.updateItem = (req,res) => {
    const itemID = req.body.itemID;
    const content = req.body.context;
    if(!itemID){
        res.status(400).json({
            msg: "please provide the item id"
        })
    }

    Item.updateOne({_id: itemID},{content: content}, (err,result)=>{
        if(err){
            console.error(err);
            res.status(400).json({
                msg: "Unable to change the content"
            })
        }
        res.status(200).json({
            msg: "Item content changed",
            item : result
        })
    })
}