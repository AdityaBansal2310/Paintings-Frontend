import React, { useState } from 'react';
import axios from 'axios';
import '../css/style.css';

const CommentForm = ({ paintingId, setComments }) => {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            };

            const formData = {
                text: text,
            };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/painting/${paintingId}/comment/`, formData, config);
            setComments(prevComments => [...prevComments, response.data]);
            setText(''); // Clear the input field after submission
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comment-form">
            <div className="comment-input">
                <h3>Add a Comment</h3>
                <form onSubmit={handleSubmit}>
                    <textarea value={text} onChange={handleChange} placeholder="Enter your comment..." required></textarea>
                    <button type="submit" className="btn btn-primary">Add Comment</button>
                </form>
            </div>
        </div>
    );
}

export default CommentForm;