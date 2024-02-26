import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaintingList from './PaintingList';
import PaintingDetails from './PaintingDetails';
import CreatePainting from './CreatePainting'; 
import RegisterComponent from './RegisterComponent'; 
import LoginComponent from './LoginComponent'; 
import LogoutComponent from './LogoutComponent';

function App() {
    return (
        <Router>
            <div>
                <h1>Arya's Collection</h1>
                <Routes>
                    {/* Routes for painting-related components */}
                    <Route path="/" element={<PaintingList />} />
                    <Route path="/painting/:ID" element={<PaintingDetails />} />
                    <Route path="/create" element={<CreatePainting />} />
                    
                    {/* Routes for authentication components */}
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
