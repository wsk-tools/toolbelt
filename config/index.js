const { resolveAbsPath } = require("../utils/system/path");
const { existsFile, readFile } = require("../utils/system/fs");

function loadConfig() {
  const configPath = resolveAbsPath("config/tree.json");
  if (existsFile(configPath)) {
    const raw = readFile(configPath);
    return JSON.parse(raw);
  }
  return {};
}

module.exports = { loadConfig };
