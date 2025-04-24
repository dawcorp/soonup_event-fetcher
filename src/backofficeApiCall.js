import axios from "axios";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";
dotenv.config();

const api = axios.create({
  baseURL: process.env.SOONUP_BACKOFFICE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.SOONUP_BAKOFFICE_API_KEY}`,
  },
});

export const getAllEvents = async () => {
  try {
    const { data } = await api.get("/events");
    return data;
  } catch (error) {
    logger.error("Errore in getAllEvents:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const { data } = await api.post("/events", eventData);
    return data;
  } catch (error) {
    logger.error("Errore in createEvent:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      eventData: eventData,
    });
    throw error;
  }
};

export const deleteOldEvents = async () => {
  try {
    const { data } = await api.delete("/events");
    return data;
  } catch (error) {
    logger.error("Errore in deleteOldEvents:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};
