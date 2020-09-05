const withImages = require('next-images');
require('dotenv').config();

module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  // devIndicators: {
  //   autoPrerender: false,
  // },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL
  }
})
