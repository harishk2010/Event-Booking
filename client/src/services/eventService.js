import apiClient from "./apiClient";

export const eventService = {
  async getEvents() {
    const { data } = await apiClient.get("/events");
    return data.data;
  },
};

export const bookingService = {
  async createBooking(payload) {
    const { data } = await apiClient.post("/book", payload);
    return data;
  },
};
