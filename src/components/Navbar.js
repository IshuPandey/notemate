
import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { useLocation } from 'react-router-dom';




export default function Navbar  (props) {
  let navigate=useNavigate()
  let location = useLocation();
  const handleClick=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }

  


 

  return (
    
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home" >NoteMate</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> 
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/home"? "active": ""} ${!localStorage.getItem('token')?'disabled': " "}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
        </li>
        </ul>
        {!localStorage.getItem('token') ?<div className="container d-flex justify-content-end " >
                    <Link className="btn btn-success mx-1" to="/" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </div>: <div className="container d-flex justify-content-end " >
                    <Link className="btn btn-success mx-1" to="/login" role="button" onClick={handleClick}>Log Out</Link>
                    </div>}
    </div>
  </div>
</nav>
  )
}
