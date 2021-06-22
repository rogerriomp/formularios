const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://127.0.0.1:5000'   ,
      changeOrigin: true,
      pathRewrite: {
        '/api': '' // remove base path
      }
    })
  );
};