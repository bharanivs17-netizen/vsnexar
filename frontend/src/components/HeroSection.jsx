import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaSearch, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const HeroSection = () => {
  const publicUrl = import.meta.env.BASE_URL || '/';
  const ceoImageUrl = `${publicUrl}ceo-image.png`;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Default fallback services for when Supabase isn't available 
  const fallbackServices = [
    { id: 'web-design', title: 'Web Design', description: 'Creating stunning, responsive, and dynamic web applications.' },
    { id: 'logo-design', title: 'Logo Design', description: 'Crafting unique and memorable brand identities.' },
    { id: 'video-editing', title: 'Video Editing', description: 'Professional video editing for social media, YouTube, and corporate.' },
    { id: 'photo-editing', title: 'Photo Editing', description: 'High-end photo retouching and manipulation.' },
    { id: 'ui-ux-design', title: 'UI/UX Design', description: 'Designing intuitive, accessible, and beautiful digital experiences.' },
    { id: 'content-creation', title: 'Content Creation', description: 'Crafting attention-grabbing digital content for brands and campaigns.' }
  ];

  const handleSearchChange = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    if (q.length < 2) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    // Try searching from Supabase first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, description')
          .ilike('title', `%${q}%`);
        
        if (!error && data && data.length > 0) {
          setSearchResults(data);
          setShowResults(true);
          return;
        }
      } catch (err) {
        console.warn("Supabase search failed, using fallback:", err);
      }
    }

    // Fallback: search locally
    const filtered = fallbackServices.filter(s => 
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      s.description.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(filtered);
    setShowResults(filtered.length > 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/service/${searchResults[0].id}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const scrollToServices = () => {
    const serviceSection = document.querySelector('.service-cards');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'clamp(80px, 15vh, 120px) 20px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        y,
        opacity
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `linear-gradient(45deg, ${['#3b82f6', '#ec4899', '#a78bfa', '#06b6d4'][i % 4]}, transparent)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '4px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Gradient orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${i === 0 ? '59, 130, 246' : i === 1 ? '236, 72, 153' : '139, 92, 246'}, 0.1) 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 10, width: '100%', maxWidth: '1200px' }}
      >
        {/* VSNEXAR Logo - blended with dark background */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: 'clamp(20px, 5vh, 40px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <motion.img
            src={`${publicUrl}logo.png`}
            alt="VSNEXAR Logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
            className="hero-logo-img"
            style={{
              width: 'clamp(200px, 25vw, 350px)',
              objectFit: 'contain',
              mixBlendMode: 'lighten',
              filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.div
            style={{ display: 'none' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <h1 className="responsive-title" style={{
              fontWeight: 800,
              marginBottom: '5px',
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              lineHeight: 1
            }}>
              <span style={{ color: '#06b6d4' }}>VS</span>
              <span className="text-gradient">NEXAR</span>
            </h1>
            <p style={{
              letterSpacing: 'clamp(2px, 1vw, 6px)',
              fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
              color: '#94a3b8',
              textTransform: 'uppercase',
              fontWeight: 300
            }}>
              Software Solutions
            </p>
          </motion.div>
        </motion.div>

        {/* CEO Image - Circular Mask to hide white corners */}
        <motion.div
          variants={itemVariants}
          className="hero-ceo-container"
          style={{
            width: 'clamp(200px, 30vw, 320px)',
            height: 'clamp(200px, 30vw, 320px)',
            margin: '0 auto clamp(20px, 4vh, 40px)',
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid rgba(139, 92, 246, 0.4)',
            boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)',
            zIndex: 5
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 80px rgba(139, 92, 246, 0.4)'
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={ceoImageUrl}
            alt="CEO - Bharani"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${publicUrl}logo.png`;
            }}
            className="hero-ceo-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block'
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
          variants={itemVariants}
          style={{
            width: '100%',
            paddingTop: 'clamp(10px, 2vh, 20px)',
            zIndex: 10
          }}
        >
          <motion.h2
            className="responsive-heading"
            style={{
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 'clamp(15px, 3vh, 30px)',
              fontSize: 'clamp(1.5rem, 6vw, 3.5rem)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Empowering Your Business <br />
            <span style={{
              fontWeight: 400,
              color: '#a78bfa'
            }}>
              with <span style={{
                color: '#8b5cf6',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
              }}>Cutting-Edge</span> Software Solutions
            </span>
          </motion.h2>

          {/* Enhanced Search Bar - Connected to Database */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 'clamp(300px, 80vw, 700px)', margin: 'clamp(20px, 4vh, 40px) auto 0' }}>
            <motion.form
              onSubmit={handleSearch}
              style={{
                display: 'flex',
                width: '100%',
                background: 'rgba(20, 20, 45, 0.8)',
                borderRadius: '50px',
                padding: '6px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 100 }}
              whileHover={{
                boxShadow: '0 15px 50px rgba(0,0,0,0.4)',
                scale: 1.02
              }}
            >
              <input
                type="text"
                className="search-input"
                placeholder="What can we help you with?"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => { if (searchQuery.length > 1) setShowResults(true); }}
                onBlur={() => setTimeout(() => setShowResults(false), 300)}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: 'clamp(12px, 3vw, 18px) clamp(20px, 4vw, 30px)',
                  width: '100%',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontFamily: 'Outfit, sans-serif',
                  outline: 'none'
                }}
              />
              <motion.button
                type="submit"
                className="search-button"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: 'clamp(10px, 2.5vw, 16px) clamp(20px, 4vw, 35px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch size={isMobile ? 14 : 18} />
                {!isMobile && 'Search'}
              </motion.button>
            </motion.form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '6px',
                  right: '6px',
                  marginTop: '10px',
                  background: 'rgba(15, 15, 35, 0.98)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 100
                }}
              >
                {searchResults.map((result) => (
                  <div 
                    key={result.id}
                    onMouseDown={() => handleResultClick(result.id)}
                    style={{
                      padding: '18px 24px',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'background 0.2s ease',
                      color: 'white'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontWeight: 'bold', color: '#06b6d4', marginBottom: '4px' }}>{result.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{result.description?.substring(0, 80)}...</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{
              marginTop: 'clamp(30px, 6vh, 60px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.p
              style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                margin: 0
              }}
            >
              Discover Our Services
            </motion.p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ cursor: 'pointer' }}
              onClick={scrollToServices}
              whileHover={{ scale: 1.1 }}
            >
              <FaArrowDown
                size={isMobile ? 20 : 24}
                color="#a78bfa"
                style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.5))' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
