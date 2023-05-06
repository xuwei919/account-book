module.exports = {

    lintOnSave: true,

    productionSourceMap: false,

    devServer: {

        open: true,
        host: "localhost",
        port: 8085,
        https: false,
        proxy: {
            '/': {
                target: "http://localhost:8899",
                ws: false,
                changeOrigin: true,
                secure: false,
            }
        }
    }
}