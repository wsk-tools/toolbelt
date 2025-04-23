#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

program.name("toolbelt").description("🧰 Toolbelt - CLI Utilities").version("0.1.0");

// tree 명령어 등록
const tree = program.command("tree").description("디렉토리 구조 출력");

tree
  .command("list")
  .description("결과를 클립보드에 복사")
  .option("-c, --copy", "결과를 클립보드에 복사")
  .action(require("./commands/tree/list"));

tree.command("config").description("tree 설정 파일 편집").action(require("./commands/tree/config"));

tree.action((options) => {
  require("./commands/tree/list")(options || {});
});

program.parse(process.argv);
