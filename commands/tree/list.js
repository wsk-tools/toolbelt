const fs = require("fs");
const path = require("path");
const clipboardy = require("clipboardy");
const { loadConfig } = require("../../config");
const { getRootPath } = require("../../utils/system/path");

const empty = "\u2003";

function walk(dir, depth = 0, ignoreList = [], output = [], parentPrefix = "") {
  const base = path.basename(dir);
  if (ignoreList.includes(base)) return;

  // 폴더-파일 순, 오름차순으로 정렬
  const children = fs.readdirSync(dir).sort((a, b) => {
    const isADir = fs.statSync(path.join(dir, a)).isDirectory();
    const isBDir = fs.statSync(path.join(dir, b)).isDirectory();
    if (isADir && !isBDir) return -1;
    if (!isADir && isBDir) return 1;
    return a.localeCompare(b);
  });

  // depth 및 폴더 아이콘 표시
  const isRoot = depth === 0;
  const prefix = isRoot ? "" : `${parentPrefix} `;
  children.forEach((item, index) => {
    const fullPath = path.join(dir, item);

    const stat = fs.statSync(fullPath);
    const isLastChild = index === children.length - 1;
    const connector = isLastChild ? `└─${empty}` : `├─${empty}`;

    if (stat.isDirectory()) {
      const dirLine = `${prefix}${connector}${item}/`;
      output.push(dirLine);
      const currentPrefix = `${prefix}${isLastChild ? `${empty.repeat(2)}` : `│${empty.repeat(1)}`}`;
      walk(fullPath, depth + 1, ignoreList, output, currentPrefix);
    } else {
      const fileLine = `${prefix}${connector}${item}`;
      output.push(fileLine);
    }
  });

  return output;
}

module.exports = function treeCommand(options) {
  const config = loadConfig();

  const cliIgnores = options.ignore || [];
  const fileIgnores = Array.isArray(config.ignore) ? config.ignore : [];
  const ignoreList = [...new Set([...fileIgnores, ...cliIgnores])];

  // 현재 디렉토리를 기준으로 트리 생성
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
