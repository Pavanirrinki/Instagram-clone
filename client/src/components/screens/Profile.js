
import React,{useEffect,useState} from 'react'
import { useNavigate} from 'react-router-dom';
import M from 'materialize-css'
function Profile() {

  const navigate = useNavigate()
  const [data,setData] = useState([])
  const [myprofile,setMyprofile] = useState("")
  const [pic,setPic] = useState(true)
const [image,setImage] = useState("")
const [url,setUrl] = useState("")
  let profile = localStorage.getItem("user")
  const parsedObject = JSON.parse(profile);
  const id = parsedObject._id;
  useEffect(()=>{
    console.log(profile)
    fetch("http://localhost:4040/myposts",{
      method:"get",
      headers:{
          "content-Type":"application/json",
          "x-token":localStorage.getItem("token")
      }
    }).then(res=>res.json())
    .then(res => {
      setData(res);
  
    })  .catch(errors => console.error(errors));
  },[])

  useEffect(()=>{
    if(url){
   
         fetch(`http://localhost:4040/users/${parsedObject._id}/profilepic`,{
             method:"put",
             headers:{
                 "content-Type":"application/json",
                 "x-token":localStorage.getItem("token")
             },
         body:JSON.stringify({
             profilepic:url
            
         })
     }).then(res=>res.json())
     .then(data=>{
 console.log(data,"lllllllllll")
        if(data.error){
           M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }
        else{
          const user = JSON.parse(localStorage.getItem("user"))
  localStorage.setItem("user", JSON.stringify({ ...user, profilepic: url }))
            M.toast({html:"profilepic updated  Successfully",classes:"#43a047 green darken-1"})
         
         navigate("/")
        }
     }).catch(err=>{
         console.log(err)
     })
 }
 },[url])   
   const updateprofile=()  =>{
setPic(!pic)
    
   }
   useEffect(()=>{

    fetch(`http://localhost:4040/user/${id}`,{
      method:"get",
      headers:{
          "content-Type":"application/json",
          "x-token":localStorage.getItem("token")
      }
    }).then(res=>res.json())
    .then(res => {
      setMyprofile(res);
  
    })  .catch(errors => console.error(errors));
  },[])
console.log("profile",myprofile);
   const postDetails = ()=>{
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
       console.log("url",url)
    })
    .catch(err=>{
        console.log(err)
    })

 
}
  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div style={{display:"flex",justifyContent:"space-around",margin:"18px 18px"}}>
      {pic ?  <><div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={parsedObject.profilepic} onClick={updateprofile} />
        </div><div>
            <h2>{parsedObject.name}</h2>
            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
              <h6>{myprofile.posts?.length}posts</h6>
              <h6>{myprofile.user?.following?.length}following</h6>
              <h6>followers</h6>
            </div>

          </div></>:<>  <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            
            >
                Submit profile
            </button></>
}
      </div>
      <hr />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: "20px" }}>
  {data.map(data=>{ 
    return (
      <div style={{ marginRight: "20px" }}>
        {data.photo.includes('.jpg') || data.photo.includes('.jpeg') || data.photo.includes('.png') || data.photo.includes('.gif') || data.photo.includes('.bmp') || data.photo.includes('.svg') || data.photo.includes('.webp') ? 
          <img src={data.photo} style={{ width: "200px", height: "200px" }} /> : 
          <video src={data.photo} width="200px" height="200px" controls></video>
        }
        <h6 style={{textAlign:"center"}}><span style={{fontWeight:"bold"}}>Title:</span>{data.title}</h6>
        <p style={{textAlign:"center"}}><span style={{fontWeight:"bold"}}>Body:</span>{data.body}</p>
      </div>
    )
  })}
</div>
    </div>
  )
}

export default Profile;
