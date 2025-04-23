const { resolveAbsPath } = require("../../utils/system/path");
const { exec } = require("child_process");

const CONFIG_REL_PATH = "config/tree.json";

module.exports = function configCommand() {
  const fullPath = resolveAbsPath(CONFIG_REL_PATH);

  // OS별 명령어 분기
  const command =
    process.platform === "win32"
      ? `start "" "${fullPath}"`
      : process.platform === "darwin"
      ? `open "${fullPath}"`
      : `xdg-open "${fullPath}"`;

  exec(command, (err) => {
    if (err) {
      console.error("❌ 설정 파일을 열 수 없습니다:", err.message);
    } else {
      console.log(`🛠 설정 파일 열기: ${fullPath}`);
    }
  });
};
