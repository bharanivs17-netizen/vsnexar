import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const publicUrl = import.meta.env.BASE_URL || '/';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    if (q.length > 1) {
      try {
        const response = await fetch(`http://localhost:8000/api/search?q=${q}`);
        if(response.ok) {
          const data = await response.json();
          setSearchResults(data.data || []);
          setShowResults(true);
        }
      } catch (err) {
        console.error("Search failed:", err);
      }
    } else {
      setShowResults(false);
    }
  };

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
            src={`${publicUrl}logo.png`} 
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

      <div style={{ position: 'relative', flex: '0 1 400px', margin: '0 20px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FaSearch style={{ position: 'absolute', left: '15px', color: '#94a3b8' }} />
          <input 
            type="text"
            placeholder="Search tasks (e.g. Video Editing)..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
            onFocus={() => { if (searchQuery.length > 1) setShowResults(true); }}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            style={{
              width: '100%',
              padding: '10px 15px 10px 40px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              outline: 'none',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
        
        {showResults && searchResults.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '10px',
            background: 'rgba(15, 15, 35, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {searchResults.map((result) => (
              <div 
                key={result.id}
                onClick={() => {
                  navigate(`/service/${result.id}`);
                  setShowResults(false);
                  setSearchQuery('');
                }}
                style={{
                  padding: '15px 20px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s ease',
                  color: 'white'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontWeight: 'bold', color: '#06b6d4' }}>{result.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{result.description?.substring(0, 50)}...</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-links" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" className="nav-link-item">Home</Link>
        <Link to="/contact" className="nav-link-item">Contact</Link>
        <Link to="/login" className="nav-link-item">Sign In</Link>
        <Link to="/signup" className="nav-login-btn glass" style={{ background: 'linear-gradient(90deg, #3b82f6, #ec4899)', border: 'none', color: 'white' }}>
          Sign Up
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
