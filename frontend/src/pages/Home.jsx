import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import CEOSpotlight from '../components/CEOSpotlight';
import Footer from '../components/Footer';
import CEOStickyButton from '../components/CEOStickyButton';
import { FaLaptopCode, FaVideo, FaCameraRetro, FaPaintBrush, FaPenNib, FaMagic } from 'react-icons/fa';

const ICON_MAP = {
  'web-design': <FaLaptopCode size={40} color="#3b82f6" />,
  'logo-design': <FaPaintBrush size={40} color="#ec4899" />,
  'video-editing': <FaVideo size={40} color="#10b981" />,
  'photo-editing': <FaCameraRetro size={40} color="#eab308" />,
  'ui-ux-design': <FaMagic size={40} color="#8b5cf6" />,
  'content-creation': <FaPenNib size={40} color="#f97316" />
};

const SERVICES = [
  { id: 'web-design', title: 'Web Design' },
  { id: 'logo-design', title: 'Logo Design' },
  { id: 'photo-editing', title: 'Photo Editing' },
  { id: 'video-editing', title: 'Video Editing' },
  { id: 'ui-ux-design', title: 'UI/UX Design' },
  { id: 'content-creation', title: 'Content Creation' }
];

const Home = () => {
  const [showAutoModal, setShowAutoModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutoModal(true);
    }, 120000); // 2 minutes
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = () => {
    setShowAutoModal(false);
    // Scroll to ServiceCards
    const serviceSection = document.querySelector('.service-cards');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <HeroSection />
      <div className="service-cards">
        <ServiceCards />
      </div>
      <CEOSpotlight />
      <Footer />
      <CEOStickyButton />

      {/* Auto Modal */}
      {showAutoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowAutoModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '90%',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'white' }}>Our Services</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
              {SERVICES.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    minWidth: '80px'
                  }}
                >
                  {ICON_MAP[service.id]}
                  <p style={{ fontSize: '0.8rem', marginTop: '5px', color: 'white' }}>{service.title}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewDetails}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)'
              }}
            >
              View Our Achievements
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
