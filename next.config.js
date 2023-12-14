const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // File loader ekle
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
      },
    });

    // Important: return the modified config
    return config;
  },
};