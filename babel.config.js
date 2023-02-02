module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^@/(.+)': './src/\\1',
          '@src': './src',
          '@components': './src/library/components',
          '@features': './src/features/*',
          '@core-components': './src/core-components',
          '@core-navigations': './src/core-navigations',
          '@core-services': './src/core-services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
