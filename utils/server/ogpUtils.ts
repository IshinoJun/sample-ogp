import { createCanvas, registerFont, loadImage, Canvas } from "canvas";
import * as path from "path";
import fs from "fs";

interface SeparatedText {
  line: string;
  remaining: string;
}

const createTextLine = (canvas: Canvas, text: string): SeparatedText => {
  const context = canvas.getContext("2d");
  const MAX_WIDTH = 1000 as const;

  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: "",
  };
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== "") {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }

  return lines;
};

const createOgp = async (dynamic:number): Promise<void> => {

  const WIDTH = 1200 as const;
  const HEIGHT = 630 as const;
  const DX = 0 as const;
  const DY = 0 as const;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  registerFont(path.resolve("./fonts/ipagp.ttf"), {
    family: "ipagp",
  });

  const backgroundImage = await loadImage(path.resolve("./public/ogp.jpg"));

  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);
  ctx.font = "60px ipagp";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const title = dynamic + "のページのOGPだよーーー";

  const lines = createTextLines(canvas, title);
  lines.forEach((line, index) => {
    const y = 314 + 80 * (index - (lines.length - 1) / 2);
    ctx.fillText(line, 600, y);
  });

  const buffer = canvas.toBuffer();
  fs.writeFileSync(path.resolve(`./public/ogp/${dynamic}.png`), buffer);

};

export default createOgp;
