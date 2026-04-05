import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'linear-gradient(to bottom, rgba(7,7,20,0.95), rgba(7,7,20,0.6), transparent)'
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/vsnexar/logo.png" 
            alt="VSNEXAR Logo" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            style={{ height: '50px', objectFit: 'contain', mixBlendMode: 'lighten' }}
          />
          <h2 style={{ letterSpacing: '2px', margin: 0, display: 'none', alignItems: 'center' }}>
            <span style={{ color: '#06b6d4' }}>VS</span>
            <span style={{ color: '#a78bfa' }}>NEXAR</span>
          </h2>
        </div>
      </Link>

      <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" className="nav-link-item">Home</Link>
        <Link to="/contact" className="nav-link-item">Contact</Link>
        <Link to="/login" className="nav-login-btn glass">
          Login
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
