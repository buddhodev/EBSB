import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  RefreshCw,
  Search,
  MessageSquare,
  Globe,
  Feather,
  Heart,
  ChevronRight,
  Shield,
  HelpCircle
} from 'lucide-react';

interface SanskritPhrase {
  id: string;
  sanskrit: string;
  transliteration: string;
  english: string;
  hindi: string;
  context: string;
}

interface ShlokaItem {
  id: string;
  title: string;
  sanskrit: string;
  transliteration: string;
  meaningEnglish: string;
  meaningHindi: string;
  source: string;
}

const SANSKRIT_PHRASES: SanskritPhrase[] = [
  {
    id: 's1',
    sanskrit: 'नमो नमः / नमस्ते',
    transliteration: 'Namo Namah / Namaste',
    english: 'Salutations / Hello',
    hindi: 'नमस्कार / प्रणाम',
    context: 'Traditional Indian greeting used across all regions.',
  },
  {
    id: 's2',
    sanskrit: 'भवतः नाम किम्?',
    transliteration: 'Bhavatah naama kim?',
    english: 'What is your name? (to male)',
    hindi: 'आपका नाम क्या है?',
    context: 'Asking a male person their name politely.',
  },
  {
    id: 's3',
    sanskrit: 'भवत्याः नाम किम्?',
    transliteration: 'Bhavatyaah naama kim?',
    english: 'What is your name? (to female)',
    hindi: 'आपका नाम क्या है?',
    context: 'Asking a female person their name politely.',
  },
  {
    id: 's4',
    sanskrit: 'मम नाम ... अस्ति।',
    transliteration: 'Mama naama ... asti.',
    english: 'My name is ...',
    hindi: 'मेरा नाम ... है।',
    context: 'Introducing oneself in Sanskrit.',
  },
  {
    id: 's5',
    sanskrit: 'भवान् कथमस्ति? / भवती कथम् अस्ति?',
    transliteration: 'Bhavaan katham asti? / Bhavatee katham asti?',
    english: 'How are you?',
    hindi: 'आप कैसे हैं?',
    context: 'Enquiring about someone’s well-being.',
  },
  {
    id: 's6',
    sanskrit: 'अहम् कुशली अस्मि।',
    transliteration: 'Aham kushalee asmi.',
    english: 'I am fine.',
    hindi: 'मैं ठीक हूँ।',
    context: 'Responding positively to well-being inquiry.',
  },
  {
    id: 's7',
    sanskrit: 'धन्यवादः / अनुगृहीतोऽस्मि',
    transliteration: 'Dhanyavaadah / Anugriheeto asmi',
    english: 'Thank you / I am grateful',
    hindi: 'धन्यवाद / आभार',
    context: 'Expressing gratitude.',
  },
  {
    id: 's8',
    sanskrit: 'सुप्रभातम् / शुभदिनम्',
    transliteration: 'Suprabhaatam / Shubhadinam',
    english: 'Good Morning / Good Day',
    hindi: 'शुभ प्रभात / शुभ दिन',
    context: 'Morning or daytime greeting.',
  },
  {
    id: 's9',
    sanskrit: 'एकम् भारतम् श्रेष्ठम् भारतम्',
    transliteration: 'Ekam Bhaaratam Shreshtham Bhaaratam',
    english: 'One India, Noble / Great India',
    hindi: 'एक भारत श्रेष्ठ भारत',
    context: 'The national motto of EBSB initiative.',
  },
  {
    id: 's10',
    sanskrit: 'पुनः मिलामः',
    transliteration: 'Punah milaamah',
    english: 'See you again',
    hindi: 'फिर मिलेंगे',
    context: 'Farewell greeting.',
  },
];

const SHLOKAS_DATA: ShlokaItem[] = [
  {
    id: 'sh1',
    title: 'National Unity & Harmony (Rigveda)',
    sanskrit: 'संगच्छध्वं संवदध्वं सं वो मनांसि जानताम् । देवा भागं यथा पूर्वे सञ्जानाना उपासते ॥',
    transliteration: 'Saṁgacchadhvaṁ saṁvadadhvaṁ saṁ vo manāṁsi jānatām | Devā bhāgaṁ yathā pūrve sañjānānā upāsate ||',
    meaningEnglish: 'Walk together, speak together, let your minds be in agreement, just as the ancient enlightened ones shared their offerings in unity.',
    meaningHindi: 'साथ चलें, एक स्वर में बोलें, और अपने मनों को एक करें, जैसे ज्ञानी महापुरुष एकता के साथ कार्य करते हैं।',
    source: 'Rigveda (10.191.2)',
  },
  {
    id: 'sh2',
    title: 'Universal Well-being (Subhashitam)',
    sanskrit: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥',
    transliteration: 'Sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ | Sarve bhadrāṇi paśyantu mā kaścid-duḥkha-bhāg-bhavet ||',
    meaningEnglish: 'May all beings be happy, may all be free from illness, may all see what is auspicious, may no one suffer.',
    meaningHindi: 'सभी सुखी हों, सभी निरोग रहें, सभी का कल्याण हो, और कोई भी दुःखी न हो।',
    source: 'Brihadaranyaka Upanishad Subhashitam',
  },
  {
    id: 'sh3',
    title: 'Knowledge & Enlightenment',
    sanskrit: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् । पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥',
    transliteration: 'Vidyā dadāti vinayaṁ vinayād-yāti pātratām | Pātratvād-dhanam-āpnoti dhanād-dharmaṁ tataḥ sukham ||',
    meaningEnglish: 'True education imparts humility; from humility comes worthiness; from worthiness comes prosperity, righteousness, and eternal happiness.',
    meaningHindi: 'विद्या विनय प्रदान करती है; विनय से पात्रता आती है; पात्रता से धन, धर्म और सुख प्राप्त होता है।',
    source: 'Hitopadesha',
  },
];

const QUIZ_QUESTIONS = [
  {
    question: 'What does "Ekam Bhaaratam Shreshtham Bhaaratam" translate to?',
    options: ['One India, Great India', 'Clean India, Green India', 'Digital India, Fast India', 'Knowledge India, Rich India'],
    correct: 0,
  },
  {
    question: 'Which ancient poet from Ujjain (MP) composed "Meghadutam" in Sanskrit?',
    options: ['Mahakavi Kalidasa', 'Bhasa', 'Banabhatta', 'Harishena'],
    correct: 0,
  },
  {
    question: 'What is the Sanskrit greeting for "Good Morning"?',
    options: ['Suprabhaatam', 'Shubharatri', 'Swagatam', 'Dhanyavaadah'],
    correct: 0,
  },
];

interface SanskritHubProps {
  onOpenAiModal?: (tab?: 'assistant' | 'quiz') => void;
}

export const SanskritHub: React.FC<SanskritHubProps> = ({ onOpenAiModal }) => {
  const [activeTab, setActiveTab] = useState<'bhasha' | 'shlokas' | 'iks' | 'quiz'>('bhasha');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load voices reliably across browsers and stop audio on unmount
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length > 0) {
        voicesRef.current = list;
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const filteredPhrases = SANSKRIT_PHRASES.filter(
    (p) =>
      p.sanskrit.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      p.english.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      p.transliteration.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      p.hindi.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  // Convert scholarly IAST diacritics to clear phonetic ASCII for non-Devanagari TTS engines
  const toPhoneticFallback = (transliteration: string): string => {
    return transliteration
      .replace(/ā/gi, 'aa')
      .replace(/ī/gi, 'ee')
      .replace(/ū/gi, 'oo')
      .replace(/[ṁṃ]/gi, 'm')
      .replace(/ḥ/gi, 'h')
      .replace(/[śṣ]/gi, 'sh')
      .replace(/[ñṇṅ]/gi, 'n')
      .replace(/ṭ/gi, 't')
      .replace(/ḍ/gi, 'd')
      .replace(/ṛ/gi, 'ri')
      .replace(/\|+/g, ', ')
      .replace(/\.\.\./g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleSpeak = (sanskritText: string, transliteration: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Clicking the currently playing item stops playback
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingId(id);

    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    const devanagariVoice =
      voices.find((v) => /^sa(-|$)/i.test(v.lang)) ||
      voices.find((v) => /^hi(-|$)/i.test(v.lang)) ||
      voices.find((v) => /^mr(-|$)/i.test(v.lang));
    const indianEnglishVoice =
      voices.find((v) => /^en-IN/i.test(v.lang)) ||
      voices.find((v) => /^en(-|$)/i.test(v.lang));

    // Split on "/" so each Sanskrit variant is spoken cleanly in sequence without saying "or"
    const sourceSegments = devanagariVoice
      ? sanskritText
          .split('/')
          .map((seg) =>
            seg
              .replace(/[।॥]/g, ', ')
              .replace(/\.\.\./g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
          )
          .filter(Boolean)
      : transliteration
          .split('/')
          .map((seg) => toPhoneticFallback(seg))
          .filter(Boolean);

    if (sourceSegments.length === 0) {
      setPlayingId(null);
      return;
    }

    sourceSegments.forEach((segment, index) => {
      const utterance = new SpeechSynthesisUtterance(segment);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      if (devanagariVoice) {
        utterance.voice = devanagariVoice;
        utterance.lang = devanagariVoice.lang;
      } else {
        if (indianEnglishVoice) {
          utterance.voice = indianEnglishVoice;
        }
        utterance.lang = indianEnglishVoice?.lang || 'en-IN';
      }

      if (index === sourceSegments.length - 1) {
        utterance.onend = () => setPlayingId(null);
      }
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
    });
  };

  const handleAnswerQuiz = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === QUIZ_QUESTIONS[quizIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="py-12 sm:py-20 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Sanskrit Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-[#102847] via-[#163c6b] to-[#1e4d87] text-white shadow-xl relative overflow-hidden border border-[#163c6b]">
          <div className="h-1.5 w-full ebsb-tricolor-bar" />
          <div className="p-8 sm:p-12 space-y-6 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl font-serif text-orange-200">
            संस्कृतम्
          </div>

          <div className="space-y-3 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f26522]/20 text-orange-200 border border-[#f26522]/40 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bhasha Sangam • Sanskrit Language & Heritage Hub</span>
            </div>
            <h2 lang="sa" className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-snug">
              संस्कृत भाषा एवं भारतीय ज्ञान परम्परा
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
              Explore Sanskrit—the classical mother language of Indian civilization. Learn everyday conversation phrases, recite universal shlokas, and discover IIT Indore’s research in Indian Knowledge Systems (IKS).
            </p>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <div className="flex flex-wrap items-center gap-6 text-slate-200">
              <span className="flex items-center gap-1.5"><Feather className="w-4 h-4 text-[#ff9933]" /> Classical Mother Tongue</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#4ad178]" /> Bhasha Sangam Recognized</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-300" /> IIT Indore IKS Research</span>
            </div>

            {onOpenAiModal && (
              <button
                onClick={() => onOpenAiModal('assistant')}
                className="px-5 py-2.5 rounded-full bg-[#f26522] hover:bg-[#dc4f12] text-white font-black transition-colors shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Sanskrit Assistant</span>
              </button>
            )}
          </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('bhasha')}
            className={`px-6 py-3 rounded-full text-xs font-black transition-all ${
              activeTab === 'bhasha'
                ? 'bg-[#f26522] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:border-[#f26522] border border-slate-200'
            }`}
          >
            Everyday Conversation (Bhasha Sangam)
          </button>
          <button
            onClick={() => setActiveTab('shlokas')}
            className={`px-6 py-3 rounded-full text-xs font-black transition-all ${
              activeTab === 'shlokas'
                ? 'bg-[#163c6b] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:border-[#163c6b] border border-slate-200'
            }`}
          >
            Classical Shlokas & Subhashitani
          </button>
          <button
            onClick={() => setActiveTab('iks')}
            className={`px-6 py-3 rounded-full text-xs font-black transition-all ${
              activeTab === 'iks'
                ? 'bg-[#138808] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:border-[#138808] border border-slate-200'
            }`}
          >
            IIT Indore IKS & MP Heritage
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-6 py-3 rounded-full text-xs font-black transition-all ${
              activeTab === 'quiz'
                ? 'bg-[#f26522] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:border-[#f26522] border border-slate-200'
            }`}
          >
            Sanskrit Interactive Quiz
          </button>
        </div>

        {/* TAB 1: Bhasha Sangam Conversation Cards */}
        {activeTab === 'bhasha' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-lg font-black text-[#163c6b]">
                  Everyday Sanskrit Sentences (संस्कृत सम्भाषणम्)
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Click any card to listen to correct Sanskrit audio pronunciation.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchPhrase}
                  onChange={(e) => setSearchPhrase(e.target.value)}
                  placeholder="Search Sanskrit phrases..."
                  className="w-full bg-white text-slate-900 text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-300 focus:outline-none focus:border-[#f26522] shadow-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPhrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#f26522] hover:shadow-md transition-all duration-300 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span lang="sa" className="text-2xl font-bold text-[#163c6b] font-serif leading-snug">
                        {phrase.sanskrit}
                      </span>
                      <button
                        onClick={() => handleSpeak(phrase.sanskrit, phrase.transliteration, phrase.id)}
                        className={`p-2.5 rounded-full transition-colors ${
                          playingId === phrase.id
                            ? 'bg-[#f26522] text-white animate-bounce'
                            : 'bg-[#fff2e6] text-[#b83d0d] hover:bg-[#f26522] hover:text-white'
                        }`}
                        title="Listen to Sanskrit audio pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-slate-500 italic">
                      Transliteration: {phrase.transliteration}
                    </div>

                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold text-[#163c6b] block">English:</span>
                        <span className="font-bold text-slate-800">{phrase.english}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-extrabold text-[#b83d0d] block">Hindi:</span>
                        <span lang="hi" className="font-devanagari font-bold text-slate-800">{phrase.hindi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-[#f8f9fb] p-2.5 rounded-xl border border-slate-200 font-medium">
                    <span className="font-semibold text-[#163c6b]">Context:</span> {phrase.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Shlokas & Subhashitani */}
        {activeTab === 'shlokas' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-black text-[#163c6b]">
                Classical Subhashitani & Vedic Verses
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Timeless Sanskrit poetry promoting unity, education, and human brotherhood.
              </p>
            </div>

            <div className="space-y-6">
              {SHLOKAS_DATA.map((sh) => (
                <div
                  key={sh.id}
                  className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b83d0d] bg-[#fff2e6] px-3 py-1 rounded-full border border-[#fed7ba]">
                        {sh.source}
                      </span>
                      <h4 className="text-lg font-black text-[#163c6b] mt-1">
                        {sh.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleSpeak(sh.sanskrit, sh.transliteration, sh.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f26522] hover:bg-[#dc4f12] text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{playingId === sh.id ? 'Stop Recitation' : 'Recite Shloka'}</span>
                    </button>
                  </div>

                  {/* Sanskrit Text */}
                  <div lang="sa" className="text-xl sm:text-2xl font-bold text-[#102847] font-serif leading-loose text-center py-4 px-4 bg-[#fff6f0] rounded-xl border border-[#fed7ba]">
                    {sh.sanskrit}
                  </div>

                  <div className="text-xs font-semibold text-slate-600 text-center italic">
                    "{sh.transliteration}"
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-1">
                      <span className="font-black text-[#163c6b] uppercase text-[10px]">English Translation:</span>
                      <p className="text-slate-700 font-medium leading-relaxed">{sh.meaningEnglish}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#f8f9fb] border border-slate-200 space-y-1">
                      <span className="font-black text-[#b83d0d] uppercase text-[10px]">Hindi Translation:</span>
                      <p lang="hi" className="font-devanagari text-slate-700 font-medium leading-relaxed">{sh.meaningHindi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: IKS & MP Sanskrit Heritage */}
        {activeTab === 'iks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* IIT Indore IKS */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#163c6b] text-white w-fit shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-[#163c6b]">
                  Center for Indian Knowledge Systems (IKS) at IIT Indore
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  IIT Indore actively promotes interdisciplinary research connecting ancient Sanskrit treatises in mathematics, astronomy, metallurgy, water architecture, and medicine with modern engineering.
                </p>

                <div className="space-y-2.5 pt-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                    <span>Courses in Ancient Indian Science & Technology through Sanskrit texts.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                    <span>Vedic Mathematics workshops for student delegations.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                    <span>Translation of classical manuscripts into digital computational models.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f5fa] border border-[#d6e4f2] text-[#163c6b] text-xs font-bold">
                🏛️ Located at Academic Block, IIT Indore Simrol Campus
              </div>
            </div>

            {/* MP Sanskrit Heritage - Kalidasa & Ujjain */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#dc4f12] via-[#f26522] to-[#b83d0d] text-white shadow-md space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#102847] text-orange-200 px-3 py-1 rounded-full border border-white/15">
                  Madhya Pradesh Heritage
                </span>
                <h3 className="text-2xl font-black text-white">
                  Ujjain & Mahakavi Kalidasa Classical Legacy
                </h3>
                <p className="text-xs text-white/95 font-semibold leading-relaxed">
                  Ujjain (Avantika), located near Indore, is world-famous as the literary cradle of Mahakavi Kalidasa, author of Meghadutam and Abhijñana Shakuntalam, and the seat of Maharishi Sandipani Ashram.
                </p>

                <div className="p-4 rounded-xl bg-white text-slate-900 text-xs space-y-2 border border-white">
                  <span className="font-extrabold text-[#163c6b] block">Key Cultural Points for EBSB Delegates:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] font-medium">
                    <li>Annual Akhil Bharatiya Kalidasa Samaroh in Ujjain.</li>
                    <li>Meghaduta’s poetic descriptions of the Malwa region & Vindhya mountains.</li>
                    <li>Mahakal corridor & ancient Vikram Samvat astronomical observatory.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/25 text-xs font-bold text-white flex justify-between items-center">
                <span>EBSB Youth Heritage Trail</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Sanskrit Quiz */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-6">
            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span className="text-xs font-extrabold uppercase text-[#b83d0d] bg-[#fff2e6] px-3 py-1 rounded-full border border-[#fed7ba]">
                    Sanskrit Knowledge Quiz • Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Score: {score}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#163c6b]">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h3>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[quizIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[quizIndex].correct;
                    let btnStyle = 'bg-white hover:bg-[#fff6f0] hover:border-[#f26522] text-slate-800 border-slate-200';

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-[#138808] text-white border-[#0f7506] font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-600 text-white border-rose-700 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuiz(idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl text-xs font-semibold border text-left transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 rounded-full bg-[#163c6b] hover:bg-[#102847] text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    {quizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Quiz Result'}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <Award className="w-16 h-16 text-[#f26522] mx-auto" />
                <h3 className="text-2xl font-black text-[#163c6b]">Quiz Completed!</h3>
                <p className="text-sm font-bold text-slate-600">
                  You scored {score} out of {QUIZ_QUESTIONS.length} on Sanskrit & Bhasha Sangam heritage.
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 rounded-full bg-[#f26522] hover:bg-[#dc4f12] text-white font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
