const mongoose = require("mongoose")
const item = require("./itemModel")

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the list name"]
    },

    items:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: item
    }
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

listSchema.method.populateItem = async function(){
    await this.populate('items').execPopulate();
    return this;
}

const List = mongoose.model('list', listSchema)

module.exports = List;