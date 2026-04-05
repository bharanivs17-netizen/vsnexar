import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

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
        navigate('/admin');
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '0 20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass"
        style={{ padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px' }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }} className="text-gradient">
          Welcome Back
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '30px' }}>Sign in to VSNEXAR dashboard.</p>

        {errorMsg && (
          <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            {errorMsg}
          </div>
        )}

        {!supabaseConfigured && (
          <div style={{ color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            Supabase is not configured. Add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> to your environment.
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#a78bfa' }}>Email Address</label>
            <input 
              type="email" 
              required
              disabled={loading}
              className="search-input"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#a78bfa' }}>Password</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="search-input"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="search-button" style={{ marginTop: '10px' }}>
            {loading ? 'Authenticating...' : 'Login securely'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;

