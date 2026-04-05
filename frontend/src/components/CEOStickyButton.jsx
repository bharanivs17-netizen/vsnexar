import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaLinkedin } from 'react-icons/fa';
import { siteSettings } from '../config/siteSettings';

const CEOStickyButton = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <motion.a
        href={`tel:${siteSettings.contact.mobile.replace(/\s/g, '')}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass"
        style={{
          padding: '12px 20px',
          borderRadius: '50px',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: '1px solid rgba(124, 58, 237, 0.4)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ backgroundColor: '#7c3aed', padding: '8px', borderRadius: '50%', display: 'flex' }}>
          <FaPhone size={14} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: 1 }}>CEO {siteSettings.ceo.name}</div>
          <div>Call Sr. Web Developer</div>
        </div>
      </motion.a>

      <motion.a
        href={siteSettings.contact.linkedin}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        className="glass"
        style={{
          padding: '10px 15px',
          borderRadius: '50px',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          border: '1px solid rgba(6, 182, 212, 0.3)'
        }}
      >
        <FaLinkedin color="#06b6d4" /> LinkedIn Profile
      </motion.a>
    </motion.div>
  );
};

export default CEOStickyButton;

