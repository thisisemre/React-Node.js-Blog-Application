import React from 'react';
import '../styles/main.css'; 
import axios from 'axios';

function EditPost({ postId }) {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/blogs/delete/${postId}`);
            
        } catch (error) {
            console.error("Post silinirken bir hata oluştu:", error);
        }
    };

    return <button onClick={handleDelete} className="delete-button">Delete post</button>;
}

export default EditPost;
