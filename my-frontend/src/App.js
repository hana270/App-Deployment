import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SmartWatches from './SmartWatches';  // Modifié
import Categories from './Categories';       // Modifié
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Smartwatch Management System</h1>
        <div className="nav-buttons">
          <Link to="/smartwatches" className="nav-button">Manage Smartwatches</Link>
          <Link to="/categories" className="nav-button">Manage Categories</Link>
        </div>
        <Routes>
          <Route path="/smartwatches" element={<SmartWatches />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/" element={
            <div className="welcome-message">
              <h2>Welcome to Smartwatch Management</h2>
              <p>Please select a section to manage</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
