const mongoose = require("mongoose")

const itemSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "Please provide the content"]
    },

    date_time:{
        type: String,
        default: new Date().toLocaleString()
    },

    completed: {
        type: Boolean,
        default: false
    }
})


itemSchema.set('toObject',{
    transform: (document, ret)=>{
        ret.id = ret._id;
        delete ret.__v;
    }
})

itemSchema.set('toJson', {
    transform: (document, ret)=>{
        ret.id = ret._id;
        delete ret.__v;
    }
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item;