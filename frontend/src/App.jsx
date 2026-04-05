import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeamContact from './pages/TeamContact';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ServiceDetail from './components/ServiceDetail';
import AnimatedBackground from './components/AnimatedBackground';
import ThreeDBackground from './components/ThreeDBackground';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <AnimatedBackground />
      <ThreeDBackground />
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<TeamContact />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
