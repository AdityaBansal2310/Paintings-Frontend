import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card text-center" style={{ width: '400px', height: '250px' }}> {/* Adjust width and height as needed */}
                <div className="card-body">
                    <h2 className="card-title mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="username" className="form-control" placeholder="Username or Email" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
