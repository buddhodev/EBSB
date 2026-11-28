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
import { QuickActionsMenu } from './components/QuickActionsMenu';
import { useAuth, PreferredCellOption } from './contexts/AuthContext';
import { AccessibilitySettings } from './types';
import { Search, X, CheckCircle2, Compass, LogIn, Loader2, AlertCircle } from 'lucide-react';
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

  const {
    user,
    signingIn,
    authError,
    volunteerApplications,
    signInWithGoogle,
    submitVolunteerApplication,
  } = useAuth();

  const [volunteerModalOpen, setVolunteerModalOpen] = useState<boolean>(false);
  const [volunteerSuccess, setVolunteerSuccess] = useState<boolean>(false);
  const [submittingVolunteer, setSubmittingVolunteer] = useState<boolean>(false);
  const [volunteerError, setVolunteerError] = useState<string | null>(null);
  const [volunteerData, setVolunteerData] = useState<{
    name: string;
    email: string;
    rollNo: string;
    department: string;
    preferredCell: PreferredCellOption;
  }>({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science',
    preferredCell: 'Youth Delegation Hosting',
  });

  useEffect(() => {
    if (user && volunteerModalOpen) {
      setVolunteerData((prev) => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user, volunteerModalOpen]);

  // Handler for opening AI modal
  const handleOpenAiModal = (tab: 'assistant' | 'quiz' = 'assistant', initialQuery: string = '') => {
    setAiModalTab(tab);
    setAiInitialQuery(initialQuery);
    setAiModalOpen(true);
  };

  const handleOpenVolunteerModal = () => {
    setVolunteerError(null);
    setVolunteerSuccess(false);
    setVolunteerModalOpen(true);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerError(null);
    setSubmittingVolunteer(true);

    try {
      await submitVolunteerApplication({
        name: volunteerData.name,
        email: volunteerData.email,
        rollNo: volunteerData.rollNo,
        department: volunteerData.department,
        preferredCell: volunteerData.preferredCell,
      });
      setVolunteerSuccess(true);
      setVolunteerData((prev) => ({
        ...prev,
        rollNo: '',
        preferredCell: 'Youth Delegation Hosting',
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to submit your application right now.';
      setVolunteerError(msg.startsWith('{') ? 'Permission or validation error while submitting. Please verify your inputs and sign-in status.' : msg);
    } finally {
      setSubmittingVolunteer(false);
    }
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
      className={`min-h-screen font-sans selection:bg-[#f26522] selection:text-white ${
        accessibility.highContrast ? 'bg-black text-yellow-300' : 'frosted-bg text-slate-900'
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
        onOpenVolunteerModal={handleOpenVolunteerModal}
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
            onOpenVolunteerModal={handleOpenVolunteerModal}
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
            <TeamContactSection onOpenVolunteerModal={handleOpenVolunteerModal} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Actions Menu (Bottom-Right) */}
      <QuickActionsMenu
        onOpenBhashaQuiz={() => handleOpenAiModal('quiz')}
        onOpenVolunteerApplication={handleOpenVolunteerModal}
        onOpenCulturalGuide={() => handleOpenAiModal('assistant')}
      />

      {/* MODAL 1: AI Cultural Assistant & Quiz Modal */}
      <AiCulturalGuideModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialTab={aiModalTab}
        initialQuery={aiInitialQuery}
      />

      {/* MODAL 2: Global Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full overflow-hidden relative shadow-2xl text-slate-900">
            <div className="h-1.5 w-full ebsb-tricolor-bar" />
            <div className="p-6 space-y-6 relative">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#b83d0d]">Portal Directory Search</span>
              <h3 className="text-xl font-black text-[#163c6b]">Search IITI EBSB Portal</h3>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={globalSearchTerm}
                onChange={(e) => setGlobalSearchTerm(e.target.value)}
                placeholder="Search states, food, festivals, events, languages..."
                className="w-full bg-white text-slate-900 text-sm pl-11 pr-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-[#f26522] shadow-xs"
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
        </div>
      )}

      {/* MODAL 3: Volunteer Registration Modal */}
      {volunteerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden relative shadow-2xl text-slate-900">
            <div className="h-1.5 w-full ebsb-tricolor-bar" />
            <div className="p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setVolunteerModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fff2e6] text-[#b83d0d] text-[10px] font-extrabold uppercase border border-[#fed7ba] mb-2">
                Student Crew Application
              </div>
              <h3 className="text-xl font-black text-[#163c6b]">Join IIT Indore EBSB Volunteer Team</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Help organize inter-state youth delegations, cultural nights, food carnivals, and Bhasha Sangam workshops!
              </p>
            </div>

            {!user ? (
              <div className="p-6 rounded-2xl bg-[#f4f6f9] border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#163c6b]/10 text-[#163c6b] flex items-center justify-center mx-auto">
                  <LogIn className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-[#163c6b]">Sign in Required to Apply</h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Sign in with your Google account so your volunteer application is securely linked to your profile and you can track your submission status.
                  </p>
                </div>

                {authError && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="button"
                  disabled={signingIn}
                  onClick={() => void signInWithGoogle()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f26522] hover:bg-[#dc4f12] disabled:opacity-60 text-white font-bold text-xs shadow-md transition-colors"
                >
                  {signingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign in with Google to Apply</span>
                    </>
                  )}
                </button>
              </div>
            ) : volunteerSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#138808] mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Application Saved!</h4>
                <p className="text-xs text-emerald-800 font-medium">
                  Welcome aboard, {volunteerData.name || user.displayName}! Your application is stored with the IIT Indore EBSB Nodal Desk.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setVolunteerSuccess(false);
                    setVolunteerModalOpen(false);
                  }}
                  className="mt-2 px-5 py-2 rounded-full bg-[#163c6b] hover:bg-[#102847] text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Signed-in Banner */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f4f6f9] border border-slate-200 text-xs">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-[#f26522]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#163c6b] text-white font-bold text-[11px] flex items-center justify-center">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-[#163c6b] truncate">Applying as {user.displayName || 'Verified User'}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  </div>
                </div>

                {/* Previously Submitted Applications */}
                {volunteerApplications.length > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                    <div className="font-extrabold text-[#138808] text-[11px] uppercase tracking-wider">
                      Your Submitted Applications ({volunteerApplications.length})
                    </div>
                    <div className="space-y-1.5 max-h-28 overflow-y-auto">
                      {volunteerApplications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200/80"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-[#163c6b] truncate">{app.preferredCell}</div>
                            <div className="text-[10px] text-slate-500">
                              Roll: {app.rollNo} • {app.department}
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-[#138808]">
                            {app.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {volunteerError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{volunteerError}</span>
                  </div>
                )}

                <form onSubmit={(e) => void handleVolunteerSubmit(e)} className="space-y-4 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={volunteerData.name}
                      onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })}
                      placeholder="e.g. Anish Malhotra"
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#163c6b] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Email ID</label>
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={volunteerData.email}
                        onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                        placeholder="anish@iiti.ac.in"
                        className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#163c6b] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Roll Number</label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={40}
                        value={volunteerData.rollNo}
                        onChange={(e) => setVolunteerData({ ...volunteerData, rollNo: e.target.value })}
                        placeholder="e.g. 230001015"
                        className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#163c6b] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Department</label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={volunteerData.department}
                        onChange={(e) => setVolunteerData({ ...volunteerData, department: e.target.value })}
                        className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#163c6b] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Preferred Cell Role</label>
                      <select
                        value={volunteerData.preferredCell}
                        onChange={(e) =>
                          setVolunteerData({
                            ...volunteerData,
                            preferredCell: e.target.value as PreferredCellOption,
                          })
                        }
                        className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#163c6b] focus:outline-none"
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
                    disabled={submittingVolunteer}
                    className="w-full py-3 rounded-full bg-[#f26522] hover:bg-[#dc4f12] disabled:opacity-60 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    {submittingVolunteer ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <span>Submit Volunteer Application</span>
                    )}
                  </button>
                </form>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
