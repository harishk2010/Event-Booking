const eventService = require("../services/eventService");

const eventController = {
  getAll(req, res, next) {
    try {
      const events = eventService.getAllEvents();
      res.json({ success: true, data: events });
    } catch (err) {
      next(err);
    }
  },

  getById(req, res, next) {
    try {
      const event = eventService.getEventById(req.params.id);
      res.json({ success: true, data: event });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = eventController;
