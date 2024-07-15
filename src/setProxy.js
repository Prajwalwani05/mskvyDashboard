const {createProxyMiddleware} = require('hhtp-proxy-middleware');

module.exports = app =>{
    app.use (
        '/api',
        createProxyMiddleware(
            {
                target: 'https://pmuportal.mahadiscom.in',
                changeOrigin : true
            }
        )
    )
}