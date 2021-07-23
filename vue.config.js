const path = require('path');
module.exports = {
	devServer: {
		overlay: false,
		port: process.env.VUE_APP_PORT || 33333,
		proxy: {
			'/api': {
				target: process.env.VUE_APP_API_URL,
			},
		},
	},
	chainWebpack: config => {
		const apiClient = process.env.VUE_APP_API_CLIENT; // mock or server
		config.resolve.alias.set('api-client', path.resolve(__dirname, `src/api/${apiClient}`));
	},
};
