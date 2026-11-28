import React, { useState } from 'react';
import { BHASHA_PHRASES } from '../data/ebsbData';
import { PhraseCard } from '../types';
import { Volume2, Languages, Sparkles, Send, Copy, Check, BookOpen, VolumeX } from 'lucide-react';

export const BhashaSangamHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom AI Translator state
  const [customPhrase, setCustomPhrase] = useState<string>('');
  const [translating, setTranslating] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<any>(null);

  const categories = ['All', 'Greetings', 'Respect & Civility', 'Travel & Food', 'Celebration'];

  const filteredPhrases = BHASHA_PHRASES.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const handleSpeak = (phrase: PhraseCard, textToSay: string, langCode: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingId(phrase.id + langCode);

    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find((v) => /^hi(-|$)/i.test(v.lang));
    const enInVoice = voices.find((v) => /^en-IN/i.test(v.lang)) || voices.find((v) => /^en(-|$)/i.test(v.lang));

    let speakText = textToSay;
    const utterance = new SpeechSynthesisUtterance();
    utterance.rate = 0.9;

    if (langCode === 'hi') {
      if (hiVoice) {
        // Strip parenthetical English transliteration so Hindi voice doesn't read it twice
        speakText = textToSay.replace(/\([^)]*\)/g, '').trim();
        utterance.voice = hiVoice;
        utterance.lang = hiVoice.lang;
      } else {
        speakText = phrase.audioPhonetic.hindi.replace(/-/g, '');
        if (enInVoice) utterance.voice = enInVoice;
        utterance.lang = enInVoice?.lang || 'en-IN';
      }
    } else if (langCode === 'mr') {
      utterance.lang = 'mr-IN';
    } else {
      speakText = textToSay.replace(/-/g, '');
      if (enInVoice) utterance.voice = enInVoice;
      utterance.lang = enInVoice?.lang || 'en-IN';
    }

    utterance.text = speakText;
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCustomTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPhrase.trim()) return;

    setTranslating(true);
    try {
      const res = await fetch('/api/ai/translate-phrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase: customPhrase }),
      });
      const data = await res.json();
      setTranslationResult(data);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <section id="bhasha-sangam" className="py-16 sm:py-24 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff2e6] text-[#b83d0d] border border-[#fed7ba] text-xs font-bold uppercase tracking-wider shadow-xs">
            Language & Script Integration
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#163c6b] tracking-tight">
            Bhasha Sangam Language Hub
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Language is the window to a state's soul. Learn everyday phrases, greetings, and scripts across <strong>Hindi, Meiteilon, Nagamese, Malvi, and Marathi</strong> under the National Bhasha Sangam initiative.
          </p>
        </div>

        {/* AI Custom Translator Box */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
          <div className="h-1.5 w-full ebsb-tricolor-bar" />
          <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#f26522] text-white shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#163c6b]">AI Instant Bhasha Translator</h3>
              <p className="text-xs text-slate-600 font-medium">Type any sentence to translate into Meiteilon, Nagamese, Malvi & Hindi</p>
            </div>
          </div>

          <form onSubmit={handleCustomTranslate} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customPhrase}
              onChange={(e) => setCustomPhrase(e.target.value)}
              placeholder="e.g. Welcome to IIT Indore cultural fest!"
              className="flex-1 bg-white text-slate-900 text-xs sm:text-sm px-5 py-3.5 rounded-full border border-slate-300 focus:outline-none focus:border-[#f26522] shadow-xs font-medium"
            />
            <button
              type="submit"
              disabled={translating || !customPhrase.trim()}
              className="px-7 py-3.5 rounded-full bg-[#f26522] hover:bg-[#dc4f12] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm"
            >
              {translating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Translate Phrase</span>
                </>
              )}
            </button>
          </form>

          {/* Translation Result Output */}
          {translationResult && (
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-4 animate-fadeIn">
              <div className="text-xs text-[#163c6b] font-bold uppercase">
                Translations for: "{translationResult.originalPhrase}"
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {translationResult.translations?.map((tr: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[#163c6b] font-bold">
                      <span>{tr.language}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{tr.region}</span>
                    </div>
                    <div className="text-sm font-black text-[#163c6b]">{tr.nativeText}</div>
                    <div className="text-[11px] text-slate-600 italic">"{tr.transliteration}"</div>
                    {tr.culturalNote && (
                      <p className="text-[10px] text-slate-500 border-t border-slate-200 pt-1.5 mt-1">
                        {tr.culturalNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Phrasebook Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-black text-[#163c6b] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#f26522]" />
              <span>Curated Conversation Flashcards</span>
            </h3>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#f26522] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:border-[#f26522] border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Phrase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPhrases.map((card) => (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#f26522] hover:shadow-md transition-all space-y-4 shadow-sm"
              >
                {/* Category & English Phrase */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-[#b83d0d] bg-[#fff2e6] px-2.5 py-0.5 rounded-full border border-[#fed7ba]">
                      {card.category}
                    </span>
                    <h4 className="text-lg font-black text-[#163c6b] mt-1">{card.english}</h4>
                  </div>

                  <button
                    onClick={() => handleCopy(card.id, `${card.english}\nHindi: ${card.hindi}\nManipuri: ${card.manipuri}\nNagamese: ${card.nagamese}`)}
                    className="p-2 rounded-full bg-[#f8f9fb] border border-slate-200 text-slate-600 hover:text-[#163c6b] transition-colors"
                    title="Copy all translations"
                  >
                    {copiedId === card.id ? <Check className="w-4 h-4 text-[#138808]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Multilingual Rows */}
                <div className="space-y-3 text-xs">
                  
                  {/* Hindi */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9fb] border border-slate-200">
                    <div>
                      <span className="text-[10px] text-[#163c6b] font-bold block">Hindi (Host State)</span>
                      <span lang="hi" className="font-devanagari text-sm font-bold text-[#102847] leading-relaxed">{card.hindi}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(card, card.hindi, 'hi')}
                      className="p-2 rounded-full bg-[#f0f5fa] text-[#163c6b] hover:bg-[#163c6b] hover:text-white transition-colors"
                      title="Listen Hindi"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Manipuri / Meiteilon */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9fb] border border-slate-200">
                    <div>
                      <span className="text-[10px] text-[#b83d0d] font-bold block">Manipuri / Meiteilon (Paired)</span>
                      <span lang="bn" className="font-bengali text-sm font-bold text-[#102847] leading-relaxed">{card.manipuri}</span>
                      <span className="text-[10px] text-slate-500 block font-semibold">[{card.audioPhonetic.manipuri}]</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(card, card.audioPhonetic.manipuri, 'en')}
                      className="p-2 rounded-full bg-[#fff2e6] text-[#f26522] hover:bg-[#f26522] hover:text-white transition-colors"
                      title="Listen Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Nagamese / Ao */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9fb] border border-slate-200">
                    <div>
                      <span className="text-[10px] text-[#0f7506] font-bold block">Nagamese / Ao Naga (Paired)</span>
                      <span className="text-sm font-bold text-[#102847]">{card.nagamese}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(card, card.nagamese, 'en')}
                      className="p-2 rounded-full bg-[#eefaf2] text-[#138808] hover:bg-[#138808] hover:text-white transition-colors"
                      title="Listen Nagamese"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Malvi Dialect */}
                  <div className="p-3 rounded-xl bg-[#fff6f0] border border-[#fed7ba] text-slate-700">
                    <span className="text-[10px] text-[#b83d0d] font-bold block">Malvi (Indore Regional Dialect)</span>
                    <span lang="hi" className="font-devanagari text-xs font-bold text-[#163c6b] leading-relaxed">{card.malvi}</span>
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
