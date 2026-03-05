const { Router } = require("express");
const { body } = require("express-validator");
const eventController = require("../controllers/eventController");
const bookingController = require("../controllers/bookingController");

const router = Router();

// Event routes
router.get("/events", eventController.getAll);
router.get("/events/:id", eventController.getById);

// Booking routes
const bookingValidation = [
  body("eventId").notEmpty().withMessage("eventId is required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
];

router.post("/book", bookingValidation, bookingController.create);

module.exports = router;
