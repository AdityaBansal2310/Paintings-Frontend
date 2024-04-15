import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Add state variable for success popup

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Check if any field is empty
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage('Please enter all the required fields.');
            setShowErrorModal(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData);
            console.log(response.data);
            // If registration is successful, show success modal
            setShowErrorModal(false); // Hide error modal if it was previously shown
            setShowSuccessModal(true);
        } catch (error) {
            console.error(error);
            if (error.response.status === 409) {
                // If user already exists, show error modal
                setErrorMessage('User with the same username or email already exists.');
                setShowSuccessModal(false); // Hide success modal if it was previously shown
                setShowErrorModal(true);
            } else {
                // For other errors, log the error and show a generic error message
                setErrorMessage('User with the same username or email already exists.');
                setShowSuccessModal(false); // Hide success modal if it was previously shown
                setShowErrorModal(true);
            }
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

            {/* Error Modal */}
            <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{ display: showErrorModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Error</h5>
                            <button type="button" className="btn-close" style={{ color: 'red', position: 'relative', right: '0', top: '0', alignSelf: 'flex-start' }} onClick={() => setShowErrorModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>{errorMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowErrorModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} style={{ display: showSuccessModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Success</h5>
                            <button type="button" className="btn-close" style={{ color: 'green', position: 'relative', right: '0', top: '0', alignSelf: 'flex-start' }} onClick={() => setShowSuccessModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Registered successfully!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
