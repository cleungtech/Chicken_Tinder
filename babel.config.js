module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

module: {
  rules: [
    // This would match almost any react-native module
    {
      test: /(@?react-(navigation|native)).*\.(ts|js)x?$/,
      include: /node_modules/,
      exclude: [/react-native-web/, /\.(native|ios|android)\.(ts|js)x?$/],
      loader: 'babel-loader'
    },
  ]
}