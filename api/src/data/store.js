const { v4: uuidv4 } = require("uuid");

const events = [
  {
    id: uuidv4(),
    title: "React Summit 2025",
    date: "2025-08-15T09:00:00.000Z",
    location: "Amsterdam, Netherlands",
    description:
      "The biggest React conference in Europe featuring top speakers from the community.",
    totalSeats: 200,
    availableSeats: 42,
    category: "Technology",
    imageColor: "#6366f1",
  },
  {
    id: uuidv4(),
    title: "Node.js Global Summit",
    date: "2025-09-10T10:00:00.000Z",
    location: "San Francisco, CA",
    description:
      "Explore the latest advancements in Node.js ecosystem with world-class engineers.",
    totalSeats: 150,
    availableSeats: 0,
    category: "Technology",
    imageColor: "#10b981",
  },
  {
    id: uuidv4(),
    title: "Design Systems Workshop",
    date: "2025-09-22T13:00:00.000Z",
    location: "London, UK",
    description:
      "A hands-on workshop diving deep into building scalable design systems.",
    totalSeats: 50,
    availableSeats: 8,
    category: "Design",
    imageColor: "#f59e0b",
  },
  {
    id: uuidv4(),
    title: "Cloud Architecture Conference",
    date: "2025-10-05T08:30:00.000Z",
    location: "Berlin, Germany",
    description:
      "Deep dive into microservices, Kubernetes, and modern cloud infrastructure.",
    totalSeats: 300,
    availableSeats: 175,
    category: "DevOps",
    imageColor: "#3b82f6",
  },
  {
    id: uuidv4(),
    title: "AI & ML Practitioners Day",
    date: "2025-10-18T09:00:00.000Z",
    location: "Toronto, Canada",
    description:
      "Practical AI/ML applications for engineers and product teams.",
    totalSeats: 120,
    availableSeats: 60,
    category: "AI/ML",
    imageColor: "#ec4899",
  },
  {
    id: uuidv4(),
    title: "Frontend Performance Bootcamp",
    date: "2025-11-03T10:00:00.000Z",
    location: "Online",
    description:
      "Master web vitals, bundle optimization, and rendering strategies.",
    totalSeats: 80,
    availableSeats: 25,
    category: "Technology",
    imageColor: "#8b5cf6",
  },
];

// Store bookings: { eventId_email: true }
const bookings = new Map();

module.exports = { events, bookings };
