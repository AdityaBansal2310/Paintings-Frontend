// src/PaintingList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import './PaintingList.css'; 

function PaintingList() {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/painting/');
                console.log('Paintings data:', response.data); 
                setPaintings(response.data);
            } catch (error) {
                console.error('Error fetching paintings:', error);
            }
        };
    
        fetchPaintings();
    }, []);

    return (
        <div>
            <h1>Paintings</h1>
            <div className="painting-grid">
                {paintings.map(painting => (
                    <div key={painting.id} className="painting-item">
                        <div className="painting-box">
                            <h2>{painting.title}</h2>
                            <p> ID: {painting.ID}</p>
                            <p> Title: {painting.Title} </p>
                            <p> Artist: {painting.Artist}</p>
                            <p> Description: {painting.Description}</p>
                            <p> Price: {painting.Price}</p>
                            <Link to={`/painting/${painting.ID}`}><img src={painting.image_url} alt={painting.title} /></Link> {/* Add Link to navigate to PaintingDetails */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaintingList;
