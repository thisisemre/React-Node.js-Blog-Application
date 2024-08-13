import React, { useState } from 'react';
import '../styles/main.css'; 
import axios from 'axios';

function CreatePost() {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreatePost = async () => {
        try {
           
            await axios.post('http://localhost:5000/blogs/create', {
                title:title,
                content:content,
                user_id: JSON.parse(localStorage.getItem("user")).user_id
            });

            setTitle('');
            setContent('');
            setShowForm(false);

        } catch (error) {
            console.log("Error creating post:", error);
        }
    };

    return (
        <div>
            <button className="create-post-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Create new Post'}
            </button>
            {showForm && (
                <div className="create-post-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="create-post-title"
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="create-post-content"
                    />
                    <button className="post-button" onClick={handleCreatePost}>Post</button>
                </div>
            )}
        </div>
    );
}

export default CreatePost;
