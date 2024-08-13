import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './styles/main.css';





function Home(props) {
  const navigate = useNavigate();
  async function handleLogout() {  
    localStorage.removeItem("user");
    navigate("/");
    navigate(0);
  }
  function handleBlog() {  
    navigate("/blog");
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <div className="button-container">
        {props.isAuthenticated ? (
          <>  
              <button onClick={handleBlog} className="button">My Blogs</button>
              <button onClick={handleLogout} className="button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
            <Link to="/register">
              <button className="button">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
