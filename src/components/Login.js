import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' 

import '../App.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate =useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.jwtData);
            navigate("/home");
            props.showAlert("Logged in successfully","success");

        }
        else{
            props.showAlert(json.error,'danger');
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container my-5 d-flex justify-content-center justify-self-center'>
            
            
    <form className="form" onSubmit={handleSubmit}>
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input placeholder="Enter email" type="email" value={credentials.email} onChange={onChange} id="email" name="email"/>
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
            </svg>
          </span>
      </div>
      <div className="input-container">
          <input placeholder="Enter password" type="password" value={credentials.password} onChange={onChange} name="password" id="password"/>

          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
            </svg>
          </span>
        </div>
         <button className="submit" type="submit">
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <Link to="/signup">Sign up</Link>
      </p>
   </form>

        </div>
    )
}

export default Login