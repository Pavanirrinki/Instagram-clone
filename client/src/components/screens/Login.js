import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
function Login() {

  const navigate = useNavigate()
  const [token,setToken] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
  const postData =() =>{
    fetch("http://localhost:4040/login",{
      method:"post",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
       email,
        password
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
   
      if(data){
        alert("User login successfully!");
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        console.log("112455",data)
     
        navigate("/")
     
      }else{
        alert(`${data.error}`);
      }
    })
   
    }
  


  return (
    <div>
   <div className="mycardcard">
    <div className='card auth-card'>
     <h2>Instagram</h2>
        <input type="email"  placeholder='email'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password"  placeholder='password'   value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="btn waves-effect waves-light" onClick={()=>postData()}>Login
  
  </button>
        
        </div>
        </div>
      </div>
  )
}

export default Login
