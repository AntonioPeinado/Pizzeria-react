const path = require('path');
const FIVE_MINUTES = 5 * 60;
const THIRTY_DAYS = 30 * 24 * 60 * 60;

module.exports = {
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3005,
    origin: process.env.ORIGIN,
    staticPath:  path.resolve(__dirname, '..', 'build'),
    db: path.join(__dirname, 'db.json'),
    statics: {
        upload: path.resolve(__dirname,'upload')
    },
    imagesDir: 'images',
    
    authentication: {
        authSecret: process.env.AUTH_SECRET || 'auth_secret',
        refreshSecret: process.env.REFRESH_SECRET || 'refresh_secret',
        authTTL: FIVE_MINUTES,
        refreshTTL: THIRTY_DAYS,
        refreshCookie: 'refresh',
    },
    
    allowedOrigins: [
        'http://localhost:3000',
        'https://www.google.es'
    ]
}