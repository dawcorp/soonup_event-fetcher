import fs from "fs";
import path from "path";
import { logger } from "./logger.js";

export function saveToFile(content) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(
    process.cwd(),
    "logs",
    `${timestamp}_response.json`
  );
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  logger.info(`Risposta salvata su file: ${filePath}`);
}

export function saveJsonResponseToFile(response) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(
    process.cwd(),
    "logs",
    `${timestamp}_json_response.json`
  );
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2));
  logger.info(`Risposta salvata su file: ${filePath}`);
}
