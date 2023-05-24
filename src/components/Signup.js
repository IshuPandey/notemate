import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       const  {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        const error=json.error;
        if (json.success) {

            // Save the auth token and redirect
            localStorage.setItem('token', json.jwtData);
            navigate("/home");
            props.showAlert("Account created successfully",'success');

        } else {
            props.showAlert(error,'danger');
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
        const password = document.querySelector('input[name=password]');
        const confirm = document.querySelector('input[name=cpassword]');
        if (confirm.value === password.value) {
            confirm.setCustomValidity('');
        } else {
            confirm.setCustomValidity('Passwords do not match');
        }
    }
    return (
        <div className='container my-5 d-flex justify-content-center justify-self-center '>


            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">Create a new account</p>
                <div className="input-container">
                    <input placeholder="Enter Name" type="text" value={credentials.name} onChange={onChange}
                           id="name" name="name"/>
                    <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
            </svg>
          </span>
                </div>
                <div className="input-container">
                    <input placeholder="Enter email" type="text" value={credentials.email} onChange={onChange}
                           id="email" name="email"/>
                    <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
            </svg>
          </span>
                </div>
                <div className="input-container">
                    <input placeholder="Enter password" type="password" value={credentials.password} onChange={onChange}
                           name="password" id="password" required minLength={8}/>
                    <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin={'round'}
                    strokeLinecap={'round'}></path>
              <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
            </svg>
          </span>
                </div>


                <div className="input-container">
                    <input placeholder="Confirm password" type="password" value={credentials.cpassword}
                           onChange={onChange}
                           name="cpassword" id="cpassword" required minLength={8}/>

                    <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin={'round'}
                    strokeLinecap={'round'}></path>
              <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth={2} strokeLinejoin={'round'} strokeLinecap={'round'}></path>
            </svg>
          </span>
                </div>

                <button className="submit" type="submit">
                    Sign Up
                </button>


            </form>

        </div>
    )
}

export default Signup