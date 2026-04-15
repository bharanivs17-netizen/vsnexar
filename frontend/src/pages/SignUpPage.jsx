import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!supabase) throw new Error("Supabase is not configured. Check your environment variables.");

      // 1. Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      if (signUpError) throw signUpError;

      // 2. Also save user info to our custom users table for easy admin access
      try {
        await supabase.from('users').insert({
          email: email,
          full_name: name,
          role: 'user'
        });
      } catch (dbErr) {
        console.warn("Could not save to users table (table may not exist yet):", dbErr);
      }

      // 3. Auto sign-in after signup
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // If auto sign-in fails (e.g. email confirmation required), redirect to login
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      // 4. If sign-in succeeds, go directly to admin
      if (signInData.session) {
        setSuccess(true);
        setTimeout(() => navigate('/admin'), 1500);
      }
    } catch (err) {
      setError(err.message);
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
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2))',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
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
            <FaUserPlus size={24} color="white" />
          </div>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '10px' }}>Create Account</h2>
          <p style={{ color: '#94a3b8' }}>Join VSNEXAR today (Optional)</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', fontSize: '0.9rem' }}>
            Account created successfully! Redirecting to dashboard...
          </motion.div>
        )}

        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <FaUser style={{ position: 'absolute', top: '16px', left: '16px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', top: '16px', left: '16px', color: '#94a3b8' }} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', top: '16px', left: '16px', color: '#94a3b8' }} />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '15px', background: 'linear-gradient(90deg, #3b82f6, #ec4899)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '10px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </motion.button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
