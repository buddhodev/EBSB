export interface EventItem {
  id: string;
  title: string;
  category: 'Youth Exchange' | 'Bhasha Sangam' | 'Cultural Night' | 'Heritage Walk' | 'Food Fest' | 'Quiz' | 'Webinar';
  date: string;
  time: string;
  venue: string;
  status: 'Upcoming' | 'Completed' | 'Ongoing';
  description: string;
  image: string;
  highlights?: string[];
  chiefGuest?: string;
  registrationOpen?: boolean;
}

export interface StateCulture {
  id: string;
  name: string;
  type: 'Host State' | 'Paired State';
  capital: string;
  officialLanguage: string;
  majorFestivals: string[];
  danceForms: string[];
  cuisine: string[];
  heritageSites: string[];
  image: string;
  heroImage: string;
  overview: string;
  funFact: string;
  greetingText: string;
  greetingLanguage: string;
}

export interface PhraseCard {
  id: string;
  english: string;
  hindi: string;
  manipuri: string;
  nagamese: string;
  malvi: string;
  marathi: string;
  category: 'Greetings' | 'Respect & Civility' | 'Travel & Food' | 'Celebration' | 'Education';
  audioPhonetic: {
    hindi: string;
    manipuri: string;
    nagamese: string;
  };
}

export interface GalleryMedia {
  id: string;
  title: string;
  category: 'Youth Delegation' | 'Cultural Performance' | 'Food Festival' | 'Bhasha Sangam' | 'Campus Visit';
  type: 'image' | 'video';
  url: string;
  date: string;
  location: string;
  caption: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  image: string;
  bio?: string;
  isNodalOfficer?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  state: string;
  comment: string;
  avatar: string;
  year: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact?: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSizeMultiplier: number; // 0.9, 1.0, 1.15, 1.3
  reducedMotion: boolean;
  dyslexicFont: boolean;
}
