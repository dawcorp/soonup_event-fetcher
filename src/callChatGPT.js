import OpenAI from "openai";
import { config } from "./config.js";
import { logger } from "./logger.js";

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export async function callChatGPT() {
  try {
    const completion = await openai.responses.create({
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
              text: config.prompt,
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
    });

    logger.info("Risposta ricevuta da OpenAI");
    return completion;
  } catch (error) {
    logger.error("Errore chiamata OpenAI", { error: error.message });
    logger.error(error.message);
    throw error;
  }
}
