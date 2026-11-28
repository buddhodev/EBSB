import React, { createContext, useContext, useState, useEffect } from 'react';

export type SiteLanguage = 'en' | 'hi' | 'mni' | 'sa';

export interface LanguageOption {
  code: SiteLanguage;
  shortLabel: string;
  nativeLabel: string;
  englishName: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', shortLabel: 'EN', nativeLabel: 'English', englishName: 'English' },
  { code: 'hi', shortLabel: 'हिन्दी', nativeLabel: 'हिन्दी', englishName: 'Hindi' },
  { code: 'mni', shortLabel: 'মৈতৈ', nativeLabel: 'মৈতৈলোন্', englishName: 'Manipuri' },
  { code: 'sa', shortLabel: 'संस्कृतम्', nativeLabel: 'संस्कृतम्', englishName: 'Sanskrit' },
];

export interface SiteTranslations {
  topBar: {
    govtBadge: string;
    ministrySubtitle: string;
    wcagLabel: string;
    signIn: string;
    signingIn: string;
    signOut: string;
    languageLabel: string;
  };
  brand: {
    institute: string;
    cellTag: string;
    ebsbName: string;
  };
  nav: {
    home: string;
    about: string;
    pairedStates: string;
    culturalMap: string;
    events: string;
    bhashaSangam: string;
    sanskritHub: string;
    gallery: string;
    teamContact: string;
    aiGuideBtn: string;
    joinEbsbBtn: string;
    askAiMobile: string;
    takeQuizMobile: string;
    registerVolunteerMobile: string;
    signInGoogle: string;
    searchTooltip: string;
  };
  hero: {
    liveUpdates: string;
    marquee1Title: string;
    marquee1Body: string;
    marquee2Title: string;
    marquee2Body: string;
    marquee3Title: string;
    marquee3Body: string;
    partnerStatesBtn: string;
    eventsBtn: string;
    culturalGuideBtn: string;
    slideCaptions: string[];
  };
  home: {
    directoryBadge: string;
    directoryTitle: string;
    directorySubtitle: string;
    openFullPage: string;
    hubs: Record<
      string,
      {
        title: string;
        subtitle: string;
        description: string;
        badge: string;
        highlights: [string, string, string];
      }
    >;
    aiBannerBadge: string;
    aiBannerTitle: string;
    aiBannerDesc: string;
    aiBannerAskBtn: string;
    aiBannerQuizBtn: string;
    volunteerBadge: string;
    volunteerTitle: string;
    volunteerDesc: string;
    volunteerBtn: string;
  };
  breadcrumb: {
    home: string;
    portalPage: string;
    returnHome: string;
    pageTitles: Record<string, string>;
  };
  quickActions: {
    title: string;
    subtitle: string;
    closeMenu: string;
    signInHeading: string;
    signInDesc: string;
    signInGoogle: string;
    signingIn: string;
    signOut: string;
    quizzesLabel: string;
    volunteerLabel: string;
    submittedStatus: string;
    openStatus: string;
    frequentlyUsed: string;
    bhashaQuizTitle: string;
    bhashaQuizDesc: string;
    volunteerTitle: string;
    volunteerDescOpen: string;
    volunteerDescApplied: string;
    culturalGuideTitle: string;
    culturalGuideDesc: string;
    appliedBadge: string;
    savedSuffix: string;
  };
  footer: {
    portalTitle: string;
    cellSubtitle: string;
    description: string;
    wcagNote: string;
    quickLinksHeading: string;
    quickLinks: {
      about: string;
      pairedStates: string;
      events: string;
      bhashaSangam: string;
      gallery: string;
    };
    importantLinksHeading: string;
    copyrightPrefix: string;
    copyrightSuffix: string;
    designedBy: string;
    digitalIndiaTitle: string;
    digitalIndiaSubtitle: string;
  };
  events: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    viewDetails: string;
    registerNow: string;
    registerCutoff: string;
    closingSoon: string;
    nextEvent: string;
    regEndsIn: string;
    eventStartsIn: string;
    fillingFast: string;
  };
}

const TRANSLATIONS: Record<SiteLanguage, SiteTranslations> = {
  en: {
    topBar: {
      govtBadge: 'भारत सरकार | Govt. of India',
      ministrySubtitle: 'Ministry of Education • Ek Bharat Shreshtha Bharat Cell at IIT Indore',
      wcagLabel: 'WCAG 2.1 AA Accessible',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      signOut: 'Sign Out',
      languageLabel: 'Language',
    },
    brand: {
      institute: 'IIT INDORE',
      cellTag: 'EBSB CELL',
      ebsbName: 'Ek Bharat Shreshtha Bharat',
    },
    nav: {
      home: 'Home',
      about: 'About EBSB',
      pairedStates: 'Paired States',
      culturalMap: 'Cultural Map',
      events: 'Events & Exchange',
      bhashaSangam: 'Bhasha Sangam',
      sanskritHub: 'Sanskrit Hub',
      gallery: 'Gallery',
      teamContact: 'Team & Contact',
      aiGuideBtn: 'AI Cultural Guide',
      joinEbsbBtn: 'Join EBSB',
      askAiMobile: 'Ask AI Cultural Guide',
      takeQuizMobile: 'Take AI Integration Quiz',
      registerVolunteerMobile: 'Register as Student Volunteer',
      signInGoogle: 'Sign in with Google',
      searchTooltip: 'Search Events, Culture, Languages',
    },
    hero: {
      liveUpdates: 'Live Updates',
      marquee1Title: 'Flagship Youth Exchange 2026:',
      marquee1Body: 'Registrations now open for Manipur & Nagaland Student Delegation!',
      marquee2Title: 'Bhasha Sangam:',
      marquee2Body: 'Weekly Meiteilon & Ao Naga language learning circles every Wednesday at LHC-102',
      marquee3Title: 'National Integration Quiz:',
      marquee3Body: 'Test your cultural knowledge & earn your Digital EBSB Badge!',
      partnerStatesBtn: 'Partner States',
      eventsBtn: 'Events',
      culturalGuideBtn: 'Cultural Guide',
      slideCaptions: [
        'Republic Day Cultural Celebration at IIT Indore',
        'Kavyanjali — Cultural Dance Performance at IIT Indore',
        'Jahaz Mahal, Mandu — Ancient Water Management Heritage of Madhya Pradesh',
        'Swachh Survekshan — Vibrant Wall Art of Indore, Madhya Pradesh',
        'Rajyon Ki Mithas: Madhya Pradesh Bahadura ke Ladoo & Manipur Chak-Hao Kheer',
        'Bagh Print — Traditional Eco-Friendly Handblock Art of Dhar, MP',
        "Indore (Madhya Pradesh) — India's Cleanest City under Swachh Survekshan",
        'IIT Indore EBSB Science & Educational Outreach Interaction',
        'Bhil Painting — Indigenous Tribal Art Heritage of Madhya Pradesh',
        'IIT Indore EBSB Outreach at Baigaon Village Hospital & School (Free Press Indore)',
      ],
    },
    home: {
      directoryBadge: 'Portal Directory Overview',
      directoryTitle: 'Explore EBSB Portal Departments & Features',
      directorySubtitle:
        'Select any tab below or navigate using the main top menu to visit dedicated pages for state pairing, events, languages, and team contacts.',
      openFullPage: 'Open Full Page',
      hubs: {
        about: {
          title: 'About EBSB Cell',
          subtitle: 'Ministry of Education Mandate & Strategic Vision',
          description:
            'Discover the founding mission of Ek Bharat Shreshtha Bharat at IIT Indore under Director Prof. Suhas S. Joshi and Nodal Officer Dr. Sharad Gupta.',
          badge: 'Mandate & Vision',
          highlights: ['4 Core Pillars', 'Director Message', 'Campus Engagement'],
        },
        'paired-states': {
          title: 'Paired States Hub',
          subtitle: 'Madhya Pradesh ↔ Manipur & Nagaland Pairing',
          description:
            'Explore rich comparative insights across geography, traditional art forms, grand festivals (Yaoshang, Hornbill), and culinary heritage.',
          badge: 'State Pairing',
          highlights: ['State Profiles', 'Pithora & Thang-Ta Art', 'Indori Poha & Chak-Hao'],
        },
        'cultural-map': {
          title: 'Interactive Cultural Map',
          subtitle: 'Geographical Landmarks & Heritage Sites',
          description:
            'Explore UNESCO World Heritage sites, classical dance arenas, Hornbill Festival grounds, and IIT Indore hubs with interactive pins.',
          badge: 'Visual Map',
          highlights: ['Interactive Canvas', 'MP, Manipur & Nagaland', 'Landmark Dossiers'],
        },
        events: {
          title: 'Youth Exchange & Events',
          subtitle: 'Inter-State Delegations & Annual Calendar',
          description:
            'View schedules for upcoming youth exchanges, Bhasha Sangam poetry circles, Indori food walks, and Rashtriya Ekta Diwas events.',
          badge: 'Events & Trips',
          highlights: ['Delegation Trips', 'Food Walks', 'Ekta Diwas Marathon'],
        },
        'bhasha-sangam': {
          title: 'Bhasha Sangam Hub',
          subtitle: 'Language Learning & AI Translation',
          description:
            'Practice 100+ everyday phrases in Meiteilon, Nagamese, Ao Naga, Malvi, and Hindi with audio pronunciations and our instant AI translator.',
          badge: 'Languages & Scripts',
          highlights: ['AI Instant Translator', '5 Languages', 'Phonetic Audio Cards'],
        },
        'sanskrit-hub': {
          title: 'Sanskrit Language & Heritage',
          subtitle: 'Classical Mother Tongue & Indian Knowledge Systems',
          description:
            'Recite Vedic shlokas, practice Sanskrit conversation phrases, and learn about IIT Indore Center for Indian Knowledge Systems (IKS).',
          badge: 'Classical Heritage',
          highlights: ['Shlokas & Audio', 'Everyday Phrases', 'IKS Research at IITI'],
        },
        gallery: {
          title: 'Media Gallery & Stories',
          subtitle: 'Youth Experiences & Visual Memories',
          description:
            'Browse photos, video highlights, and inspiring testimonials from student delegates participating in inter-state youth exchange programs.',
          badge: 'Visual Gallery',
          highlights: ['Delegation Photos', 'Student Quotes', 'Cultural Performances'],
        },
        'team-contact': {
          title: 'Team & Volunteer Desk',
          subtitle: 'Cell Leadership & Student Crew Recruitment',
          description:
            'Meet faculty nodal officers, student coordinators, and apply to join the official EBSB student volunteer crew at SAC, IIT Indore.',
          badge: 'Committee & Contact',
          highlights: ['Faculty Nodal Desk', 'Student Coordinators', 'Apply for Volunteer Crew'],
        },
      },
      aiBannerBadge: 'Interactive Gemini AI Cultural Engine',
      aiBannerTitle: 'Have Questions About Manipur, Nagaland, or Indori Culture?',
      aiBannerDesc:
        'Ask our Gemini-powered AI Assistant about heritage sites, cuisine pairings, Bhasha Sangam translations, or test your knowledge with the National Integration Quiz!',
      aiBannerAskBtn: 'Ask AI Guide',
      aiBannerQuizBtn: 'Take Quiz',
      volunteerBadge: 'IIT Indore Campus Community',
      volunteerTitle: 'Become an Official EBSB Student Volunteer',
      volunteerDesc:
        'Host visiting delegates from Manipur & Nagaland, manage cultural workshops, and earn official EBSB coordinator certificates.',
      volunteerBtn: 'Apply as Volunteer',
    },
    breadcrumb: {
      home: 'Home',
      portalPage: 'EBSB Portal Page',
      returnHome: 'Return to Homepage',
      pageTitles: {
        about: 'About EBSB Cell & Mandate',
        'paired-states': 'Paired States Hub (MP ↔ Manipur/Nagaland)',
        'cultural-map': 'Interactive EBSB Cultural Map',
        events: 'Youth Exchange & Events Calendar',
        'bhasha-sangam': 'Bhasha Sangam Language Hub',
        'sanskrit-hub': 'Sanskrit Language & Heritage Hub',
        gallery: 'Media Gallery & Student Stories',
        'team-contact': 'EBSB Committee & Contact Desk',
      },
    },
    quickActions: {
      title: 'Quick Actions',
      subtitle: 'IIT Indore • Ek Bharat Shreshtha Bharat',
      closeMenu: 'Close Menu',
      signInHeading: 'Sign in to IITI EBSB Portal',
      signInDesc: 'Save your Bhasha Quiz scores and submit verified Volunteer Applications.',
      signInGoogle: 'Sign in with Google',
      signingIn: 'Signing in...',
      signOut: 'Sign Out',
      quizzesLabel: 'Quizzes',
      volunteerLabel: 'Volunteer',
      submittedStatus: 'Submitted',
      openStatus: 'Open',
      frequentlyUsed: 'Frequently Used Actions',
      bhashaQuizTitle: 'Bhasha Quiz',
      bhashaQuizDesc: 'Test regional phrases, heritage & state pairings',
      volunteerTitle: 'Volunteer Application',
      volunteerDescOpen: 'Join the IIT Indore EBSB student volunteer crew',
      volunteerDescApplied: 'View your submission status or apply for another cell',
      culturalGuideTitle: 'Cultural Guide',
      culturalGuideDesc: 'Explore MP, Manipur & Nagaland traditions with AI',
      appliedBadge: 'Applied',
      savedSuffix: 'saved',
    },
    footer: {
      portalTitle: 'IIT Indore • EBSB Portal',
      cellSubtitle: 'Ek Bharat Shreshtha Bharat Cell',
      description:
        'Promoting national integration, paired state cultural exchanges, Bhasha Sangam language workshops, and youth delegations under the Ministry of Education, Government of India.',
      wcagNote: 'Compliant with Govt. Accessibility & WCAG 2.1 AA Guidelines',
      quickLinksHeading: 'Quick Links',
      quickLinks: {
        about: 'About EBSB Mandate',
        pairedStates: 'MP ↔ Manipur & Nagaland',
        events: 'Youth Exchange Calendar',
        bhashaSangam: 'Bhasha Sangam Language Hub',
        gallery: 'Media & Delegation Stories',
      },
      importantLinksHeading: 'Important Links',
      copyrightPrefix: '©',
      copyrightSuffix:
        'Ek Bharat Shreshtha Bharat Cell, Indian Institute of Technology Indore. All Rights Reserved.',
      designedBy: 'Site designed and Created by',
      digitalIndiaTitle: 'Digital India Initiative',
      digitalIndiaSubtitle: 'Power To Empower • digitalindia.gov.in',
    },
    events: {
      badge: 'EBSB Calendar & Youth Delegation',
      title: 'EBSB Events & Youth Exchanges',
      subtitle:
        'Explore upcoming inter-state youth exchange programs, Bhasha Sangam workshops, food festivals, and cultural night archives at IIT Indore.',
      searchPlaceholder: 'Search events, venues...',
      viewDetails: 'View Details',
      registerNow: 'Register Now',
      registerCutoff: 'Register Before Cutoff',
      closingSoon: 'Registration Closing Soon',
      nextEvent: 'Next Upcoming Event',
      regEndsIn: 'Registration Ends In',
      eventStartsIn: 'Event Starts In',
      fillingFast: 'Filling Fast',
    },
  },

  hi: {
    topBar: {
      govtBadge: 'भारत सरकार | Govt. of India',
      ministrySubtitle: 'शिक्षा मंत्रालय • आईआईटी इंदौर में एक भारत श्रेष्ठ भारत प्रकोष्ठ',
      wcagLabel: 'WCAG 2.1 AA सुगम्य',
      signIn: 'साइन इन',
      signingIn: 'साइन इन हो रहा है...',
      signOut: 'साइन आउट',
      languageLabel: 'भाषा',
    },
    brand: {
      institute: 'आईआईटी इंदौर',
      cellTag: 'EBSB प्रकोष्ठ',
      ebsbName: 'एक भारत श्रेष्ठ भारत',
    },
    nav: {
      home: 'मुख्य पृष्ठ',
      about: 'परिचय',
      pairedStates: 'सहभागी राज्य',
      culturalMap: 'सांस्कृतिक मानचित्र',
      events: 'कार्यक्रम एवं आदान-प्रदान',
      bhashaSangam: 'भाषा संगम',
      sanskritHub: 'संस्कृत केंद्र',
      gallery: 'दीर्घा',
      teamContact: 'समिति एवं संपर्क',
      aiGuideBtn: 'एआई सांस्कृतिक मार्गदर्शक',
      joinEbsbBtn: 'EBSB से जुड़ें',
      askAiMobile: 'एआई सांस्कृतिक मार्गदर्शक से पूछें',
      takeQuizMobile: 'राष्ट्रीय एकता प्रश्नोत्तरी लें',
      registerVolunteerMobile: 'छात्र स्वयंसेवक पंजीकरण',
      signInGoogle: 'गूगल से साइन इन करें',
      searchTooltip: 'कार्यक्रम, संस्कृति, भाषाएं खोजें',
    },
    hero: {
      liveUpdates: 'ताज़ा सूचनाएँ',
      marquee1Title: 'युवा आदान-प्रदान 2026:',
      marquee1Body: 'मणिपुर और नागालैंड छात्र प्रतिनिधिमंडल के लिए पंजीकरण अब खुले हैं!',
      marquee2Title: 'भाषा संगम:',
      marquee2Body: 'प्रत्येक बुधवार LHC-102 में मणिपुरी (मेइतेइलोन) और आओ नागा भाषा अभ्यास सत्र',
      marquee3Title: 'राष्ट्रीय एकता प्रश्नोत्तरी:',
      marquee3Body: 'अपना सांस्कृतिक ज्ञान परखें और डिजिटल EBSB बैज प्राप्त करें!',
      partnerStatesBtn: 'सहभागी राज्य',
      eventsBtn: 'कार्यक्रम',
      culturalGuideBtn: 'सांस्कृतिक मार्गदर्शक',
      slideCaptions: [
        'आईआईटी इंदौर में गणतंत्र दिवस सांस्कृतिक उत्सव',
        'काव्यांजलि — आईआईटी इंदौर में शास्त्रीय नृत्य प्रस्तुति',
        'जहाज़ महल, मांडू — मध्य प्रदेश की प्राचीन जल प्रबंधन विरासत',
        'स्वच्छ सर्वेक्षण — इंदौर (मध्य प्रदेश) की जीवंत भित्ति कला',
        'राज्यों की मिठास: मध्य प्रदेश के बहादुरा के लड्डू और मणिपुर की चाक-हाओ खीर',
        'बाघ प्रिंट — धार, मध्य प्रदेश की पारंपरिक पर्यावरण-अनुकूल हस्तशिल्प कला',
        'इंदौर (मध्य प्रदेश) — स्वच्छ सर्वेक्षण के अंतर्गत भारत का सबसे स्वच्छ शहर',
        'आईआईटी इंदौर EBSB विज्ञान एवं शैक्षिक आउटरीच संवाद',
        'भील चित्रकला — मध्य प्रदेश की पारंपरिक जनजातीय कला विरासत',
        'बैगाँव ग्राम अस्पताल एवं विद्यालय में आईआईटी इंदौर EBSB स्वच्छता अभियान',
      ],
    },
    home: {
      directoryBadge: 'पोर्टल निर्देशिका अवलोकन',
      directoryTitle: 'EBSB पोर्टल के विभाग एवं सुविधाएँ देखें',
      directorySubtitle:
        'सहभागी राज्यों, कार्यक्रमों, भाषाओं और समिति संपर्क के समर्पित पृष्ठों पर जाने के लिए नीचे किसी भी अनुभाग या शीर्ष मेनू का चयन करें।',
      openFullPage: 'पूरा पृष्ठ खोलें',
      hubs: {
        about: {
          title: 'EBSB प्रकोष्ठ परिचय',
          subtitle: 'शिक्षा मंत्रालय का उद्देश्य एवं दूरदृष्टि',
          description:
            'निदेशक प्रो. सुहास एस. जोशी एवं नोडल अधिकारी डॉ. शरद गुप्ता के मार्गदर्शन में आईआईटी इंदौर के एक भारत श्रेष्ठ भारत मिशन को जानें।',
          badge: 'उद्देश्य एवं दृष्टि',
          highlights: ['4 मुख्य स्तंभ', 'निदेशक का संदेश', 'परिसर सहभागिता'],
        },
        'paired-states': {
          title: 'सहभागी राज्य केंद्र',
          subtitle: 'मध्य प्रदेश ↔ मणिपुर एवं नागालैंड साझेदारी',
          description:
            'भूगोल, पारंपरिक कला रूपों, प्रमुख उत्सवों (याओशांग, हॉर्नबिल) और पाक विरासत की तुलनात्मक झलक देखें।',
          badge: 'राज्य साझेदारी',
          highlights: ['राज्य प्रोफ़ाइल', 'पिथौरा एवं थांग-ता कला', 'इंदौरी पोहा एवं चाक-हाओ'],
        },
        'cultural-map': {
          title: 'इंटरैक्टिव सांस्कृतिक मानचित्र',
          subtitle: 'भौगोलिक धरोहर एवं विरासत स्थल',
          description:
            'यूनेस्को विश्व धरोहर स्थलों, शास्त्रीय नृत्य केंद्रों, हॉर्नबिल उत्सव और आईआईटी इंदौर केंद्रों को मानचित्र पर देखें।',
          badge: 'दृश्य मानचित्र',
          highlights: ['इंटरैक्टिव मानचित्र', 'म.प्र., मणिपुर एवं नागालैंड', 'धरोहर विवरण'],
        },
        events: {
          title: 'युवा आदान-प्रदान एवं कार्यक्रम',
          subtitle: 'अंतर-राज्यीय प्रतिनिधिमंडल एवं वार्षिक कैलेंडर',
          description:
            'आगामी युवा आदान-प्रदान, भाषा संगम काव्य गोष्ठी, इंदौरी फूड वॉक और राष्ट्रीय एकता दिवस कार्यक्रमों की समय-सारिणी देखें।',
          badge: 'कार्यक्रम एवं यात्राएँ',
          highlights: ['प्रतिनिधिमंडल यात्राएँ', 'व्यंजन परिचय', 'एकता दिवस दौड़'],
        },
        'bhasha-sangam': {
          title: 'भाषा संगम केंद्र',
          subtitle: 'भाषा शिक्षण एवं एआई अनुवाद',
          description:
            'ऑडियो उच्चारण और त्वरित एआई अनुवादक के साथ मेइतेइलोन, नागामीज़, आओ नागा, मालवी और हिंदी के 100+ दैनिक वाक्यांशों का अभ्यास करें।',
          badge: 'भाषाएँ एवं लिपियाँ',
          highlights: ['त्वरित एआई अनुवादक', '5 भाषाएँ', 'ध्वनि उच्चारण कार्ड'],
        },
        'sanskrit-hub': {
          title: 'संस्कृत भाषा एवं विरासत',
          subtitle: 'शास्त्रीय भाषा एवं भारतीय ज्ञान परंपरा',
          description:
            'वैदिक श्लोकों का पाठ करें, दैनिक संस्कृत संवाद सीखें और आईआईटी इंदौर के भारतीय ज्ञान प्रणाली केंद्र (IKS) को जानें।',
          badge: 'शास्त्रीय विरासत',
          highlights: ['श्लोक एवं ऑडियो', 'दैनिक वाक्यांश', 'आईआईटी इंदौर IKS शोध'],
        },
        gallery: {
          title: 'मीडिया दीर्घा एवं अनुभव',
          subtitle: 'युवा अनुभव एवं सांस्कृतिक स्मृतियाँ',
          description:
            'अंतर-राज्यीय युवा आदान-प्रदान में भाग लेने वाले छात्र प्रतिनिधियों के चित्र, सांस्कृतिक प्रस्तुतियाँ और प्रेरक अनुभव देखें।',
          badge: 'दृश्य दीर्घा',
          highlights: ['प्रतिनिधिमंडल चित्र', 'छात्र अनुभव', 'सांस्कृतिक प्रस्तुतियाँ'],
        },
        'team-contact': {
          title: 'समिति एवं स्वयंसेवक डेस्क',
          subtitle: 'प्रकोष्ठ नेतृत्व एवं छात्र स्वयंसेवक आवेदन',
          description:
            'संकाय नोडल अधिकारियों और छात्र समन्वयकों से मिलें तथा SAC, आईआईटी इंदौर में EBSB स्वयंसेवक दल से जुड़ने हेतु आवेदन करें।',
          badge: 'समिति एवं संपर्क',
          highlights: ['संकाय नोडल डेस्क', 'छात्र समन्वयक', 'स्वयंसेवक आवेदन'],
        },
      },
      aiBannerBadge: 'इंटरैक्टिव जेमिनी एआई सांस्कृतिक मार्गदर्शक',
      aiBannerTitle: 'मणिपुर, नागालैंड या इंदौरी संस्कृति के बारे में कोई प्रश्न है?',
      aiBannerDesc:
        'विरासत स्थलों, व्यंजन साझेदारी, भाषा संगम अनुवाद के बारे में हमारे एआई मार्गदर्शक से पूछें या राष्ट्रीय एकता प्रश्नोत्तरी में भाग लें!',
      aiBannerAskBtn: 'एआई गाइड से पूछें',
      aiBannerQuizBtn: 'प्रश्नोत्तरी लें',
      volunteerBadge: 'आईआईटी इंदौर परिसर समुदाय',
      volunteerTitle: 'आधिकारिक EBSB छात्र स्वयंसेवक बनें',
      volunteerDesc:
        'मणिपुर और नागालैंड के अतिथि प्रतिनिधियों की मेजबानी करें, सांस्कृतिक कार्यशालाओं का आयोजन करें और आधिकारिक EBSB प्रमाणपत्र प्राप्त करें।',
      volunteerBtn: 'स्वयंसेवक आवेदन करें',
    },
    breadcrumb: {
      home: 'मुख्य पृष्ठ',
      portalPage: 'EBSB पोर्टल पृष्ठ',
      returnHome: 'मुख्य पृष्ठ पर लौटें',
      pageTitles: {
        about: 'EBSB प्रकोष्ठ परिचय एवं उद्देश्य',
        'paired-states': 'सहभागी राज्य केंद्र (म.प्र. ↔ मणिपुर/नागालैंड)',
        'cultural-map': 'इंटरैक्टिव EBSB सांस्कृतिक मानचित्र',
        events: 'युवा आदान-प्रदान एवं कार्यक्रम कैलेंडर',
        'bhasha-sangam': 'भाषा संगम भाषा केंद्र',
        'sanskrit-hub': 'संस्कृत भाषा एवं विरासत केंद्र',
        gallery: 'मीडिया दीर्घा एवं छात्र अनुभव',
        'team-contact': 'EBSB समिति एवं संपर्क डेस्क',
      },
    },
    quickActions: {
      title: 'त्वरित कार्य',
      subtitle: 'आईआईटी इंदौर • एक भारत श्रेष्ठ भारत',
      closeMenu: 'मेनू बंद करें',
      signInHeading: 'आईआईटी इंदौर EBSB पोर्टल में साइन इन करें',
      signInDesc: 'अपने भाषा क्विज़ स्कोर सहेजें और सत्यापित स्वयंसेवक आवेदन जमा करें।',
      signInGoogle: 'गूगल से साइन इन करें',
      signingIn: 'साइन इन हो रहा है...',
      signOut: 'साइन आउट',
      quizzesLabel: 'क्विज़',
      volunteerLabel: 'स्वयंसेवक',
      submittedStatus: 'जमा किया गया',
      openStatus: 'खुला है',
      frequentlyUsed: 'प्रमुख त्वरित सेवाएँ',
      bhashaQuizTitle: 'भाषा क्विज़',
      bhashaQuizDesc: 'क्षेत्रीय वाक्यांश, विरासत और राज्य साझेदारी परखें',
      volunteerTitle: 'स्वयंसेवक आवेदन',
      volunteerDescOpen: 'आईआईटी इंदौर EBSB छात्र स्वयंसेवक दल से जुड़ें',
      volunteerDescApplied: 'अपनी आवेदन स्थिति देखें या अन्य प्रकोष्ठ हेतु आवेदन करें',
      culturalGuideTitle: 'सांस्कृतिक मार्गदर्शक',
      culturalGuideDesc: 'एआई के साथ म.प्र., मणिपुर और नागालैंड की परंपराएँ जानें',
      appliedBadge: 'आवेदित',
      savedSuffix: 'सहेजे गए',
    },
    footer: {
      portalTitle: 'आईआईटी इंदौर • EBSB पोर्टल',
      cellSubtitle: 'एक भारत श्रेष्ठ भारत प्रकोष्ठ',
      description:
        'शिक्षा मंत्रालय, भारत सरकार के अंतर्गत राष्ट्रीय एकता, सहभागी राज्य सांस्कृतिक आदान-प्रदान, भाषा संगम कार्यशालाओं और युवा प्रतिनिधिमंडलों को बढ़ावा देना।',
      wcagNote: 'सरकारी सुगम्यता एवं WCAG 2.1 AA दिशानिर्देशों के अनुरूप',
      quickLinksHeading: 'त्वरित लिंक',
      quickLinks: {
        about: 'EBSB उद्देश्य परिचय',
        pairedStates: 'म.प्र. ↔ मणिपुर एवं नागालैंड',
        events: 'युवा आदान-प्रदान कैलेंडर',
        bhashaSangam: 'भाषा संगम केंद्र',
        gallery: 'मीडिया एवं छात्र अनुभव',
      },
      importantLinksHeading: 'महत्वपूर्ण लिंक',
      copyrightPrefix: '©',
      copyrightSuffix:
        'एक भारत श्रेष्ठ भारत प्रकोष्ठ, भारतीय प्रौद्योगिकी संस्थान इंदौर। सर्वाधिकार सुरक्षित।',
      designedBy: 'साइट डिज़ाइन एवं निर्माण:',
      digitalIndiaTitle: 'डिजिटल इंडिया पहल',
      digitalIndiaSubtitle: 'सशक्त भारत • digitalindia.gov.in',
    },
    events: {
      badge: 'EBSB कैलेंडर एवं युवा प्रतिनिधिमंडल',
      title: 'EBSB कार्यक्रम एवं युवा आदान-प्रदान',
      subtitle:
        'आईआईटी इंदौर में आगामी अंतर-राज्यीय युवा आदान-प्रदान, भाषा संगम कार्यशालाओं, व्यंजन उत्सव और सांस्कृतिक संध्याओं का अन्वेषण करें।',
      searchPlaceholder: 'कार्यक्रम या स्थान खोजें...',
      viewDetails: 'विवरण देखें',
      registerNow: 'पंजीकरण करें',
      registerCutoff: 'समय सीमा से पूर्व पंजीकरण करें',
      closingSoon: 'पंजीकरण शीघ्र समाप्त',
      nextEvent: 'अगला प्रमुख कार्यक्रम',
      regEndsIn: 'पंजीकरण समाप्त होने में शेष',
      eventStartsIn: 'कार्यक्रम प्रारंभ होने में शेष',
      fillingFast: 'सीटें शीघ्र भर रही हैं',
    },
  },

  mni: {
    topBar: {
      govtBadge: 'ভারত সরকার | Govt. of India',
      ministrySubtitle: 'এজুকেসন মন্ত্রালয় • আইআইটি ইন্দোরগী এক ভারত শ্রেষ্ঠ ভারত সেল',
      wcagLabel: 'WCAG 2.1 AA চৎনবা য়াবা',
      signIn: 'সাইন ইন',
      signingIn: 'সাইন ইন তৌরি...',
      signOut: 'সাইন আউট',
      languageLabel: 'লোন',
    },
    brand: {
      institute: 'আইআইটি ইন্দোর',
      cellTag: 'EBSB সেল',
      ebsbName: 'এক ভারত শ্রেষ্ঠ ভারত',
    },
    nav: {
      home: 'মরুওইবা লমায়',
      about: 'EBSB গী মরমদা',
      pairedStates: 'খোঙলোই রাজ্যশিং',
      culturalMap: 'কলচরেল মেপ',
      events: 'থৌরম অমসুং এক্সচেঞ্জ',
      bhashaSangam: 'ভাষা সঙ্গম',
      sanskritHub: 'সংস্কৃত হব',
      gallery: 'গ্যালরি',
      teamContact: 'কমিটি অমসুং পাউ ফাওনবা',
      aiGuideBtn: 'এআই কলচরেল গাইদ',
      joinEbsbBtn: 'EBSB দা য়াওবিয়ু',
      askAiMobile: 'এআই কলচরেল গাইদদা হংবিয়ু',
      takeQuizMobile: 'নেসনেল ইন্তিগ্রেসন কুইজ লৌবিয়ু',
      registerVolunteerMobile: 'মহৈরোয় ভলুন্তিয়র রেজিস্তর',
      signInGoogle: 'গুগলদগী সাইন ইন তৌবিয়ু',
      searchTooltip: 'থৌরম, নাৎ, লোন থিবীয়ু',
    },
    hero: {
      liveUpdates: 'অনৌবা পাউ',
      marquee1Title: 'যুবা এক্সচেঞ্জ ২০২৬:',
      marquee1Body: 'মণিপুর অমসুং নাগাল্যান্ডগী মহৈরোয়শিংগী রেজিস্ত্রেসন হাংদোক্লে!',
      marquee2Title: 'ভাষা সঙ্গম:',
      marquee2Body: 'খুদিংমক য়ুমশকৈশা নুমিৎতা LHC-102 দা মৈতৈলোন্ অমসুং আও নাগা লোন তম্বগী থৌরম',
      marquee3Title: 'নেসনেল ইন্তিগ্রেসন কুইজ:',
      marquee3Body: 'অদোমগী নাৎকী লৌশিং চাংয়েং তৌবিয়ু অমসুং ডিজিতেল EBSB বেজ ফংবিয়ু!',
      partnerStatesBtn: 'খোঙলোই রাজ্যশিং',
      eventsBtn: 'থৌরমশিং',
      culturalGuideBtn: 'কলচরেল গাইদ',
      slideCaptions: [
        'আইআইটি ইন্দোরদা রিপব্লিক দে কলচরেল থৌরম',
        'কাব্যাঞ্জলি — আইআইটি ইন্দোরদা নাৎকী জগোই উৎপা',
        'জহাজ মহল, মান্দু — মধ্য প্রদেশকী অরিবা ঈশিং শিজিন্নবগী হেরিতেজ',
        'স্বচ্ছ সর্বেক্ষণ — ইন্দোর, মধ্য প্রদেশকী মচু শংবা ফকলাং আর্ট',
        'রাজ্যশিংগী অহুম্বা: মধ্য প্রদেশকী বাহাদুরা লড্ডু অমসুং মণিপুরগী চাক-হাও খীর',
        'বাঘ প্রিন্ত — ধার, মধ্য প্রদেশকী নাৎকী ফী শাবগী কলা',
        'ইন্দোর (মধ্য প্রদেশ) — স্বচ্ছ সর্বেক্ষণগী মখাদা ভারতকী খ্বাইদগী লুবা শহর',
        'আইআইটি ইন্দোর EBSB সাইন্স অমসুং মহৈ-মশিংগী আউতরিচ থৌরম',
        'ভীল পেন্তিং — মধ্য প্রদেশকী ত্রাইবেল আর্ট হেরিতেজ',
        'বৈগাঁও খুঙ্গংগী হোস্পিতাল অমসুং স্কুলদা আইআইটি ইন্দোর EBSB টিমগী স্বচ্ছতা থৌরম',
      ],
    },
    home: {
      directoryBadge: 'পোর্তেল দাইরেক্তরি',
      directoryTitle: 'EBSB পোর্তেলগী বিভাগশিং অমসুং খুদোংচাবাশিং য়েংবিয়ু',
      directorySubtitle:
        'খোঙলোই রাজ্যশিং, থৌরমশিং, লোনশিং অমসুং কমিটিগী মরমদা খঙনবগীদমক মখাগী তাঙ্কক নত্ত্রগা মথক্কী মেনু খনবিয়ু।',
      openFullPage: 'মপুং ফাবা লমায় হাংদোকউ',
      hubs: {
        about: {
          title: 'EBSB সেলগী মরমদা',
          subtitle: 'এজুকেসন মন্ত্রালয়গী পান্দম অমসুং মঙলান',
          description:
            'দাইরেক্তর প্রো. সুহাস এস. জোশী অমসুং নোদেল ওফিসার দো. শরদ গুপ্তাগী লমজিং মখাদা আইআইটি ইন্দোরগী এক ভারত শ্রেষ্ঠ ভারত মিসন খঙবিয়ু।',
          badge: 'পান্দম অমসুং মঙলান',
          highlights: ['মরুওইবা য়ুম্বী ৪', 'দাইরেক্তরগী পাউ', 'কেম্পসকী শরুক য়াবা'],
        },
        'paired-states': {
          title: 'খোঙলোই রাজ্য হব',
          subtitle: 'মধ্য প্রদেশ ↔ মণিপুর অমসুং নাগাল্যান্ড',
          description:
            'লম-মীৎ, নাৎকী জগোই-ইশৈ, অচৌবা কুম্মৈশিং (য়াওশাং, হোর্নবিল) অমসুং চাক-ইন্সাংগী চাংদম্নবা য়েংবিয়ু।',
          badge: 'রাজ্য খোঙলোই',
          highlights: ['রাজ্যগী মরমদা', 'পিথোরা অমসুং থাং-তা', 'ইন্দোরি পোহা অমসুং চাক-হাও'],
        },
        'cultural-map': {
          title: 'ইন্তরেক্তিব কলচরেল মেপ',
          subtitle: 'পুক্নিং চিংশিন্নিঙাই ওইবা হেরিতেজ মফমশিং',
          description:
            'য়ুনেস্কো হেরিতেজ সাইতশিং, ক্লাসিকেল জগোই মফম, হোর্নবিল কুম্মৈ অমসুং আইআইটি ইন্দোর হবশিং মেপতা য়েংবিয়ু।',
          badge: 'ভিচুএল মেপ',
          highlights: ['ইন্তরেক্তিব মেপ', 'এমপি, মণিপুর অমসুং নাগাল্যান্ড', 'হেরিতেজ মরম'],
        },
        events: {
          title: 'যুবা এক্সচেঞ্জ অমসুং থৌরম',
          subtitle: 'রাজ্যশিংগী মরক্তা মহৈরোয় এক্সচেঞ্জ অমসুং কেলেন্দর',
          description:
            'লাক্কদৌরিবা যুবা এক্সচেঞ্জ, ভাষা সঙ্গম শৈরেং মীফম, ফুদ ফেস্ত অমসুং রাষ্ট্রীয় একতা দিবসকী থৌরমশিং য়েংবিয়ু।',
          badge: 'থৌরম অমসুং খোঙচৎ',
          highlights: ['দেলিগেসন খোঙচৎ', 'চাক-ইন্সাং উৎপা', 'একতা দিবস মেরাথন'],
        },
        'bhasha-sangam': {
          title: 'ভাষা সঙ্গম হব',
          subtitle: 'লোন তম্বা অমসুং এআই হন্দোকপা',
          description:
            'ওদিও খোঞ্জেল অমসুং এআই ত্রান্সলেতরগা লোয়ননা মৈতৈলোন্, নাগামিজ, আও নাগা, মালবি অমসুং হিন্দীগী ৱাহৈ ১০০+ তমবিয়ু।',
          badge: 'লোন অমসুং ময়েক',
          highlights: ['এআই ত্রান্সলেতর', 'লোন ৫', 'খোঞ্জেল ওদিও কার্দ'],
        },
        'sanskrit-hub': {
          title: 'সংস্কৃত লোন অমসুং হেরিতেজ',
          subtitle: 'অরিবা সংস্কৃত অমসুং ভারতকী লৌশিং পৎলন',
          description:
            'বেদকী শ্লোক তমবিয়ু, নুমিৎ খুদিংগী সংস্কৃত ৱারী শানবা তমবিয়ু অমসুং আইআইটি ইন্দোরগী IKS কেন্দ্রগী মরমদা খঙবিয়ু।',
          badge: 'ক্লাসিকেল হেরিতেজ',
          highlights: ['শ্লোক অমসুং ওদিও', 'নুমিৎ খুদিংগী ৱাহৈ', 'আইআইটি ইন্দোর IKS'],
        },
        gallery: {
          title: 'মিদিয়া গ্যালরি অমসুং ৱারীশিং',
          subtitle: 'মহৈরোয়শিংগী নিংশিংবা অমসুং ফোতোশিং',
          description:
            'যুবা এক্সচেঞ্জ থৌরমদা শরুক য়াখিবা মহৈরোয় দেলিগেৎশিংগী ফোতো, ভিদিও অমসুং মখোয়গী পুক্নিং থৌগৎপা ৱারীশিং য়েংবিয়ু।',
          badge: 'ফোতো গ্যালরি',
          highlights: ['দেলিগেসন ফোতো', 'মহৈরোয়শিংগী ৱাফম', 'কলচরেল থৌরম'],
        },
        'team-contact': {
          title: 'টিম অমসুং ভলুন্তিয়র দেস্ক',
          subtitle: 'সেলগী লুচিংবা অমসুং মহৈরোয় ভলুন্তিয়র লৌবা',
          description:
            'ফেকেল্তি নোদেল ওফিসার অমসুং মহৈরোয় কোওর্দিনেতরশিংগা উনবিয়ু অমসুং আইআইটি ইন্দোর EBSB ভলুন্তিয়র টিমদা য়াওনবা এপ্লাই তৌবিয়ু।',
          badge: 'কমিটি অমসুং পাউ',
          highlights: ['ফেকেল্তি নোদেল দেস্ক', 'মহৈরোয় কোওর্দিনেতর', 'ভলুন্তিয়র এপ্লাই'],
        },
      },
      aiBannerBadge: 'ইন্তরেক্তিব জেমিনি এআই কলচরেল ইঞ্জিন',
      aiBannerTitle: 'মণিপুর, নাগাল্যান্ড নত্ত্রগা ইন্দোরগী নাৎকী মরমদা হংনিংবা লৈব্রা?',
      aiBannerDesc:
        'হেরিতেজ মফমশিং, চাক-ইন্সাং, ভাষা সঙ্গম ত্রান্সলেসনগী মরমদা ঐখোয়গী এআই গাইদদা হংবিয়ু নত্ত্রগা নেসনেল ইন্তিগ্রেসন কুইজ লৌবিয়ু!',
      aiBannerAskBtn: 'এআই গাইদদা হংবিয়ু',
      aiBannerQuizBtn: 'কুইজ লৌবিয়ু',
      volunteerBadge: 'আইআইটি ইন্দোর কেম্পস কম্ম্যুনিতি',
      volunteerTitle: 'ওফিসিয়েল EBSB মহৈরোয় ভলুন্তিয়র ওইবিয়ু',
      volunteerDesc:
        'মণিপুর অমসুং নাগাল্যান্ডদগী লাকপা দেলিগেৎশিং তরাম্না ওকপিয়ু, কলচরেল ৱার্কশোপ শিনবিয়ু অমসুং EBSB সর্তিফিকেত ফংবিয়ু।',
      volunteerBtn: 'ভলুন্তিয়র ওইনা এপ্লাই তৌবিয়ু',
    },
    breadcrumb: {
      home: 'মরুওইবা লমায়',
      portalPage: 'EBSB পোর্তেল লমায়',
      returnHome: 'মরুওইবা লমায়দা হল্লকউ',
      pageTitles: {
        about: 'EBSB সেল অমসুং পান্দম',
        'paired-states': 'খোঙলোই রাজ্য হব (এমপি ↔ মণিপুর/নাগাল্যান্ড)',
        'cultural-map': 'ইন্তরেক্তিব EBSB কলচরেল মেপ',
        events: 'যুবা এক্সচেঞ্জ অমসুং থৌরম কেলেন্দর',
        'bhasha-sangam': 'ভাষা সঙ্গম লোন হব',
        'sanskrit-hub': 'সংস্কৃত লোন অমসুং হেরিতেজ হব',
        gallery: 'মিদিয়া গ্যালরি অমসুং মহৈরোয়গী ৱারী',
        'team-contact': 'EBSB কমিটি অমসুং পাউ ফাওনবা দেস্ক',
      },
    },
    quickActions: {
      title: 'থুনা তৌবা য়াবশিং',
      subtitle: 'আইআইটি ইন্দোর • এক ভারত শ্রেষ্ঠ ভারত',
      closeMenu: 'মেনু থিংবিয়ু',
      signInHeading: 'আইআইটি ইন্দোর EBSB পোর্তেলদা সাইন ইন তৌবিয়ু',
      signInDesc: 'অদোমগী ভাষা কুইজ স্কোর তুংশিনবিয়ু অমসুং ভলুন্তিয়র এপ্লিকেসন থাবিয়ু।',
      signInGoogle: 'গুগলদগী সাইন ইন তৌবিয়ু',
      signingIn: 'সাইন ইন তৌরি...',
      signOut: 'সাইন আউট',
      quizzesLabel: 'কুইজ',
      volunteerLabel: 'ভলুন্তিয়র',
      submittedStatus: 'থাজিনখ্রে',
      openStatus: 'হাংলি',
      frequentlyUsed: 'তোয়না শিজিন্নবা থবকশিং',
      bhashaQuizTitle: 'ভাষা কুইজ',
      bhashaQuizDesc: 'লম-লমগী লোন, নাৎ অমসুং রাজ্য খোঙলোই চাংয়েং',
      volunteerTitle: 'ভলুন্তিয়র এপ্লিকেসন',
      volunteerDescOpen: 'আইআইটি ইন্দোর EBSB মহৈরোয় ভলুন্তিয়র টিমদা য়াওবিয়ু',
      volunteerDescApplied: 'অদোমগী এপ্লিকেসন স্তেতস য়েংবিয়ু নত্ত্রগা অমুক এপ্লাই তৌবিয়ু',
      culturalGuideTitle: 'কলচরেল গাইদ',
      culturalGuideDesc: 'এআইগা লোয়ননা এমপি, মণিপুর অমসুং নাগাল্যান্ডগী নাৎ খঙবিয়ু',
      appliedBadge: 'এপ্লাই তৌখ্রে',
      savedSuffix: 'তুংশিল্লে',
    },
    footer: {
      portalTitle: 'আইআইটি ইন্দোর • EBSB পোর্তেল',
      cellSubtitle: 'এক ভারত শ্রেষ্ঠ ভারত সেল',
      description:
        'ভারত সরকারগী এজুকেসন মন্ত্রালয়গী মখাদা জাতিগী অমত্তা ওইবা, রাজ্যশিংগী নাৎকী এক্সচেঞ্জ, ভাষা সঙ্গম ৱার্কশোপ অমসুং যুবা দেলিগেসন খুমাং চাউশিনহনবা।',
      wcagNote: 'সরকারগী এক্সেসিবিলিতি অমসুং WCAG 2.1 AA গাইদলাইনগী মতুং ইন্না',
      quickLinksHeading: 'থুনা চঙনবা লিঙ্ক',
      quickLinks: {
        about: 'EBSB পান্দমগী মরমদা',
        pairedStates: 'এমপি ↔ মণিপুর অমসুং নাগাল্যান্ড',
        events: 'যুবা এক্সচেঞ্জ কেলেন্দর',
        bhashaSangam: 'ভাষা সঙ্গম হব',
        gallery: 'মিদিয়া অমসুং দেলিগেসন ৱারী',
      },
      importantLinksHeading: 'মরুওইবা লিঙ্কশিং',
      copyrightPrefix: '©',
      copyrightSuffix:
        'এক ভারত শ্রেষ্ঠ ভারত সেল, ইন্দিয়ন ইন্সতিত্যুত ওফ তেক্নোলোজি ইন্দোর। হক পুম্নমক ঙাকপীরে।',
      designedBy: 'সাইত দিজাইন অমসুং শেমখিবা:',
      digitalIndiaTitle: 'দিজিতেল ইন্দিয়া ইনিসিয়েতিব',
      digitalIndiaSubtitle: 'পাৱর তু এম্পাৱর • digitalindia.gov.in',
    },
    events: {
      badge: 'EBSB কেলেন্দর অমসুং যুবা দেলিগেসন',
      title: 'EBSB থৌরম অমসুং যুবা এক্সচেঞ্জ',
      subtitle:
        'আইআইটি ইন্দোরদা পাঙথোক্কদৌরিবা রাজ্যশিংগী যুবা এক্সচেঞ্জ, ভাষা সঙ্গম ৱার্কশোপ, ফুদ ফেস্তিবেল অমসুং কলচরেল নুমিদাংগী থৌরমশিং য়েংবিয়ু।',
      searchPlaceholder: 'থৌরম নত্ত্রগা মফম থিবীয়ু...',
      viewDetails: 'মরিক চুম্না য়েংবিয়ু',
      registerNow: 'হৌজিক রেজিস্তর তৌবিয়ু',
      registerCutoff: 'মতম লোইদ্রিঙৈদা রেজিস্তর তৌবিয়ু',
      closingSoon: 'রেজিস্ত্রেসন অথুবদা লোইরগনি',
      nextEvent: 'মথংগী মরুওইবা থৌরম',
      regEndsIn: 'রেজিস্ত্রেসন লোইনবা মতম',
      eventStartsIn: 'থৌরম হৌনবা মতম',
      fillingFast: 'সিট থুনা থল্লি',
    },
  },

  sa: {
    topBar: {
      govtBadge: 'भारतसर्वकारः | Govt. of India',
      ministrySubtitle: 'शिक्षामन्त्रालयः • भारतीयप्रौद्योगिकीसंस्थानम् इन्दौर — एकभारतश्रेष्ठभारतप्रकोष्ठः',
      wcagLabel: 'WCAG 2.1 AA सुगम्यम्',
      signIn: 'प्रवेशः',
      signingIn: 'प्रवेशः क्रियते...',
      signOut: 'निर्गमनम्',
      languageLabel: 'भाषा',
    },
    brand: {
      institute: 'आईआईटी इन्दौर',
      cellTag: 'EBSB प्रकोष्ठः',
      ebsbName: 'एकं भारतं श्रेष्ठं भारतम्',
    },
    nav: {
      home: 'मुख्यपृष्ठम्',
      about: 'परिचयः',
      pairedStates: 'सहभागिराज्यानि',
      culturalMap: 'सांस्कृतिकमानचित्रम्',
      events: 'कार्यक्रमाः एवं विनिमयः',
      bhashaSangam: 'भाषासङ्गमः',
      sanskritHub: 'संस्कृतकेन्द्रम्',
      gallery: 'चित्रवीथी',
      teamContact: 'समितिः एवं सम्पर्कः',
      aiGuideBtn: 'एआई सांस्कृतिकमार्गदर्शकः',
      joinEbsbBtn: 'EBSB संयोगः',
      askAiMobile: 'एआई सांस्कृतिकमार्गदर्शकं पृच्छतु',
      takeQuizMobile: 'राष्ट्रियैकताप्रश्नोत्तरी',
      registerVolunteerMobile: 'छात्रस्वयंसेवकपञ्जीकरणम्',
      signInGoogle: 'गूगलद्वारा प्रवेशः',
      searchTooltip: 'कार्यक्रमान्, संस्कृतिं, भाषाः अन्विष्यतु',
    },
    hero: {
      liveUpdates: 'नूतनसूचनाः',
      marquee1Title: 'युवाविनिमयः २०२६:',
      marquee1Body: 'मणिपुर-नागालैण्ड्-छात्रप्रतिनिधिमण्डलाय पञ्जीकरणम् अधुना उद्घाटितम्!',
      marquee2Title: 'भाषासङ्गमः:',
      marquee2Body: 'प्रतिबुधवासरं LHC-102 मध्ये मणिपुरी-आओनागाभाषाभ्याससत्रम्',
      marquee3Title: 'राष्ट्रियैकताप्रश्नोत्तरी:',
      marquee3Body: 'स्वसांस्कृतिकज्ञानं परीक्षतां तथा डिजिटल-EBSB-पदकं प्राप्नोतु!',
      partnerStatesBtn: 'सहभागिराज्यानि',
      eventsBtn: 'कार्यक्रमाः',
      culturalGuideBtn: 'सांस्कृतिकमार्गदर्शकः',
      slideCaptions: [
        'भारतीयप्रौद्योगिकीसंस्थाने इन्दौरे गणतन्त्रदिवससांस्कृतिकोत्सवः',
        'काव्याञ्जलिः — आईआईटी इन्दौरे शास्त्रीयनृत्यप्रस्तुतिः',
        'जहाजमहलम्, माण्डुः — मध्यप्रदेशस्य प्राचीनजलप्रबन्धनविरासतः',
        'स्वच्छसर्वेक्षणम् — इन्दौरनगरस्य (मध्यप्रदेशः) जीवन्तभित्तिकला',
        'राज्यानां माधुर्यम्: मध्यप्रदेशस्य बहादुरामोदकाः मणिपुरस्य चाक-हाओ-पायसं च',
        'बाघ-मुद्रणम् — धारनगरस्य (मध्यप्रदेशः) पारम्परिकपर्यावरणानुकूलहस्तकला',
        'इन्दौरनगरम् (मध्यप्रदेशः) — स्वच्छसर्वेक्षणे भारतस्य स्वच्छतमं नगरम्',
        'आईआईटी इन्दौर EBSB विज्ञानशैक्षिकप्रसारसंवादः',
        'भीलचित्रकला — मध्यप्रदेशस्य पारम्परिकजनजातीयकलाविरासतः',
        'बैगाँवग्रामचिकित्सालये विद्यालये च आईआईटी इन्दौर EBSB स्वच्छताभियानम्',
      ],
    },
    home: {
      directoryBadge: 'प्रवेशद्वारनिर्देशिका',
      directoryTitle: 'EBSB प्रवेशद्वारस्य विभागाः सुविधाश्च',
      directorySubtitle:
        'सहभागिराज्यानां, कार्यक्रमाणां, भाषाणां, समितिसम्पर्कस्य च समर्पितपृष्ठानि द्रष्टुम् अधः कञ्चित् विभागं वा उपरि सूचीं चिनुत।',
      openFullPage: 'सम्पूर्णपृष्ठम् उद्घाटयतु',
      hubs: {
        about: {
          title: 'EBSB प्रकोष्ठपरिचयः',
          subtitle: 'शिक्षामन्त्रालयस्य उद्दिष्टं दूरदृष्टिश्च',
          description:
            'निदेशकस्य प्रो. सुहास एस. जोशी महोदयस्य नोडल-अधिकारिणः डॉ. शरद गुप्त महोदयस्य च मार्गदर्शने आईआईटी इन्दौरस्य एकभारतश्रेष्ठभारतमिशनं जानीत।',
          badge: 'उद्दिष्टं दृष्टिश्च',
          highlights: ['चत्वारः मुख्यस्तम्भाः', 'निदेशकसन्देशः', 'परिसरसहभागिता'],
        },
        'paired-states': {
          title: 'सहभागिराज्यकेन्द्रम्',
          subtitle: 'मध्यप्रदेशः ↔ मणिपुरं नागालैण्ड् च',
          description:
            'भूगोलस्य, पारम्परिककलानां, प्रमुखोत्सवानां (याओशाङ्ग्, हॉर्नबिल्), पाकपरम्परायाश्च तुलनात्मकं दर्शनं कुरुत।',
          badge: 'राज्यसाझेदारी',
          highlights: ['राज्यपरिचयः', 'पिथौरा-थाङ्ग्-ता-कला', 'इन्दौरीपोहा चाक-हाओ च'],
        },
        'cultural-map': {
          title: 'सांस्कृतिकमानचित्रम्',
          subtitle: 'भौगोलिकधरोहरस्थानानि',
          description:
            'यूनेस्को-विश्वधरोहरस्थानानि, शास्त्रीयनृत्यकेन्द्राणि, हॉर्नबिल्-उत्सवस्थलम् आईआईटी इन्दौरकेन्द्राणि च मानचित्रे पश्यत।',
          badge: 'दृश्यमानचित्रम्',
          highlights: ['इण्टरैक्टिव् मानचित्रम्', 'म.प्र., मणिपुरं नागालैण्ड् च', 'धरोहरविवरणम्'],
        },
        events: {
          title: 'युवाविनिमयः कार्यक्रमाश्च',
          subtitle: 'अन्तर्राज्यीयप्रतिनिधिमण्डलं वार्षिकपञ्चाङ्गं च',
          description:
            'आगामियुवाविनिमयकार्यक्रमाणां, भाषासङ्गमकाव्यगोष्ठीनां, खाद्यमेलानां, राष्ट्रियैकतादिवसस्य च समयसारणीं पश्यत।',
          badge: 'कार्यक्रमाः यात्राश्च',
          highlights: ['प्रतिनिधिमण्डलयात्राः', 'व्यञ्जनपरिचयः', 'एकतादिवसधावनम्'],
        },
        'bhasha-sangam': {
          title: 'भाषासङ्गमकेन्द्रम्',
          subtitle: 'भाषाशिक्षणम् एआई-अनुवादश्च',
          description:
            'ध्वनि-उच्चारणेन त्वरित-एआई-अनुवादकेन च सह मणिपुरी-नागामीज्-आओनागा-मालवी-हिन्दीभाषाणां १००+ दैनिकवाक्यानाम् अभ्यासं कुरुत।',
          badge: 'भाषाः लिपयश्च',
          highlights: ['त्वरित-एआई-अनुवादकः', 'पञ्च भाषाः', 'ध्वनि-उच्चारणपत्राणि'],
        },
        'sanskrit-hub': {
          title: 'संस्कृतभाषा विरासतश्च',
          subtitle: 'शास्त्रीयभाषा भारतीयज्ञानपरम्परा च',
          description:
            'वैदिकश्लोकानां पठनं कुरुत, दैनिकसंस्कृतसम्भाषणं शिक्षत तथा आईआईटी इन्दौरस्य भारतीयज्ञानप्रणालीकेन्द्रं (IKS) जानीत।',
          badge: 'शास्त्रीयविरासतः',
          highlights: ['श्लोकाः ध्वनिश्च', 'दैनिकवाक्यानि', 'आईआईटी इन्दौर IKS शोधः'],
        },
        gallery: {
          title: 'चित्रवीथी अनुभवाश्च',
          subtitle: 'युवानुभवाः सांस्कृतिकस्मृतयश्च',
          description:
            'अन्तर्राज्यीययुवाविनिमये सहभागिनां छात्रप्रतिनिधीनां चित्राणि, सांस्कृतिकप्रस्तुतयः, प्रेरकानुभवाश्च दृश्यन्ताम्।',
          badge: 'दृश्यवीथी',
          highlights: ['प्रतिनिधिमण्डलचित्राणि', 'छात्रानुभवाः', 'सांस्कृतिकप्रस्तुतयः'],
        },
        'team-contact': {
          title: 'समितिः स्वयंसेवकपटलं च',
          subtitle: 'प्रकोष्ठनेतृत्वं छात्रस्वयंसेवक-आवेदनं च',
          description:
            'आचार्य-नोडल-अधिकारिभिः छात्रसमन्वयकैश्च मिलत तथा SAC, आईआईटी इन्दौरे EBSB स्वयंसेवकदले सम्मिलितुम् आवेदनं कुरुत।',
          badge: 'समितिः सम्पर्कश्च',
          highlights: ['आचार्यनोडलपटलम्', 'छात्रसमन्वयकाः', 'स्वयंसेवक-आवेदनम्'],
        },
      },
      aiBannerBadge: 'संवादात्मकं जेमिनी-एआई-सांस्कृतिकयन्त्रम्',
      aiBannerTitle: 'किं मणिपुर-नागालैण्ड्-इन्दौरसंस्कृतेः विषये कश्चित् प्रश्नः अस्ति?',
      aiBannerDesc:
        'धरोहरस्थानानां, व्यञ्जनसाझेदार्याः, भाषासङ्गम-अनुवादस्य च विषये अस्माकम् एआई-मार्गदर्शकं पृच्छत अथवा राष्ट्रियैकताप्रश्नोत्तर्यां भागं गृह्णीत!',
      aiBannerAskBtn: 'एआई मार्गदर्शकं पृच्छतु',
      aiBannerQuizBtn: 'प्रश्नोत्तरीं गृह्णातु',
      volunteerBadge: 'आईआईटी इन्दौर परिसरसमुदायः',
      volunteerTitle: 'आधिकारिकः EBSB छात्रस्वयंसेवकः भवतु',
      volunteerDesc:
        'मणिपुर-नागालैण्ड्-प्रतिनिधीनाम् आतिथ्यं कुरुत, सांस्कृतिककार्यशालाः आयोजयत तथा आधिकारिकं EBSB प्रमाणपत्रं प्राप्नुत।',
      volunteerBtn: 'स्वयंसेवकरूपेण आवेदनं कुरुत',
    },
    breadcrumb: {
      home: 'मुख्यपृष्ठम्',
      portalPage: 'EBSB प्रवेशद्वारपृष्ठम्',
      returnHome: 'मुख्यपृष्ठं प्रति गच्छतु',
      pageTitles: {
        about: 'EBSB प्रकोष्ठपरिचयः उद्दिष्टं च',
        'paired-states': 'सहभागिराज्यकेन्द्रम् (म.प्र. ↔ मणिपुरम्/नागालैण्ड्)',
        'cultural-map': 'इण्टरैक्टिव् EBSB सांस्कृतिकमानचित्रम्',
        events: 'युवाविनिमयः कार्यक्रमपञ्चाङ्गं च',
        'bhasha-sangam': 'भाषासङ्गमभाषाकेन्द्रम्',
        'sanskrit-hub': 'संस्कृतभाषा एवं विरासतकेंद्रम्',
        gallery: 'चित्रवीथी छात्रानुभवाश्च',
        'team-contact': 'EBSB समितिः सम्पर्कपटलं च',
      },
    },
    quickActions: {
      title: 'त्वरितकार्याणि',
      subtitle: 'आईआईटी इन्दौर • एकं भारतं श्रेष्ठं भारतम्',
      closeMenu: 'सूचीं पिदधातु',
      signInHeading: 'आईआईटी इन्दौर EBSB पोर्टले प्रवेशं कुरुत',
      signInDesc: 'स्वभाषाप्रश्नोत्तरी-अङ्कान् रक्षतु तथा सत्यापितं स्वयंसेवक-आवेदनं समर्पयतु।',
      signInGoogle: 'गूगलद्वारा प्रवेशः',
      signingIn: 'प्रवेशः क्रियते...',
      signOut: 'निर्गमनम्',
      quizzesLabel: 'प्रश्नोत्तर्यः',
      volunteerLabel: 'स्वयंसेवकः',
      submittedStatus: 'समर्पितम्',
      openStatus: 'उद्घाटितम्',
      frequentlyUsed: 'प्रमुखत्वरितसेवाः',
      bhashaQuizTitle: 'भाषाप्रश्नोत्तरी',
      bhashaQuizDesc: 'क्षेत्रीयवाक्यानि, विरासतः राज्यसाझेदारी च परीक्षताम्',
      volunteerTitle: 'स्वयंसेवक-आवेदनम्',
      volunteerDescOpen: 'आईआईटी इन्दौर EBSB छात्रस्वयंसेवकदले संयुज्यताम्',
      volunteerDescApplied: 'स्वावेदनस्थितिं पश्यतु वा अन्यविभागाय आवेदनं कुरुत',
      culturalGuideTitle: 'सांस्कृतिकमार्गदर्शकः',
      culturalGuideDesc: 'एआई-माध्यमेन म.प्र., मणिपुर-नागालैण्ड्-परम्पराः जानीत',
      appliedBadge: 'आवेदितम्',
      savedSuffix: 'रक्षिताः',
    },
    footer: {
      portalTitle: 'आईआईटी इन्दौर • EBSB पोर्टल्',
      cellSubtitle: 'एकं भारतं श्रेष्ठं भारतम् प्रकोष्ठः',
      description:
        'भारतसर्वकारस्य शिक्षामन्त्रालयस्य अन्तर्गतं राष्ट्रियैकतां, सहभागिराज्यसांस्कृतिकविनिमयं, भाषासङ्गमकार्यशालाः, युवाप्रतिनिधिमण्डलानि च संवर्धयन्।',
      wcagNote: 'सर्वकारसुगम्यता एवं WCAG 2.1 AA निर्देशानाम् अनुरूपम्',
      quickLinksHeading: 'त्वरितसम्पर्काः',
      quickLinks: {
        about: 'EBSB उद्दिष्टपरिचयः',
        pairedStates: 'म.प्र. ↔ मणिपुरं नागालैण्ड् च',
        events: 'युवाविनिमयपञ्चाङ्गम्',
        bhashaSangam: 'भाषासङ्गमकेन्द्रम्',
        gallery: 'चित्रवीथी छात्रानुभवाश्च',
      },
      importantLinksHeading: 'महत्त्वपूर्णसम्पर्काः',
      copyrightPrefix: '©',
      copyrightSuffix:
        'एकं भारतं श्रेष्ठं भारतम् प्रकोष्ठः, भारतीयप्रौद्योगिकीसंस्थानम् इन्दौर। सर्वाधिकारः सुरक्षितः।',
      designedBy: 'जालस्थल-अभिकल्पनं निर्माणं च:',
      digitalIndiaTitle: 'डिजिटल् इण्डिया उपक्रमः',
      digitalIndiaSubtitle: 'सशक्तं भारतम् • digitalindia.gov.in',
    },
    events: {
      badge: 'EBSB पञ्चाङ्गं युवाप्रतिनिधिमण्डलं च',
      title: 'EBSB कार्यक्रमाः युवाविनिमयश्च',
      subtitle:
        'आईआईटी इन्दौरे आगामीनि अन्तर्राज्यीययुवाविनिमयकार्यक्रमानि, भाषासङ्गमकार्यशालाः, व्यञ्जनोत्सवान् सांस्कृतिकसन्ध्याश्च पश्यत।',
      searchPlaceholder: 'कार्यक्रमं स्थानं वा अन्विष्यतु...',
      viewDetails: 'विवरणं पश्यतु',
      registerNow: 'अधुना पञ्जीकुरुत',
      registerCutoff: 'अन्तिमसमयात् पूर्वं पञ्जीकुरुत',
      closingSoon: 'पञ्जीकरणं शीघ्रं समाप्यते',
      nextEvent: 'आगामी प्रमुखकार्यक्रमः',
      regEndsIn: 'पञ्जीकरणसमाप्तौ अवशिष्टः समयः',
      eventStartsIn: 'कार्यक्रमारम्भे अवशिष्टः समयः',
      fillingFast: 'स्थानानि शीघ्रं पूर्यन्ते',
    },
  },
};

const STORAGE_KEY = 'iiti_ebsb_language';

interface LanguageContextValue {
  language: SiteLanguage;
  setLanguage: (lang: SiteLanguage) => void;
  t: SiteTranslations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SiteLanguage>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'mni' || saved === 'sa') {
        return saved;
      }
    } catch {
      // Ignore storage access errors in restricted frames
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage access errors
    }
  }, [language]);

  const setLanguage = (lang: SiteLanguage) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
