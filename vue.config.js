const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias:{
        'assets' : '@/assets',
        'components' : '@/components',
        'network' : '@/network',
        'views' : '@/views',
        'common' : '@/common',
      }
    }
  }
})
