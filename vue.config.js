// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            'primary-color': '#ff5b40',
            'heading-color': '#fff7f2',
            'border-radius-base': '2px',
            "nav-theme": 'light'
          },
          javascriptEnabled: true
        }
      }
    }
  }