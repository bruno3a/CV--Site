import React, { useEffect } from 'react';
import BotpressChat from './BotpressChat';
import N8NChat from './N8NChat';

/**
 * Feature Flag Controller for Portfolio Chatbot.
 * 
 * - Production (`NODE_ENV === 'production'`):
 *   Botpress is ALWAYS disabled. Only n8n Chatbot is deployed.
 * 
 * - Development (`NODE_ENV !== 'production'`):
 *   Controlled via `REACT_APP_CHAT_PROVIDER='n8n' | 'botpress'` in `.env.development`.
 */
const ChatBot = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const configuredProvider = (process.env.REACT_APP_CHAT_PROVIDER || 'n8n').trim().toLowerCase();

  // En producción, Botpress queda estrictamente deshabilitado.
  // Solo se puede elegir en entorno de desarrollo.
  const activeProvider = isProduction ? 'n8n' : configuredProvider;

  useEffect(() => {
    if (activeProvider !== 'botpress') {
      document.body.classList.add('provider-n8n');
      document.body.classList.remove('provider-botpress');

      // Limpieza exhaustiva de cualquier iframe, botón o script de Botpress
      const purgeBotpress = () => {
        const elements = document.querySelectorAll(
          '#bp-web-widget-container, #bp-web-widget, .bpw-widget-btn, .bpw-layout, iframe[id*="bp-"], iframe[src*="botpress"], div[class*="bpw-"], div[id*="botpress"], div[class*="bpMessage"]'
        );
        elements.forEach(el => el.remove());

        const scripts = document.querySelectorAll('script[src*="botpress"], script[src*="bpcontent"]');
        scripts.forEach(s => s.remove());

        if (window.botpressWebChat) {
          try {
            window.botpressWebChat.sendEvent({ type: 'hide' });
          } catch (e) {}
          delete window.botpressWebChat;
        }
      };

      purgeBotpress();
      const interval = setInterval(purgeBotpress, 300);
      const timer = setTimeout(() => clearInterval(interval), 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      document.body.classList.add('provider-botpress');
      document.body.classList.remove('provider-n8n');
    }
  }, [activeProvider]);

  if (activeProvider === 'botpress') {
    return <BotpressChat />;
  }

  return <N8NChat />;
};

export default ChatBot;
