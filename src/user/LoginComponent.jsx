import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const api_url = process.env.REACT_APP_API_URL;
            const frontend_url = process.env.REACT_APP_FRONTEND_URL;
            const complete_url = api_url.concat('/api/login/');
            const response = await axios.post(complete_url, formData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = frontend_url+ "/paintings" ;
        } catch (error) {
            setShowErrorModal(true);
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

            {/* Error Modal */}
            <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{ display: showErrorModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" onClick={() => setShowErrorModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Invalid username or password. Please try again.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowErrorModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
