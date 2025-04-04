import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import SecureContent from './SecureContent';

const SocialLinks = () => {
  const [isShining, setIsShining] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Solo aplicar en dispositivos móviles
      if (window.innerWidth <= 768) {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      } else {
        // En desktop siempre visible
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificar el tamaño de la pantalla al montar
    if (window.innerWidth > 768) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShining(true);
      setTimeout(() => setIsShining(false), 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const links = [
    {
      name: 'GitHub',
      url: btoa('https://github.com/bruno3a'),
      icon: <FaGithub className="text-5xl" />,
      type: 'url'
    },
    {
      name: 'LinkedIn',
      url: btoa('https://www.linkedin.com/in/btrezza/'),
      icon: <FaLinkedin className="text-5xl" />,
      type: 'url'
    },
    {
      name: 'Telegram',
      url: btoa('https://t.me/bruno_9000'),
      icon: <FaTelegram className="text-5xl" />,
      type: 'url'
    },
    {
      name: 'WhatsApp',
      url: btoa('https://wa.me/5491134821203'),
      icon: <FaWhatsapp className="text-5xl" />,
      type: 'url'
    }
  ];

  return (
    <motion.div 
      className="fixed left-4 bottom-4 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-8">
        {links.map((link, index) => (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.1 }}
            className={`social-icon-link relative text-primary hover:text-primary-light transition-all duration-300
              ${isShining ? 'shine-active' : ''}`}
          >
            <SecureContent 
              content={link.url} 
              type={link.type}
              name={link.name}
            >
              <div className="relative overflow-hidden">
                {link.icon}
                <div 
                  className={`absolute inset-0 bg-gradient-to-b from-white/20 via-white/20 to-transparent shine-effect-vertical`}
                  style={{
                    animationDelay: isShining ? `${index * 150}ms` : '0ms'
                  }}
                />
              </div>
            </SecureContent>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinks;







