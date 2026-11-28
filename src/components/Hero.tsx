import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiModal: (tab?: 'assistant' | 'quiz') => void;
}

interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
  fit: 'cover' | 'contain';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/assets/aistudio/image_34f0be70.png',
    alt: 'IIT Indore Republic Day classical dance celebration',
    caption: 'Republic Day Cultural Celebration at IIT Indore',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_f89912f5.png',
    alt: 'Kavyanjali Akhil Bharatiya Kavi Sammelan cultural dance performance at IIT Indore',
    caption: 'Kavyanjali — Cultural Dance Performance at IIT Indore',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_4d621e0c.png',
    alt: 'Jahaz Mahal Mandu ancient water management system, Madhya Pradesh',
    caption: 'Jahaz Mahal, Mandu — Ancient Water Management Heritage of Madhya Pradesh',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_0e636a6b.png',
    alt: 'Swachh Survekshan 2020 Indore mural art, Madhya Pradesh',
    caption: 'Swachh Survekshan — Vibrant Wall Art of Indore, Madhya Pradesh',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_0bc3a908.png',
    alt: 'Rajyon Ki Mithas comparing Madhya Pradesh Bahadura ke Ladoo and Manipur Chak-Hao Kheer',
    caption: 'Rajyon Ki Mithas: Madhya Pradesh Bahadura ke Ladoo & Manipur Chak-Hao Kheer',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_2d55a23f.png',
    alt: 'Bagh Print eco-friendly traditional textile art of Dhar, Madhya Pradesh',
    caption: 'Bagh Print — Traditional Eco-Friendly Handblock Art of Dhar, MP',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_bb19c40f.png',
    alt: 'Swachh Survekshan India Cleanest City No 1 Indore Madhya Pradesh',
    caption: "Indore (Madhya Pradesh) — India's Cleanest City under Swachh Survekshan",
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_2488d63e.png',
    alt: 'Students demonstrating science experiment during IIT Indore educational outreach',
    caption: 'IIT Indore EBSB Science & Educational Outreach Interaction',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_d366a27d.png',
    alt: 'Traditional Bhil Painting tribal art of Madhya Pradesh',
    caption: 'Bhil Painting — Indigenous Tribal Art Heritage of Madhya Pradesh',
    fit: 'contain',
  },
  {
    src: '/assets/aistudio/image_d2b9ff52.png',
    alt: 'Free Press Indore article on IIT Indore EBSB team visiting Baigaon village hospital and school',
    caption: 'IIT Indore EBSB Outreach at Baigaon Village Hospital & School (Free Press Indore)',
    fit: 'contain',
  },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiModal }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused || isHovered) return;
    const timer = window.setInterval(goToNext, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, isHovered, goToNext]);

  const activeCaption = t.hero.slideCaptions[currentIndex] || HERO_SLIDES[currentIndex].caption;

  return (
    <section id="home" className="relative bg-white text-slate-900 border-b border-slate-200">
      {/* Live Scrolling Ticker Strip - Official ekbharat.gov.in Announcement Bar */}
      <div className="relative z-10 bg-[#fff2e6] border-b border-[#ffd5b8] text-[#163c6b] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0 bg-[#f26522] text-white font-extrabold text-[11px] uppercase px-2.5 py-0.5 rounded shadow-xs tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            {t.hero.liveUpdates}
          </div>

          <div className="overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide text-slate-800">
            <div className="inline-block animate-marquee space-x-8">
              <span><strong>{t.hero.marquee1Title}</strong> {t.hero.marquee1Body}</span>
              <span>•</span>
              <span><strong>{t.hero.marquee2Title}</strong> {t.hero.marquee2Body}</span>
              <span>•</span>
              <span><strong>{t.hero.marquee3Title}</strong> {t.hero.marquee3Body}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Opening Image Slideshow */}
      <div
        className="relative w-full bg-[#0e223d] overflow-hidden select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="IIT Indore Ek Bharat Shreshtha Bharat Highlights Slideshow"
      >
        <div className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] lg:h-[530px]">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.src}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Soft blurred ambient backdrop so full-width edges always look seamless */}
                <img
                  src={slide.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-35"
                />
                <div className="absolute inset-0 bg-[#0c1f38]/45" />

                {/* Crisp, Uncropped Primary Slide Image */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`relative z-10 w-full h-full ${
                    slide.fit === 'cover' ? 'object-cover' : 'object-contain'
                  }`}
                />
              </div>
            );
          })}

          {/* Previous Slide Button */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#163c6b]/80 hover:bg-[#f26522] text-white border border-white/30 shadow-lg flex items-center justify-center transition-colors backdrop-blur-xs"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Slide Button */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#163c6b]/80 hover:bg-[#f26522] text-white border border-white/30 shadow-lg flex items-center justify-center transition-colors backdrop-blur-xs"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Compact Slide Counter & Play/Pause Control (Top-Right) */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-5 z-20 flex items-center gap-1.5 bg-[#102847]/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full border border-white/20 text-[11px] font-bold">
            <span className="tabular-nums">
              {currentIndex + 1} / {HERO_SLIDES.length}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
              className="p-0.5 hover:text-[#ff9933] transition-colors"
              title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Bottom Slide Dot Indicators */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-[#102847]/75 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20"
            role="tablist"
            aria-label="Select slide"
          >
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to slide ${idx + 1}: ${slide.caption}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-[#f26522]'
                    : 'w-2 bg-white/55 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Clean Compact Caption & Quick Navigation Bar Below the Slideshow */}
      <div className="bg-[#f8f9fb] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left min-w-0">
            <span className="shrink-0 w-2 h-2 rounded-full bg-[#f26522]" />
            <p className="text-xs sm:text-sm font-bold text-[#163c6b] truncate">
              {activeCaption}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('paired-states')}
              className="bg-[#f26522] hover:bg-[#dc4f12] text-white px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>{t.hero.partnerStatesBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="bg-white hover:bg-orange-50 text-[#163c6b] border border-slate-300 px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#f26522]" />
              <span>{t.hero.eventsBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAiModal('assistant')}
              className="bg-[#163c6b] hover:bg-[#102847] text-white px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff9933]" />
              <span>{t.hero.culturalGuideBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
