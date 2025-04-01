import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="text-gray-300 hover:text-primary transition-colors duration-300"
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
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-dark/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-primary">Curriculum Vitae - Bruno Trezza</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#about">{t('nav.about')}</NavLink>
            <NavLink href="#experience">{t('nav.experience')}</NavLink>
            <NavLink href="#projects">{t('nav.projects')}</NavLink>
            <NavLink href="#education">{t('nav.education')}</NavLink>
            <NavLink href="#skills">{t('nav.skills')}</NavLink>
            <NavLink href="#contact">{t('nav.contact')}</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="py-4 space-y-4">
            <NavLink href="#about">{t('nav.about')}</NavLink>
            <NavLink href="#experience">{t('nav.experience')}</NavLink>
            <NavLink href="#projects">{t('nav.projects')}</NavLink>
            <NavLink href="#education">{t('nav.education')}</NavLink>
            <NavLink href="#skills">{t('nav.skills')}</NavLink>
            <NavLink href="#contact">{t('nav.contact')}</NavLink>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;


