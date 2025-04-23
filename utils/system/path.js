const path = require("path");

const PATH_ROOT = path.resolve(__dirname, "../../");

function getRootPath() {
  return PATH_ROOT;
}

function resolveAbsPath(relativePath) {
  return path.resolve(PATH_ROOT, relativePath);
}

function moveTo(relativePath) {
  process.chdir(resolveAbsPath(relativePath));
}

module.exports = {
  getRootPath,
  resolveAbsPath,
  moveTo,
};
