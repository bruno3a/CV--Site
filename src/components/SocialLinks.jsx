import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const SocialLinks = () => {
  const [isShining, setIsShining] = useState(false);

  const links = [
    {
      name: 'GitHub',
      url: 'https://github.com/bruno3a',
      icon: <FaGithub className="text-5xl" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/btrezza/',
      icon: <FaLinkedin className="text-5xl" />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/bruno_9000',
      icon: <FaTelegram className="text-5xl" />
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/5491134821203',
      icon: <FaWhatsapp className="text-5xl" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShining(true);
      setTimeout(() => setIsShining(false), 1500); // Duración total del efecto
    }, 5000); // Intervalo entre cada barrido

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div className="flex flex-col gap-8">
        {links.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className={`social-icon-link relative text-primary hover:text-primary-light transition-all duration-300
              ${isShining ? 'shine-active' : ''}`}
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
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;






