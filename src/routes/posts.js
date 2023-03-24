const express = require("express")
const mongoose = require("mongoose")
const PostModel = require("../models/Post")
const UserModel = require("../models/User")
const router = express.Router()

router.get("/",async(req,res)=>{
    try{
        const response = await PostModel.find({})
        res.json(response)
    }catch(error){
        res.json(error)
    }
})


router.post("/",async(req,res)=>{
    const post = new PostModel(req.body)
    try{
        const response = await post.save()
        res.json(response)
    }catch(error){
        res.json(error)
    }
})


router.put("/",async(req,res)=>{
    try{
        const post = await PostModel.findById(req.body.postId)
        const user = await UserModel.findById(req.body.userId)
        // const response = await post.save()
        user.savedPosts.push(post);
        await user.save()
        res.json({savedPosts:user.savedPosts});
    }catch(error){
        res.json(error)
    }
})


router.get("/savePosts/ids/:userId",async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userId)
        res.json({savedPosts:user?.savedPosts})
    }catch(error){
        res.json(error)
    }
})

router.get("/savePosts/:userId",async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userId)
        const savePosts = await PostModel.find({
            _id:{$in:user.savedPosts},
        })
        res.json({ savePosts })
    }catch(error){
        res.json(error)
    }
})



module.exports = router