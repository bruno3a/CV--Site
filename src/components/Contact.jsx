import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaTelegram, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SecureContent from './SecureContent';

const MapModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-background-light rounded-lg w-full max-w-3xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"
          aria-label="Close map"
        >
          <FaTimes className="text-xl" />
        </button>
        
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26208743.618555418!2d-116.28429518609374!3d-2.2162036000000167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2s!4v1709071433599!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location map"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const contactMethods = [
    {
      icon: <FaTelegram className="text-2xl" />,
      title: 'Telegram',
      value: btoa('@bruno_9000'),
      link: btoa('https://t.me/bruno_9000'),
      type: 'url',
      actionText: t('contact.actions.telegram')
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: 'WhatsApp',
      value: btoa('+54 9 11 3482-1203'),
      link: btoa('https://wa.me/5491134821203'),
      type: 'url',
      actionText: t('contact.actions.whatsapp')
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email',
      value: btoa('bruno.trezza@gmail.com'),
      link: btoa('bruno.trezza@gmail.com'),
      type: 'email',
      actionText: t('contact.actions.email')
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Buenos Aires, Argentina',
      value: t('contact.location.timezone'),
      isPublic: true,
      onClick: () => setIsMapOpen(true),
      actionText: t('contact.location.timezone')
    }
  ];

  return (
    <>
      <section id="contact" className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('sections.contact.title')}</h2>
          <p className="section-subtitle text-gray-400 mb-8">{t('sections.contact.subtitle')}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card hover:border-primary/50 transition-all duration-300 flex items-center gap-2 sm:gap-4 group ${method.onClick ? 'cursor-pointer' : ''}`}
                onClick={method.onClick}
              >
                <div className="text-primary group-hover:text-primary-light transition-colors">
                  {method.icon}
                </div>
                {method.isPublic ? (
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-200 truncate text-sm sm:text-base">{method.title}</h3>
                    <p className="text-gray-400 truncate text-xs sm:text-sm">{method.actionText}</p>
                  </div>
                ) : (
                  <SecureContent
                    content={method.value}
                    link={method.link}
                    type={method.type}
                    name={method.title}
                    showOnHover={true}
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-200 truncate text-sm sm:text-base">{method.title}</h3>
                      <p className="text-gray-400 truncate text-xs sm:text-sm group-hover:hidden">{method.actionText}</p>
                    </div>
                  </SecureContent>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      <AnimatePresence>
        <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      </AnimatePresence>
    </>
  );
};

export default Contact;


