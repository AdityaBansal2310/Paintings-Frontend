// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaintingList from './PaintingList';
import PaintingDetails from './PaintingDetails';

function App() {
    return (
        <Router>
            <div>
                <h1>My Django API Frontend</h1>
                <Routes>
                    <Route path="/" element={<PaintingList />} />
                    <Route path="/painting/:ID" element={<PaintingDetails />} /> {/* Make sure the parameter name here matches */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
