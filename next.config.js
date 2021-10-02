const withPWA = require('next-pwa')

module.exports = withPWA({
    images: {
        domains: ['s3.us-west-2.amazonaws.com'],
    },
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    }
})