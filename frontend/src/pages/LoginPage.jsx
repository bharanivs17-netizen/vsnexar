import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const supabaseConfigured = Boolean(supabase);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (!supabaseConfigured) throw new Error("Supabase is not configured. Check your environment variables.");
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.session) {
        // Check if user is admin
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('email', email)
          .single();

        if (userData && userData.role === 'admin') {
          navigate('/admin');
        } else {
          // Regular users go to home page
          navigate('/');
        }
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      paddingTop: '100px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '20%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.15), rgba(124, 58, 237, 0.15))',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #3b82f6, #ec4899)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)'
          }}>
            <FaSignInAlt size={24} color="white" />
          </div>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '10px' }}>Welcome Back</h2>
          <p style={{ color: '#94a3b8' }}>Sign in to VSNEXAR</p>
        </div>

        {errorMsg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '15px', borderRadius: '12px',
            marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center', fontSize: '0.9rem'
          }}>
            {errorMsg}
          </motion.div>
        )}

        {!supabaseConfigured && (
          <div style={{
            color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '15px', borderRadius: '12px',
            marginBottom: '20px', border: '1px solid rgba(251, 191, 36, 0.2)', textAlign: 'center', fontSize: '0.9rem'
          }}>
            Supabase is not configured. Add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> to your environment.
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', top: '16px', left: '16px', color: '#94a3b8' }} />
            <input type="email" placeholder="Email Address" required disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', top: '16px', left: '16px', color: '#94a3b8' }} />
            <input type="password" placeholder="Password" required disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
            style={{ width: '100%', padding: '15px', background: 'linear-gradient(90deg, #3b82f6, #ec4899)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '10px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </motion.button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
