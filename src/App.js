import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import PaintingList from './PaintingList';
import PaintingDetails from './PaintingDetails';
import CreatePainting from './CreatePainting'; 
import RegisterComponent from './RegisterComponent'; 
import LoginComponent from './LoginComponent'; 
import LogoutComponent from './LogoutComponent'; 
import LoginRegister from './LoginRegister'; 

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route path="/painting/:ID" element={<PaintingDetails />} />
                    <Route path="/create" element={<CreatePainting />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route path="/paintings" element={<PaintingList />} /> {/* Add this route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
