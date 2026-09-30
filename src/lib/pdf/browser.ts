import "server-only";
import { existsSync } from "node:fs";
import type { Browser } from "puppeteer-core";

// The headless browser that prints documents to PDF (DECISIONS.md, D-096). On Vercel it is the
// Chromium built for serverless functions, unpacked into /tmp on the first call; on a developer
// machine, the Chrome already installed there.

const LOCAL_CHROMES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

/** An A4 sheet at 96 dpi: what the print stylesheet lays the page out for. */
const A4 = { width: 794, height: 1123, deviceScaleFactor: 1 };

export async function launchBrowser(): Promise<Browser> {
  const { default: puppeteer } = await import("puppeteer-core");
  if (process.env.VERCEL) {
    const { default: chromium } = await import("@sparticuz/chromium");
    chromium.setGraphicsMode = false;
    return puppeteer.launch({
      args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
      defaultViewport: A4,
      executablePath: await chromium.executablePath(),
      headless: "shell",
    });
  }
  const executablePath = LOCAL_CHROMES.find((path) => path && existsSync(path));
  if (!executablePath) {
    throw new Error("No Chrome to print PDFs with: set CHROME_PATH to its executable.");
  }
  return puppeteer.launch({ executablePath, headless: true, defaultViewport: A4 });
}
