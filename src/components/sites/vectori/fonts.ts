import localFont from "next/font/local";

// Font files served by the source page (the site calls them mainFont, secondFont and sansSF).
export const mainFont = localFont({ src: "./fonts/main-font.ttf", variable: "--main-font", display: "swap" });
export const secondFont = localFont({ src: "./fonts/second-font.ttf", variable: "--second-font", display: "swap" });
export const sansSF = localFont({ src: "./fonts/sans-sf.ttf", variable: "--sans-sf", display: "swap" });

export const vectoriFontVariables = `${mainFont.variable} ${secondFont.variable} ${sansSF.variable}`;
