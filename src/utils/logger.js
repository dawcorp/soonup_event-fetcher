import pino from "pino";
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export const logger = pino({
  level: "info",
  transport: {
    targets: [
      {
        target: "pino/file",
        options: { destination: path.join(logDir, "app.log") },
      },
      {
        target: "pino-pretty", // log anche su console leggibili
        options: { colorize: true },
      },
    ],
  },
});
