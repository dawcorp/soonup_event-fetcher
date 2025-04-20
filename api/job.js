import { callChatGPT } from "../src/callChatGPT.js";
import { saveJsonResponseToFile, saveToFile } from "../src/saveToFile.js";
import { logger } from "../src/logger.js";
import express from "express";
import { extractOutputJson } from "../src/utils.js";
import { createEvent } from "../src/apiCall.js";
import { encodeEvents } from "../src/eventEncoder.js";

const app = express();
const port = 3001;

app.get("/job", async (req, res) => {
  logger.info("Job avviato.");
  try {
    const response = await callChatGPT();
    logger.info("Risposta OpenAI eseguita");

    saveToFile(response);
    logger.info("Job eseguito e salvato");

    logger.info("Avvio estrazione output json");
    const outputJson = extractOutputJson(response);
    logger.info("Estrazione output json completata");
    saveJsonResponseToFile(outputJson);

    const encodedEvents = encodeEvents(outputJson);
    createEvent(encodedEvents);

    res.status(200).json({ message: "Job eseguito e salvato" });
  } catch (err) {
    logger.error("Errore job", { error: err.message });
    res.status(500).json({ error: "Errore durante esecuzione job" });
  }
  logger.info("Job terminato.");
  logger.info(
    "-------------------------------------------------------------------"
  );
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
