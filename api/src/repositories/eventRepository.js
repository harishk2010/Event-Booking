const { events } = require("../data/store");

const eventRepository = {
  findAll() {
    return [...events];
  },

  findById(id) {
    return events.find((e) => e.id === id) || null;
  },

  decrementSeat(id) {
    const event = events.find((e) => e.id === id);
    if (!event) return null;
    event.availableSeats -= 1;
    return event;
  },
};

module.exports = eventRepository;
