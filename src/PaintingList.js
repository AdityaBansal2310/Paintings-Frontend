import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PaintingList.css'; // Import custom CSS for styling

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
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-30">
                    <div className="card painting-card"> {/* Add painting-card class */}
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
                                                        <img src={`http://localhost:8000${painting.image}`} alt={painting.Title} />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="login-box text-center login-register-card"> {/* Add login-register-card class */}
                                    <p className="mb-3">Please login to view paintings.</p>
                                    <div className="mb-2">
                                        <Link to="/login">
                                            <button className="btn btn-outline-dark mr-2">Login</button>
                                        </Link>
                                        <Link to="/register">
                                            <button className="btn btn-outline-dark">Register</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaintingList;
