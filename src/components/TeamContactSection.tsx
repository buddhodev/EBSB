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
    <section id="team-contact" className="py-16 sm:py-24 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff2e6] text-[#b83d0d] border border-[#fed7ba] text-xs font-bold uppercase tracking-wider shadow-xs">
            Leadership & Coordination
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#163c6b] tracking-tight">
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
              className={`p-5 rounded-2xl bg-white border ${
                member.isNodalOfficer ? 'border-[#f26522] ring-2 ring-[#fed7ba]' : 'border-slate-200 hover:border-[#f26522]'
              } space-y-3 flex flex-col justify-between hover:shadow-md transition-all text-center shadow-sm`}
            >
              <div className="space-y-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover object-top mx-auto border-2 border-[#f26522] shadow-sm"
                  referrerPolicy="no-referrer"
                />

                <div>
                  <h3 className="text-sm font-black text-[#163c6b]">{member.name}</h3>
                  <p className="text-xs font-extrabold text-[#b83d0d] mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{member.department}</p>
                </div>

                {member.bio && (
                  <p className="text-[11px] text-slate-600 font-medium italic line-clamp-3">
                    "{member.bio}"
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-[#163c6b] font-bold flex items-center justify-center gap-1">
                <Mail className="w-3 h-3 text-[#f26522]" />
                <a href={`mailto:${member.email}`} className="hover:underline truncate">{member.email}</a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
          
          {/* Left Column: Campus Info & Map */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b83d0d]">Official Location</span>
              <h3 className="text-xl font-black text-[#163c6b] mt-1">EBSB Cell Office, IIT Indore</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">Indian Institute of Technology Indore, Simrol Campus, Khandwa Road, Indore - 453552, Madhya Pradesh, India.</p>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8f9fb] border border-slate-200">
                <MapPin className="w-5 h-5 text-[#f26522] shrink-0" />
                <div>
                  <div className="font-extrabold text-[#163c6b]">Campus Address</div>
                  <div className="text-[11px] text-slate-500">SAC Building, 2nd Floor, IIT Indore</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8f9fb] border border-slate-200">
                <Mail className="w-5 h-5 text-[#163c6b] shrink-0" />
                <div>
                  <div className="font-extrabold text-[#163c6b]">EBSB Cell Email</div>
                  <div className="text-[11px] text-slate-500">ebsb@iiti.ac.in</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8f9fb] border border-slate-200">
                <Globe className="w-5 h-5 text-[#138808] shrink-0" />
                <div>
                  <div className="font-extrabold text-[#163c6b]">IIT Indore Main Website</div>
                  <a href="https://www.iiti.ac.in" target="_blank" rel="noreferrer" className="text-[11px] text-[#f26522] font-bold hover:underline">www.iiti.ac.in</a>
                </div>
              </div>
            </div>

            {/* Volunteer Join Banner */}
            <div className="p-4 rounded-xl bg-[#fff6f0] border border-[#fed7ba] text-xs space-y-2">
              <div className="font-bold text-[#163c6b] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#f26522]" />
                <span>Want to join as Student Volunteer?</span>
              </div>
              <p className="text-[11px] text-slate-700 font-medium">
                Participate in hosting student delegates, organizing Bhasha Sangam workshops, and managing cultural festivals.
              </p>
              <button
                onClick={onOpenVolunteerModal}
                className="w-full py-2.5 rounded-full bg-[#138808] text-white font-bold text-xs hover:bg-[#0f7506] transition-colors shadow-sm"
              >
                Apply for EBSB Volunteer Crew
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Query Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b83d0d]">Get in Touch</span>
              <h3 className="text-xl font-black text-[#163c6b] mt-1">Send a Message to EBSB Cell</h3>
              <p className="text-xs text-slate-600 font-medium">For collaboration, youth delegation queries, or event participation details.</p>
            </div>

            {feedbackSent ? (
              <div className="p-6 rounded-xl bg-[#eefaf2] border border-[#c6eccf] text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#138808] mx-auto" />
                <h4 className="text-base font-bold text-[#0f7506]">Message Delivered!</h4>
                <p className="text-xs text-slate-700 font-medium">Thank you for reaching out. The EBSB coordination desk at IIT Indore will respond shortly.</p>
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
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#f26522] focus:outline-none"
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
                      className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#f26522] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category / Purpose</label>
                  <select
                    value={feedbackData.subject}
                    onChange={(e) => setFeedbackData({ ...feedbackData, subject: e.target.value })}
                    className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#f26522] focus:outline-none"
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
                    className="w-full bg-white text-slate-900 p-3 rounded-xl border border-slate-300 focus:border-[#f26522] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#f26522] text-white font-bold text-xs hover:bg-[#dc4f12] transition-colors shadow-md flex items-center justify-center gap-2"
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
