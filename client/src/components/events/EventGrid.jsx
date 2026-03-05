import { useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { EventCard } from "./EventCard";
import { EventDrawer } from "./EventDrawer";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-1 bg-slate-200 w-full" />
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-slate-200 rounded-xl" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 bg-slate-200 rounded w-2/3" />
            <div className="h-3 bg-slate-100 rounded w-1/3" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded" />
          <div className="h-3 bg-slate-100 rounded w-5/6" />
        </div>
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-1.5 bg-slate-100 rounded-full" />
        <div className="flex items-center justify-between">
          <div className="h-7 w-24 bg-slate-100 rounded-lg" />
          <div className="h-4 w-4 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-slate-700 text-lg">No events available</h3>
      <p className="text-slate-400 text-sm mt-1 max-w-xs">
        Check back soon — new events are added regularly.
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-slate-700 text-lg">Failed to load events</h3>
      <p className="text-slate-400 text-sm mt-1 max-w-xs">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
      >
        Try again
      </button>
    </div>
  );
}

export function EventGrid() {
  const { data: events, isLoading, isError, error, refetch } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : isError
          ? <ErrorState message={error.message} onRetry={refetch} />
          : events?.length === 0
          ? <EmptyState />
          : events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))
        }
      </div>

      <EventDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
