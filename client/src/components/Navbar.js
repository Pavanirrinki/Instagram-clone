import React, { useContext, useState,useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate,useLocation} from 'react-router-dom'
import "../App.css"
function Navbar() {

  const navigate = useNavigate()
  const { pathname } = useLocation();
  const state = localStorage.getItem("user")
  console.log("kkkkk", state)
  const [search, setSearch] = useState(false)
  const [searchprofiles, setSearchprofiles] = useState('')
  const [data, setData] = useState([])
 
 useEffect(() => {
     fetch("http://localhost:4040/users", {
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
  function logout() {
    localStorage.clear("token")
    navigate("/login")

  }
function changeprofile(e){
setSearchprofiles(e.target.value)
}
  function searchopen() {
     setSearch(!search)
     }

//SEARCH FUNCTION

const filteredUsers = data?.filter(user =>
  user.name.toLowerCase().includes(searchprofiles.toLowerCase())
);
console.log("filtered",filteredUsers)
//  
function renderlist() {
    if (state) {
      return [
     
        <li style={{ color: "black", marginTop: "5px", width: "50px", fontSize: "20px" }} onClick={searchopen}><BiSearchAlt2 /></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">createpost</Link></li>,
        <button style={{ backgroundColor: "white", border: "none" }} onClick={logout}>Log out</button>,


      ]
    } else {
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>,

      ]
    }
  }
  return (
    <div>
       
      <nav>
     
 
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/login"} className="brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right">

            {renderlist()}
          </ul>

        </div>
      </nav>     {search && pathname === '/' && <input type="text" placeholder='search profiles' value={searchprofiles} onChange={changeprofile} autoComplete='off'/>}

      <ul>

  {searchprofiles.length >= 1 && pathname === "/" &&
    (filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <Link to={`/profile/${user._id}`}>
        <li key={user._id} className="searchprofiles card home-card">
        {user.name} 
        </li>
        </Link>
      ))
    ) : (
      <li className="searchprofiles card home-card">no profiles</li>
    ))}
</ul>

    
    </div>
  )
}

export default Navbar
