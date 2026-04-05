import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import CEOSpotlight from '../components/CEOSpotlight';
import Footer from '../components/Footer';
import CEOStickyButton from '../components/CEOStickyButton';

const TOTAL_STATS = {
  projects: 1200,
  clients: 950,
  workers: 85
};

const Home = () => {
  return (
    <div style={{ position: 'relative' }}>
      <HeroSection />
      
      <div className="service-cards">
        <ServiceCards />
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        {Object.entries(TOTAL_STATS).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
            style={{ textAlign: 'center', flex: '1 1 200px' }}
          >
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `linear-gradient(45deg, ${
                  key === 'projects' ? '#3b82f6, #1d4ed8' :
                  key === 'clients' ? '#10b981, #059669' :
                  '#ec4899, #db2777'
                })`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
                transformStyle: 'preserve-3d',
                boxShadow: `0 15px 35px rgba(${
                  key === 'projects' ? '59, 130, 246' :
                  key === 'clients' ? '16, 185, 129' :
                  '236, 72, 153'
                }, 0.4)`,
                transform: 'rotateX(15deg)'
              }}
            >
              {value}+
            </motion.div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
              {key === 'projects' ? 'Total Projects' :
               key === 'clients' ? 'Happy Clients' :
               'Expert Workers'}
            </h3>
          </motion.div>
        ))}
      </motion.div>
      
      <CEOSpotlight />
      
      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(7,7,20,0.9), rgba(20,20,45,0.8))',
          margin: '40px 0'
        }}
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #06b6d4, #a78bfa, #ec4899)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Ready to Bring Your Vision to Life?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}
        >
          Let's collaborate and create something amazing together. Contact us today to discuss your project.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '15px 30px',
              background: 'transparent',
              border: '2px solid #a78bfa',
              borderRadius: '10px',
              color: '#a78bfa',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => {
              const serviceSection = document.querySelector('.service-cards');
              if (serviceSection) {
                serviceSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            View Services
          </motion.button>
        </motion.div>
      </motion.div>
      
      <Footer />
      <CEOStickyButton />
    </div>
  );
};

export default Home;
