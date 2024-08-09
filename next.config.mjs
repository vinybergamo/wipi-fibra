/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Configuração para ignorar módulos não utilizados
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-native$': 'react-native-web', // Substitua react-native por react-native-web
            // Não ignore o 'pg' se você está usando o TypeORM com PostgreSQL
            // Remova as seguintes linhas se estiver usando TypeORM com PostgreSQL
            'mysql': false,
            'react-native-sqlite-storage': false,
            '@sap/hana-client': false,
        };
        config.module.rules.push({
            test: /typeorm\/util\/DirectoryExportedClassesLoader\.js$/,
            loader: 'ignore-loader',
        });

        // Configuração adicional se necessário
        config.module.rules.push({
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['next/babel'],
                },
            },
        });

        return config;
    },


};

export default nextConfig;
