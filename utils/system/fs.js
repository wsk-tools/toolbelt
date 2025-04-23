const fs = require("fs");

function existsFile(path) {
  return fs.existsSync(path);
}

function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}

function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

module.exports = {
  existsFile,
  readFile,
  writeFile,
};
