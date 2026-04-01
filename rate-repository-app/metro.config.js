const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// IMPORTANT: allow .cjs files (Apollo uses them)
config.resolver.sourceExts.push("cjs");

module.exports = config;
