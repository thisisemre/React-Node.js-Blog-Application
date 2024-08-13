// src/components/Register.js
import React,{useState} from 'react';
import './styles/main.css'; // Tek stil dosyası
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    await axios.post("http://localhost:5000/auth/register",{
      username:username,
      email:email,
      password:password
    });
    navigate("/");
    
  }
  return (
    <div className="register-container">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" 
        value={username}
         onChange={(e)=>setUsername(e.target.value)}/>
        <label>Email:</label>
        <input type="email" 
        value={email}
         onChange={(e)=>setEmail(e.target.value)}/>
        <label>Password:</label>
        <input type="password" 
        value={password}
         onChange={(e)=>setPassword(e.target.value)}/>

        <button type="submit">Register</button>
      </form>
      <a href="/login">You have an account?</a>
    </div>
  );
}

export default Register;
