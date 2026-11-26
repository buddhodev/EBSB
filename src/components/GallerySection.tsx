import React, { useState } from 'react';
import { GALLERY_DATA, TESTIMONIALS_DATA } from '../data/ebsbData';
import { GalleryMedia, Testimonial } from '../types';
import { Image, Play, Maximize2, X, MapPin, Calendar, Quote, Star, User } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMediaModal, setActiveMediaModal] = useState<GalleryMedia | null>(null);

  const categories = ['All', 'Cultural Performance', 'Youth Delegation', 'Food Festival', 'Bhasha Sangam', 'Campus Visit'];

  const filteredMedia = GALLERY_DATA.filter(
    (m) => selectedCategory === 'All' || m.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-16 sm:py-24 text-slate-900 relative border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            Visual Highlights & Memories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight">
            EBSB Media Gallery & Youth Stories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Capturing moments of inter-state joy, cultural performances, Indori food walks, and lifelong student friendships built across India.
          </p>
        </div>

        {/* Gallery Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white/50 backdrop-blur-md text-slate-700 hover:bg-white/80 border border-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => setActiveMediaModal(media)}
              className="group relative rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 overflow-hidden cursor-pointer hover:bg-white/60 hover:border-indigo-300 transition-all shadow-xl"
            >
              <div className="relative h-60 overflow-hidden bg-slate-200">
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-indigo-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                  {media.category}
                </div>

                <div className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 text-indigo-950 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-indigo-950 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {media.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-600" />
                    {media.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-600" />
                    {media.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeMediaModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl max-w-3xl w-full p-6 space-y-4 relative shadow-2xl text-slate-900">
              <button
                onClick={() => setActiveMediaModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={activeMediaModal.url}
                alt={activeMediaModal.title}
                className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-md"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase text-orange-800 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                    {activeMediaModal.category}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">• {activeMediaModal.location} ({activeMediaModal.date})</span>
                </div>
                <h3 className="text-xl font-black text-indigo-950">{activeMediaModal.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {activeMediaModal.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Student Testimonials Showcase */}
        <div className="pt-8 border-t border-white/40 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-indigo-950">Delegate & Student Experiences</h3>
            <p className="text-xs text-slate-600 font-medium">Voices from inter-state youth exchange programs at IIT Indore</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 space-y-4 relative shadow-xl"
              >
                <Quote className="w-8 h-8 text-indigo-600/20 absolute top-4 right-4" />
                
                <p className="text-xs text-slate-700 font-medium italic leading-relaxed">
                  "{t.comment}"
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/60">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-indigo-950">{t.name}</h4>
                    <p className="text-[10px] text-orange-700 font-extrabold">{t.role} ({t.state})</p>
                    <p className="text-[10px] text-slate-500 font-medium">{t.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
