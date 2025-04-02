import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="text-gray-300 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
    aria-label={children}
    tabIndex={0}
  >
    {children}
  </a>
);

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      role="banner"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-dark/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav role="navigation" aria-label="Main navigation" className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-primary" aria-label="Home">
            CV - Bruno Trezza
          </a>
          
          {/* Desktop Menu - Added mr-20 to create space on the right */}
          <div className="hidden md:flex space-x-8 mr-20">
            <NavLink href="#about">{t('nav.about')}</NavLink>
            <NavLink href="#experience">{t('nav.experience')}</NavLink>
            <NavLink href="#projects">{t('nav.projects')}</NavLink>
            <NavLink href="#education">{t('nav.education')}</NavLink>
            <NavLink href="#skills">{t('nav.skills')}</NavLink>
            <NavLink href="#contact">{t('nav.contact')}</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-4 py-4 px-4 bg-background-dark/95 backdrop-blur-sm mt-4 rounded-lg">
            <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</NavLink>
            <NavLink href="#experience" onClick={() => setIsMenuOpen(false)}>{t('nav.experience')}</NavLink>
            <NavLink href="#projects" onClick={() => setIsMenuOpen(false)}>{t('nav.projects')}</NavLink>
            <NavLink href="#education" onClick={() => setIsMenuOpen(false)}>{t('nav.education')}</NavLink>
            <NavLink href="#skills" onClick={() => setIsMenuOpen(false)}>{t('nav.skills')}</NavLink>
            <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</NavLink>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Navbar;


