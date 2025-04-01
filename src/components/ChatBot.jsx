import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ChatBot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = useState('offline');

  React.useEffect(() => {
    window.openChat = () => setIsOpen(true);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    // Aquí iría la lógica para procesar el mensaje y obtener respuesta
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-20 right-6 z-50 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <FaComments className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-background-light rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-primary p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{t('chat.title')}</h3>
                <span className="text-xs text-white/70">
                  {t(`chat.status.${status}`)}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-col h-[calc(100%-128px)] p-4">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <div className="text-gray-400 text-center">
                    {t('chat.start_message')}
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                      <span className="inline-block bg-primary/10 rounded-lg px-4 py-2">
                        {msg.text}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-background rounded px-4 py-2 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary-dark text-white p-2 rounded"
                >
                  <FaPaperPlane />
                </button>
                <button
                  onClick={handleClearChat}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;


