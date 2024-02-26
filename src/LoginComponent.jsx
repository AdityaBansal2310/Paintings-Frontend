import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            console.log(response.data);
            
            setIsLoggedIn(true);
            
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        
        setIsLoggedIn(false);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username or Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            {isLoggedIn ? (
                <div>
                    {/* Render logout button if isLoggedIn is true */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : null}
        </div>
    );
};

export default LoginComponent;
