import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  const contactMethods = [
    {
      icon: <FaTelegram className="text-2xl" />,
      title: 'Telegram',
      value: '@bruno_9000',
      link: 'https://t.me/bruno_9000'
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: 'WhatsApp',
      value: '+54 9 11 3482-1203',
      link: 'https://wa.me/5491134821203'
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email',
      value: 'bruno.trezza@gmail.com',
      link: 'mailto:bruno.trezza@gmail.com'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: t('contact.location.title'),
      value: t('contact.location.value'),
      link: 'https://goo.gl/maps/1Z9Z2Z9Z2Z2Z2Z2Z2'
    }
  ];

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t('sections.contact.title')}</h2>
        <p className="section-subtitle text-gray-400 mb-8">{t('sections.contact.subtitle')}</p>
        
        <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto pb-4">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:border-primary/50 transition-all duration-300 flex items-center gap-4 group min-w-[250px] flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-primary group-hover:text-primary-light transition-colors">
                {method.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-gray-200 truncate">{method.title}</h3>
                <p className="text-gray-400 truncate">{method.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;


