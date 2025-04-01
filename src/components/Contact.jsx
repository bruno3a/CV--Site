import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaWhatsapp className="text-2xl" />,
      label: "WhatsApp",
      value: "+54 9 11 3482-1203",
      link: "https://wa.me/5491134821203"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: "Email",
      value: "bruno@example.com",
      link: "mailto:bruno@example.com?subject=Contact%20from%20Portfolio"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: "Location",
      value: "Buenos Aires, Argentina",
      link: "https://www.google.com/maps/search/?api=1&query=Buenos+Aires,+Argentina"
    },
    {
      icon: <FaTelegram className="text-2xl" />,
      label: "Telegram",
      value: "@bruno_9000",
      link: "https://t.me/bruno_9000"
    }
  ];

  return (
    <section id="contact" className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Contact Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {contactInfo.map((info, index) => (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <div className="flex flex-col items-center p-6 bg-background-light rounded-lg group-hover:bg-background-dark transition-colors cursor-pointer">
                <div className="text-primary mb-4">{info.icon}</div>
                <h3 className="font-semibold mb-2">{info.label}</h3>
                <p className="text-center text-gray-300">{info.value}</p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Contact;


