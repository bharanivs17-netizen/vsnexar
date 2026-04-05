import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="particles">
      {/* Background glow orbs */}
      <motion.div 
        className="glow-orb"
        animate={{ 
          x: ['0%', '20%', '0%'], 
          y: ['0%', '10%', '0%'],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ width: '40vw', height: '40vw', background: '#3b82f6', top: '-10%', left: '-10%' }}
      />
      <motion.div 
        className="glow-orb"
        animate={{ 
          x: ['0%', '-20%', '0%'], 
          y: ['0%', '-10%', '0%'],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ width: '50vw', height: '50vw', background: '#7c3aed', bottom: '-20%', right: '-10%', opacity: 0.3 }}
      />

      {/* Orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '80%',
          paddingBottom: '80%',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)',
          borderTop: '2px solid rgba(124, 58, 237, 0.5)',
          borderBottom: '2px solid rgba(6, 182, 212, 0.5)',
          zIndex: 0
        }}
      />
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '0%',
          width: '100%',
          paddingBottom: '100%',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.02)',
          borderLeft: '2px solid rgba(124, 58, 237, 0.3)',
          borderRight: '2px solid rgba(59, 130, 246, 0.3)',
          zIndex: 0
        }}
      />

      {/* Floating stars */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [`${p.y}vh`, `${p.y - 20}vh`] 
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 10px white'
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
