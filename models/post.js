const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
     },
  likes:[{type:mongoose.Schema.Types.ObjectId,ref:"devuser"}],
  comments:[{
    text:String,
    postedBy:{
type:mongoose.Schema.Types.ObjectId,ref:"devuser"
    }
  }],
    postedBy:{
       type:String,
    ref:"devuser",
    required:true    
}
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)