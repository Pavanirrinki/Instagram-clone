
import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [image,setImage] = useState("")
 const [url,setUrl] = useState(undefined)
 useEffect(()=>{
  if(url){
      uploadfields()
  }
},[url])
 const postprofilepic =() =>{
    console.log(url)
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","insta-clone")
      data.append("cloud_name","cdvbvggl5f")
      fetch("https://api.cloudinary.com/v1_1/dvbvggl5f/image/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json())
      .then(data=>{
         setUrl(data.url)
      })
      .catch(err=>{
          console.log(err)
      })
    }
 const uploadfields =() =>{  fetch("http://localhost:4040/register",{
  method:"post",
  headers:{
    "content-Type":"application/json"
  },
  body:JSON.stringify({
    name,
    email,
    password,
    profilepic:url
  })
}).then(res=>{
 
  if(res.ok){
    alert("User successfully added!");
    navigate("/login")
  }else{
    res.text().then(function(text) {
      alert(text);
    });
  }
}).catch(error=>console.log("llll",error))
}


  const postData =() =>{
  if(image){
    postprofilepic()
  }else{
uploadfields()
  }
}

  return (
    <div>
   <div className="mycardcard">
    <div className='card auth-card'>
     <h2>Instagram</h2>
     <input type="text"  placeholder='name' value={name}  onChange={(e)=>setName(e.target.value)}/>
        <input type="email"  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password"  placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
        <button className="btn waves-effect waves-light" onClick={()=>postData()}>Signup
  
  </button>
        
        </div>
        </div>
      </div>
  )
}

export default Signup
