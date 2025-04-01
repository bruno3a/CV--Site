import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="section-container">
      <motion.div>
        <h2 className="section-title">{t('sections.contact.title')}</h2>
        <p className="section-subtitle">{t('sections.contact.subtitle')}</p>
        
        <form>
          <div className="form-group">
            <label>{t('sections.contact.form.name')}</label>
            <input type="text" name="name" />
          </div>
          <div className="form-group">
            <label>{t('sections.contact.form.email')}</label>
            <input type="email" name="email" />
          </div>
          <div className="form-group">
            <label>{t('sections.contact.form.message')}</label>
            <textarea name="message"></textarea>
          </div>
          <button type="submit" className="button-primary">
            {t('sections.contact.form.send')}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;


