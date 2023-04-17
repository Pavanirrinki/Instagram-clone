const mongoose = require("mongoose")


const devuser = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
   
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1"
    },
    following:{
        type:Object,
        default:{}
    },
    followers:{
        type:Object,
        default:{}
    }
})

module.exports = mongoose.model("devuser",devuser)