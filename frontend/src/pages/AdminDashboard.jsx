import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import ServiceManager from '../components/admin/ServiceManager';
import WorkerManager from '../components/admin/WorkerManager';
import SiteContentManager from '../components/admin/SiteContentManager';
import { FaSignOutAlt, FaDatabase, FaUsers, FaGlobe } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Verify this user is an admin in the users table
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('email', user.email)
        .single();

      if (!userData || userData.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }

      setUser(user);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return <div style={{ padding: '150px', textAlign: 'center', color: 'white' }}>Verifying Authentication...</div>;

  return (
    <div style={{ paddingTop: '100px', padding: '120px 20px 50px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      {/* 3D Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1))',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          transform: 'perspective(1000px) rotateX(2deg)',
          marginBottom: '30px'
        }}
      >
        
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
          <button 
            onClick={() => setActiveTab('site')}
            className={`glass ${activeTab === 'site' ? 'text-gradient' : ''}`}
            style={{ 
              padding: '12px 25px', 
              borderRadius: '12px', 
              border: activeTab === 'site' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', gap: '10px',
              cursor: 'pointer'
            }}
          >
            <FaGlobe /> Site Settings
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'services' && <ServiceManager />}
          {activeTab === 'workers' && <WorkerManager />}
          {activeTab === 'site' && <SiteContentManager />}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AdminDashboard;

