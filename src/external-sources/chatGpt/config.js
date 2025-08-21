export const config = {
    openaiApiKey:
      "xxxxxx", // Sostituisci con la tua vera chiave
    openaiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4.1",
    getPrompt: (city, eventsJson) =>
      `Genera un array JSON non formattato con eventi pubblici che si svolgeranno a ${city} questo weekend e nei prossimi giorni. Includi quanti più eventi unici possibile, evitando duplicati. NON inserire eventi già presenti in questo JSON: ${eventsJson}. Per ogni evento fornisci ESATTAMENTE questi campi: title, shortDescription, fullDescription (max 200 parole), externalLink, formattedAddress, startDate (YYYY-MM-DD), endDate (YYYY-MM-DD), startTime (HH:MM, se disponibile), endTime (HH:MM, se disponibile)."`,
    content:
      "Sei un assistente che restituisce solo esclusivamente JSON grezzo, senza alcun codice markdown, intestazioni, spaziature, né ```json o ```, senza spiegazioni extra, rispettando esattamente le specifiche sui campi.",
  };