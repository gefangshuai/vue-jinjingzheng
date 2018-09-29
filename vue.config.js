// vue.config.js
module.exports = {
    devServer: {
        port: 4000,
        proxy: {
            '/chaifen': {
                target: 'https://bjjj.zhongchebaolian.com',
                changeOrigin: true
            },
            '/app_web': {
                target: 'https://bjjj.zhongchebaolian.com',
                changeOrigin: true
            },

        }
    }
}
