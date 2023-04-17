//This code is for backend of how to register and login,
//how to see our profile and others profile,add reviews and see reviews.
//....................Starts...................//

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const devuser =require ("./models/users")
const postroute = require("./routes/postroute")
const userroute = require("./routes/Userroutes")
const jwt = require("jsonwebtoken")
const middleware = require("./middleware")
const bodyParser = require('body-parser');


const app = express()
//first import the all the required packages,express is used to connect to server and backend data
//mangoose is used to store the data in mangodb
//cors is used to we can run frontend and backend same time,it will help to crash the data
//devuser and review are models of the project 
//jwt is a jsonwebtoken to identify the user login or not
//middleware is used to access the protected routes if condition of function satisfies it will move forward.

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://pavankumarirrinki:6302929228@cluster0.nibkqsh.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then
(()=>console.log("DB CONNECTED8"))
//mongose.set is deprecation warnning of mangodb
require("./models/post")


app.use(bodyParser.json()); //all the data can be converted into json format
app.use(cors({
    origin:"*"
}))
app.use("/",postroute)
app.use("/",userroute)

//.....ROUTE-1.....//
app.get("/",(req,res)=>{
    return res.send("hello haiii")
})
//This route is user entered in to home it will show





//..........ROUTE-2........REGISTERATION.....//
app.post("/register",async(req,res)=>{
    try{
const {name,email,password, profilepic} = req.body;
const exist = await devuser.findOne({email}) 
if(exist){
    return res.status(400).send("users already exists")
}
let newuser = new devuser({name:name,email:email,password:password, profilepic: profilepic})
newuser.save()
return res.send("user successfully added")
    }
    catch(error){
console.log(error)
return res.status(500).send('server error')
    }
})
//This is a post request,first we can destructure the all the content passed to the body from devuser model
//after send we can check the email is already present or not in 48
//findone method is used to find the attritube and store the data in variable
//In 53 all the all the data entered in body and compared with devuser and stored in newuser
//newuser.save is used to store the data in mangodb



//........ROUTE-3.......LOGIN.......//
 app.post("/login",async(req,res)=>{
    try{
 const {email,password} = req.body;
 console.log(email,password)
 const exist = await devuser.findOne({email})
 if (!exist){
    return res.status(400).send("user not exist")
 }if(exist.password !== password){
    
    return res.status(400).send("password not exist")
 }
let payload={ 
    user:{
        id:exist.id
    }
   
}

jwt.sign(payload,"jwtpassword",(error,token)=>{
 if(error) throw error
 const {_id,name,email,profilepic} = exist

 return res.json({token,user:{_id,name,email,profilepic}})

})
    }  catch(error){
        console.log(error)
        return res.status(500).send('server error')
            }
 })
//In line 73 we can pas email and password to body 
//After pass we can take previous entered email from register taken findone method.
//after register mangodb gives unique id for every register that can be passed to the id for webtoken.
//After login jwt.sign it will take 3 arguments payload,string(for missed with id),when was expires on 
//




app.put("/users/:id/profilepic", middleware,async (req, res) => {
    try {
      const { id } = req.params;
      const { profilepic } = req.body;
      const user = await devuser.findOneAndUpdate(
        { _id: id },
        { $set: { profilepic: profilepic } },
        { new: true }
      );
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  });
  

 //...................ROUTE-4...........GET ALL PROFILES.......//
 
app.listen(4040,()=>{
    return console.log("server running")
})