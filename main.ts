process.umask(0o022);

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Last Text at One Percent — make.fun bounty
// u-azazex-last-text-at-one-percent-ba9fc876
//
// The phone itself sends one last text at 1% battery, passing on the
// things its owner would have said. Fixed string: no network, no clock,
// no randomness, and two runs produce byte-identical output.
// Gate: /output/entry.txt is UTF-8 text of 1 to 200 characters,
// not only whitespace, a single line with no trailing newline.
const OUTPUT_DIR = "/output";
const ENTRY_PATH = `${OUTPUT_DIR}/entry.txt`;
const ENTRY_LINE =
  "hey, this is his phone, i'm at 1% and going dark, so quick: tell maya he's sorry about tuesday, the spare key is under the blue pot, and the dog already ate twice today, no third dinner";

const chars = [...ENTRY_LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, must be 1-200`);
}
if (ENTRY_LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (/[\r\n]/.test(ENTRY_LINE)) {
  throw new Error("line must not contain a line break");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(ENTRY_PATH, ENTRY_LINE, "utf8");

if (readFileSync(ENTRY_PATH, "utf8") !== ENTRY_LINE) {
  throw new Error("written file does not match the line");
}
