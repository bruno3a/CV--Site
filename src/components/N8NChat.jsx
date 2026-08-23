import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaPaperPlane, 
  FaTimes, 
  FaTrashAlt, 
  FaCircle,
  FaArrowDown
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const N8N_WEBHOOK_URL = (process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://n8n.neurasur.com/webhook/CV').trim().split(' ')[0];

// Generar sessionId único para tracking de conversación en n8n
const getOrCreateSessionId = () => {
  const stored = sessionStorage.getItem('n8n_chat_session_id');
  if (stored) return stored;
  
  const timestamp = new Date();
  const formattedDate = timestamp.getFullYear() +
    String(timestamp.getMonth() + 1).padStart(2, '0') +
    String(timestamp.getDate()).padStart(2, '0') +
    String(timestamp.getHours()).padStart(2, '0') +
    String(timestamp.getMinutes()).padStart(2, '0') +
    String(timestamp.getSeconds()).padStart(2, '0');
  
  const randomStr = Math.random().toString(36).substring(2, 11).toUpperCase();
  const newId = `n8n-${formattedDate}-${randomStr}`;
  sessionStorage.setItem('n8n_chat_session_id', newId);
  return newId;
};

// Formato de hora amigable
const formatTime = (date) => {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Componente para renderizar texto con markdown básico (links, negrita, saltos de línea)
const FormattedMessage = ({ content }) => {
  if (typeof content !== 'string') return null;

  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

      let parts = [];
      let lastIdx = 0;
      let match;

      while ((match = mdLinkRegex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.substring(lastIdx, match.index));
        }
        parts.push(
          <a
            key={`link-${lineIdx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium break-all"
          >
            {match[1]}
          </a>
        );
        lastIdx = match.index + match[0].length;
      }
      if (lastIdx < line.length) {
        parts.push(line.substring(lastIdx));
      }

      return (
        <span key={lineIdx} className="block mb-1 last:mb-0">
          {parts.map((part, pIdx) => {
            if (typeof part === 'string') {
              const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
              return boldParts.map((bPart, bIdx) => {
                if (bPart.startsWith('**') && bPart.endsWith('**')) {
                  return <strong key={bIdx} className="font-semibold text-white">{bPart.slice(2, -2)}</strong>;
                }
                const subParts = bPart.split(urlRegex);
                return subParts.map((sub, sIdx) => {
                  if (sub.match(urlRegex)) {
                    return (
                      <a
                        key={`url-${bIdx}-${sIdx}`}
                        href={sub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {sub}
                      </a>
                    );
                  }
                  return sub;
                });
              });
            }
            return part;
          })}
        </span>
      );
    });
  };

  return <div className="text-sm leading-relaxed">{renderFormattedText(content)}</div>;
};

const N8NChat = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  
  // Limpiar cualquier residuo de Botpress en el DOM cuando n8n está activo
  useEffect(() => {
    const cleanupBotpress = () => {
      try {
        const scripts = document.querySelectorAll('script[src*="botpress"], script[src*="bpcontent"]');
        scripts.forEach(s => s.remove());

        const elements = document.querySelectorAll(
          '#bp-web-widget-container, #bp-web-widget, .bpw-widget-btn, .bpw-layout, iframe[id*="bp-"], div[class*="bpw-"], div[id*="botpress"]'
        );
        elements.forEach(el => el.remove());

        if (window.botpressWebChat) {
          try {
            window.botpressWebChat.sendEvent({ type: 'hide' });
          } catch (e) {}
          delete window.botpressWebChat;
        }
      } catch (err) {
        console.warn('Botpress cleanup notice:', err);
      }
    };

    cleanupBotpress();
    const timer = setTimeout(cleanupBotpress, 500);
    return () => clearTimeout(timer);
  }, []);

  // Historial de mensajes
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('n8n_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored messages:', e);
      }
    }
    return [
      {
        id: 'initial-greeting',
        sender: 'bot',
        text: t('chat.start_message'),
        timestamp: new Date().toISOString()
      }
    ];
  });

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Guardar mensajes en sessionStorage
  useEffect(() => {
    sessionStorage.setItem('n8n_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Actualizar mensaje inicial si cambia el idioma y no hay conversación iniciada
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'initial-greeting') {
        return [
          {
            id: 'initial-greeting',
            sender: 'bot',
            text: t('chat.start_message'),
            timestamp: new Date().toISOString()
          }
        ];
      }
      return prev;
    });
  }, [language, t]);

  // Escuchar evento personalizado para abrir el chat desde Hero u otros componentes
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowTooltip(false);
    };

    window.addEventListener('open-portfolio-chat', handleOpenChat);
    return () => {
      window.removeEventListener('open-portfolio-chat', handleOpenChat);
    };
  }, []);

  // Auto-scroll hacia abajo
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isLoading, isOpen, scrollToBottom]);

  // Detectar scroll para mostrar botón de ir abajo
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBottom(isFarFromBottom);
  };

  // Enviar mensaje al webhook de n8n
  const handleSendMessage = async (customText = null) => {
    const textToSend = (typeof customText === 'string' ? customText : inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const payload = {
        message: textToSend,
        chatInput: textToSend,
        query: textToSend,
        sessionId: sessionId,
        language: language,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      let botText = '';

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (typeof data === 'string') {
            botText = data;
          } else if (Array.isArray(data) && data.length > 0) {
            const first = data[0];
            botText = first?.output || first?.message || first?.response || first?.text || JSON.stringify(first);
          } else if (data && typeof data === 'object') {
            botText = data.output || data.message || data.response || data.text || data.reply || (data.data && (data.data.output || data.data.message)) || JSON.stringify(data);
          }
        } else {
          botText = await response.text();
        }
      } else {
        botText = `${t('chat.errors.connection')} (${response.status}: ${response.statusText || 'Webhook not active'})`;
      }

      if (!botText) {
        botText = t('chat.errors.message_failed');
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: typeof botText === 'string' ? botText : JSON.stringify(botText),
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to n8n webhook:', error);
      const errorMessage = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: `${t('chat.errors.connection')} (${error.message})`,
        isError: true,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    const initial = [
      {
        id: 'initial-greeting',
        sender: 'bot',
        text: t('chat.start_message'),
        timestamp: new Date().toISOString()
      }
    ];
    setMessages(initial);
    sessionStorage.removeItem('n8n_chat_messages');
  };

  // Sugerencias rápidas basadas en el idioma
  const getSuggestions = () => {
    switch (language) {
      case 'es':
        return ['¿Cuál es la experiencia de Bruno?', 'Habilidades principales', '¿Cómo contactar a Bruno?'];
      case 'pt':
        return ['Qual é a experiência do Bruno?', 'Principais habilidades', 'Como entrar em contato?'];
      case 'ru':
        return ['Какой опыт у Бруно?', 'Ключевые навыки', 'Как связаться с Бруно?'];
      default:
        return ["What is Bruno's experience?", "Key skills & tools", "How to contact Bruno?"];
    }
  };

  return (
    <>
      {/* Floating Action Button & Tooltip */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end touch-manipulation">
        {/* Tooltip con animación */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-2 sm:mb-3 bg-gradient-to-r from-primary to-primary-dark text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl max-w-[calc(100vw-3rem)] sm:max-w-xs cursor-pointer relative"
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
            >
              <div className="flex items-center gap-2 pr-4">
                <span className="text-sm sm:text-base">👋</span>
                <p className="text-xs sm:text-sm font-medium">{t('chat.let_me_help_you')}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="absolute top-1.5 right-2 text-white/80 hover:text-white text-sm p-1"
                aria-label="Close tooltip"
              >
                ×
              </button>
              <div className="absolute -bottom-2 right-5 sm:right-6 transform">
                <div className="border-8 border-transparent border-t-primary-dark" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón flotante para abrir/cerrar chat */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setShowTooltip(false);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700' 
              : 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-primary/40 hover:shadow-primary/60'
          }`}
        >
          {isOpen ? (
            <FaTimes className="text-lg sm:text-xl" />
          ) : (
            <div className="relative flex items-center justify-center">
              <FaRobot className="text-xl sm:text-2xl" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Ventana de Chat optimizada para móviles y desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-20 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-24 z-[9999] sm:w-[400px] h-[520px] max-h-[calc(100dvh-5.5rem)] sm:max-h-[calc(100vh-7rem)] bg-gray-900/95 backdrop-blur-xl border border-gray-700/60 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-100 font-sans"
          >
            {/* Header del Chat */}
            <div className="bg-gradient-to-r from-gray-800/90 via-gray-800/70 to-gray-900/90 px-3.5 py-3 sm:px-4 sm:py-3.5 border-b border-gray-700/50 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-md shadow-primary/20">
                    <FaRobot className="text-lg sm:text-xl" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm tracking-wide">
                    {t('chat.title')}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400">
                    <FaCircle className="text-[5px] sm:text-[6px] animate-pulse" />
                    <span>{t('chat.status.online')}</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción del header */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title={t('chat.buttons.clear')}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800/60 rounded-xl transition-colors touch-manipulation"
                  aria-label={t('chat.buttons.clear')}
                >
                  <FaTrashAlt className="text-xs" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-xl transition-colors touch-manipulation"
                  aria-label="Minimizar chat"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* Lista de Mensajes */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 custom-scrollbar relative"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-2.5 shadow-sm text-xs sm:text-sm ${
                        isUser
                          ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-tr-xs'
                          : msg.isError
                          ? 'bg-red-900/40 text-red-200 border border-red-800/50 rounded-tl-xs'
                          : 'bg-gray-800/90 text-gray-100 border border-gray-700/50 rounded-tl-xs'
                      }`}
                    >
                      <FormattedMessage content={msg.text} />
                    </div>
                    {msg.timestamp && (
                      <span className="text-[10px] text-gray-500 mt-1 px-1">
                        {formatTime(new Date(msg.timestamp))}
                      </span>
                    )}
                  </motion.div>
                );
              })}

              {/* Indicador de escribiendo */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 bg-gray-800/90 border border-gray-700/50 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-tl-xs w-fit"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Botón flotante para bajar al final */}
            {showScrollBottom && (
              <button
                onClick={() => scrollToBottom(true)}
                className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 bg-gray-800/90 border border-gray-700 text-gray-300 hover:text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 touch-manipulation"
                aria-label="Scroll to bottom"
              >
                <FaArrowDown className="text-xs" />
              </button>
            )}

            {/* Sugerencias Rápidas */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-3 pb-2 sm:px-4 flex gap-1.5 overflow-x-auto no-scrollbar py-1 flex-shrink-0">
                {getSuggestions().map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug)}
                    className="whitespace-nowrap text-[11px] sm:text-xs bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white border border-gray-700/60 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-150 flex-shrink-0 touch-manipulation"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Barra de Entrada / Input */}
            <div className="p-2.5 sm:p-3 bg-gray-900 border-t border-gray-800 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-gray-800/80 border border-gray-700/70 rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-1.5 focus-within:border-primary/80 transition-colors"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.placeholder')}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-base sm:text-sm text-white placeholder-gray-400 focus:outline-none disabled:opacity-50 py-1"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label={t('chat.buttons.send')}
                  className={`p-2 rounded-xl transition-all duration-200 touch-manipulation ${
                    inputMessage.trim() && !isLoading
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20'
                      : 'text-gray-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default N8NChat;
