const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();

const nextConfig = {
	reactStrictMode: true,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Warning: This allows production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: true,
	},
	env: {
		SITE_URL: process.env.SITE_URL,
	},
	images: {
		domains: ['cdn.sanity.io'],
	},
};

module.exports = withNextPluginPreval(nextConfig);
