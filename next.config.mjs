const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }

        config.module.rules.push({
            test: /typeorm\/(connection|util)\/.*\.js$/,
            loader: 'ignore-loader',
        });

        return config;
    },
};

export default nextConfig;
