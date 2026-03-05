const { bookings } = require("../data/store");
const { v4: uuidv4 } = require("uuid");

const bookingRepository = {
  exists(eventId, email) {
    const key = `${eventId}_${email.toLowerCase()}`;
    return bookings.has(key);
  },

  create({ eventId, name, email }) {
    const key = `${eventId}_${email.toLowerCase()}`;
    const booking = {
      id: uuidv4(),
      eventId,
      name,
      email: email.toLowerCase(),
      bookedAt: new Date().toISOString(),
    };
    bookings.set(key, booking);
    return booking;
  },
};

module.exports = bookingRepository;
