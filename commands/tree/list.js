const fs = require("fs");
const path = require("path");
const clipboardy = require("clipboardy");
const { loadConfig } = require("../../utils/config");

function walk(dir, depth = 0, ignoreList = [], output = []) {
  const base = path.basename(dir);
  if (ignoreList.includes(base)) return;

  const prefix = "│  ".repeat(depth);
  output.push(`${prefix}📁 ${base}`);

  const children = fs.readdirSync(dir).sort((a, b) => a.localeCompare(b));
  for (const item of children) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, depth + 1, ignoreList, output);
    } else {
      output.push(`${prefix}   └─ ${item}`);
    }
  }

  return output;
}

module.exports = function treeCommand(options) {
  const config = loadConfig();

  const cliIgnores = options.ignore || [];
  const fileIgnores = Array.isArray(config.ignore) ? config.ignore : [];
  const ignoreList = [...new Set([...fileIgnores, ...cliIgnores])];

  const rootDir = process.cwd();
  const lines = walk(rootDir, 0, ignoreList, []);
  const result = lines.join("\n");

  if (options.copy) {
    clipboardy.writeSync(result);
    console.log("📋 클립보드에 복사 완료!");
  } else {
    console.log(result);
  }
};
