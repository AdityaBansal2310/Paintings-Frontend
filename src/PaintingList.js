import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar component
import './PaintingList.css'; // Import custom CSS for styling
import LoginRegister from './LoginRegister'; // Import LoginRegister component

function PaintingList() {
    const [paintings, setPaintings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        navigate('/'); // Redirect to the root URL
    };

    return (
        <>
            <Navbar />
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
                                                            <img src={`http://localhost:8000${painting.image}`} alt={painting.Title} />
                                                        </Link>
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
        </>
    );
}

export default PaintingList;
