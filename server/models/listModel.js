const mongoose = require("mongoose")
const Item = require("./itemModel")

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the list name"]
    },

    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
    }]
})

listSchema.set('toObject',{
    transform: (document, ret)=>{
        ret.id = ret._id;
        delete ret.__v;
    }
})

listSchema.set('toJson', {
    transform: (document, ret)=>{
        ret.id = ret._id;
        delete ret.__v;
    }
})

listSchema.methods.populateItems = async function(){
    await this.populate('items').exec();
    return this;
}

const List = mongoose.model('List', listSchema)

module.exports = List;