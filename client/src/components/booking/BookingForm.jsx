import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useBooking } from "../../hooks/useBooking";

function validate({ name, email }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required";
  else if (name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address";
  return errors;
}

export function BookingForm({ event, onClose }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const { mutate, isPending } = useBooking({ onSuccess: onClose });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    mutate({ eventId: event.id, name: form.name.trim(), email: form.email.trim() });
  };

  return (
    <div>
      {/* Event summary */}
      <div className="mb-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-0.5">
          Booking for
        </p>
        <p className="font-semibold text-slate-800">{event.title}</p>
        <p className="text-sm text-slate-500 mt-0.5">
          {event.availableSeats} seat{event.availableSeats !== 1 ? "s" : ""} remaining
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          id="name"
          name="name"
          label="Full Name"
          placeholder="Jane Smith"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          autoFocus
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            loading={isPending}
          >
            Confirm Booking
          </Button>
        </div>
      </form>
    </div>
  );
}
