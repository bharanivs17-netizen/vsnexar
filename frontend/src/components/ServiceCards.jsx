import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLaptopCode, FaVideo, FaCameraRetro, FaPaintBrush, FaQuestionCircle } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const ICON_MAP = {
  'web-design': <FaLaptopCode size={40} color="#3b82f6" />,
  'logo-design': <FaPaintBrush size={40} color="#ec4899" />,
  'video-editing': <FaVideo size={40} color="#10b981" />,
  'photo-editing': <FaCameraRetro size={40} color="#eab308" />
};

const DEFAULT_SERVICES = [
  { id: 'web-design', title: 'Web Design' },
  { id: 'logo-design', title: 'Logo Design' },
  { id: 'video-editing', title: 'Video Editing' },
  { id: 'photo-editing', title: 'Photo Editing' }
];

const ServiceCards = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('id, title');
      if (!error && data && data.length > 0) {
        setServices(data);
      } else {
        setServices(DEFAULT_SERVICES);
      }
    };
    fetchServices();
  }, []);

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
        gap: '30px',
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/service/${service.id}`)}
          className="glass-card"
          style={{
            width: '200px',
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px',
            textAlign: 'center'
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
    </motion.div>
  );
};

export default ServiceCards;

