// src/PaintingDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

function PaintingDetails() {
    const { ID } = useParams(); // Use useParams hook to get route parameters
    const [painting, setPainting] = useState({});

    useEffect(() => {
        const fetchPainting = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/painting/${ID}`);
                console.log('Painting data:', response.data); 
                setPainting(response.data);
            } catch (error) {
                console.error('Error fetching painting:', error);
            }
        };
    
        fetchPainting();
    }, [ID]);

    return (
        <div>
            <h1>Painting Details hgfh</h1>
            <div className="painting-details">
                <h2>{painting.title}</h2>
                <p> ID: {painting.ID}</p>
                <p> Title: {painting.Title} </p>
                <p> Artist: {painting.Artist}</p>
                <p> Description: {painting.Description}</p>
                <p> Price: {painting.Price}</p>
                <img src={painting.image_url} alt={painting.Title} />
            </div>
        </div>
    );
}

export default PaintingDetails;
