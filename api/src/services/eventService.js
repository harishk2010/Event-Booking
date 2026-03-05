const eventRepository = require("../repositories/eventRepository");

const eventService = {
  getAllEvents() {
    return eventRepository.findAll();
  },

  getEventById(id) {
    const event = eventRepository.findById(id);
    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }
    return event;
  },
};

module.exports = eventService;
