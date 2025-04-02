const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/webchat',
    createProxyMiddleware({
      target: 'https://cdn.botpress.cloud',
      changeOrigin: true,
      secure: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );

  app.use(
    '/messaging',
    createProxyMiddleware({
      target: 'https://messaging.botpress.cloud',
      changeOrigin: true,
      secure: true,
      ws: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
  );
};

