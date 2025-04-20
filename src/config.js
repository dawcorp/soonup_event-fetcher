export const config = {
  openaiApiKey:
    "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", // Sostituisci con la tua vera chiave
  openaiUrl: "https://api.openai.com/v1/chat/completions",
  model: "gpt-4.1",
  prompt:
    "Dammi un elenco in formato JSON di eventi che si svolgeranno a Varese questo weekend. Cerca più eventi possibili ed elimina i doppioni.",
  content:
    "Rispondi solo con un json e nient'altro. Per ogni evento compila i seguenti campi: title, shortDescription, fullDescription (non più di 200 parole), externalLink, formattedAddress, startDate, endDate, startTime (se disponibile), endTime (se disponibile). Il json deve essere non formattato.",
};
