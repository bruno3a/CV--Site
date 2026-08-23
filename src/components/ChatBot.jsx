import React from 'react';
import BotpressChat from './BotpressChat';
import N8NChat from './N8NChat';

/**
 * Feature Flag Controller for Portfolio Chatbot.
 * 
 * Controlled via environment variable:
 * REACT_APP_CHAT_PROVIDER='n8n' | 'botpress'
 * 
 * Default: 'n8n'
 */
const ChatBot = () => {
  const provider = (process.env.REACT_APP_CHAT_PROVIDER || 'n8n').trim().toLowerCase();

  if (provider === 'botpress') {
    return <BotpressChat />;
  }

  return <N8NChat />;
};

export default ChatBot;
