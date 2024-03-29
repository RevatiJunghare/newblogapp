const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb://127.0.0.1:27017/blogapp")

const userSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    user_id:{type:String,required:true,unique:true}
})

const UserModel = mongoose.model("usercollection",userSchema)


const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    blog_id:{type:String,required:true,unique:true},
    created_by:{type:String,required:true},

},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const BlogModel = mongoose.model("blogcollection",blogSchema)


module.exports = {
    connection ,
    UserModel ,
    BlogModel
}