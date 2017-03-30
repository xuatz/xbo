const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
    // require('dotenv').config();
}

module.exports = {
    webpack: (config, { dev }) => {
        // Perform customizations to config

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(process.env.API_URL),
            })
        );

        // Important: return the modified config
        return config;
    },
};
