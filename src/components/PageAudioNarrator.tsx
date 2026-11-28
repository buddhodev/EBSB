import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Square, Sparkles } from 'lucide-react';

interface PageAudioNarratorProps {
  activeSection: string;
  activeSectionLabel: string;
  className?: string;
}

const PAGE_AUDIO_SUMMARIES: Record<string, string> = {
  home: `Welcome to Ek Bharat Shreshtha Bharat Cell at Indian Institute of Technology Indore. A Ministry of Education initiative celebrating national integration and cultural pairing between Madhya Pradesh, Manipur, and Nagaland. Explore our youth exchange delegations, Bhasha Sangam language hub, food carnivals, and cultural events.`,
  about: `About Ek Bharat Shreshtha Bharat Cell at IIT Indore. Launched by Prime Minister Shri Narendra Modi on Rashtriya Ekta Diwas to enhance mutual understanding across Indian states. Featuring patron messages from Director Professor Suhas S. Joshi and Nodal Officer Doctor Sharad Gupta. Our four core pillars are Youth Exchange, Bhasha Sangam Language Circle, Heritage Tourism, and Gastronomy Fusion.`,
  'paired-states': `State Pairing Hub: Madhya Pradesh paired with Manipur and Nagaland. Explore detailed state profiles, cultural comparisons, traditional art forms like Pithora painting and Thang-Ta martial arts, grand festivals like Lokrang, Yaoshang, and Hornbill Festival, and iconic cuisines like Indori Poha Jalebi and Manipur Chak-Hao Kheer.`,
  'cultural-map': `Interactive EBSB Cultural Map across Madhya Pradesh, Manipur, and Nagaland. Navigate key heritage monuments, UNESCO World Heritage sites, classical dance arenas like Manipuri Raas Leela, Hornbill Festival grounds, and IIT Indore campus hubs with interactive pins and detailed dossiers.`,
  events: `Youth Exchange and Events Calendar at IIT Indore. Discover upcoming inter-state student delegations, Bhasha Sangam poetry circles, Indori Food Walks, and Ekta Diwas Marathons. Filter by category or search upcoming schedules and register as a student delegate.`,
  'bhasha-sangam': `Bhasha Sangam Language Hub. Learn everyday phrases across Hindi, Meiteilon, Nagamese, Ao Naga, and Malvi dialect. Try our AI Instant Bhasha Translator to translate any sentence instantly or listen to native audio pronunciations.`,
  'sanskrit-hub': `Sanskrit Language and Heritage Hub. Explore classical mother tongue conversation phrases, recite Rigvedic shlokas and Subhashitani, test your knowledge with interactive Sanskrit flashcards, and discover IIT Indore Center for Indian Knowledge Systems research.`,
  gallery: `EBSB Media Gallery and Youth Stories. Visual highlights capturing inter-state youth exchanges, cultural performances, Indori food walks, and delegate testimonials from participating students across India.`,
  'team-contact': `Leadership and Contact Desk. Meet the faculty nodal officers, student coordinators, and volunteer leads at SAC Building, IIT Indore campus. Send inquiries or apply for the EBSB student volunteer crew.`,
};

export const PageAudioNarrator: React.FC<PageAudioNarratorProps> = ({
  activeSection,
  activeSectionLabel,
  className = '',
}) => {
  const [supported, setSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  // Stop speech synthesis when activeSection changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [activeSection]);

  const handlePlay = () => {
    if (!supported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    // Cancel any current speech
    window.speechSynthesis.cancel();

    const summaryText = PAGE_AUDIO_SUMMARIES[activeSection] || `Viewing ${activeSectionLabel} section on IIT Indore EBSB Portal.`;
    const utterance = new SpeechSynthesisUtterance(summaryText);

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try to set an English (Indian/US) voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('hi-IN'));
    const englishVoice = voices.find((v) => v.lang.startsWith('en'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    } else if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!supported) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 px-3 rounded-full bg-white/10 text-white border border-white/20 text-xs shadow-xs ${className}`}>
      <span className="flex items-center gap-1 font-bold text-[11px] text-orange-200 pr-1">
        <Volume2 className="w-3.5 h-3.5 text-[#ff9933]" />
        <span className="hidden sm:inline">Listen:</span>
      </span>

      {isSpeaking ? (
        <button
          onClick={handlePause}
          className="flex items-center gap-1 bg-[#f26522] hover:bg-[#dc4f12] text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] transition-colors"
          title="Pause Audio Narration"
        >
          <Pause className="w-3 h-3" />
          <span>Pause</span>
        </button>
      ) : (
        <button
          onClick={handlePlay}
          className="flex items-center gap-1 bg-[#f26522] hover:bg-[#dc4f12] text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] transition-colors"
          title="Listen to Page Summary"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>{isPaused ? 'Resume' : 'Listen'}</span>
        </button>
      )}

      {(isSpeaking || isPaused) && (
        <button
          onClick={handleStop}
          className="p-1 rounded-full hover:bg-white/20 text-slate-200 transition-colors"
          title="Stop Narration"
        >
          <Square className="w-3 h-3 fill-current" />
        </button>
      )}

      {isSpeaking && (
        <span className="flex items-center gap-1 text-[10px] text-[#4ad178] font-semibold pl-1 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ad178]"></span>
          <span className="hidden md:inline truncate max-w-[120px]">{activeSectionLabel}</span>
        </span>
      )}
    </div>
  );
};
