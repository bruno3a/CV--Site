import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import WorldMap from './components/WorldMap';
import Education from './components/Education';
import ChatBot from './components/ChatBot';
import SocialLinks from './components/SocialLinks';

const App = () => {
  return (
    <LanguageProvider>
      <div className="bg-background min-h-screen text-white">
        <LanguageSelector />
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
        </main>
        
        <ChatBot />
        <SocialLinks />
      </div>
    </LanguageProvider>
  );
};

export default App;

