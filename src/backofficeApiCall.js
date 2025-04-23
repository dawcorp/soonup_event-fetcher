import dotenv from "dotenv";
dotenv.config();

const SOONUP_BACKOFFICE_API_BASE_URL =
  process.env.SOONUP_BACKOFFICE_API_BASE_URL;
const SOONUP_BAKOFFICE_API_KEY = process.env.SOONUP_BAKOFFICE_API_KEY;

export const getAllEvents = async () => {
  const response = await fetch(`${SOONUP_BACKOFFICE_API_BASE_URL}/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${SOONUP_BAKOFFICE_API_KEY}`,
    },
  });
  return response.json();
};

export const createEvent = async (eventData) => {
  const response = await fetch(`${SOONUP_BACKOFFICE_API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SOONUP_BAKOFFICE_API_KEY}`,
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const deleteOldEvents = async () => {
  const response = await fetch(`${SOONUP_BACKOFFICE_API_BASE_URL}/events`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${SOONUP_BAKOFFICE_API_KEY}`,
    },
  });
  return response.json();
};
