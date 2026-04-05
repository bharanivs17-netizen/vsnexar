import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaUserTie } from 'react-icons/fa';
import { siteSettings } from '../config/siteSettings';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass"
      id="contact"
      style={{
        borderTop: '1px solid rgba(124, 58, 237, 0.3)',
        padding: '50px 20px 30px',
        marginTop: '60px'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* CEO Section */}
        <div className="footer-ceo-section" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* CEO Image */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #7c3aed',
            flexShrink: 0
          }}>
            <img 
              src={siteSettings.ceo.profilePic} 
              alt={`CEO - ${siteSettings.ceo.name}`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(124,58,237,0.2)"><span style="font-size:2rem">👤</span></div>';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          
          {/* CEO Info */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2px' }}>
              <span className="text-gradient">{siteSettings.ceo.name}</span>
            </h3>
            <p style={{ color: '#a78bfa', fontSize: '0.95rem', fontWeight: 500, marginBottom: '4px' }}>
              <FaUserTie style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              {siteSettings.ceo.role}
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '8px' }}>
              <a href={`tel:${siteSettings.contact.mobile.replace(/\s/g, '')}`} className="footer-link">
                <FaPhone size={14} /> {siteSettings.contact.mobile}
              </a>
              <a href={siteSettings.contact.linkedin} target="_blank" rel="noreferrer" className="footer-link" style={{ color: '#3b82f6' }}>
                <FaLinkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0 0 30px' }} />

        {/* Company Contact Row */}
        <div className="footer-contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          <div>
            <h4 style={{ color: '#a78bfa', marginBottom: '12px', fontSize: '1.05rem' }}>{siteSettings.name}</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Premium software solutions for web design, logo design, video editing, and photo editing.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#a78bfa', marginBottom: '12px', fontSize: '1.05rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`mailto:${siteSettings.contact.email}`} className="footer-link">
                <FaEnvelope size={14} /> {siteSettings.contact.email}
              </a>
              <a href={`tel:${siteSettings.contact.mobile.replace(/\s/g, '')}`} className="footer-link">
                <FaPhone size={14} /> {siteSettings.contact.mobile}
              </a>
              <a href={siteSettings.contact.instagram} target="_blank" rel="noreferrer" className="footer-link" style={{ color: '#ec4899' }}>
                <FaInstagram size={14} /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} {siteSettings.name}. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

