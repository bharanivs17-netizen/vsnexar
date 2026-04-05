import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import CEOSpotlight from '../components/CEOSpotlight';
import Footer from '../components/Footer';
import CEOStickyButton from '../components/CEOStickyButton';

const Home = () => {
  return (
    <div style={{ position: 'relative' }}>
      <HeroSection />
      <ServiceCards />
      <CEOSpotlight />
      <Footer />
      <CEOStickyButton />
    </div>
  );
};

export default Home;
