import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaTelegram, FaFileDownload, FaRobot } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [showPointer, setShowPointer] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const chatButtonRef = useRef(null);

  const calculatePointerPosition = (buttonElement) => {
    if (!buttonElement) return null;

    // Obtener la posición del botón de origen
    const buttonRect = buttonElement.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;

    // Posición fija del botón de chat (esquina inferior derecha)
    const endX = window.innerWidth - 48; // 24px del margen + 24px al centro del botón
    const endY = window.innerHeight - 48; // 24px del margen + 24px al centro del botón

    // Calcular el vector de movimiento
    const moveX = endX - startX;
    const moveY = endY - startY;

    return {
      startX,
      startY,
      moveX,
      moveY
    };
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatbotClick = () => {
    if (!chatButtonRef.current) return;

    const pos = calculatePointerPosition(chatButtonRef.current);
    if (!pos) return;

    setPointerPosition(pos);
    
    // Actualizar las variables CSS personalizadas
    document.documentElement.style.setProperty('--pointer-start-x', `${pos.startX}px`);
    document.documentElement.style.setProperty('--pointer-start-y', `${pos.startY}px`);
    document.documentElement.style.setProperty('--pointer-move-x', `${pos.moveX}px`);
    document.documentElement.style.setProperty('--pointer-move-y', `${pos.moveY}px`);

    setShowPointer(true);
    setShowSpotlight(true);
    
    setTimeout(() => {
      setShowPointer(false);
      setShowSpotlight(false);
    }, 2000);

    // Abrir el chat después de un pequeño delay para que se vea la animación
    setTimeout(() => {
      if (window.botpressWebChat) {
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
    }, 1000);
  };

  return (
    <>
      <section className="min-h-screen flex items-center relative">
        <div className="section-container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8"
          >
            <TypeAnimation
              sequence={[
                'Business Analyst',
                2000,
                'Product Owner',
                2000,
                'AI Enthusiast',
                2000,
                'Data Follower',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
            <div className="flex gap-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleContactClick}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <FaTelegram className="text-xl" />
                {t('hero.lets_talk')}
              </motion.button>

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                href={`${process.env.PUBLIC_URL}/files/cv.pdf`}
                download
                className="bg-background-light hover:bg-background-dark text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors border border-primary"
              >
                <FaFileDownload className="text-xl" />
                {t('hero.download_cv')}
              </motion.a>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-gray-400 flex items-center gap-2"
            >
              <span className="hidden sm:inline">|</span>
              <motion.button
                ref={chatButtonRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                onClick={handleChatbotClick}
                className="text-primary hover:text-primary-dark flex items-center gap-2 transition-colors"
              >
                <FaRobot className="text-xl" />
                <span>{t('chat.get_instant_help')}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Efectos visuales */}
      {showPointer && (
        <div
          className="chat-pointer"
          style={{
            position: 'fixed',
            left: `${pointerPosition.startX}px`,
            top: `${pointerPosition.startY}px`
          }}
        >
          <div className="chat-pointer-circle" />
        </div>
      )}
      
      {showSpotlight && (
        <div className="spotlight-effect" />
      )}
    </>
  );
};

export default Hero;


