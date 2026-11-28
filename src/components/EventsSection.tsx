import React, { useState, useEffect, useMemo } from 'react';
import { EVENTS_DATA } from '../data/ebsbData';
import { EventItem } from '../types';
import { Calendar, MapPin, Clock, Search, Filter, CheckCircle, X, User, Mail, Phone, Check, Timer, Flame } from 'lucide-react';

interface CountdownBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isUrgent: boolean;
}

/**
 * Resolves a native Date object for an event's start timestamp.
 * If an event is marked "Upcoming" and its configured date has already passed
 * relative to the viewer's clock, rolls the year forward so the countdown stays live.
 */
function resolveEventTargetDate(ev: EventItem, referenceNow: Date): Date | null {
  if (ev.status !== 'Upcoming') return null;

  let parsed: Date | null = null;
  if (ev.targetDate) {
    const candidate = new Date(ev.targetDate);
    if (!Number.isNaN(candidate.getTime())) {
      parsed = candidate;
    }
  }

  if (!parsed) {
    // Fallback parsing for display date ranges like "December 12 - 18, 2026"
    const normalized = ev.date.replace(/\s*-\s*\d+/, '');
    const candidate = new Date(normalized);
    if (!Number.isNaN(candidate.getTime())) {
      parsed = candidate;
    }
  }

  if (!parsed) return null;

  const target = new Date(parsed.getTime());
  while (target.getTime() <= referenceNow.getTime()) {
    target.setFullYear(target.getFullYear() + 1);
  }
  return target;
}

function getCountdownBreakdown(targetDate: Date, currentNow: Date): CountdownBreakdown {
  const totalMs = Math.max(0, targetDate.getTime() - currentNow.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs,
    isUrgent: days <= 14,
  };
}

function padTwo(val: number): string {
  return String(val).padStart(2, '0');
}

export const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [registrationModalEvent, setRegistrationModalEvent] = useState<EventItem | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);

  // Live native Date ticker synchronized across all event countdowns
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  // Precompute stable target Date objects for all upcoming events
  const eventTargets = useMemo(() => {
    const initialNow = new Date();
    const map = new Map<string, Date>();
    EVENTS_DATA.forEach((ev) => {
      const target = resolveEventTargetDate(ev, initialNow);
      if (target) {
        map.set(ev.id, target);
      }
    });
    return map;
  }, []);

  // Identify the soonest upcoming event for the registration urgency banner
  const nextUpcomingEvent = useMemo(() => {
    const upcomingWithDates = EVENTS_DATA
      .filter((ev) => ev.status === 'Upcoming' && eventTargets.has(ev.id))
      .sort((a, b) => eventTargets.get(a.id)!.getTime() - eventTargets.get(b.id)!.getTime());
    return upcomingWithDates[0] ?? null;
  }, [eventTargets]);

  const nextSpotlightCountdown = nextUpcomingEvent
    ? getCountdownBreakdown(eventTargets.get(nextUpcomingEvent.id)!, now)
    : null;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    institution: 'IIT Indore',
    department: '',
    phone: '',
    state: 'Madhya Pradesh',
    dietary: 'None',
  });

  const categories = ['All', 'Youth Exchange', 'Bhasha Sangam', 'Cultural Night', 'Food Fest', 'Quiz'];

  const filteredEvents = EVENTS_DATA.filter((ev) => {
    const matchesCategory = activeCategory === 'All' || ev.category === activeCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setRegistrationModalEvent(null);
      setFormData({
        name: '',
        email: '',
        rollNo: '',
        institution: 'IIT Indore',
        department: '',
        phone: '',
        state: 'Madhya Pradesh',
        dietary: 'None',
      });
    }, 2500);
  };

  return (
    <section id="events" className="py-16 sm:py-24 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff2e6] text-[#b83d0d] border border-[#fed7ba] text-xs font-bold uppercase tracking-wider shadow-xs">
              EBSB Calendar & Youth Delegation
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#163c6b] tracking-tight">
              EBSB Events & Youth Exchanges
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Explore upcoming inter-state youth exchange programs, Bhasha Sangam workshops, food festivals, and cultural night archives at IIT Indore.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, venues..."
              className="w-full bg-white text-slate-900 text-xs pl-10 pr-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-[#f26522] transition-colors shadow-xs font-medium"
            />
          </div>
        </div>

        {/* Next Upcoming Event Live Countdown Spotlight */}
        {nextUpcomingEvent && nextSpotlightCountdown && (
          <div className="mt-8 rounded-2xl bg-[#163c6b] text-white border border-[#102847] shadow-lg overflow-hidden">
            <div className="h-1.5 w-full ebsb-tricolor-bar" />
            <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#f26522] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    <Flame className="w-3 h-3" />
                    {nextSpotlightCountdown.isUrgent ? 'Registration Closing Soon' : 'Next Upcoming Event'}
                  </span>
                  <span className="text-[11px] font-semibold text-orange-200">
                    {nextUpcomingEvent.date} • {nextUpcomingEvent.time}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {nextUpcomingEvent.title}
                </h3>
                <p className="text-xs text-slate-200 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#ff9933] shrink-0" />
                  <span>{nextUpcomingEvent.venue}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* 4-Unit Native Date Countdown Display */}
                <div
                  className="grid grid-cols-4 gap-2 text-center"
                  role="timer"
                  aria-live="off"
                  aria-label={`Time remaining until ${nextUpcomingEvent.title}`}
                >
                  {[
                    { value: padTwo(nextSpotlightCountdown.days), label: 'Days' },
                    { value: padTwo(nextSpotlightCountdown.hours), label: 'Hours' },
                    { value: padTwo(nextSpotlightCountdown.minutes), label: 'Mins' },
                    { value: padTwo(nextSpotlightCountdown.seconds), label: 'Secs' },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="min-w-[60px] sm:min-w-[68px] px-2.5 py-2 rounded-xl bg-[#102847] border border-white/15"
                    >
                      <div className="text-xl sm:text-2xl font-black text-[#ff9933] tabular-nums leading-none">
                        {unit.value}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

                {nextUpcomingEvent.registrationOpen && (
                  <button
                    onClick={() => setRegistrationModalEvent(nextUpcomingEvent)}
                    className="px-5 py-3 rounded-xl bg-[#f26522] hover:bg-[#dc4f12] text-white text-xs font-extrabold tracking-wide transition-colors shadow-md whitespace-nowrap"
                  >
                    Register Before Cutoff
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-[#f26522] mr-2 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#f26522] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:border-[#f26522] border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => {
            const targetDate = eventTargets.get(ev.id);
            const countdown = targetDate ? getCountdownBreakdown(targetDate, now) : null;

            return (
            <div
              key={ev.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-[#f26522] hover:shadow-lg transition-all overflow-hidden flex flex-col group shadow-sm"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102847]/75 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/95 text-[#163c6b] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {ev.category}
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm ${
                    ev.status === 'Upcoming'
                      ? 'bg-[#138808] text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    {ev.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#163c6b] group-hover:text-[#f26522] transition-colors line-clamp-2">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {ev.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="space-y-1.5 text-[11px] text-slate-600 font-semibold pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#f26522] shrink-0" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#163c6b] shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#138808] shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>

                {/* Live Countdown Widget for Upcoming Events */}
                {countdown && (
                  <div
                    className={`rounded-xl p-3 border space-y-2 ${
                      countdown.isUrgent
                        ? 'bg-[#fff7f2] border-[#fed7ba]'
                        : 'bg-[#f4f6f9] border-slate-200'
                    }`}
                    role="timer"
                    aria-label={`Countdown to ${ev.title}`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider">
                      <span className={`inline-flex items-center gap-1 ${countdown.isUrgent ? 'text-[#b83d0d]' : 'text-[#163c6b]'}`}>
                        <Timer className="w-3.5 h-3.5 text-[#f26522]" />
                        {ev.registrationOpen ? 'Registration Ends In' : 'Event Starts In'}
                      </span>
                      {countdown.isUrgent && (
                        <span className="text-[#f26522]">Filling Fast</span>
                      )}
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      {[
                        { value: padTwo(countdown.days), unit: 'Days' },
                        { value: padTwo(countdown.hours), unit: 'Hrs' },
                        { value: padTwo(countdown.minutes), unit: 'Min' },
                        { value: padTwo(countdown.seconds), unit: 'Sec' },
                      ].map((slot) => (
                        <div
                          key={slot.unit}
                          className="bg-white rounded-lg py-1.5 px-1 border border-slate-200/80 shadow-2xs"
                        >
                          <div className={`text-sm font-black tabular-nums leading-tight ${countdown.isUrgent ? 'text-[#b83d0d]' : 'text-[#163c6b]'}`}>
                            {slot.value}
                          </div>
                          <div className="text-[9px] font-bold uppercase text-slate-500">
                            {slot.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedEventModal(ev)}
                    className="px-4 py-2 rounded-full bg-[#f8f9fb] hover:bg-white text-xs text-[#163c6b] font-bold border border-slate-200 hover:border-[#163c6b] transition-colors"
                  >
                    View Details
                  </button>

                  {ev.registrationOpen && (
                    <button
                      onClick={() => setRegistrationModalEvent(ev)}
                      className="px-5 py-2 rounded-full bg-[#f26522] hover:bg-[#dc4f12] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      Register Now
                    </button>
                  )}
                </div>

              </div>
            </div>
            );
          })}
        </div>

        {/* View Details Modal */}
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full overflow-hidden relative max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900">
              <div className="h-1.5 w-full ebsb-tricolor-bar" />
              <div className="p-6 sm:p-8 space-y-6 relative">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-extrabold text-[#b83d0d] bg-[#fff2e6] px-3 py-1 rounded-full border border-[#fed7ba]">
                  {selectedEventModal.category}
                </span>
                <h3 className="text-2xl font-black text-[#163c6b]">{selectedEventModal.title}</h3>
              </div>

              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-56 object-cover rounded-xl shadow-sm"
                referrerPolicy="no-referrer"
              />

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {selectedEventModal.description}
              </p>

              {selectedEventModal.highlights && (
                <div className="space-y-2 bg-[#f8f9fb] p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-extrabold uppercase text-[#163c6b]">Key Event Highlights</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {selectedEventModal.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#138808] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                <div className="text-xs text-slate-600 font-medium">
                  Venue: <strong className="text-[#163c6b]">{selectedEventModal.venue}</strong>
                </div>
                {selectedEventModal.registrationOpen && (
                  <button
                    onClick={() => {
                      setRegistrationModalEvent(selectedEventModal);
                      setSelectedEventModal(null);
                    }}
                    className="px-6 py-3 rounded-full bg-[#f26522] text-white font-bold text-xs hover:bg-[#dc4f12] transition-colors shadow-sm"
                  >
                    Proceed to Registration
                  </button>
                )}
              </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Registration Modal Form */}
        {registrationModalEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden relative shadow-2xl text-slate-900">
              <div className="h-1.5 w-full ebsb-tricolor-bar" />
              <div className="p-6 sm:p-8 space-y-5 relative">
              <button
                onClick={() => setRegistrationModalEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#b83d0d]">Student & Delegate Registration</span>
                <h3 className="text-xl font-black text-[#163c6b] mt-1">{registrationModalEvent.title}</h3>
                <p className="text-xs text-slate-600 font-medium">Please complete the form below to secure your seat / delegation slot.</p>
                {eventTargets.has(registrationModalEvent.id) && (() => {
                  const modalCountdown = getCountdownBreakdown(eventTargets.get(registrationModalEvent.id)!, now);
                  return (
                    <div className="mt-3 flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-[#fff7f2] border border-[#fed7ba] text-xs">
                      <span className="inline-flex items-center gap-1.5 font-bold text-[#b83d0d]">
                        <Timer className="w-3.5 h-3.5 text-[#f26522]" />
                        Closes in
                      </span>
                      <span className="font-black text-[#163c6b] tabular-nums">
                        {padTwo(modalCountdown.days)}d : {padTwo(modalCountdown.hours)}h : {padTwo(modalCountdown.minutes)}m : {padTwo(modalCountdown.seconds)}s
                      </span>
                    </div>
                  );
                })()}
              </div>

              {registeredSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">Registration Confirmed!</h4>
                  <p className="text-xs text-emerald-800">
                    A confirmation email and event pass badge have been sent to <strong>{formData.email}</strong>. See you at {registrationModalEvent.venue}!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-white text-slate-900 pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="student@iiti.ac.in"
                          className="w-full bg-white text-slate-900 pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white text-slate-900 pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Institution / College</label>
                      <input
                        type="text"
                        required
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full bg-white text-slate-900 px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Home State / UT</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white text-slate-900 px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                      >
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Other State">Other Indian State</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#f26522] text-white font-bold text-xs hover:bg-[#dc4f12] transition-colors shadow-md"
                  >
                    Confirm Registration
                  </button>
                </form>
              )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
