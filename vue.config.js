// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ff5b40',
          'heading-color': '#ff5b40',
          'border-radius-base': '2px',
          "nav-theme": 'light'
        },
        javascriptEnabled: true
      }
    }
  }
}