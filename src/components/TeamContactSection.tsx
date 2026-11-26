import React, { useState } from 'react';
import { TEAM_DATA } from '../data/ebsbData';
import { Mail, MapPin, Phone, Send, CheckCircle2, User, Heart, Shield, Globe } from 'lucide-react';

interface TeamContactSectionProps {
  onOpenVolunteerModal: () => void;
}

export const TeamContactSection: React.FC<TeamContactSectionProps> = ({ onOpenVolunteerModal }) => {
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    subject: 'General Query',
    message: '',
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackData({ name: '', email: '', subject: 'General Query', message: '' });
    }, 3000);
  };

  return (
    <section id="team-contact" className="py-16 sm:py-24 text-slate-900 relative border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            Leadership & Coordination
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
            EBSB Committee & Contact Desk
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Meet the faculty nodal officers, student coordinators, and volunteer leads managing Ek Bharat Shreshtha Bharat Cell at IIT Indore.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEAM_DATA.map((member) => (
            <div
              key={member.id}
              className={`p-5 rounded-3xl bg-white/40 backdrop-blur-md border ${
                member.isNodalOfficer ? 'border-orange-300 ring-2 ring-orange-200' : 'border-white/50'
              } space-y-3 flex flex-col justify-between hover:bg-white/60 transition-all text-center shadow-xl`}
            >
              <div className="space-y-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-indigo-600 shadow-md"
                  referrerPolicy="no-referrer"
                />

                <div>
                  <h3 className="text-sm font-black text-indigo-950">{member.name}</h3>
                  <p className="text-xs font-extrabold text-orange-700 mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{member.department}</p>
                </div>

                {member.bio && (
                  <p className="text-[11px] text-slate-600 font-medium italic line-clamp-3">
                    "{member.bio}"
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-white/60 text-[11px] text-indigo-700 font-bold flex items-center justify-center gap-1">
                <Mail className="w-3 h-3" />
                <a href={`mailto:${member.email}`} className="hover:underline truncate">{member.email}</a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-white/40">
          
          {/* Left Column: Campus Info & Map */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 space-y-6 shadow-xl">
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-700">Official Location</span>
              <h3 className="text-xl font-black text-indigo-950 mt-1">EBSB Cell Office, IIT Indore</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">Indian Institute of Technology Indore, Simrol Campus, Khandwa Road, Indore - 453552, Madhya Pradesh, India.</p>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-extrabold text-indigo-950">Campus Address</div>
                  <div className="text-[11px] text-slate-500">SAC Building, 2nd Floor, IIT Indore</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-extrabold text-indigo-950">EBSB Cell Email</div>
                  <div className="text-[11px] text-slate-500">ebsb@iiti.ac.in</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
                <Globe className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-extrabold text-indigo-950">IIT Indore Main Website</div>
                  <a href="https://www.iiti.ac.in" target="_blank" rel="noreferrer" className="text-[11px] text-indigo-600 font-bold hover:underline">www.iiti.ac.in</a>
                </div>
              </div>
            </div>

            {/* Volunteer Join Banner */}
            <div className="p-4 rounded-2xl bg-orange-100/80 border border-orange-200 text-xs space-y-2 shadow-sm">
              <div className="font-bold text-orange-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Want to join as Student Volunteer?</span>
              </div>
              <p className="text-[11px] text-orange-800 font-medium">
                Participate in hosting student delegates, organizing Bhasha Sangam workshops, and managing cultural festivals.
              </p>
              <button
                onClick={onOpenVolunteerModal}
                className="w-full py-2.5 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                Apply for EBSB Volunteer Crew
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Query Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 space-y-4 shadow-xl">
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-700">Get in Touch</span>
              <h3 className="text-xl font-black text-indigo-950 mt-1">Send a Message to EBSB Cell</h3>
              <p className="text-xs text-slate-600 font-medium">For collaboration, youth delegation queries, or event participation details.</p>
            </div>

            {feedbackSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Message Delivered!</h4>
                <p className="text-xs text-emerald-800 font-medium">Thank you for reaching out. The EBSB coordination desk at IIT Indore will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={feedbackData.name}
                      onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={feedbackData.email}
                      onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                      placeholder="ramesh@iiti.ac.in"
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category / Purpose</label>
                  <select
                    value={feedbackData.subject}
                    onChange={(e) => setFeedbackData({ ...feedbackData, subject: e.target.value })}
                    className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="General Query">General EBSB Inquiry</option>
                    <option value="Youth Exchange">Youth Delegation / Accommodation</option>
                    <option value="Bhasha Sangam">Bhasha Sangam Workshop Inquiry</option>
                    <option value="Cultural Performance">Cultural Performance Participation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Message Detail</label>
                  <textarea
                    rows={4}
                    required
                    value={feedbackData.message}
                    onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to EBSB Cell</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
