import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { siteSettings } from '../config/siteSettings';

const TeamContact = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '800px', margin: '0 auto', padding: '120px 20px 50px', textAlign: 'center' }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', marginBottom: '20px' }}
      >
        Meet Our <span className="text-gradient">Team</span>
      </motion.h1>
      <p style={{ color: '#94a3b8', marginBottom: '50px' }}>Get in touch with us for your next big project.</p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass" 
        style={{ padding: '50px', borderRadius: '20px' }}
      >
        <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
          {siteSettings.name.split(' ')[0][0]}{siteSettings.name.split(' ')[1] ? siteSettings.name.split(' ')[1][0] : ''}
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{siteSettings.name} Lead Team</h2>
        <p style={{ color: '#a78bfa', fontSize: '1.2rem', marginBottom: '30px' }}>Software Solutions Experts</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px', margin: '0 auto' }}>
          
          <a href={`tel:${siteSettings.contact.mobile.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', textDecoration: 'none', color: 'white' }}>
            <FaPhoneAlt color="#3b82f6" /> <span>{siteSettings.contact.mobile}</span>
          </a>

          <a href={`mailto:${siteSettings.contact.email}`} target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', textDecoration: 'none', color: 'white' }}>
            <FaEnvelope color="#ec4899" /> <span>{siteSettings.contact.email}</span>
          </a>

          <a href={siteSettings.contact.instagram} target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', textDecoration: 'none', color: 'white' }}>
            <FaInstagram color="#eab308" /> <span>Instagram</span>
          </a>

          <a href={siteSettings.contact.linkedin} target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', textDecoration: 'none', color: 'white' }}>
            <FaLinkedin color="#06b6d4" /> <span>LinkedIn Profile</span>
          </a>

        </div>
      </motion.div>
    </div>
  );
};

export default TeamContact;

