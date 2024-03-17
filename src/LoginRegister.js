import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar component

function LoginRegister() {
    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="card" style={{ width: '650px', minHeight: '300px' }}>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center"> {/* Align content center */}
                                <h1 className="card-title text-center">Paintings</h1>
                                <div className="login-box text-center">
                                    <p className="mb-3">Please login to view paintings.</p>
                                    <div className="mb-4"> {/* Increased margin-bottom */}
                                        <Link to="/login" className="btn btn-outline-dark mr-6">Login</Link> {/* Increased margin-right */}
                                        <Link to="/register" className="btn btn-outline-dark ml-3">Register</Link> {/* Increased margin-left */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginRegister;
