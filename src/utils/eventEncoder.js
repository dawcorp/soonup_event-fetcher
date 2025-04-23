/**
 * Codifica un evento nel formato corretto per il backend
 * @param {Object} event - L'evento da codificare
 * @returns {Object} - L'evento codificato
 */
export function encodeEvent(event) {
  return {
    title: event.title,
    shortDescription: event.shortDescription,
    fullDescription: event.fullDescription,
    externalLink: event.externalLink,
    formattedAddress: event.formattedAddress,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    startTime: event.startTime || undefined,
    endTime: event.endTime || undefined,
    status: "pending", // Valore di default per lo status
  };
}

/**
 * Codifica un array di eventi
 * @param {Array} events - Array di eventi da codificare
 * @returns {Array} - Array di eventi codificati
 */
export function encodeEvents(events) {
  return events.map((event) => encodeEvent(event));
}
