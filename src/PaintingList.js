import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaintingList.css'; // Import CSS file for styling

function PaintingList() {
    const [paintings, setPaintings] = useState([]);
    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/painting/');
                console.log('Paintings data:', response.data); // Log fetched data
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
                        <h2>{painting.title}</h2>
                        <p> ID: {painting.ID}</p>
                        <p> Title: {painting.Title} </p>
                        <p> Artist: {painting.Artist}</p>
                        <p> Description: {painting.Description}</p>
                        <p> Price: {painting.Price}</p>
                        <img src= {painting.image_url} alt={painting.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaintingList;
