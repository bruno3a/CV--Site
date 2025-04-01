import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import WorldMap from './components/WorldMap';
import Skills from './components/Skills';
import Education from './components/Education';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import LanguageSelector from './components/LanguageSelector';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-background-dark via-background to-background-light"
        >
          <motion.div
            className="fixed top-0 left-0 h-1 bg-primary z-50"
            style={{ width: `${scrollProgress}%` }}
          />
          
          <LanguageSelector />
          <Navbar />
          
          <main className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            
            <Hero />
            <About />
            <Experience />
            <Projects />
            <WorldMap />
            <Contact />
            <Skills />
            <Education />
          </main>

          <SocialLinks />
          <Footer />
          <ChatBot />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;




