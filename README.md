# ChatGPT Event Fetcher

Questo progetto utilizza diverse fonti per ottenere una lista di eventi e salvarli sul database di soonup (in cloud), tramite le api del backoffice soonup.

## Funzionalità

- Chiama API esterne per ottenere informazioni sugli eventi
- Salva le risposte in formato JSON
- Espone un endpoint API per avviare il processo di fetch
- Logging dettagliato delle operazioni

## Struttura del Progetto

```
├── api/
│   └── job.js              # Endpoint principale per l'avvio del job
├── src/
│   ├── external-sources/   # Integrazioni con fonti esterne
│   │   ├── chatGpt/       # Integrazione con OpenAI
│   │   └── eventbrite/    # Integrazione con Eventbrite (in preparazione)
│   ├── utils/             # Utility functions
│   │   ├── saveToFile.js  # Gestione salvataggio file
│   │   ├── logger.js      # Configurazione logging
│   │   ├── utils.js       # Funzioni di utilità
│   │   └── eventEncoder.js # Codifica eventi
│   └── backofficeApiCall.js # Chiamate API al backoffice
```

## Fonti di Dati

### OpenAI (ChatGPT)
- Endpoint: `/api/job`
- Costo medio per chiamata: €0.05 - €0.10
- Utilizza l'API di ChatGPT per generare informazioni sugli eventi
- La risposta viene salvata in formato JSON e processata

### Eventbrite (In preparazione)
- Integrazione in fase di sviluppo
- Permetterà di ottenere eventi direttamente dalla piattaforma Eventbrite
- Sarà possibile combinare i dati con quelli di altre fonti

## Prerequisiti

- Node.js (versione 14 o superiore)
- npm (Node Package Manager)
- Chiavi API valide per i servizi utilizzati

## Installazione

1. Clona il repository
2. Installa le dipendenze:
```bash
npm install
```

## Utilizzo

1. Avvia il server:
```bash
npm run dev
```

2. In un altro terminale, avvia il job per ottenere gli eventi:
```bash
curl http://localhost:3001/job
```

## Logging

I log vengono salvati nella directory `logs/` e sono formattati in modo leggibile grazie a `pino-pretty`.

## Note

Assicurati di avere configurato correttamente le variabili d'ambiente necessarie per le API prima di avviare il progetto:

SOONUP_BACKOFFICE_API_BASE_URL
SOONUP_BAKOFFICE_API_KEY
OPENAI_API_KEY
DEBUG_MODE


## Debug

Per abilitare il debugging nella cartella /logs ed in console impostare DEBUG_MODE=TRUE sul file .env