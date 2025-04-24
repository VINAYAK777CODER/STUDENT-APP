import React from 'react'
import { Link, Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <div>
    <div style={{backgroundColor:"brown", color:"white", fontSize:"30px"}}>Welcome to Student App</div>
    <nav>
      <ul>
        <li><Link to= "/login">Login</Link></li>
        <li><Link to= "/register">Registration</Link></li>
      </ul>
    </nav>
    <Outlet/>
    </div>
  )
}

export default Home