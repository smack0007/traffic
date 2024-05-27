import fs from "fs/promises";
import * as esbuild from "esbuild";

async function bundle(
  inputFileName: string,
  outputFileName: string,
  platform: "browser" | "node",
  external: string[] = []
): Promise<void> {
  const result = await esbuild.build({
    entryPoints: [inputFileName],
    bundle: true,
    outfile: outputFileName,
    platform,
    external,
  });

  if (result.errors) {
    if (result.errors.length === 1) {
      throw new Error(JSON.stringify(result.errors));
    }
  }
}

async function copyFileIfNewer(src: string, dest: string): Promise<void> {
  const srcMtime = (await fs.stat(src)).mtime.valueOf();
  let destMtime: number | null = null;

  try {
    destMtime = (await fs.stat(dest)).mtime.valueOf();
  } catch {}

  if (destMtime !== null && srcMtime - destMtime <= 0) {
    console.info(`"${dest}" is newer than "${src}"."`);
    return;
  }

  await fs.copyFile(src, dest);
}

async function main(): Promise<void> {
  await bundle("./src/electron/main.ts", "./build/main.js", "node", ["electron"]);
  await bundle("./src/electron/preload.ts", "./build/preload.js", "node", ["electron"]);
  await bundle("./src/electron/game.ts", "./build/game.js", "browser");
  await copyFileIfNewer("./src/electron/main.html", "./build/main.html");
  await copyFileIfNewer("./src/electron/package.json", "./build/package.json");
}

try {
  await main();
  process.exit(0);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}
