import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const HeroSection = () => {
  const publicUrl = import.meta.env.BASE_URL || '/';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim() === '') {
      alert("Please enter a service you are looking for!");
      return;
    }
    alert(`Searching our database for: ${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '90vh',
      padding: '80px 20px 20px',
      textAlign: 'center',
      position: 'relative'
    }}>
      
      {/* VSNEXAR Logo - blended with dark background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        style={{ marginBottom: '10px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img 
          src={`${publicUrl}logo.png`} 
          alt="VSNEXAR Logo" 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
          className="hero-logo-img"
          style={{ width: '280px', objectFit: 'contain', mixBlendMode: 'lighten' }}
        />
        <div style={{display: 'none'}}>
          <h1 className="responsive-title" style={{ fontWeight: 800, marginBottom: '5px' }}>
            <span style={{ color: '#06b6d4' }}>VS</span>
            <span className="text-gradient">NEXAR</span>
          </h1>
          <p style={{ letterSpacing: '4px', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Software Solutions
          </p>
        </div>
      </motion.div>

      {/* CEO Image - Circular Mask to hide white corners */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="hero-ceo-container"
        style={{ 
          width: '280px', 
          height: '280px',
          margin: '0 auto 20px',
          zIndex: 5, 
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)'
        }}
      >
        <img 
          src={`${publicUrl}ceo-image.png`} 
          alt="CEO - Bharani"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'rgba(255,255,255,0.05)';
          }}
          className="hero-ceo-img"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'top',
            transform: 'scale(1.1)' 
          }}
        />
        {/* Soft overlay gradient to melt into the dark background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 30%, rgba(7, 7, 20, 0.4) 100%)',
          pointerEvents: 'none'
        }} />
      </motion.div>

      {/* Hero Title Container */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ zIndex: 10, width: '100%', paddingTop: '10px' }}
      >
        <h2 className="responsive-heading" style={{ fontWeight: 700, lineHeight: 1.2, marginBottom: '20px' }}>
          Empowering Your Business <br />
          <span className="responsive-subheading" style={{ fontWeight: 400 }}>
            with <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Cutting-Edge</span> Software Solutions
          </span>
        </h2>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '600px',
            margin: '20px auto 0',
            background: 'white',
            borderRadius: '50px',
            padding: '6px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <input 
            type="text" 
            className="search-input"
            placeholder="What can we help you with?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch size={18} />
          </button>
        </form>
      </motion.div>

    </div>
  );
};

export default HeroSection;
