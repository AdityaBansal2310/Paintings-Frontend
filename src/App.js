import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaintingList from './PaintingList';
import PaintingDetails from './PaintingDetails';
import CreatePainting from './CreatePainting'; // Import the component for creating paintings

function App() {
    return (
        <Router>
            <div>
                <h1>Arya's Collection</h1>
                <Routes>
                    <Route path="/" element={<PaintingList />} />
                    <Route path="/painting/:ID" element={<PaintingDetails />} />
                    <Route path="/create" element={<CreatePainting />} /> {/* Add route for creating paintings */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
