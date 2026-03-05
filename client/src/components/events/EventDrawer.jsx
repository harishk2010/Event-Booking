import { useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { BookingForm } from "../booking/BookingForm";
import { formatEventDate, formatDayMonth } from "../../utils/dateUtils";

function SeatIndicator({ available, total }) {
  const pct = total > 0 ? (available / total) * 100 : 0;
  const variant =
    available === 0 ? "danger" : available <= 10 ? "warning" : "success";
  const barColor =
    available === 0
      ? "bg-red-400"
      : available <= 10
      ? "bg-amber-400"
      : "bg-emerald-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant={variant}>
          {available === 0
            ? "Sold Out"
            : available <= 10
            ? `Only ${available} left`
            : `${available} seats available`}
        </Badge>
        <span className="text-xs text-slate-400 font-medium">
          {available} / {total} seats
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function EventDrawer({ event, onClose }) {
  const [showBooking, setShowBooking] = useState(false);
  const [visible, setVisible] = useState(false);
  const isOpen = !!event;
  const isSoldOut = event?.availableSeats === 0;

  // Animate in
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset booking view when event changes
  useEffect(() => {
    setShowBooking(false);
  }, [event?.id]);

  // Keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { day, month } = formatDayMonth(event.date);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex flex-col w-full max-w-md bg-white h-full shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Colored top bar */}
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ backgroundColor: event.imageColor }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {showBooking && (
              <button
                onClick={() => setShowBooking(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Back to details"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <span className="text-sm font-semibold text-slate-500">
              {showBooking ? "Reserve Your Seat" : "Event Details"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {!showBooking ? (
            /* ── Detail view ── */
            <div className="px-6 py-6 space-y-6">
              {/* Date badge + category */}
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white font-display font-bold shadow-md"
                  style={{ backgroundColor: event.imageColor }}
                >
                  <span className="text-xl leading-none">{day}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-90 mt-0.5">
                    {month}
                  </span>
                </div>
                <Badge variant="default" className="mt-1">{event.category}</Badge>
              </div>

              {/* Title */}
              <div>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-tight">
                  {event.title}
                </h2>
              </div>

              {/* Meta info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${event.imageColor}18` }}
                  >
                    <svg className="w-4 h-4" style={{ color: event.imageColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>{formatEventDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${event.imageColor}18` }}
                  >
                    <svg className="w-4 h-4" style={{ color: event.imageColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  About this event
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Seat availability */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Availability
                </h3>
                <SeatIndicator available={event.availableSeats} total={event.totalSeats} />
              </div>
            </div>
          ) : (
            /* ── Booking form view ── */
            <div className="px-6 py-6">
              <BookingForm event={event} onClose={onClose} />
            </div>
          )}
        </div>

        {/* Sticky footer CTA — only in detail view */}
        {!showBooking && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-slate-100 bg-white">
            <Button
              variant={isSoldOut ? "secondary" : "primary"}
              disabled={isSoldOut}
              onClick={() => setShowBooking(true)}
              className="w-full"
              size="lg"
            >
              {isSoldOut ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Sold Out
                </>
              ) : (
                <>
                  Reserve Your Seat
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
