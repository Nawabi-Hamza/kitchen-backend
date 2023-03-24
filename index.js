const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const port = 3001
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://Hamza:hamza007@cluster0.kbxsji2.mongodb.net/?retryWrites=true&w=majority")


// This is from models
const userRouter = require("./src/routes/users")
const postRouter = require("./src/routes/posts")
app.use("/auth",userRouter)
app.use("/posts",postRouter)



app.listen(port,()=>console.log("Server Started In Port " + port))