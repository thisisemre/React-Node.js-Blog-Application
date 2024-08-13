import React,{useState} from 'react';
import './styles/main.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    let result =  await axios.post("http://localhost:5000/auth/login",{
      username:username,
      password:password
    });
    if(result.data){
      
      localStorage.setItem("user",JSON.stringify(result.data.user));
      navigate("/");
      navigate(0);
    
    }
    

  };


  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" 
        value={username}
         onChange={(e)=>setUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="password" 
        value={password}
         onChange={(e)=>setPassword(e.target.value)}/>

        <button type="submit">Login</button>
      </form>
      <a href="/login">You don't have an account?</a>
    </div>
  );
}

export default Login;
