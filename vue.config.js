const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    runtimeCompiler: true,
    publicPath: '/', // 设置打包文件相对路径
    lintOnSave: true,
    outputDir: 'dist',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@/fetch', resolve('src/fetch'))
            .set('@/assets', resolve('src/assets'))
            .set('@/store', resolve('src/store'))
            .set('@/components', resolve('src/components'))
            .set('@/util', resolve('src/util'))
    },
    devServer: {
        port: 8184,
        disableHostCheck: true,
        proxy: {
            '/': {
                target: '',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': '/'
                }
            },
        }
    },
}