import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PaintingList.css';

function PaintingList() {
    const [paintings, setPaintings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn based on token availability

        if (token) {
            // Fetch paintings only if token is available
            fetchPaintings(token);
        }
    }, []);

    const fetchPaintings = async (token) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/painting/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setPaintings(response.data);
        } catch (error) {
            console.error('Error fetching paintings:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setPaintings([]); // Clear paintings when logging out
    };

    return (
        <div>
            <h1>Paintings</h1>
            {isLoggedIn ? (
                <div>
                    <Link to="/create">
                        <button>Create New Painting</button>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                    <div className="painting-grid">
                        {paintings.map(painting => (
                            <div key={painting.id} className="painting-item">
                                <div className="painting-box">
                                    <h2>{painting.title}</h2>
                                    <p>ID: {painting.ID}</p>
                                    <p>Title: {painting.Title}</p>
                                    <p>Artist: {painting.Artist}</p>
                                    <p>Description: {painting.Description}</p>
                                    <p>Price: {painting.Price}</p>
                                    <Link to={`/painting/${painting.ID}`}>
                                        <img src={painting.image_url} alt={painting.title} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <p>Please login to view paintings.</p>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PaintingList;
