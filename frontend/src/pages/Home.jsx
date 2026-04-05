import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import CEOSpotlight from '../components/CEOSpotlight';
import Footer from '../components/Footer';
import CEOStickyButton from '../components/CEOStickyButton';

const TOTAL_STATS = {
  projects: 1200,
  clients: 950,
  workers: 85
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative' }}
    >
      {/* Parallax Background */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          y: backgroundY,
          zIndex: -1
        }}
      />

      <HeroSection />

      {/* Services Section with Enhanced Animation */}
      <motion.div
        className="service-cards"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          padding: '100px 20px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,20,0.3) 50%, transparent 100%)',
          position: 'relative'
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #06b6d4, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Discover our comprehensive range of digital solutions designed to elevate your business
          </motion.p>
        </motion.div>

        <ServiceCards />
      </motion.div>

      {/* Enhanced Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(20px, 5vw, 60px)',
          flexWrap: 'wrap',
          padding: 'clamp(60px, 10vw, 100px) 20px',
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Floating particles background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: `hsl(${i * 18}, 70%, 60%)`,
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {Object.entries(TOTAL_STATS).map(([key, value], index) => (
          <motion.div
            key={key}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              z: 20
            }}
            style={{
              textAlign: 'center',
              flex: '1 1 250px',
              maxWidth: '300px',
              padding: '30px',
              background: 'rgba(20, 20, 45, 0.6)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${
                  key === 'projects' ? 'rgba(59, 130, 246, 0.1)' :
                  key === 'clients' ? 'rgba(16, 185, 129, 0.1)' :
                  'rgba(236, 72, 153, 0.1)'
                }, transparent)`,
                opacity: 0
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.5
              }}
              style={{
                width: 'clamp(80px, 15vw, 120px)',
                height: 'clamp(80px, 15vw, 120px)',
                borderRadius: '50%',
                background: `linear-gradient(45deg, ${
                  key === 'projects' ? '#3b82f6, #1d4ed8' :
                  key === 'clients' ? '#10b981, #059669' :
                  '#ec4899, #db2777'
                })`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'white',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 'bold',
                transformStyle: 'preserve-3d',
                boxShadow: `0 15px 35px rgba(${
                  key === 'projects' ? '59, 130, 246' :
                  key === 'clients' ? '16, 185, 129' :
                  '236, 72, 153'
                }, 0.4)`,
                position: 'relative',
                zIndex: 2
              }}
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                {value}+
              </motion.span>
            </motion.div>

            <motion.h3
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                marginBottom: '10px',
                fontWeight: 600,
                color: 'white'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {key === 'projects' ? 'Total Projects' :
               key === 'clients' ? 'Happy Clients' :
               'Expert Workers'}
            </motion.h3>

            <motion.p
              style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                lineHeight: 1.4
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              {key === 'projects' ? 'Successfully delivered worldwide' :
               key === 'clients' ? 'Satisfied businesses we serve' :
               'Skilled professionals in our team'}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <CEOSpotlight />

      {/* Enhanced Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(60px, 10vw, 100px) 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(7,7,20,0.9), rgba(20,20,45,0.8))',
          margin: '40px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated background elements */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: '#a78bfa',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #06b6d4, #a78bfa, #ec4899)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 800,
            position: 'relative',
            zIndex: 2
          }}
        >
          Ready to Bring Your Vision to Life?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#94a3b8',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 2
          }}
        >
          Let's collaborate and create something amazing together. Contact us today to discuss your project and turn your ideas into reality.
        </motion.p>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 80 }}
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 2
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '18px 36px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Get Started</span>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
              animate={{ left: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
            />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(167, 139, 250, 0.1)',
              borderColor: '#a78bfa',
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '18px 36px',
              background: 'transparent',
              border: '2px solid #a78bfa',
              borderRadius: '12px',
              color: '#a78bfa',
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => {
              const serviceSection = document.querySelector('.service-cards');
              if (serviceSection) {
                serviceSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>View Services</span>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, rgba(167, 139, 250, 0.1), rgba(167, 139, 250, 0.2))',
                opacity: 0
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      <Footer />
      <CEOStickyButton />
    </motion.div>
  );
};

export default Home;
