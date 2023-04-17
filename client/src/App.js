import './App.css';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom"
import Home from './components/screens/Home';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import UserProfile from  './components/screens/Userprofile';
import Createpost from './components/screens/Createpost';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route exact path="/" element={<Home />} />
    
        <Route exact path="/profile" element={<Profile/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<Createpost/>} />
        <Route path="/profile/:id" element={<UserProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
