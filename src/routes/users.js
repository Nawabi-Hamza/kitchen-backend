const express = require("express")
const jwt = require( "jsonwebtoken")
const bcrypt = require("bcrypt") 
const router = express.Router()
const UserSchema = require("../models/User.js") 

// Register Section
router.post("/register", async(req,res)=>{
    // Take Data From Body Request
    const { username,email,phone,age,password } = req.body;
    // Make Salt And Hash For Bcrypt Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    // Check Username For User MayBe Registered In the Past The New Username Do not much with users in database
    const user = await UserSchema.findOne({username});
    // conditions for if user registered befor user can not make again registeration
    if(user){
        res.json({message:"User already exists!"})
    }else{
        const newUser = new UserSchema({username,email,phone,age,password:hashPassword})
        await newUser.save()
        res.json({message:"User Registered Successfuly"})
    }
})

// Login Section
router.post("/login",async(req,res)=>{
    const {username,password} = req.body
    const user = await UserSchema.findOne({ username }) 
    if(!user){
        return res.json({message:"User Doesn't Exist!"})
    }else{
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({message:"Username Or Password Is Incorrect!"});
        }else{
            // return res.json({message:"Welcome To This Project"})
            const token = jwt.sign({id:user._id},"secret")
            res.json({token,userId:user._id})
        }
    }
})

module.exports = router;