import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/main.css'; 
import axios from 'axios';
import CreatePost from './CreatePost.js';
import DeletePost from './DeletePost.js';
import EditablePost from './EditablePost.js';

function Blog(){
    const [blogs, setBlogs] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const handleEditClick = (id) => {
        setEditingId(id);
        
      };
    


    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user.user_id;

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const result = await axios.get("http://localhost:5000/blogs/get", {
                    params: { user_id }
                });
                setBlogs(result.data); 
            } catch (error) {
                console.log("Error fetching blogs:", error);
            }
        }
    
        fetchBlogs(); 
    }, [user_id]);


    return (
        <div>
            <div className="blog-header">

            <nav className="navbar">
                    <Link to="/" className="navbar-logo">Main Menu</Link>
                    <div className="navbar-user">Hi {user.username}</div>
            </nav>
            </div>
            <div className="blog-container">
                <div className="blog-list">
                    {blogs.length > 0 ? (
                        blogs.map(blog => (
                            <div key={blog.id} className="blog-item">
                                <div className="button-container"> 
                                       
                                {(editingId !==blog.id)&&(
                                <>
                                <button onClick={() => handleEditClick(blog.id)} className="edit-button">
                                Edit post
                                </button>
                                <DeletePost postId={blog.id} />
                                </>
                                )}    
                                </div>
                                
                                <EditablePost postId={blog.id} title={blog.title} content={blog.content} isEditing={editingId===blog.id} />
                                
                            </div>
                        ))
                    ) : (
                        <p>No blogs found.</p> 
                    )}
                </div>
            </div>
            <CreatePost />
        </div>
    );
}

export default Blog;
