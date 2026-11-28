import React, { useState } from 'react';
import { PAIRED_STATES_DATA } from '../data/ebsbData';
import { StateCulture } from '../types';
import { MapPin, Sparkles, Utensils, Music, Landmark, Calendar, Info, Globe, ChevronRight } from 'lucide-react';

interface PairedStateHubProps {
  onOpenAiModal: (tab?: 'assistant' | 'quiz', initialQuery?: string) => void;
}

export const PairedStateHub: React.FC<PairedStateHubProps> = ({ onOpenAiModal }) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('mp');
  const [compareMode, setCompareMode] = useState<boolean>(false);

  const activeState = PAIRED_STATES_DATA.find((s) => s.id === selectedStateId) || PAIRED_STATES_DATA[0];

  return (
    <section id="paired-states" className="py-16 sm:py-24 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff2e6] text-[#b83d0d] border border-[#fed7ba] text-xs font-bold uppercase tracking-wider shadow-xs">
              State Pairing Spotlight
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#163c6b] tracking-tight">
              Madhya Pradesh <span className="text-[#f26522]">↔</span> Manipur & Nagaland
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Discover the vibrant synthesis of Central India’s UNESCO heritage and North-East India’s enchanted hills, indigenous folk traditions, and culinary arts.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setCompareMode(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !compareMode ? 'bg-[#f26522] text-white shadow-sm' : 'text-slate-700 hover:text-[#163c6b]'
              }`}
            >
              State Profiles
            </button>
            <button
              onClick={() => setCompareMode(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                compareMode ? 'bg-[#f26522] text-white shadow-sm' : 'text-slate-700 hover:text-[#163c6b]'
              }`}
            >
              Side-by-Side Comparison
            </button>
          </div>
        </div>

        {/* Mode 1: State Profiles Tab View */}
        {!compareMode ? (
          <div className="mt-8 space-y-8">
            
            {/* State Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {PAIRED_STATES_DATA.map((state) => {
                const isSelected = state.id === selectedStateId;
                return (
                  <button
                    key={state.id}
                    onClick={() => setSelectedStateId(state.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-[#163c6b] text-white shadow-md'
                        : 'bg-white text-slate-700 hover:border-[#f26522] border border-slate-200 shadow-xs'
                    }`}
                  >
                    <span>{state.name}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                      isSelected ? 'bg-[#f26522] text-white' : 'bg-[#fff2e6] text-[#b83d0d]'
                    }`}>
                      {state.type}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected State Showcase Card */}
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-md">
              <div className="h-1.5 w-full ebsb-tricolor-bar" />
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Visual Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <img
                    src={activeState.heroImage}
                    alt={activeState.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102847]/85 via-transparent to-transparent" />
                  
                  {/* Floating Greeting Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 border border-slate-200 shadow-lg text-[#163c6b]">
                    <div className="text-[10px] uppercase font-bold text-[#f26522]">Native Greeting ({activeState.greetingLanguage})</div>
                    <div
                      lang={activeState.id === 'mp' ? 'hi' : activeState.id === 'manipur' ? 'bn' : 'en'}
                      className={`text-xl font-bold mt-0.5 leading-snug ${
                        activeState.id === 'mp' ? 'font-devanagari' : activeState.id === 'manipur' ? 'font-bengali' : ''
                      }`}
                    >
                      {activeState.greetingText}
                    </div>
                    <div className="text-xs text-slate-600 font-semibold mt-1">Capital: {activeState.capital}</div>
                  </div>
                </div>

                {/* Right Content Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                  
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                      <Globe className="w-4 h-4" />
                      <span>{activeState.type} Spotlight</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-indigo-950 mt-1">{activeState.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      Official Languages: <span className="text-slate-800">{activeState.officialLanguage}</span>
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {activeState.overview}
                  </p>

                  {/* Fun Fact Callout */}
                  <div className="p-4 rounded-xl bg-[#fff6f0] border border-[#fed7ba] text-xs text-slate-800 flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#f26522] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#b83d0d] block mb-0.5">Did You Know?</span>
                      {activeState.funFact}
                    </div>
                  </div>

                  {/* Cultural Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    
                    {/* Festivals */}
                    <div className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#163c6b]">
                        <Calendar className="w-4 h-4 text-[#163c6b]" />
                        <span>Major Festivals</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.majorFestivals.map((fest, idx) => (
                          <span key={idx} className="bg-white text-[#163c6b] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-slate-200">
                            {fest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dance Forms */}
                    <div className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#163c6b]">
                        <Music className="w-4 h-4 text-[#f26522]" />
                        <span>Dance & Folk Arts</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.danceForms.map((dance, idx) => (
                          <span key={idx} className="bg-[#fff6f0] text-[#b83d0d] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#fed7ba]">
                            {dance}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cuisine */}
                    <div className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#163c6b]">
                        <Utensils className="w-4 h-4 text-[#f26522]" />
                        <span>Signature Cuisine</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.cuisine.map((food, idx) => (
                          <span key={idx} className="bg-[#fff6f0] text-[#b83d0d] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#fed7ba]">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Heritage Sites */}
                    <div className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#163c6b]">
                        <Landmark className="w-4 h-4 text-[#138808]" />
                        <span>Heritage Landmarks</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.heritageSites.map((site, idx) => (
                          <span key={idx} className="bg-[#eefaf2] text-[#0f7506] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#c6eccf]">
                            {site}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Ask AI Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenAiModal('assistant', `Tell me more about traditional crafts and culture of ${activeState.name}`)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f26522] hover:bg-[#dc4f12] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-orange-100" />
                      <span>Ask AI Guide about {activeState.name} Culture</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Mode 2: Side-by-Side Comparison Table */
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-md bg-white p-4">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#163c6b] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 w-1/4 rounded-l-xl">Cultural Domain</th>
                  {PAIRED_STATES_DATA.map((st, i) => (
                    <th key={st.id} className={`p-4 w-1/4 ${i === PAIRED_STATES_DATA.length - 1 ? 'rounded-r-xl' : ''}`}>
                      <div className="text-sm font-black text-white">{st.name}</div>
                      <div className="text-[10px] text-[#ff9933] font-bold">{st.type}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-medium">
                
                {/* Greeting */}
                <tr>
                  <td className="p-4 font-bold text-[#163c6b] bg-[#f8f9fb]">Greeting</td>
                  {PAIRED_STATES_DATA.map((st) => (
                    <td key={st.id} className="p-4 font-bold text-[#163c6b]">
                      {st.greetingText} <span className="text-slate-500 font-medium text-[11px]">({st.greetingLanguage})</span>
                    </td>
                  ))}
                </tr>

                {/* Major Festivals */}
                <tr>
                  <td className="p-4 font-bold text-[#163c6b] bg-[#f8f9fb]">Festivals</td>
                  {PAIRED_STATES_DATA.map((st) => (
                    <td key={st.id} className="p-4">
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {st.majorFestivals.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Dance Forms */}
                <tr>
                  <td className="p-4 font-bold text-[#163c6b] bg-[#f8f9fb]">Dance & Folk Arts</td>
                  {PAIRED_STATES_DATA.map((st) => (
                    <td key={st.id} className="p-4">
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {st.danceForms.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cuisine */}
                <tr>
                  <td className="p-4 font-bold text-[#163c6b] bg-[#f8f9fb]">Signature Gastronomy</td>
                  {PAIRED_STATES_DATA.map((st) => (
                    <td key={st.id} className="p-4">
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {st.cuisine.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Heritage Landmarks */}
                <tr>
                  <td className="p-4 font-bold text-[#163c6b] bg-[#f8f9fb]">Heritage Landmarks</td>
                  {PAIRED_STATES_DATA.map((st) => (
                    <td key={st.id} className="p-4">
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {st.heritageSites.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
