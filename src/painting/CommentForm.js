
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

            const response = await axios.post(`http://127.0.0.1:8000/painting/${paintingId}/comment/`, formData, config);
            setComments(prevComments => [...prevComments, response.data]);
            setText(''); // Clear the input field after submission
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comment-form">
            <h3>Add a Comment</h3>
            <form onSubmit={handleSubmit}>
                <textarea value={text} onChange={handleChange} placeholder="Enter your comment..." required></textarea>
                <div className="submit-button">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CommentForm;

