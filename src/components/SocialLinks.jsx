import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const SocialLinks = () => {
  const links = [
    {
      name: 'GitHub',
      url: 'https://github.com/bruno3a',
      icon: <FaGithub className="text-4xl" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/btrezza/',
      icon: <FaLinkedin className="text-4xl" />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/yourusername',
      icon: <FaTelegram className="text-4xl" />
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/5491112345678',
      icon: <FaWhatsapp className="text-4xl" />
    }
  ];

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div className="flex flex-col gap-6">
        {links.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-primary hover:text-primary-light"
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;

