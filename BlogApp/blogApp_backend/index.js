const express = require("express");
const { connection, UserModel, BlogModel } = require("./config/db");
const uuid = require("uuid");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())

app.get("/login", async (req, res) => {
  const emailid = req.body.email;
  const password = req.body.password;

  try {
    const temp = await UserModel.findOne({
      $and: [{ email: emailid }, { password: password }],
    });

    if (temp) {
      res.send({ message: "login successful" });
    } else {
      res.send({ message: "wrong credentials" });
    }
  } catch (err) {
    res.send({ message: "login error", error: err });
  }
});

app.post("/create-post", async (req, res) => {
    
  try {
    const x = await UserModel.findOne({user_id:"revati1234"});
    
    const y = req.body
    y.blog_id = uuid.v4();
    y.created_by = x.user_id
    const blog = new BlogModel(req.body);
    await blog.save();
    res.send({ message: "blog created" });
  } catch (err) {
    res.send({ message: "cannot create blog","error" :err});
  }
});


app.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    console.log("blogs",blogs)
    const blogsWithUserObject = await Promise.all( blogs.map(async(blog) => {
      const user = await UserModel.find({user_id:blog.created_by})
        return {
          ...blog.toObject(),
          created_by: user
        }
  
    }));


    res.send({ allBlogs: blogsWithUserObject });
  } catch (err) {
    res.send({ message: "cannot get the blogs" });
  }
});

//340a3a2d-d87e-4103-83c3-f05fab1f478f


app.put("/update-blog/:id",async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
   
    try{
      await BlogModel.updateOne({blog_id:ID},{payload})
      res.send({"message":"data has been updated"})
    }catch(err){
      res.send({"message":"data cannot be updated","err":err.message})
    }
})


app.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id
    try{
      await BlogModel.deleteOne({blog_id:ID})
      res.send({"message":"data has been deleted"})
    }catch(err){
      res.send({"msg":"not deleted","err":err.message})
    }
})




app.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("cannot connect to db", err);
  }
  console.log("server is running 4500");
});
