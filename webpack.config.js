module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    });

    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
      },
    });

    return config;
  },
};
