import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';
import "../css/PaintingList.css"; // Import custom CSS for styling
import LoginRegister from '../user/LoginRegister'; // Import LoginRegister component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function PaintingList() {
    const [paintings, setPaintings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [likeMessages, setLikeMessages] = useState({}); // State for like messages
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn based on token availability

        if (!token) {
            // Redirect to the root URL if not logged in
            navigate('/');
        } else {
            // Fetch paintings only if token is available
            fetchPaintings(token);
        }
    }, [navigate]);

    const fetchPaintings = async (token) => {
        try {
            const api_url = process.env.REACT_APP_API_URL;
            
            let complete_url = `${api_url}/painting/`; // Using backticks for template literal
            const response = await axios.get(complete_url, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setPaintings(response.data);
        } catch (error) {
            console.error('Error fetching paintings:', error);
        }
    };

    const handleLike = async (paintingID) => {
        try {
            const token = localStorage.getItem('token');
    
            // Check if the user has already liked the painting
            const api_url = process.env.REACT_APP_API_URL;
            
            let complete_url = `${api_url}/painting/${paintingID}/`; // Using backticks for template literal
            const response = await axios.get(complete_url, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            const paintingData = response.data;
            const userHasLiked = paintingData.user_has_liked;
    
            if (userHasLiked) {
                setLikeMessages(prevMessages => ({
                    ...prevMessages,
                    [paintingID]: 'You have already liked this painting.'
                }));
                return;
            }
            complete_url = `${api_url}/painting/${paintingID}/like/`; // Using backticks for template literal
            // If user has not already liked the painting, proceed with liking
            await axios.post(complete_url, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
    
            setLikeMessages(prevMessages => ({
                ...prevMessages,
                [paintingID]: 'Painting liked successfully.'
            }));
    
            // Update the likes count for the painting
            setPaintings(prevPaintings => prevPaintings.map(painting => {
                if (painting.ID === paintingID) {
                    painting.likes_count++;
                    painting.user_has_liked = true; // Update user_has_liked flag
                }
                return painting;
            }));
        } catch (error) {
            console.error('Error liking painting:', error);
            setLikeMessages(prevMessages => ({
                ...prevMessages,
                [paintingID]: 'Error encountered while liking painting.'
            }));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setPaintings([]); // Clear paintings when logging out
        navigate('/'); // Redirect to the root URL
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-30">
                    <div className="card painting-card">
                        <div className="card-body d-flex flex-column align-items-center">
                            <h1 className="card-title">Paintings</h1>
                            {isLoggedIn ? (
                                <div>
                                    <Link to="/create">
                                        <button className="btn btn-outline-success mb-3">Create New Painting</button>
                                    </Link>
                                    <button onClick={handleLogout} className="btn btn-outline-danger mb-3">Logout</button>
                                    <div className="painting-grid">
                                        {paintings.map(painting => (
                                            <div key={painting.ID} className="painting-item">
                                                <div className="painting-box">
                                                    <h2>{painting.Title}</h2>
                                                    <p>ID: {painting.ID}</p>
                                                    <p>Title: {painting.Title}</p>
                                                    <p>Artist: {painting.Artist}</p>
                                                    <p>Description: {painting.Description}</p>
                                                    <p>Price: {painting.Price}</p>
                                                    <Link to={`/painting/${painting.ID}`}>
                                                        <div className="painting-image-container">
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}${painting.image}`}
                                                                alt={painting.Title}
                                                                className="painting-image"/>
                                                        </div>
                                                    </Link>
                                                    <div className="d-flex align-items-center">
                                                        <button onClick={() => handleLike(painting.ID)} className="btn btn-like">
                                                            <FontAwesomeIcon icon={faHeart} className={`heart-icon ${painting.user_has_liked ? 'liked' : ''}`} style={{ fontSize: '22px' }} />
                                                        </button>
                                                        <p className="ml-2 mb-0">Likes: {painting.likes_count}</p>
                                                    </div>
                                                    {likeMessages[painting.ID] && <p className="like-message">{likeMessages[painting.ID]}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <LoginRegister />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaintingList;
