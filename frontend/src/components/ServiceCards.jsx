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

const TEAM_MEMBERS = {
  'web-design': [
    { name: 'Alice Smith', role: 'Frontend Dev', rating: 4.9 },
    { name: 'John Doe', role: 'Fullstack Dev', rating: 4.8 }
  ],
  'logo-design': [
    { name: 'Emma Wilson', role: 'Lead Designer', rating: 5.0 }
  ],
  'video-editing': [
    { name: 'Chris Evans', role: 'Video Editor', rating: 4.7 }
  ],
  'photo-editing': [
    { name: 'Sophia Lee', role: 'Retoucher', rating: 4.9 }
  ],
  'ui-ux-design': [
    { name: 'Mia Chen', role: 'UI Designer', rating: 4.8 },
    { name: 'Leo Park', role: 'UX Researcher', rating: 4.9 }
  ],
  'content-creation': [
    { name: 'Nina Patel', role: 'Content Strategist', rating: 4.9 },
    { name: 'Omar Ali', role: 'Video Producer', rating: 4.7 }
  ]
};

const CLIENT_LOGOS = [
  '🏢 TechCorp', '🏢 InnovateLabs', '🏢 GlobalTech', '🏢 StartupHub', '🏢 EnterpriseInc'
];

const DEFAULT_SERVICES = [
  { id: 'web-design', title: 'Web Design', projects: 150, clients: 85, workers: 12 },
  { id: 'logo-design', title: 'Logo Design', projects: 200, clients: 120, workers: 8 },
  { id: 'video-editing', title: 'Video Editing', projects: 95, clients: 60, workers: 6 },
  { id: 'photo-editing', title: 'Photo Editing', projects: 180, clients: 95, workers: 10 },
  { id: 'ui-ux-design', title: 'UI/UX Design', projects: 130, clients: 75, workers: 9 },
  { id: 'content-creation', title: 'Content Creation', projects: 110, clients: 70, workers: 7 }
];

const ServiceCards = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

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
    navigate(`/service/${service.id}`);
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
            rotateY: 5,
            rotateX: 5,
            z: 30
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleServiceClick(service)}
          className="glass-card"
          style={{
            flex: '1 1 300px',
            maxWidth: '350px',
            minWidth: '280px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            padding: '30px',
            textAlign: 'center',
            transformStyle: 'preserve-3d',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))`,
            zIndex: 1
          }} />
          
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Service Icon */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
            >
              {ICON_MAP[service.id] || <FaQuestionCircle size={50} color="#94a3b8" />}
            </motion.div>
            
            {/* Service Title */}
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              marginBottom: '15px',
              background: 'linear-gradient(90deg, #3b82f6, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              {service.title}
            </h3>
            
            {/* Stats */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {service.projects}+
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Projects</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                  {service.clients}+
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Clients</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ec4899' }}>
                  {TEAM_MEMBERS[service.id]?.length || 0}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Experts</div>
              </div>
            </div>
            
            {/* Team Preview */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.9rem', color: '#a78bfa', marginBottom: '10px', fontWeight: '500' }}>
                Meet Our Team
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TEAM_MEMBERS[service.id]?.slice(0, 2).map((member, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #3b82f6, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}>
                      {member.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: 'white' }}>{member.name}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{member.role}</div>
                    </div>
                    <div style={{ color: '#eab308', fontSize: '0.7rem' }}>
                      ⭐ {member.rating}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Client Logos */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>
                Trusted by
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {CLIENT_LOGOS.slice(0, 3).map((client, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    style={{
                      padding: '4px 8px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      color: '#a78bfa',
                      fontWeight: '500'
                    }}
                  >
                    {client}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '8px',
                color: '#3b82f6',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              View Details →
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServiceCards;

