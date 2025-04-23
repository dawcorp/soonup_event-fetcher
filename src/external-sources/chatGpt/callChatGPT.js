import OpenAI from "openai";
import { config } from "./config.js";
import { logger } from "../../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callChatGPT(eventsJson) {
  try {
    const completionRequest = {
      model: config.model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: config.content,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: config.getPrompt("Varese", eventsJson),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "text",
        },
      },
      reasoning: {},
      tools: [
        {
          type: "web_search_preview",
          user_location: {
            type: "approximate",
            country: "IT",
            city: "Varese",
          },
          search_context_size: "medium",
        },
      ],
      temperature: 1,
      max_output_tokens: 8000,
      top_p: 1,
      store: true,
    };

    const completion = await openai.responses.create(completionRequest);

    logger.info("Risposta ricevuta da OpenAI");
    return completion;
  } catch (error) {
    logger.error("Errore chiamata OpenAI", { error: error.message });
    logger.error(error.message);
    throw error;
  }
}
