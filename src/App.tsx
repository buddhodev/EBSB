import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePageDashboard } from './components/HomePageDashboard';
import { PageHeaderBreadcrumb } from './components/PageHeaderBreadcrumb';
import { AboutSection } from './components/AboutSection';
import { PairedStateHub } from './components/PairedStateHub';
import { EventsSection } from './components/EventsSection';
import { BhashaSangamHub } from './components/BhashaSangamHub';
import { GallerySection } from './components/GallerySection';
import { TeamContactSection } from './components/TeamContactSection';
import { CulturalMapSection } from './components/CulturalMapSection';
import { SanskritHub } from './components/SanskritHub';
import { Footer } from './components/Footer';
import { AiCulturalGuideModal } from './components/AiCulturalGuideModal';
import { AccessibilitySettings } from './types';
import { Search, X, Heart, CheckCircle2, User, Mail, Phone, School, Compass, Sparkles, BookOpen } from 'lucide-react';
import { PAIRED_STATES_DATA, EVENTS_DATA, BHASHA_PHRASES } from './data/ebsbData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Accessibility State
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSizeMultiplier: 1.0,
    reducedMotion: false,
    dyslexicFont: false,
  });

  // Modal States
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalTab, setAiModalTab] = useState<'assistant' | 'quiz'>('assistant');
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');

  const [volunteerModalOpen, setVolunteerModalOpen] = useState<boolean>(false);
  const [volunteerSuccess, setVolunteerSuccess] = useState<boolean>(false);
  const [volunteerData, setVolunteerData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNo: '',
    department: 'Computer Science',
    year: 'B.Tech 2nd Year',
    preferredCell: 'Youth Delegation Hosting',
  });

  // Handler for opening AI modal
  const handleOpenAiModal = (tab: 'assistant' | 'quiz' = 'assistant', initialQuery: string = '') => {
    setAiModalTab(tab);
    setAiInitialQuery(initialQuery);
    setAiModalOpen(true);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSuccess(true);
    setTimeout(() => {
      setVolunteerSuccess(false);
      setVolunteerModalOpen(false);
      setVolunteerData({
        name: '',
        email: '',
        phone: '',
        rollNo: '',
        department: 'Computer Science',
        year: 'B.Tech 2nd Year',
        preferredCell: 'Youth Delegation Hosting',
      });
    }, 2500);
  };

  // Filtered search results across entire portal
  const searchResultsState = PAIRED_STATES_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      s.overview.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      s.majorFestivals.some((f) => f.toLowerCase().includes(globalSearchTerm.toLowerCase()))
  );

  const searchResultsEvents = EVENTS_DATA.filter(
    (e) =>
      e.title.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(globalSearchTerm.toLowerCase())
  );

  const searchResultsPhrases = BHASHA_PHRASES.filter(
    (p) =>
      p.english.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      p.hindi.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      p.manipuri.toLowerCase().includes(globalSearchTerm.toLowerCase())
  );

  return (
    <div
      style={{ fontSize: `${accessibility.fontSizeMultiplier * 100}%` }}
      className={`min-h-screen font-sans selection:bg-indigo-600 selection:text-white ${
        accessibility.highContrast ? 'bg-black text-yellow-300' : 'bg-gradient-to-br from-indigo-50 via-amber-50/40 to-orange-50/60 text-slate-900'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
        onOpenAiModal={handleOpenAiModal}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenVolunteerModal={() => setVolunteerModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="min-h-[75vh]">
        {activeSection === 'home' && (
          <HomePageDashboard
            onNavigate={(id) => {
              setActiveSection(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiModal={handleOpenAiModal}
            onOpenVolunteerModal={() => setVolunteerModalOpen(true)}
          />
        )}

        {activeSection === 'about' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="About EBSB Cell & Mandate"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <AboutSection />
          </div>
        )}

        {activeSection === 'paired-states' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="Paired States Hub (MP ↔ Manipur/Nagaland)"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <PairedStateHub onOpenAiModal={handleOpenAiModal} />
          </div>
        )}

        {activeSection === 'cultural-map' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="Interactive EBSB Cultural Map"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <CulturalMapSection />
          </div>
        )}

        {activeSection === 'events' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="Youth Exchange & Events Calendar"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <EventsSection />
          </div>
        )}

        {activeSection === 'bhasha-sangam' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="Bhasha Sangam Language Hub"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <BhashaSangamHub />
          </div>
        )}

        {activeSection === 'sanskrit-hub' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="Sanskrit Language & Heritage Hub"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <SanskritHub onOpenAiModal={handleOpenAiModal} />
          </div>
        )}

        {activeSection === 'gallery' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="Media Gallery & Student Stories"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <GallerySection />
          </div>
        )}

        {activeSection === 'team-contact' && (
          <div>
            <PageHeaderBreadcrumb
              pageTitle="EBSB Committee & Contact Desk"
              onGoHome={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <TeamContactSection onOpenVolunteerModal={() => setVolunteerModalOpen(true)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* MODAL 1: AI Cultural Assistant & Quiz Modal */}
      <AiCulturalGuideModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialTab={aiModalTab}
        initialQuery={aiInitialQuery}
      />

      {/* MODAL 2: Global Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl text-slate-900">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-orange-700">Portal Directory Search</span>
              <h3 className="text-xl font-black text-indigo-950">Search IITI EBSB Portal</h3>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={globalSearchTerm}
                onChange={(e) => setGlobalSearchTerm(e.target.value)}
                placeholder="Search states, food, festivals, events, languages..."
                className="w-full bg-white text-slate-900 text-sm pl-11 pr-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-indigo-600 shadow-sm"
              />
            </div>

            {/* Search Results Display */}
            {globalSearchTerm.trim() && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs font-medium">
                
                {/* States Results */}
                {searchResultsState.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-orange-800 border-b border-slate-200 pb-1">
                      States & Culture ({searchResultsState.length})
                    </div>
                    {searchResultsState.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          setActiveSection('paired-states');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-3 rounded-2xl bg-white/70 hover:bg-white cursor-pointer border border-slate-200 shadow-sm flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-indigo-950">{st.name} ({st.type})</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-md">{st.overview}</div>
                        </div>
                        <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Events Results */}
                {searchResultsEvents.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-indigo-900 border-b border-slate-200 pb-1">
                      Events & Youth Exchanges ({searchResultsEvents.length})
                    </div>
                    {searchResultsEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          setActiveSection('events');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-3 rounded-2xl bg-white/70 hover:bg-white cursor-pointer border border-slate-200 shadow-sm flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-indigo-950">{ev.title}</div>
                          <div className="text-[11px] text-slate-500">{ev.date} • {ev.venue}</div>
                        </div>
                        <span className="text-[10px] bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full font-extrabold border border-orange-200">{ev.status}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Phrases Results */}
                {searchResultsPhrases.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-rose-800 border-b border-slate-200 pb-1">
                      Bhasha Sangam Phrases ({searchResultsPhrases.length})
                    </div>
                    {searchResultsPhrases.map((ph) => (
                      <div
                        key={ph.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          setActiveSection('bhasha-sangam');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-3 rounded-2xl bg-white/70 hover:bg-white cursor-pointer border border-slate-200 shadow-sm space-y-1"
                      >
                        <div className="font-bold text-indigo-950">{ph.english}</div>
                        <div className="text-[11px] text-slate-600">Hindi: {ph.hindi} | Manipuri: {ph.manipuri}</div>
                      </div>
                    ))}
                  </div>
                )}

                {searchResultsState.length === 0 && searchResultsEvents.length === 0 && searchResultsPhrases.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No matching records found for "{globalSearchTerm}". Try searching "Manipur", "Food", or "Exchange".
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Volunteer Registration Modal */}
      {volunteerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 relative shadow-2xl text-slate-900">
            <button
              onClick={() => setVolunteerModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase border border-orange-200 mb-2">
                Student Crew Application
              </div>
              <h3 className="text-xl font-black text-indigo-950">Join IIT Indore EBSB Volunteer Team</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Help organize inter-state youth delegations, cultural nights, food carnivals, and Bhasha Sangam workshops!
              </p>
            </div>

            {volunteerSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Application Submitted!</h4>
                <p className="text-xs text-emerald-800 font-medium">
                  Welcome aboard, {volunteerData.name}! The EBSB Student Nodal Desk will reach out via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={volunteerData.name}
                    onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })}
                    placeholder="e.g. Anish Malhotra"
                    className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email ID</label>
                    <input
                      type="email"
                      required
                      value={volunteerData.email}
                      onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                      placeholder="anish@iiti.ac.in"
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={volunteerData.rollNo}
                      onChange={(e) => setVolunteerData({ ...volunteerData, rollNo: e.target.value })}
                      placeholder="e.g. 230001015"
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Department</label>
                    <input
                      type="text"
                      required
                      value={volunteerData.department}
                      onChange={(e) => setVolunteerData({ ...volunteerData, department: e.target.value })}
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Preferred Cell Role</label>
                    <select
                      value={volunteerData.preferredCell}
                      onChange={(e) => setVolunteerData({ ...volunteerData, preferredCell: e.target.value })}
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="Youth Delegation Hosting">Youth Delegation Hosting</option>
                      <option value="Bhasha Sangam Circle">Bhasha Sangam Circle</option>
                      <option value="Cultural Stage & Events">Cultural Stage & Music</option>
                      <option value="Media & Graphic Design">Media & Graphic Design</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Submit Volunteer Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
