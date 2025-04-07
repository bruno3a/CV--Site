import React, { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import WorldMap from './components/WorldMap';
import Education from './components/Education';
import SocialLinks from './components/SocialLinks';
import ChatBot from './components/ChatBot';

const App = () => {
  useEffect(() => {
    console.log('App mounted');
    console.log('PUBLIC_URL:', process.env.PUBLIC_URL);
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-background min-h-screen text-white">
        <Navbar />
        <main className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <Hero />
          <About />
          <Experience />
          <Projects />
          <WorldMap />
          <Education />
          <Skills />
          <Contact />
          
          <div className="h-32 md:h-24" />
        </main>
        
        <SocialLinks />
        <ChatBot />
      </div>
    </LanguageProvider>
  );
};

export default App;

