const mongoose = require("mongoose");


 const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    savedPosts:[{type:mongoose.Schema.Types.ObjectId,ref:"posts",unique:true}]
 },
 {
    timeStamps:true
 });


//  export const UserModel = mongoose.model("users",UserSchema);

module.exports = mongoose.model("users",UserSchema)