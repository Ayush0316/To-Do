const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const List = require("../models/listModel")

const jwtToken = (id)=>{
    jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

exports.signUp = (req,res) =>{
    List.create({
        name: 'To-Do'
    })
    .then((createdList)=> {
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            lists: [createdList.id]
        })
        .then((createdUser)=>{
            console.log("User created successfully");
            console.log(JSON.stringfy(createdUser));
            const token = jwtToken(createdUser.id);
            res.status(201).JSON({
                msg: "User created successfully",
                token: token,
                data: {
                    user: createdUser
                }
            })
        })
        .catch((error)=>{
            console.error("Error while creating the user.");
            console.error(error);
            res.status(400).JSON({
                msg:error
            })
        })
    })
    .catch((error)=>{
        console.error("Error while creating the user.");
        console.error(error);
        res.status(400).JSON({
            msg:error
        })
    })
}

exports.signIn = async (req,res) =>{
    try{

        const {userName, password} = req.body;
    
        if(!userName || !password){
            res.status(400).json({
                msg: "Please provide Username and Password"
            })
        }
    
        const user = User.findOne({userName: userName});
        
        if (!user ||!await User.confirmPassword(user.password,password)){
            res.status(400).json({
                msg: "Either Username or Password is incorrect."
            })
        }
    
        const token = jwtToken(user.id);
        res.status(200).json({
            msg: "Successfully logged in",
            token: token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Unable to login"
        })
    }
}
