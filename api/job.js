import { callChatGPT } from "../src/external-sources/chatGpt/callChatGPT.js";
import { saveJsonResponseToFile, saveToFile } from "../src/utils/saveToFile.js";
import { logger } from "../src/utils/logger.js";
import express from "express";
import { extractOutputJson } from "../src/utils/utils.js";
import {
  createEvent,
  deleteOldEvents,
  getAllEvents,
} from "../src/backofficeApiCall.js";
import { encodeEvents } from "../src/utils/eventEncoder.js";

const app = express();
const port = 3001;

async function deleteOldEvents() {
  const deletedEvents = await deleteOldEvents();
  logger.info("Eventi eliminati");
  logger.info(deletedEvents);
  return deletedEvents;
}

async function fetchAllEvents() {
  const events = await getAllEvents();
  logger.info("Estrazione eventi da backoffice completata");
  return events;
}

async function processChatGPTResponse(events) {
  const response = await callChatGPT(JSON.stringify(events));
  logger.info("Risposta OpenAI eseguita");
  const responseJson = saveAndProcessResponse(response);
  return responseJson;
}

async function saveAndProcessResponse(response) {
  saveToFile(response);
  logger.info("Job eseguito e salvato");

  logger.info("Avvio estrazione output json");
  const outputJson = extractOutputJson(response);
  logger.info("Estrazione output json completata");
  saveJsonResponseToFile(outputJson);

  return outputJson;
}

async function createNewEvents(outputJson) {
  const encodedEvents = encodeEvents(outputJson);
  await createEvent(encodedEvents);
}

app.get("/job", async (req, res) => {
  logger.info("Job avviato.");
  try {
    await deleteOldEvents();
    const events = await fetchAllEvents();
    const outputJsonGPT = await processChatGPTResponse(events);
    await createNewEvents(outputJsonGPT);

    res.status(200).json({ message: "Job eseguito e salvato" });
  } catch (err) {
    logger.error("Errore job", { error: err.message });
    res.status(500).json({ error: "Errore durante esecuzione job" });
  }
  logger.info("Job terminato.");
  logger.info("--------------------------------------------------------------");
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
