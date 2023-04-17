import React, { useState, useEffect } from 'react'
import { Link,useParams } from 'react-router-dom';

import Navbar from '../Navbar';
function Home() {
  const [data, setData] = useState([])



 console.log("data",data)
  let profile = localStorage.getItem("user")
  const parsedObject = JSON.parse(profile);
  useEffect(() => {
    fetch("http://localhost:4040/allposts", {
      method: "get",
      headers: {
        "content-Type": "application/json",
        "x-token": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(res => {
console.log(res)
        setData(res);
      
      }).catch(errors => console.error(errors));
  }, [])
 


  const likepost = (id) => {
    fetch("http://localhost:4040/like", {
      method: "put",
      headers: {
        "content-Type": "application/json",
        "x-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(res => {
      const newData = data.map(item => {
        if (item._id == res._id) {
          return res
        } else {
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })

  }

  const unlikepost = (id) => {
    fetch("http://localhost:4040/unlike", {
      method: "put",
      headers: {
        "content-Type": "application/json",
        "x-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(res => {
      // console.log(res)
      const newData = data.map(item => {
        if (item._id == res._id) {
          return res
        } else {
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const makeComment = (text,postId)=>{
    fetch('http://localhost:4040/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "x-token":localStorage.getItem("token")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
      setData(newData)
    
    }).catch(err=>{
        console.log(err)
    })
}
 const deletepost =(postId)=>{
  fetch(`http://localhost:4040/deletepost/${postId}`,{
    method:"delete",
    headers:{
        "content-Type":"application/json",
        "x-token":localStorage.getItem("token")
    }
 }).then(res=>
  res.json()
 ).then(result=>{
  console.log(result)
  const newData = data.filter(item=>{
    return item._id !== result._id
  })
  setData(newData)
 })
}


  return (
   
<div className='home'>

      {data.length === 0 && <div style={{textAlign:"center"}}><p>No posts available</p></div>}
  

      {data?.map(data => {
        return (
          <div className='card home-card' key={data._id}>
      <div class="row">
  <Link to={`/profile/${data.postedBy._id}`}>
              <img style={{width:"50px",height:"50px",borderRadius:"80px"}}  src={data.postedBy?.profilepic} />
              </Link>
         
        <span> <h5 >{data.postedBy.name} {(data.postedBy._id)==(parsedObject._id) &&<i class="material-icons" style={{float:'right'}} onClick={() => { deletepost(data._id) }}>delete</i>}</h5>
          </span>   </div>  
           
            {/* <h5>{data._id}</h5> */}
            <div className='card-image'>
        
       {(data.photo.includes('.jpg') || data.photo.includes('.jpeg') || data.photo.includes('.png') || data.photo.includes('.gif') || data.photo.includes('.bmp') ||data.photo.includes('.svg') || data.photo.includes('.webp')) ?<img src={data.photo} />:<video src={data.photo} width="500px"  controls ></video>}
     
            </div>
            <div className='card-content'>
              {data.likes.includes(parsedObject._id) ? <i class="material-icons" style={{ marginLeft: "10px" }} onClick={() => { unlikepost(data._id) }}>thumb_down</i> : (<><i class="material-icons" onClick={() => { likepost(data._id); }}>thumb_up</i><i class="material-icons" style={{ marginLeft: "10px" }} onClick={() => { unlikepost(data._id); }}>thumb_down</i></>)}
    
              <h6>{data.likes.length} likes</h6>
              <h6>{data.title}</h6>
              <p>{data.body}</p>
              {data.comments.map(record=>{ return ( 
                 <h6 key={record._id}><><span style={{ fontWeight: "500" }}>{record.postedBy?.name}</span><p>{record.text}</p></></h6>
        )  })}
              <form onSubmit={(e)=>{e.preventDefault()
              makeComment(e.target[0].value,data._id)}}>
              <input type="text" placeholder='add a comment' />
              </form>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
