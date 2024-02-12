import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

function PaintingDetails() {
    const { ID } = useParams(); // Use useParams hook to get route parameters
    const [painting, setPainting] = useState({});
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up

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

    const deletePainting = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/painting/${ID}`);
            console.log('Painting deleted');
            setShowPopup(true); 
        } catch (error) {
            console.error('Error deleting painting:', error);
        }
    };

    return (
        <div>
            <h1>Painting Details</h1>
            <div className="painting-details">
                <h2>{painting.title}</h2>
                <p>ID: {painting.ID}</p>
                <p>Title: {painting.Title}</p>
                <p>Artist: {painting.Artist}</p>
                <p>Description: {painting.Description}</p>
                <p>Price: {painting.Price}</p>
                <img src={painting.image_url} alt={painting.Title} />
                {/* Conditionally render the pop-up */}
                {showPopup && (
                    <div className="popup">
                        <p>Painting deleted successfully</p>
                    </div>
                )}
                <button onClick={deletePainting}>Delete Painting</button> {/* Delete button */}
            </div>
        </div>
    );
}

export default PaintingDetails;
