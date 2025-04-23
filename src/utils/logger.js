import pino from "pino";
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const baseLogger = pino({
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

// Wrapper per i metodi di log che controlla DEBUG_MODE
const logger = {
  info: (...args) => {
    if (process.env.DEBUG_MODE === "TRUE") {
      baseLogger.info(...args);
    }
  },
  error: (...args) => {
    if (process.env.DEBUG_MODE === "TRUE") {
      baseLogger.error(...args);
    }
  },
  // Manteniamo gli altri metodi di pino senza modifiche
  warn: (...args) => baseLogger.warn(...args),
  debug: (...args) => baseLogger.debug(...args),
  trace: (...args) => baseLogger.trace(...args),
  fatal: (...args) => baseLogger.fatal(...args),
};

export { logger };
