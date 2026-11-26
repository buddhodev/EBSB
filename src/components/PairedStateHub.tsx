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
    <section id="paired-states" className="py-16 sm:py-24 text-slate-900 relative border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/40">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold uppercase tracking-wider shadow-sm">
              State Pairing Spotlight
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
              Madhya Pradesh <span className="text-orange-500">↔</span> Manipur & Nagaland
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Discover the vibrant synthesis of Central India’s UNESCO heritage and North-East India’s enchanted hills, indigenous folk traditions, and culinary arts.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/60 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setCompareMode(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !compareMode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:text-indigo-950'
              }`}
            >
              State Profiles
            </button>
            <button
              onClick={() => setCompareMode(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                compareMode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:text-indigo-950'
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
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white/50 backdrop-blur-md text-slate-700 hover:bg-white/80 border border-white/60'
                    }`}
                  >
                    <span>{state.name}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {state.type}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected State Showcase Card */}
            <div className="rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Visual Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <img
                    src={activeState.heroImage}
                    alt={activeState.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Greeting Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-xl text-indigo-950">
                    <div className="text-[10px] uppercase font-bold text-orange-600">Native Greeting ({activeState.greetingLanguage})</div>
                    <div className="text-xl font-black mt-0.5">{activeState.greetingText}</div>
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
                  <div className="p-4 rounded-2xl bg-orange-100/80 border border-orange-200 text-xs text-orange-900 flex items-start gap-3 shadow-sm">
                    <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-orange-800 block mb-0.5">Did You Know?</span>
                      {activeState.funFact}
                    </div>
                  </div>

                  {/* Cultural Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    
                    {/* Festivals */}
                    <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-indigo-950">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>Major Festivals</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.majorFestivals.map((fest, idx) => (
                          <span key={idx} className="bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-indigo-100">
                            {fest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dance Forms */}
                    <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-indigo-950">
                        <Music className="w-4 h-4 text-orange-600" />
                        <span>Dance & Folk Arts</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.danceForms.map((dance, idx) => (
                          <span key={idx} className="bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-orange-100">
                            {dance}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cuisine */}
                    <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-indigo-950">
                        <Utensils className="w-4 h-4 text-rose-600" />
                        <span>Signature Cuisine</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.cuisine.map((food, idx) => (
                          <span key={idx} className="bg-rose-50 text-rose-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-rose-100">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Heritage Sites */}
                    <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-indigo-950">
                        <Landmark className="w-4 h-4 text-emerald-600" />
                        <span>Heritage Landmarks</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeState.heritageSites.map((site, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-100">
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
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />
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
          <div className="mt-8 overflow-x-auto rounded-3xl border border-white/60 shadow-xl bg-white/40 backdrop-blur-md p-4">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-indigo-950 text-white text-xs font-bold uppercase tracking-wider rounded-2xl">
                  <th className="p-4 w-1/4 rounded-l-2xl">Cultural Domain</th>
                  {PAIRED_STATES_DATA.map((st, i) => (
                    <th key={st.id} className={`p-4 w-1/4 ${i === PAIRED_STATES_DATA.length - 1 ? 'rounded-r-2xl' : ''}`}>
                      <div className="text-sm font-black text-white">{st.name}</div>
                      <div className="text-[10px] text-orange-300 font-bold">{st.type}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/60 text-xs text-slate-700 font-medium">
                
                {/* Greeting */}
                <tr>
                  <td className="p-4 font-bold text-indigo-950 bg-white/50">Greeting</td>
                  {PAIRED_STATES_DATA.map((st) => (
                    <td key={st.id} className="p-4 font-bold text-indigo-900">
                      {st.greetingText} <span className="text-slate-500 font-medium text-[11px]">({st.greetingLanguage})</span>
                    </td>
                  ))}
                </tr>

                {/* Major Festivals */}
                <tr>
                  <td className="p-4 font-bold text-indigo-950 bg-white/50">Festivals</td>
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
                  <td className="p-4 font-bold text-indigo-950 bg-white/50">Dance & Folk Arts</td>
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
                  <td className="p-4 font-bold text-indigo-950 bg-white/50">Signature Gastronomy</td>
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
                  <td className="p-4 font-bold text-indigo-950 bg-white/50">Heritage Landmarks</td>
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
