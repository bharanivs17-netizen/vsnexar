import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Particles = () => {
  const ref = useRef();
  
  // Create particles
  const particlesPosition = new Float32Array(1500 * 3);
  const colors = new Float32Array(1500 * 3);
  
  // Logo colors: blue, cyan, purple, pink
  const logoColors = [
    new THREE.Color('#3b82f6'), // blue
    new THREE.Color('#06b6d4'), // cyan
    new THREE.Color('#7c3aed'), // purple
    new THREE.Color('#ec4899'), // pink
  ];
  
  for (let i = 0; i < 1500; i++) {
    // Random positions in sphere
    const radius = Math.random() * 60 + 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    particlesPosition[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlesPosition[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlesPosition[i * 3 + 2] = radius * Math.cos(phi);
    
    // Random logo color
    const color = logoColors[Math.floor(Math.random() * logoColors.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.0005;
      ref.current.rotation.y += 0.001;
      ref.current.rotation.z += 0.0002;
    }
  });
  
  return (
    <>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
        />
      </Points>
      
      {/* Central glowing sphere */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.1}
        />
      </Sphere>
    </>
  );
};

const SplashScreen = ({ onComplete }) => {
  const publicUrl = import.meta.env.BASE_URL || '/';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #070714, #0f0f23, #1a1a2e)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* 3D Background */}
      <Canvas
        camera={{ position: [0, 0, 40], fov: 75 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <Particles />
      </Canvas>
      
      {/* Content Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* CEO Image with Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            type: 'spring', 
            stiffness: 100,
            delay: 0.5 
          }}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid rgba(124, 58, 237, 0.6)',
            boxShadow: '0 0 50px rgba(124, 58, 237, 0.4)',
            marginBottom: '30px',
            position: 'relative'
          }}
        >
          <img 
            src={`${publicUrl}ceo-image.png`} 
            alt="CEO - Bharani"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(124,58,237,0.2);font-size:3rem">👤</div>';
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'top'
            }}
          />
          {/* Animated ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              right: '-4px',
              bottom: '-4px',
              border: '2px solid transparent',
              borderTop: '2px solid #06b6d4',
              borderRadius: '50%',
              zIndex: 1
            }}
          />
        </motion.div>
        
        {/* Logo */}
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #7c3aed, #ec4899)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
          }}
        >
          VSNEXAR
        </motion.h1>
        
        {/* Tagline */}
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            color: '#94a3b8',
            marginBottom: '40px',
            letterSpacing: '2px'
          }}
        >
          India's No. 1 Software Solution Company
        </motion.p>
        
        {/* Loading indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #3b82f6, #ec4899)'
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '50px',
          height: '50px',
          background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
          borderRadius: '50%',
          opacity: 0.3,
          zIndex: 1
        }}
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 1
        }}
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '15%',
          width: '30px',
          height: '30px',
          background: 'linear-gradient(45deg, #ec4899, #7c3aed)',
          borderRadius: '50%',
          opacity: 0.4,
          zIndex: 1
        }}
      />
    </div>
  );
};

export default SplashScreen;