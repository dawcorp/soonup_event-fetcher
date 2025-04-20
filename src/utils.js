import { logger } from "./logger.js";

/**
 * Estrae il JSON di output dalla response di OpenAI
 * @param {Object} response - La response completa di OpenAI
 * @returns {Object} - Il JSON di output parsato
 */
export function extractOutputJson(response) {
  logger.info("extract avviato");
  try {
    // Verifica se la response ha la struttura corretta
    if (!response) {
      throw new Error("Response è null o undefined");
    }
    if (!response.output_text) {
      throw new Error("Response non ha il campo output_text");
    }

    const textToParse = response.output_text;
    logger.info("Testo da parsare:", textToParse);

    try {
      // Parsa il JSON contenuto nel campo text
      const outputJson = JSON.parse(
        JSON.parse(JSON.stringify(response.output_text))
      );
      logger.info("JSON parsato con successo");
      return outputJson;
    } catch (parseError) {
      logger.error("Errore durante il parsing del JSON:");
      logger.error(parseError);
      logger.error("Testo che ha causato l'errore:");
      logger.error(textToParse);
      throw new Error(`Errore di parsing JSON: ${parseError.message}`);
    }
  } catch (error) {
    logger.error("Errore durante l'estrazione del JSON:", error);
    logger.error("Stack trace:", error.stack);
    throw error;
  }
}
