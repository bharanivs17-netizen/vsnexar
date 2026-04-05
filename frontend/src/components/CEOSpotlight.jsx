import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaLinkedin, FaEnvelope, FaUserTie } from 'react-icons/fa';
import { siteSettings } from '../config/siteSettings';

const CEOSpotlight = () => {
  const publicUrl = import.meta.env.BASE_URL || '/';
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="glass"
      style={{
        maxWidth: '1000px',
        margin: '60px auto',
        padding: '40px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'left',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        boxShadow: '0 0 30px rgba(124, 58, 237, 0.1)'
      }}
    >
      {/* Photo with glow effect */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180px', height: '180px',
          background: 'rgba(124, 58, 237, 0.4)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          zIndex: -1
        }} />
        <img 
          src={`${publicUrl}${siteSettings.ceo.profilePic}`} 
          alt={`CEO ${siteSettings.ceo.name}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div style="width:180px;height:180px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border-radius:20px;border:1px dashed rgba(255,255,255,0.2)">CEO Photo</div>';
          }}
          style={{
            width: '200px',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)'}
        />
      </div>

      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '5px' }}>
          Meet Our <span className="text-gradient">Visionary</span>
        </h2>
        <h3 style={{ fontSize: '1.6rem', color: '#a78bfa', fontWeight: 600, marginBottom: '20px' }}>
          {siteSettings.ceo.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px' }}>
          As the <span style={{ color: 'white', fontWeight: 500 }}>{siteSettings.ceo.role}</span>, {siteSettings.ceo.description}
        </p>
        
        {/* Contact Buttons */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href={`tel:${siteSettings.contact.mobile.replace(/\s/g, '')}`} className="contact-chip" style={{ background: '#7c3aed', color: 'white', padding: '12px 25px' }}>
            <FaPhone /> {siteSettings.contact.mobile}
          </a>
          <a href={siteSettings.contact.linkedin} target="_blank" rel="noreferrer" className="contact-chip" style={{ padding: '12px 25px' }}>
            <FaLinkedin color="#06b6d4" /> LinkedIn
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default CEOSpotlight;

