import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaTelegram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 text-center">
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
              t('hero.roles.business_analyst'),
              2000,
              t('hero.roles.product_owner'),
              2000,
              t('hero.roles.ai_enthusiast'),
              2000,
              t('hero.roles.data_follower'),
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => window.openChat()}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full flex items-center justify-center mx-auto gap-2 transition-colors"
        >
          <FaTelegram className="text-xl" />
          {t('about.cta')}
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;


