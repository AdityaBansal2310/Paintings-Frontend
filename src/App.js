import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from './Navbar';
import Footer from './Footer'; // Import Footer component
import PaintingList from './PaintingList';
import PaintingDetails from './PaintingDetails';
import CreatePainting from './CreatePainting'; 
import RegisterComponent from './RegisterComponent'; 
import LoginComponent from './LoginComponent'; 
import LogoutComponent from './LogoutComponent'; 
import LoginRegister from './LoginRegister'; // Import LoginRegister component

function App() {
    return (
        <Router>
            <div>
                <Navbar /> {/* Render Navbar component here */}
                <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route path="/painting/:ID" element={<PaintingDetails />} />
                    <Route path="/create" element={<CreatePainting />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route path="/paintings" element={<PaintingList />} /> {/* Add this route */}
                </Routes>
                <Footer /> {/* Render Footer component here */}
            </div>
        </Router>
    );
}

export default App;
