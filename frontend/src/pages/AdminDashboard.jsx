import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import ServiceManager from '../components/admin/ServiceManager';
import WorkerManager from '../components/admin/WorkerManager';
import { FaSignOutAlt, FaDatabase, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return <div style={{ padding: '150px', textAlign: 'center', color: 'white' }}>Verifying Authentication...</div>;

  return (
    <div style={{ paddingTop: '100px', padding: '120px 20px 50px', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '5px', color: '#ec4899' }}>Admin Dashboard</h1>
            <p style={{ color: '#94a3b8' }}>Logged in as: <span style={{ color: 'white' }}>{user.email}</span></p>
          </div>
          <button onClick={handleLogout} className="search-button" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button 
            onClick={() => setActiveTab('services')}
            className={`glass ${activeTab === 'services' ? 'text-gradient' : ''}`}
            style={{ 
              padding: '12px 25px', 
              borderRadius: '12px', 
              border: activeTab === 'services' ? '1px solid #ec4899' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', gap: '10px',
              cursor: 'pointer'
            }}
          >
            <FaDatabase /> Services
          </button>
          <button 
            onClick={() => setActiveTab('workers')}
            className={`glass ${activeTab === 'workers' ? 'text-gradient' : ''}`}
            style={{ 
              padding: '12px 25px', 
              borderRadius: '12px', 
              border: activeTab === 'workers' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', gap: '10px',
              cursor: 'pointer'
            }}
          >
            <FaUsers /> Team Members
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'services' ? <ServiceManager /> : <WorkerManager />}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AdminDashboard;

