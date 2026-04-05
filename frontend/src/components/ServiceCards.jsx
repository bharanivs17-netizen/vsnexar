import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLaptopCode, FaVideo, FaCameraRetro, FaPaintBrush, FaQuestionCircle, FaPenNib, FaMagic } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const ICON_MAP = {
  'web-design': <FaLaptopCode size={40} color="#3b82f6" />,
  'logo-design': <FaPaintBrush size={40} color="#ec4899" />,
  'video-editing': <FaVideo size={40} color="#10b981" />,
  'photo-editing': <FaCameraRetro size={40} color="#eab308" />,
  'ui-ux-design': <FaMagic size={40} color="#8b5cf6" />,
  'content-creation': <FaPenNib size={40} color="#f97316" />
};

const DEFAULT_SERVICES = [
  { id: 'web-design', title: 'Web Design', projects: 150, clients: 120, workers: 15 },
  { id: 'logo-design', title: 'Logo Design', projects: 200, clients: 180, workers: 10 },
  { id: 'photo-editing', title: 'Photo Editing', projects: 300, clients: 250, workers: 20 },
  { id: 'video-editing', title: 'Video Editing', projects: 100, clients: 90, workers: 12 },
  { id: 'ui-ux-design', title: 'UI/UX Design', projects: 180, clients: 160, workers: 18 },
  { id: 'content-creation', title: 'Content Creation', projects: 250, clients: 220, workers: 14 }
];

const ServiceCards = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('id, title, projects, clients, workers');
      if (!error && data && data.length > 0) {
        setServices(data);
      } else {
        setServices(DEFAULT_SERVICES);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '50px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            rotateY: 10,
            rotateX: 10,
            z: 50
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleServiceClick(service)}
          className="glass-card"
          style={{
            flex: '1 1 200px',
            maxWidth: '250px',
            minWidth: '180px',
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px',
            textAlign: 'center',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s ease'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            {ICON_MAP[service.id] || <FaQuestionCircle size={40} color="#94a3b8" />}
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
            {service.title.split(' ')[0]} <br/> {service.title.split(' ')[1] || ''}
          </h3>
        </motion.div>
      ))}

      {/* Modal for service details */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '30px' }}>
              {ICON_MAP[selectedService.id] || <FaQuestionCircle size={60} color="#94a3b8" />}
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{selectedService.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{ textAlign: 'center', flex: '1 1 120px' }}
              >
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)',
                    transform: 'rotateX(15deg)'
                  }}
                >
                  {selectedService.projects}
                </motion.div>
                <p>Projects Done</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                style={{ textAlign: 'center', flex: '1 1 120px' }}
              >
                <motion.div
                  animate={{ rotateY: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5)',
                    transform: 'rotateX(15deg)'
                  }}
                >
                  {selectedService.clients}
                </motion.div>
                <p>Clients Served</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                style={{ textAlign: 'center', flex: '1 1 120px' }}
              >
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #ec4899, #db2777)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)',
                    transform: 'rotateX(15deg)'
                  }}
                >
                  {selectedService.workers}
                </motion.div>
                <p>Expert Workers</p>
              </motion.div>
            </div>
            <button
              onClick={closeModal}
              style={{
                marginTop: '30px',
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceCards;

