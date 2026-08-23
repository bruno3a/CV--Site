# AI-Enhanced Personal Portfolio

A modern, feature-rich portfolio website showcasing my experience in Business Analysis and Product Management, built entirely using AI assistance without traditional development or design teams.

## Project Overview

This project demonstrates my ability to manage and deliver a modern web product by leveraging AI tools and platforms. As a Business Analyst, I approached this project from a product perspective, focusing on user needs, feature prioritization, and innovative solutions.

### Key Features

- 🌐 Multi-language Support (EN/ES/PT/RU)
- 🎯 Interactive UI with smooth animations
- 🔊 Unique audio pronunciation feature
- 💬 AI-powered chatbot with flexible integration (**n8n Webhook / Botpress**) via Feature Flag
- 📱 Fully responsive design
- 🌙 Dark mode optimization
- 🎨 Modern, clean aesthetic
- 📊 Dynamic progress indicators
- 🔄 Smooth page transitions


## Technical Stack

- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** React Context (Language & UI)
- **Deployment:** GitHub Pages / Custom Domain
- **Version Control:** Git
- **AI Chatbot Integration:** 
  - **n8n Webhook Workflow** (Default active provider)
  - **Botpress Cloud Webchat** (Preserved legacy provider)
- **Development Approach:** AI-assisted development using various LLM tools

---

## 🤖 Chatbot Architecture & Feature Flag

The portfolio includes a flexible chatbot architecture controlled by environment and a **Development Feature Flag**:

- **🚀 Production Policy:** Whenever the project is deployed to production (`NODE_ENV === 'production'`), **Botpress is strictly disabled** and the **n8n Webhook Chatbot** is enforced automatically.
- **🛠️ Development Environment:** In local development (`npm start`), developers can easily toggle between **n8n** and **Botpress** using `REACT_APP_CHAT_PROVIDER` in `.env.development`.

### Feature Flag Configuration (`.env.development`)

```bash
# Chat Provider (Development only): 'n8n' (default) or 'botpress'
REACT_APP_CHAT_PROVIDER=n8n

# n8n Webhook URL
REACT_APP_N8N_WEBHOOK_URL=https://n8n.neurasur.com/webhook-test/CV

# Botpress Configuration (used only when REACT_APP_CHAT_PROVIDER=botpress in development)
REACT_APP_BOTPRESS_HOST_URL=https://cdn.botpress.cloud/webchat/v2
REACT_APP_BOTPRESS_MESSAGING_URL=https://messaging.botpress.cloud
REACT_APP_BOTPRESS_SCRIPTS_URL=https://cdn.botpress.cloud/webchat/v2.2/inject.js
REACT_APP_BOTPRESS_CUSTOM_SCRIPT_URL=https://files.bpcontent.cloud/2025/04/02/00/20250402001816-WWLOGL5R.js
REACT_APP_BOTPRESS_BOT_ID=804de353-fbec-41d6-9009-9ac3316f94f7
```

### 1. n8n Webhook Integration (`REACT_APP_CHAT_PROVIDER=n8n`)

When active (default & all production builds), the application mounts the custom `N8NChat` component.

- **Request Format (POST):**
  ```json
  {
    "message": "User query here",
    "chatInput": "User query here",
    "sessionId": "n8n-20260823-XYZ123",
    "language": "es",
    "timestamp": "2026-08-23T21:07:00.000Z"
  }
  ```

- **Supported Response Formats:**
  The widget automatically parses and renders multiple common n8n response payloads:
  - JSON Object: `{ "output": "response text" }`, `{ "message": "response text" }`, `{ "response": "..." }`, or `{ "text": "..." }`
  - Array output: `[ { "output": "..." } ]`
  - Plain text / string response

- **Features:**
  - Glassmorphic dark UI matching the portfolio aesthetic.
  - Multi-language awareness with synchronized translation keys.
  - Basic Markdown rendering (links, bold text, line breaks).
  - Session persistence and message history in `sessionStorage`.
  - Seamless integration with the Hero section "Get instant help" button.
  - Fully responsive and touch-optimized for mobile devices.

### 2. Botpress Integration (`REACT_APP_CHAT_PROVIDER=botpress` - Development only)

To test the legacy Botpress Webchat widget during development:
1. Set `REACT_APP_CHAT_PROVIDER=botpress` in `.env.development`.
2. Restart the React development server (`npm start`).
3. The application will load the original `BotpressChat` component with all original scripts and CSS customizations.

---

## Development Approach

This project showcases my ability to:

1. **Product Vision & Strategy**
   - Define clear product requirements
   - Prioritize features based on user value
   - Make data-driven decisions

2. **AI-Driven Development**
   - Leverage AI tools for code generation
   - Implement modern development practices
   - Maintain code quality and consistency

3. **Innovation & Problem Solving**
   - Create unique features (audio pronunciation)
   - Implement multi-language support
   - Optimize user experience

4. **Project Management**
   - Handle end-to-end product delivery
   - Manage project timeline and scope
   - Ensure quality standards

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`
4. Run locally: `npm start`
5. Build for production: `npm run build`

## Business Value Demonstration

This project serves as a practical demonstration of:

- Modern product management capabilities
- AI tool integration and utilization
- User-centric feature development
- Technical requirement definition and implementation
- End-to-end product delivery
- Innovation in personal branding

## Future Enhancements

- Integration with additional AI services
- Enhanced analytics and user tracking
- Additional language support
- Performance optimizations
- Extended chatbot capabilities

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with AI assistance, demonstrating the future of product development and management.*
