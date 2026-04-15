import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaStar, FaUserCircle, FaArrowLeft, FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const mockData = {
  'web-design': {
    title: 'Web Design',
    description: 'Creating stunning, responsive, and dynamic web applications.',
    projects: 145,
    clients: 120,
    workers: [
      { id: 1, name: 'Alice Smith', role: 'Frontend Dev', rating: 4.9 },
      { id: 2, name: 'John Doe', role: 'Fullstack Dev', rating: 4.8 }
    ]
  },
  'logo-design': {
    title: 'Logo Design',
    description: 'Crafting unique and memorable brand identities.',
    projects: 320,
    clients: 290,
    workers: [
      { id: 3, name: 'Emma Wilson', role: 'Lead Designer', rating: 5.0 }
    ]
  },
  'video-editing': {
    title: 'Video Editing',
    description: 'Professional video editing for social media, YouTube, and corporate.',
    projects: 85,
    clients: 60,
    workers: [
      { id: 4, name: 'Chris Evans', role: 'Video Editor', rating: 4.7 }
    ]
  },
  'photo-editing': {
    title: 'Photo Editing',
    description: 'High-end photo retouching and manipulation.',
    projects: 400,
    clients: 350,
    workers: [
      { id: 5, name: 'Sophia Lee', role: 'Retoucher', rating: 4.9 }
    ]
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    description: 'Designing intuitive, accessible, and beautiful digital experiences.',
    projects: 180,
    clients: 160,
    workers: [
      { id: 6, name: 'Mia Chen', role: 'UI Designer', rating: 4.8 },
      { id: 7, name: 'Leo Park', role: 'UX Researcher', rating: 4.9 }
    ]
  },
  'content-creation': {
    title: 'Content Creation',
    description: 'Crafting attention-grabbing digital content for brands and campaigns.',
    projects: 250,
    clients: 220,
    workers: [
      { id: 8, name: 'Nina Patel', role: 'Content Strategist', rating: 4.9 },
      { id: 9, name: 'Omar Ali', role: 'Video Producer', rating: 4.7 }
    ]
  }
};

/* Circular Progress Chart Component */
const CircleChart = ({ value, maxValue, label, color, delay = 0 }) => {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / maxValue) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 700, color }}>
            <CountUp end={value} duration={2.5} delay={delay + 0.3} />
          </span>
        </div>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>{label}</p>
    </motion.div>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackService = mockData[id] || mockData['web-design'];

  useEffect(() => {
    const fetchData = async () => {
      // 1. Check if Supabase client exists
      if (!supabase) {
        console.warn("Supabase client is null. Site will use mock data.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 2. Fetch service basic data
        const { data: serviceData, error: sError } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();

        if (sError) throw sError;
        if (serviceData) setService(serviceData);

        // 3. Fetch workers for this service
        const { data: workerData, error: wError } = await supabase
          .from('workers')
          .select('*')
          .eq('service_id', id);

        if (wError) throw wError;
        if (workerData && workerData.length > 0) setWorkers(workerData);
      } catch (err) {
        console.error("Supabase data fetch error:", err.message);
        // Fallback already handled by 'ds' initialization
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const ds = service || fallbackService;
  const displayWorkers = workers.length > 0 ? workers : (fallbackService?.workers || []);
  const totalWorkers = displayWorkers.length;

  // Final safety check for a successful render
  if (!ds) {
    return (
      <div style={{ padding: '150px', textAlign: 'center', color: 'white' }}>
        <h2>Service Not Found</h2>
        <Link to="/" style={{ color: '#06b6d4' }}>Return Home</Link>
      </div>
    );
  }

  // Simplified render logic
  return (
    <div className="service-detail-page" style={{ paddingTop: '100px', color: 'white' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <Link to="/" style={{ color: '#06b6d4', textDecoration: 'none', marginBottom: '30px', display: 'block' }}>
          <FaArrowLeft /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass" style={{ padding: '40px', borderRadius: '30px' }}>
            <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '20px' }}>{ds.title} Solutions</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px' }}>{ds.description}</p>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '50px' }}>
              <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                <h3 style={{ color: '#7c3aed', fontSize: '2.5rem', marginBottom: '0' }}>{ds.projects}+</h3>
                <p style={{ color: '#94a3b8' }}>Projects Completed</p>
              </div>
              <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                <h3 style={{ color: '#06b6d4', fontSize: '2.5rem', marginBottom: '0' }}>{ds.clients}+</h3>
                <p style={{ color: '#94a3b8' }}>Satisfied Clients</p>
              </div>
              <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
                <h3 style={{ color: '#ec4899', fontSize: '2.5rem', marginBottom: '0' }}>{totalWorkers}</h3>
                <p style={{ color: '#94a3b8' }}>Team Members</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Technical Experts</h3>
            <div className="workers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {displayWorkers.map((worker) => (
                <div key={worker.id} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <FaUserCircle size={40} color="#a78bfa" />
                  <div>
                    <h4 style={{ margin: 0 }}>{worker.name}</h4>
                    <p style={{ color: '#94a3b8', margin: '5px 0' }}>{worker.role}</p>
                    <div style={{ color: '#eab308' }}><FaStar /> {worker.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
