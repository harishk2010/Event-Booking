const { validationResult } = require("express-validator");
const bookingService = require("../services/bookingService");

const bookingController = {
  create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { eventId, name, email } = req.body;
      const result = bookingService.createBooking({ eventId, name, email });

      res.status(201).json({
        success: true,
        message: "Booking confirmed successfully!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = bookingController;
