const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const middleware = require("../middleware")

const Post = require("../models/post")
const user = require("../models/users")

const app = express()
app.use(express.json())

router.get("/users",async (req,res)=>{
  const users = await user.find()
try{
  res.status(200).json(users)
}catch(e){
  res.status(400).json({error:e})
}
})


router.get('/user/:id',middleware,(req,res)=>{
    user.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


router.post("/user/follow", async (req, res) => {
    const { userId, id } = req.body;
    const User = await user.findById(userId);
  
    try {
        const followersid = await user.find({ "following.follower": userId });
        const updatedUser = await user.findByIdAndUpdate(
          userId,
          {
            $addToSet: {
              following: {
                follower: id
              },
              followers: {
                followers: followersid
              },
            },
            
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post("/user/unfollow", async (req, res) => {
    const { userId, id } = req.body;
    const User = await user.findById(userId);
    try {
        const isFollowing =User.following.some(f => f.follower == id);

      if (isFollowing) {
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            {
              $pull: {
                following: {
                  follower: id
                },
              },
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        
      } else {
        res.status(200).json(User);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
//   router.get("/user/followers/:userId", async (req, res) => {
//     const userId = req.params.userId;
//     try {
//       const followers = await user.find({ "following.follower": userId });
//       res.status(200).json(followers);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

module.exports = router