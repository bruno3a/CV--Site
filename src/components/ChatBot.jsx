import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Exponemos la función para abrir el chat
  React.useEffect(() => {
    window.openChat = () => setIsOpen(true);
  }, []);

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        className="fixed bottom-20 right-6 z-50 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <FaComments className="text-2xl" />
      </motion.button>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-background-light rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold">Chat with me</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat content */}
            <div className="p-4 h-[calc(100%-64px)] flex items-center justify-center text-gray-400">
              Coming soon...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
