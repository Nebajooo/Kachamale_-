import axios from "axios";

export async function getRoutesFromApi(startCity, destination, date) {
  const baseURL = "http://localhost:8080/booking/";

  try {
    const response = await axios.post(baseURL, {
      startCity,
      destination,
      date,
    });
    return response;
  } catch (error) {
    console.error("Error fetching routes:", error);
    return { data: { bus: [] } };
  }
}
