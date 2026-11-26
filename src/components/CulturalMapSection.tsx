import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Sparkles,
  Info,
  Maximize2,
  X,
  Search,
  Filter,
  Camera,
  Music,
  Utensils,
  BookOpen,
  Landmark,
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';

interface LandmarkPoint {
  id: string;
  name: string;
  state: 'Madhya Pradesh' | 'Manipur' | 'Nagaland';
  category: 'Heritage Monument' | 'Performing Art & Dance' | 'Traditional Festival' | 'Culinary Hotspot' | 'Craft & Language Hub';
  location: string;
  coordinates: { x: number; y: number }; // percentage on interactive map canvas
  image: string;
  description: string;
  ebsbHighlights: string;
  historicalSignificance: string;
  keyAttractions: string[];
}

const LANDMARKS_DATA: LandmarkPoint[] = [
  {
    id: 'mp-iiti',
    name: 'IIT Indore EBSB Cultural Cell',
    state: 'Madhya Pradesh',
    category: 'Craft & Language Hub',
    location: 'Simrol, Indore (MP)',
    coordinates: { x: 30, y: 55 },
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    description: 'The nodal engine of Ek Bharat Shreshtha Bharat at IIT Indore, conducting youth exchange programs, Bhasha Sangam workshops, and Indori gastronomy carnivals.',
    ebsbHighlights: 'Hosts visiting youth delegations from Manipur & Nagaland for 7-day immersion tours.',
    historicalSignificance: 'Established as an premier institute of national importance in 2009, championing national unity.',
    keyAttractions: ['Bhasha Sangam Circle', 'SAC Cultural Stage', 'Inter-state Unity Wall'],
  },
  {
    id: 'mp-chhatris',
    name: 'Rajwada Palace & Sarafa Bazaar',
    state: 'Madhya Pradesh',
    category: 'Culinary Hotspot',
    location: 'Heart of Indore City',
    coordinates: { x: 26, y: 58 },
    image: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=800&q=80',
    description: 'A 7-storey Holkar dynasty palace coupled with Sarafa, Asia’s premier night street food market renowned for Indori Poha Jalebi and Bhutte ka Kees.',
    ebsbHighlights: 'Guided Indori Food Walk location for Manipuri and Nagaland youth delegates.',
    historicalSignificance: 'Built by Malhar Rao Holkar in 1747, showcasing Maratha-Mughal architectural blend.',
    keyAttractions: ['Holkar Rajwada Royal Palace', 'Night Food Street Sarafa', 'Garadu & Sabudana Khichdi'],
  },
  {
    id: 'mp-sanchi',
    name: 'Sanchi Stupa UNESCO World Heritage',
    state: 'Madhya Pradesh',
    category: 'Heritage Monument',
    location: 'Raisen District, MP',
    coordinates: { x: 38, y: 50 },
    image: 'https://images.unsplash.com/photo-1627894006066-b4505f5247db?auto=format&fit=crop&w=800&q=80',
    description: 'Ancient Buddhist complex dating from 3rd Century BCE commissioned by Emperor Ashoka, showcasing intricate Torana gateways.',
    ebsbHighlights: 'Promotes peace, ancient Indian architecture, and cross-state spiritual heritage.',
    historicalSignificance: 'Oldest stone structure in India representing Mauryan and Satavahana art.',
    keyAttractions: ['Great Stupa No. 1', 'Ashoka Pillar', 'Archaeological Museum'],
  },
  {
    id: 'mp-khajuraho',
    name: 'Khajuraho Temples & Dance Festival',
    state: 'Madhya Pradesh',
    category: 'Performing Art & Dance',
    location: 'Chhatarpur District, MP',
    coordinates: { x: 45, y: 42 },
    image: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?auto=format&fit=crop&w=800&q=80',
    description: 'UNESCO World Heritage Nagara style temples renowned for expressive sculptures and the annual Khajuraho Classical Dance Festival.',
    ebsbHighlights: 'Stage for joint classical dance fusion between Manipuri Raas Leela and Kathak.',
    historicalSignificance: 'Constructed by Chandela dynasty kings between 950 and 1050 CE.',
    keyAttractions: ['Kandariya Mahadeva Temple', 'Annual Dance Festival', 'Light & Sound Show'],
  },
  {
    id: 'mn-loktak',
    name: 'Loktak Lake & Keibul Lamjao',
    state: 'Manipur',
    category: 'Heritage Monument',
    location: 'Moirang, Bishnupur, Manipur',
    coordinates: { x: 78, y: 52 },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'The largest freshwater lake in Northeast India, famous for floating phumdis and the world’s only floating national park home to Sangai deer.',
    ebsbHighlights: 'Featured in IIT Indore eco-heritage presentations and biodiversity exchanges.',
    historicalSignificance: 'Historic base of Indian National Army (INA) where Netaji Subhash Chandra Bose unfurled INA flag in 1944.',
    keyAttractions: ['Floating Phumdi Islands', 'Sangai Dancing Deer', 'INA War Memorial Moirang'],
  },
  {
    id: 'mn-imphal-kangla',
    name: 'Kangla Fort & Ima Keithel Market',
    state: 'Manipur',
    category: 'Craft & Language Hub',
    location: 'Imphal City, Manipur',
    coordinates: { x: 80, y: 48 },
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    description: 'The royal seat of ancient Meitei kingdom beside Ima Keithel—Asia’s largest 500-year-old market run exclusively by women entrepreneurs.',
    ebsbHighlights: 'Inspires student sessions on women-led local micro-enterprises and Meiteilon language.',
    historicalSignificance: 'Seat of Manipuri kings from 33 CE until British annexation in 1891.',
    keyAttractions: ['Kangla Sha Dragon Statues', 'Ima Keithel Mothers Market', 'Shree Govindajee Temple'],
  },
  {
    id: 'mn-raas',
    name: 'Manipuri Raas Leela Arena',
    state: 'Manipur',
    category: 'Performing Art & Dance',
    location: 'Govindajee Mandap, Imphal',
    coordinates: { x: 82, y: 50 },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'The sacred classical dance form introduced by King Bhagyachandra, depicting Vaishnavite devotional love with cylindrical Kumil skirts.',
    ebsbHighlights: 'Performed live at IIT Indore EBSB Cultural Evenings by visiting Manipuri artists.',
    historicalSignificance: 'Recognized as one of India’s eight major classical dance forms.',
    keyAttractions: ['Kumil Embroidered Costumes', 'Pung Cholom Drum Dance', 'Kartal Cholom'],
  },
  {
    id: 'nl-hornbill',
    name: 'Kisama Heritage Village (Hornbill Festival)',
    state: 'Nagaland',
    category: 'Traditional Festival',
    location: 'Kohima District, Nagaland',
    coordinates: { x: 86, y: 38 },
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    description: 'The venue for the world-famous Hornbill Festival, bringing together 17 Naga tribes to showcase traditional Morung architecture and songs.',
    ebsbHighlights: 'Annual highlight in IIT Indore youth exchange calendar during December.',
    historicalSignificance: 'Designed to protect and revive indigenous Naga tribal heritage.',
    keyAttractions: ['Naga Tribal Morungs', 'War Dances', 'Indigenous Craft & Food Stalls'],
  },
  {
    id: 'nl-khonoma',
    name: 'Khonoma Green Village',
    state: 'Nagaland',
    category: 'Heritage Monument',
    location: 'Kohima District, Nagaland',
    coordinates: { x: 84, y: 41 },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Asia’s first green village, renowned for Angami Naga resistance history, community forest conservation, and terraced paddy fields.',
    ebsbHighlights: 'Case study in IIT Indore sustainability and indigenous forest conservation webinars.',
    historicalSignificance: 'Site of fierce Angami Naga resistance against British expansion in 1879.',
    keyAttractions: ['Terraced Paddy Fields', 'Blyth’s Tragopan Sanctuary', 'Historical Fort Entrances'],
  },
  {
    id: 'nl-dzukou',
    name: 'Dzüko Valley & Japfü Peak',
    state: 'Nagaland',
    category: 'Heritage Monument',
    location: 'Nagaland-Manipur Border',
    coordinates: { x: 83, y: 45 },
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    description: 'The "Valley of Flowers of the Northeast" situated at 2,452m, famed for endemic Dzüko lilies, bamboo trails, and pristine trekking routes.',
    ebsbHighlights: 'Highlights nature conservation & youth adventure exchanges.',
    historicalSignificance: 'Sacred mountain terrain shared between Angami and Mao Naga communities.',
    keyAttractions: ['Dzüko Lily Blooms', 'Trekking Trails', 'Japfü Rhododendron Trees'],
  }
];

export const CulturalMapSection: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLandmark, setActiveLandmark] = useState<LandmarkPoint | null>(null);

  const categories = [
    'All',
    'Heritage Monument',
    'Performing Art & Dance',
    'Traditional Festival',
    'Culinary Hotspot',
    'Craft & Language Hub'
  ];

  const filteredLandmarks = LANDMARKS_DATA.filter((item) => {
    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesState && matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 sm:py-20 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            Interactive Cultural Cartography
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
            EBSB Cultural Map: MP ↔ Manipur ↔ Nagaland
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Navigate iconic heritage monuments, traditional dance stages, culinary paradises, and youth exchange hubs bridging Madhya Pradesh and paired Northeast states.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Box */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landmarks, festivals, dishes..."
                className="w-full bg-white text-slate-900 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:border-indigo-600 shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* State Filter Tabs */}
            <div className="md:col-span-8 flex flex-wrap items-center justify-start md:justify-end gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">
                State:
              </span>
              {['All', 'Madhya Pradesh', 'Manipur', 'Nagaland'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedState === st
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                  }`}
                >
                  {st === 'All' ? 'All Paired States' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 border-t border-slate-200/80 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 pr-2">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white/70 text-slate-600 hover:bg-white border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Canvas Representation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
              <h3 className="text-base font-black text-white">Interactive State Geography Canvas</h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Madhya Pradesh (Host)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Manipur (Paired)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Nagaland (Paired)</span>
            </div>
          </div>

          {/* Interactive Graphic Canvas Grid */}
          <div className="relative min-h-[380px] sm:min-h-[460px] rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80 border border-slate-800/80 overflow-hidden p-6 flex flex-col justify-between">
            
            {/* Background Map Stylized Outlines / Grid lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Region Labels */}
            <div className="absolute top-6 left-8 bg-orange-950/60 border border-orange-500/30 px-3 py-1 rounded-lg text-[10px] font-bold text-orange-300">
              Central India Corridor (Madhya Pradesh)
            </div>
            <div className="absolute top-6 right-8 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-lg text-[10px] font-bold text-indigo-300">
              Northeast Frontier Corridor (Manipur & Nagaland)
            </div>

            {/* Map Pins overlay */}
            <div className="relative w-full h-[320px] sm:h-[380px]">
              {filteredLandmarks.map((lm) => {
                const isSelected = activeLandmark?.id === lm.id;
                const pinColor =
                  lm.state === 'Madhya Pradesh'
                    ? 'bg-orange-500 text-white'
                    : lm.state === 'Manipur'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-indigo-500 text-white';

                return (
                  <div
                    key={lm.id}
                    style={{ left: `${lm.coordinates.x}%`, top: `${lm.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-transform hover:scale-125"
                    onClick={() => setActiveLandmark(lm)}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className={`p-2 rounded-full ${pinColor} shadow-lg ring-4 ring-slate-900/80 flex items-center justify-center transition-all ${isSelected ? 'scale-125 ring-amber-400' : ''}`}>
                        <MapPin className="w-4 h-4" />
                      </div>

                      {/* Tooltip Label */}
                      <div className="mt-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md text-white text-[10px] font-extrabold whitespace-nowrap border border-slate-700 shadow-md opacity-90 group-hover:opacity-100">
                        {lm.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 text-[11px] text-slate-400 font-medium flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span>Showing {filteredLandmarks.length} cultural landmark pins</span>
              <span className="text-amber-300 font-bold">Click any map pin to open landmark dossier</span>
            </div>
          </div>
        </div>

        {/* Landmarks Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-indigo-950 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-indigo-600" />
              <span>Cultural Landmarks & Exchange Hubs</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">
              Showing {filteredLandmarks.length} results
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLandmarks.map((lm) => (
              <div
                key={lm.id}
                onClick={() => setActiveLandmark(lm)}
                className="group rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 hover:bg-white hover:border-indigo-300 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      src={lm.image}
                      alt={lm.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-indigo-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                      {lm.state}
                    </div>

                    <div className="absolute top-3 right-3 bg-indigo-600 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                      {lm.category}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="text-base font-black truncate">{lm.name}</h4>
                      <p className="text-[11px] text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
                        <span>{lm.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      {lm.description}
                    </p>

                    <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100 text-xs text-orange-950 space-y-1">
                      <span className="font-extrabold text-[10px] uppercase text-orange-800 block">
                        EBSB Connection:
                      </span>
                      <p className="text-[11px] font-medium leading-normal">
                        {lm.ebsbHighlights}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-800 border-t border-slate-100 mt-2">
                  <span>View Full Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Modal for Selected Landmark */}
        {activeLandmark && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl text-slate-900">
              <button
                onClick={() => setActiveLandmark(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-200">
                <img
                  src={activeLandmark.image}
                  alt={activeLandmark.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      {activeLandmark.state}
                    </span>
                    <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {activeLandmark.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black">{activeLandmark.name}</h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{activeLandmark.location}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-700">
                <div>
                  <h4 className="font-extrabold text-indigo-950 uppercase tracking-wider text-[11px] mb-1">
                    Overview & Description
                  </h4>
                  <p className="leading-relaxed text-slate-600">{activeLandmark.description}</p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 space-y-1">
                  <h4 className="font-black text-indigo-900 text-xs">EBSB National Integration Relevance</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{activeLandmark.ebsbHighlights}</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-indigo-950 uppercase tracking-wider text-[11px] mb-1">
                    Historical & Cultural Significance
                  </h4>
                  <p className="leading-relaxed text-slate-600">{activeLandmark.historicalSignificance}</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-indigo-950 uppercase tracking-wider text-[11px] mb-2">
                    Key Attractions & Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLandmark.keyAttractions.map((att, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                        • {att}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">
                  IIT Indore EBSB Cultural Registry
                </span>
                <button
                  onClick={() => setActiveLandmark(null)}
                  className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
