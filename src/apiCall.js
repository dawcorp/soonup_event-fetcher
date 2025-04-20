const API_BASE_URL = "http://localhost:3000/api";
const API_KEY = "EbtKe0eJLCCXY4FHPkrWCtlt4Uh/lVbyTvkNpb+mQb4=";

export const getAllEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.json();
};

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
};
