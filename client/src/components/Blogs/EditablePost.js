import React, { useState } from 'react';
import axios from 'axios';
import '../styles/main.css'; 

function EditablePost({title,content,isEditing,postId,}) {

  const [titleText, setTitleText] = useState(title);
  const [contentText,setContentText] = useState(content);


  const handleTitleInputChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleContentInputChange = (e) => {
    setContentText(e.target.value);
  };




  async function handleFormSubmit() {
    try {
      await axios.put(`http://localhost:5000/blogs/update/${postId}`, {
          title: titleText,
          content: contentText
      });

  } catch (error) {
      console.error("Error while updating the post:", error);
  }
    
  };
  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <div className='blog-list'>
        <input className='blog-item'
          type="text"
          value={titleText}
          onChange={handleTitleInputChange}
          onBlur={null}
          required
        />
        <input className='blog-item'
          type="text"
          value={contentText}
          onChange={handleContentInputChange}
          onBlur={null}
          required
        />
          <button className='save-button' type="submit">Save</button>
          <button className='cancel-button'> Cancel</button>
        </div>
        

        
      </form>
      ) : (
        <>
        
        <h2>{titleText}</h2>
        <p> {content}</p>
        
        </>
      )}
    </div>
  );
}

export default EditablePost;
