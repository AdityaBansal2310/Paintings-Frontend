import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/style.css';
import '../css/PaintingDetails.css'; // Add missing import for PaintingDetails.css
import EditPaintingForm from './EditPaintingForm';
import CommentForm from './CommentForm';

function PaintingDetails() {
    const { ID } = useParams();
    const [painting, setPainting] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [updatedPaintingData, setUpdatedPaintingData] = useState({
        Title: '',
        Artist: '',
        Description: '',
        Price: '',
        image: null
    });
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPainting = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                };

                const response = await axios.get(`http://127.0.0.1:8000/painting/${ID}`, config);
                setPainting(response.data);
            } catch (error) {
                console.error('Error fetching painting:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                };

                const response = await axios.get(`http://127.0.0.1:8000/painting/${ID}/comment/`, config);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchPainting();
        fetchComments();
    }, [ID]);

    const deletePainting = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            };

            await axios.delete(`http://127.0.0.1:8000/painting/${ID}/`, config);
            setShowPopup(true);
        } catch (error) {
            console.error('Error deleting painting:', error);
        }
    };

    const handleEdit = () => {
        setEditingMode(true);
        setUpdatedPaintingData({
            Title: painting.Title,
            Artist: painting.Artist,
            Description: painting.Description,
            Price: painting.Price,
            image: painting.image
        });
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setUpdatedPaintingData({ ...updatedPaintingData, [e.target.name]: e.target.files[0] });
        } else {
            setUpdatedPaintingData({ ...updatedPaintingData, [e.target.name]: e.target.value });
        }
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

            const formData = new FormData();
            formData.append('Title', updatedPaintingData.Title);
            formData.append('Artist', updatedPaintingData.Artist);
            formData.append('Description', updatedPaintingData.Description);
            formData.append('Price', updatedPaintingData.Price);
            formData.append('image', updatedPaintingData.image);

            await axios.patch(`http://127.0.0.1:8000/painting/${ID}/`, formData, config);
            setEditingMode(false);
            const response = await axios.get(`http://127.0.0.1:8000/painting/${ID}`, config);
            setPainting(response.data);
        } catch (error) {
            console.error('Error updating painting:', error);
        }
    };

    return (
        <div className="painting-details-container">
            <div className="image-comments-container">
                <div className="image-container">
                    <img src={`http://127.0.0.1:8000${painting.image}`} alt={painting.Title} />
                </div>
                <div className="details-box">
                    {editingMode ? (
                        <div className="edit-painting-form">
                            <EditPaintingForm
                                painting={painting}
                                updatedPaintingData={updatedPaintingData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    ) : (
                        <>
                            <h2>{painting.Title}</h2>
                            <p>Title: {painting.Title}</p>
                            <p>Artist: {painting.Artist}</p>
                            <p>Description: {painting.Description}</p>
                            <p>Price: {painting.Price}</p>
                            <div className="buttons-container">
                                <button onClick={handleEdit} className="btn btn-outline-info">Edit Painting</button>
                                <button onClick={deletePainting} className="btn btn-outline-danger">Delete Painting</button>
                            </div>
                        </>
                    )}
                    {showPopup && (
                        <div className="popup">
                            <p>Painting deleted successfully</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="comments-container">
                <div className="comments">
                    <h3>Comments</h3>
                    {comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
                {/* Render CommentForm component and pass paintingId and setComments as props */}
                <CommentForm paintingId={ID} setComments={setComments} />
            </div>
        </div>
    );
}

export default PaintingDetails;