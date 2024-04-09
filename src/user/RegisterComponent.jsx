import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card" style={{ width: '500px', height: '300px' }}>
                <div className="card-body d-flex flex-column align-items-center">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit} className="w-75">
                        <div className="mb-3">
                            <input type="text" name="username" className="form-control" placeholder="Username" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-center"> {/* Add this div for centering */}
                            <button type="submit" className="btn btn-outline-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
