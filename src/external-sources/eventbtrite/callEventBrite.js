// eventbrite.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://www.eventbriteapi.com/v3/events/search/";
const TOKEN = process.env.EVENTBRITE_API_KEY;

if (!TOKEN) {
  console.error("⚠️  EVENTBRITE_API_KEY mancante nel .env");
  process.exit(1);
}

const getEventiEventbrite = async () => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        "location.address": "Provincia di Varese, Italia",
        "location.within": "30km",
        expand: "venue",
        sort_by: "date",
      },
    });

    const eventi = res.data.events.map((e) => ({
      nome: e.name.text,
      inizio: e.start.local,
      luogo:
        e.venue?.address?.localized_address_display || "Luogo non disponibile",
      url: e.url,
    }));

    console.log(eventi);
    return eventi;
  } catch (err) {
    console.error(
      "Errore nella chiamata Eventbrite:",
      err.response?.data || err.message
    );
  }
};

getEventiEventbrite();
