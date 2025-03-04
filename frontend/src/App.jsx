import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CalculateShipping from './pages/CalculateShipping';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/calculate-shipping" element={<CalculateShipping/>} />
      </Routes>
    </Router>
  );
}

export default App;
