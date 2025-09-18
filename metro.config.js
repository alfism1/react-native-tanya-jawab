const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = getDefaultConfig(__dirname);
const wrappedConfig = wrapWithReanimatedMetroConfig(defaultConfig);

module.exports = mergeConfig(wrappedConfig, config);
