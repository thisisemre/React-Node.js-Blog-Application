  import React,{useState,useEffect} from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Home from './components/Home.js';
  import Login from './components/Login.js';
  import Register from './components/Register.js';
  import './components/styles/main.css'; 
  import Blog from './components/Blogs/Blog.js';
  import PrivateRoute from './components/PrivateRoute.js';


  function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    useEffect(() => {
      
      const user = localStorage.getItem("user");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []); 


    
    return (
      <Router>
        <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated}  />} />
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} />} />
        <Route path="/register" element={<Register isAuthenticated={isAuthenticated} />} />

        <Route path ="/blog" element={<PrivateRoute element ={<Blog />} />}  />
        </Routes>
      </Router>
    );
  }

  export default App;
