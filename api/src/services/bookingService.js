const eventRepository = require("../repositories/eventRepository");
const bookingRepository = require("../repositories/bookingRepository");

const bookingService = {
  createBooking({ eventId, name, email }) {
    // 1. Check event exists
    const event = eventRepository.findById(eventId);
    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    // 2. Check seats available
    if (event.availableSeats <= 0) {
      const error = new Error("No seats available for this event");
      error.statusCode = 409;
      throw error;
    }

    // 3. Prevent duplicate booking
    if (bookingRepository.exists(eventId, email)) {
      const error = new Error(
        "You have already booked a seat for this event"
      );
      error.statusCode = 409;
      throw error;
    }

    // 4. Create booking & decrement seat
    const booking = bookingRepository.create({ eventId, name, email });
    const updatedEvent = eventRepository.decrementSeat(eventId);

    return { booking, availableSeats: updatedEvent.availableSeats };
  },
};

module.exports = bookingService;
