const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
    title:{ type:String,required:true },
    ingredients:[ {type:String,required:true} ],
    instractions: { type:String, requred:true },
    imageUrl: { type:String,required:true },
    userOwner: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true}
},
{
    timestamps:true
})


module.exports = mongoose.model("posts",PostSchema)