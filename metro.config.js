// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite's web implementation (wa-sqlite) ships a .wasm binary that
// Metro needs to treat as an asset, not source, to bundle for web.
config.resolver.assetExts.push('wasm');

module.exports = config;
