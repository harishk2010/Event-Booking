import { Badge } from "../ui/Badge";
import { formatDayMonth } from "../../utils/dateUtils";

function SeatIndicator({ available, total }) {
  const pct = total > 0 ? (available / total) * 100 : 0;
  const barColor =
    available === 0 ? "bg-red-400" : available <= 10 ? "bg-amber-400" : "bg-emerald-400";
  const label =
    available === 0 ? "Sold Out" : available <= 10 ? `Only ${available} left` : `${available} available`;
  const labelColor =
    available === 0 ? "text-red-500" : available <= 10 ? "text-amber-600" : "text-emerald-600";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${labelColor}`}>{label}</span>
        <span className="text-xs text-slate-400">{available}/{total}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function EventCard({ event, onClick }) {
  const { day, month } = formatDayMonth(event.date);
  const isSoldOut = event.availableSeats === 0;

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      aria-label={`View details for ${event.title}`}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-100 overflow-hidden
        hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-0.5
        active:scale-[0.99] transition-all duration-200 flex flex-col focus:outline-none
        focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      {/* Color accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: event.imageColor }} />

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Date tile + category */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center text-white font-display font-bold shadow-sm"
            style={{ backgroundColor: event.imageColor }}
          >
            <span className="text-lg leading-none">{day}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-90">{month}</span>
          </div>
          <Badge variant="default">{event.category}</Badge>
        </div>

        {/* Title & description */}
        <div className="flex-1">
          <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
            {event.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>

        {/* Seat bar */}
        <SeatIndicator available={event.availableSeats} total={event.totalSeats} />

        {/* Footer CTA hint */}
        <div className="flex items-center justify-between pt-1">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              isSoldOut
                ? "bg-slate-100 text-slate-400"
                : "bg-brand-50 text-brand-700 group-hover:bg-brand-100"
            }`}
          >
            {isSoldOut ? "Sold Out" : "View Details"}
          </span>
          <svg
            className="w-4 h-4 text-slate-300 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  );
}
