import { EventGrid } from "../components/events/EventGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-violet-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-md shadow-purple-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
            EventHub
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Live availability
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Discover & Book
              <br />
              <span className="text-brand-600">Tech Events</span>
            </h1>
            <p className="mt-4 text-slate-500 text-lg leading-relaxed">
              Reserve your seat at the industry's top conferences, workshops, and summits. Seats fill fast — book yours today.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Upcoming Events
          </h2>
        </div>
        <EventGrid />
      </section>
    </main>
  );
}
