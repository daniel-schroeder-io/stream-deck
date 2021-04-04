module.exports = {
    devServer: {
      proxy: {
        '^/auth/twitch': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false
        },
        '^/auth/callback': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false
        }
      }
    }
  };