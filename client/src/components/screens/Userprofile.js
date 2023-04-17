import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Userprofile() {
  const {id} = useParams();

  const [data,setData] = useState('')
  const [followlist,setFollowlist] = useState("")
   const [followers,setFollowers] = useState("")
  const [follow,setFollow] = useState(false)
  let profile = localStorage.getItem("user")
  const parsedObject = JSON.parse(profile);
 
  const navigate = useNavigate();

  
  useEffect(()=>{
   fetch(`http://localhost:4040/user/${parsedObject._id}`,{
      method:"get",
      headers:{
          "content-Type":"application/json",
          "x-token":localStorage.getItem("token")
      }
    }).then(res=>res.json())
    .then(res => {
      setFollowers(res);
  
    })  .catch(errors => console.error(errors));
 




    fetch(`http://localhost:4040/user/${id}`,{
      method:"get",
      headers:{
          "content-Type":"application/json",
          "x-token":localStorage.getItem("token")
      }
    }).then(res=>res.json())
    .then(res => {
      setData(res);
  
    })  .catch(errors => console.error(errors));
 

  },[followlist])
  console.log("pppppppppppp",data)

console.log("l",followers)
  function togglemenu(){
    setFollow(!follow)
    if(!follow){
      fetch('http://localhost:4040/user/follow',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "x-token":localStorage.getItem("token")
        },
        body:JSON.stringify({
            userId:parsedObject._id,
            id
        })
    }).then(res=>res.json()).then(data=>setFollowlist(data))
    
    }else{
      fetch('http://localhost:4040/user/unfollow',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "x-token":localStorage.getItem("token")
        },
        body:JSON.stringify({
            userId:parsedObject._id,
            id
        })
    }).then(res=>res.json()).then(data=>setFollowlist(data))
    }
  
  }
 const foll = followers.user?.following?.map(f=>f.follower === id);
console.log("true",foll)
  return (

<div>
  {parsedObject._id !== id ?
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
    <div style={{display:"flex",justifyContent:"space-around",margin:"18px 18px"}}>
    <div>
        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={data.user?.profilepic}  />
      </div><div>
          <h2>{data.user?.name}</h2>
          <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
            <h6>{data?.posts?.length}posts</h6>
            <h6>{data.user?.following?.length >0 ? data.user?.following?.length :"0"}following</h6>
            <h6>{data.user?.followers ? data.user?.followers[0]?.followers?.length :"0"}followers</h6>
            <button type="button" class="btn btn-success" onClick={togglemenu} >{foll?.includes(true) ? "Unfollow":"Follow"}</button>
          </div>
       
</div></div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: "20px" }}>
  {data.posts?.map(data=>{ 
    return (
      <div style={{ marginRight: "20px" }}>
        {data.photo.includes('.jpg') || data.photo.includes('.jpeg') || data.photo.includes('.png') || data.photo.includes('.gif') || data.photo.includes('.bmp') || data.photo.includes('.svg') || data.photo.includes('.webp') ? 
          <img src={data.photo} style={{ width: "200px", height: "200px"}} /> : 
          <video src={data.photo} width="200px" height="200px" style={{margin:"0px"}} controls></video>
        }
    
    <h6 style={{textAlign:"center"}}><span style={{fontWeight:"bold"}}>Title:</span>{data.title}</h6>
        <p style={{textAlign:"center"}}><span style={{fontWeight:"bold"}}>Body:</span>{data.body}</p>
      </div>
    )
  })}
</div>

        </div>:navigate("/profile")}
        
        </div>    
  
  )
}

export default Userprofile
  

//this is for github updation process inthe  offf