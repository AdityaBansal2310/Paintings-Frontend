import React from 'react';
import axios from 'axios';

const LogoutComponent = () => {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(
                    'http://localhost:8000/api/logout/',
                    null,
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                );
                console.log(response.data);
                localStorage.removeItem('token');
            } else {
                console.error('No token found in local storage');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutComponent;
