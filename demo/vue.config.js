// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            // 'primary-color': '#1DA57A',
            // 'heading-color': '#1DA57A',
            'border-radius-base': '2px',
            "nav-theme": 'light'
          },
          javascriptEnabled: true
        }
      }
    }
  }