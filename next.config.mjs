/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push({ typeorm: 'commonjs typeorm' });
        }

        config.module.rules.push({
            test: /typeorm\/.*\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['next/babel'],
                    plugins: ['babel-plugin-dynamic-import-node'],
                },
            },
        });


        return config;
    },
};

export default nextConfig;
