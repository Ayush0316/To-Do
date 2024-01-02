const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const List = require("../models/listModel")

const jwtToken = (id)=>{
    return jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

exports.signUp = (req,res) =>{
    List.create({
        name: 'To-Do'
    })
    .then((createdList)=> {
        User.create({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            lists: [createdList.id]
        })
        .then((createdUser)=>{
            console.log("User created successfully");
            console.log(JSON.stringify(createdUser));
            const token = jwtToken(createdUser.id);
            console.log("token --  ", token)
            return res.status(201).json({
                msg: "User created successfully",
                token: token,
                user: createdUser
            })
        })
        .catch((error)=>{
            console.error("Error while creating the user.");
            console.error(error);
            return res.status(400).json({
                msg:"Error while creating the user.",
                err: error
            })
        })
    })
    .catch((error)=>{
        console.error("Error while creating the user.");
        console.error(error);
        return res.status(400).json({
            msg:"Error while creating the user.",
            err: error
        })
    })
}

exports.signIn = async (req,res) =>{
    try{

        const {username, password} = req.body;
    
        if(!username || !password){
            return res.status(400).json({
                msg: "Please provide Username and Password"
            })
        }
    
        const user = await User.findOne({userName: username});

        // const compare = 
        // console.log(compare)
        if (!user ||!await user.checkPassword(user.password,password)){
            return res.status(400).json({
                msg: "Either Username or Password is incorrect."
            })
        }else{
            const token = jwtToken(user._id);
            
            return res.status(200).json({
                msg: "Successfully logged in",
                token: token,
                user:user.toObject()
            })
        }
    }catch(error){
        console.log(error);
    }
}
