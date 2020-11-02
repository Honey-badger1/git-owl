const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/api/**", {
    target: "http://localhost:5000",
    secure: false
  }));
};

// const proxy = require('http-proxy-middleware');
// module.exports = function(app) {
//   app.use(
//     '/API',
//     proxy({
//       target: 'http://localhost:5000',
//       changeOrigin: true
//     })
//   );
// };
