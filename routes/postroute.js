
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const middleware = require("../middleware")

const Post = require("../models/post")
const user = require("../models/users")
const User = mongoose.model("devuser")
const app = express()
app.use(express.json())

router.post('/createpost',middleware,(req,res)=>{
    const {title,body,pic} = req.body 
    if(!title || !body || !pic){
    
      return  res.status(422).json({error:"Please add all the fields"})
    }
   
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:(req.user.id)
    })
    post.save().then(result=>{
        res.json({post:result})
        console.log(typeof req.user.id)
    })
    .catch(err=>{
        console.log(err)
    })
})

  

  
router.get("/allposts",middleware,(req,res)=>{
    Post.find().populate("postedBy","name id profilepic").populate("comments.postedBy","id name").populate("likes.postedBy","id name")

    .then(posts=>{ //populate is a function we can access the refence data ex:-in this posts devuser as reference it is located in post schema
  //inpopulate second argument takes what are the data stored      
        res.json(posts)
     
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get("/myposts",middleware,(req,res)=>{
    Post.find({postedBy:req.user.id}).populate("postedBy","id name")
    .then(mypost=>{
        res.send(mypost)
    })
    .catch(err=>{
        console.log(err)
    })
})



router.put("/like",middleware,(req,res)=>{
Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user.id}

},{
    new:true
}).populate("postedBy", "id name profilepic")
.exec((err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }else{
        res.json(result)
    }
})
})


router.put("/unlike",middleware,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user.id}
    },{
        new:true
    })
   
        .populate("postedBy", "id name profilepic").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
    })


    router.put('/comment',middleware,(req,res)=>{
        const comment = {
            text:req.body.text,
            postedBy:req.user.id
        }
        Post.findByIdAndUpdate(req.body.postId,{
            $push:{comments:comment}
        },{
            new:true
        })
        .populate("comments.postedBy", "id name")
        .populate("postedBy", "id name profilepic")
        
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
    })

        router.delete('/deletepost/:postId',middleware,(req,res)=>{
            Post.findOne({_id:req.params.postId})
            .populate("postedBy","id")
            .exec((err,post)=>{
                if(err || !post){
                    return res.status(422).json({error:err})
                }
                if(post.postedBy.id.toString() === req.user.id.toString()){
                      post.remove()
                      .then(result=>{
                          res.json(result)
                      }).catch(err=>{
                          console.log(err)
                      })
                }
            })
        })



     
module.exports = router