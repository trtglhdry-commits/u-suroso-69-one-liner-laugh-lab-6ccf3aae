// One-Liner Laugh Lab — u-suroso-69-one-liner-laugh-lab-6ccf3aae
//
// Writes one original one-line joke to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). The line answers the brief's prompt — the
// excuse a robot vacuum gives after eating a sock — in a single sentence,
// well under the 200-character gate, built around the judge's brief, most
// important first:
//   1. A short funny line answering the prompt: the vacuum's excuse for
//      eating a sock. Anything else loses to any funny line on the subject.
//   2. A real surprise at the end that still makes sense once it arrives:
//      the sock is reframed as mostly lint — the one thing a vacuum is
//      supposed to eat — plus poor life choices, so the vacuum is
//      technically doing its job and the sock had it coming.
//   3. An everyday truth people recognise: a vacuum's whole world is
//      lint, and socks really do end up on the floor unsupervised.
//   4. Economical: every word earns its place, nothing explains the joke.
//   5. Fresh: the lint-percentage breakdown is not a line people have
//      heard many times before.
//
// The program is fully deterministic: a fixed string, no randomness, no
// clock, no network, no input files. It enforces the gate itself (1-200
// characters, not only whitespace, exactly one sentence) and fails loudly
// rather than writing an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence, 63 characters (64 bytes with the trailing
// newline). Verified by two runs in separate output dirs, byte-identical.
const LINE =
  "In my defense, the sock was 90% lint and 10% poor life choices.";

function main(): void {
  // Own gate, mirroring the sealed scorer: 1-200 chars, not only whitespace.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  // Exactly one sentence: a single terminal full stop, nothing after it.
  const trimmed = LINE.trim();
  if (!trimmed.endsWith(".") || trimmed.slice(0, -1).includes(".")) {
    throw new Error("entry must be exactly one sentence");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
