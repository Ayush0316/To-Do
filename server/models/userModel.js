const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const list = require("./listModel")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter user name"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        validator: [validator.isEmail, "Please enter a valide email"]
    },

    password: {
        type: String,
        required: [true, "Please enter password"],
        validate: {
            validator: function(el){
                if(el.length >=8){
                    return true;
                }
                return false;
            },
            message: "Password must contain atleast 8 Characters."
        }
    },

    confirmPassword: {
        type: String,
        required: [true, "Please enter password"],
        validate: {
            validator: function (el) {
              return this.password === el;
            },
            message: "Passwords are not the same!",
          },
    },

    lists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: list,
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.confirmPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
        delete returnedObject.confirmPassword;
    },
});

userSchema.set("toObject", {
    transform: (doc, ret) => {
       ret.id = ret._id;
       delete ret._id;
       delete ret.__v;
       delete ret.password;
       delete returnedObject.confirmPassword;
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;