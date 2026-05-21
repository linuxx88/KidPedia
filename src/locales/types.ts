export type SupportedLanguage = 'fr' | 'en';

export interface Labels {
  common: {
    back: string;
    goHome: string;
    loading: string;
    surprise: string;
    close: string;
    more: string;
    less: string;
    stop: string;
    listen: string;
    listenAudio: string;
    finish: string;
    colors: {
      blue: string;
      green: string;
      red: string;
      yellow: string;
      purple: string;
    };
    orientation: {
      title: {
        boy: string;
        girl: string;
      };
      safariHint: string;
    };
    seasons: {
      spring: string;
      summer: string;
      autumn: string;
      winter: string;
    };
  };
  nav: {
    logo: string;
    modeBoy: string;
    modeGirl: string;
    switchToGirl: string;
    switchToBoy: string;
    themeDay: string;
    themeSpace: string;
    back: string;
  };
  home: {
    greeting: (name: string) => string;
    morning: string;
    afternoon: string;
    evening: string;
    readyBoy: string;
    readyGirl: string;
    medals: string;
    discovered: string;
    discoveryHub: string;
    noResultsTitle: string;
    noResultsText: string;
    clearSearch: string;
    categoryMore: (count: number) => string;
    searchPlaceholder: string;
    surpriseDay: string;
  };
  ranks: {
    apprentice: { boy: string; girl: string };
    explorer: { boy: string; girl: string };
    expert: { boy: string; girl: string };
    sage: { boy: string; girl: string };
  };
  discovery: {
    circleTitle: string;
    circleDesc: string;
    mapTitle: string;
    mapDesc: string;
    safariTitle: string;
    safariDesc: string;
    originsTitle: string;
    universeOdyssey: string;
    oceanOdyssey: string;
    landOdyssey: string;
    dinoOdyssey: string;
    humanOdyssey: string;
    evolutionOdyssey: string;
    villageOdyssey: string;
    civilizationOdyssey: string;
    middleAgesOdyssey: string;
    originsDesc: string;
    step: (current: number, total: number) => string;
    knowMore: string;
    otherFact: string;
    explore: (name: string) => string;
    prevStep: string;
    nextStep: string;
    stepAria: (num: number, title: string) => string;
    discoveryMessage: string;
    zoomHint: string;
    zoomIn: string;
    zoomOut: string;
    globalView: string;
    exploration: string;
    discoveredPoints: string;
    toDiscover: string;
    visiblePoints: (count: number) => string;
    temporalAdventure: string;
    timeSecrets: string;
    stopover: (num: number) => string;
    secretHistory: string;
    closeHistory: string;
    journeyContinues: string;
  };
  quiz: {
    title: string;
    retry: string;
    goldMedal: string;
    silverMedal: string;
    bronzeMedal: string;
    winMessage: (medal: string) => string;
    didYouKnow: string;
    hintTitle: string;
    reviewAction: string;
    almostMessage: string;
    successMessages: {
      gold: {
        boy: string[];
        girl: string[];
      };
      silver: {
        boy: string[];
        girl: string[];
      };
      bronze: {
        boy: string[];
        girl: string[];
      };
    };
    retryMessages: {
      boy: string[];
      girl: string[];
    };
  };
  errors: {
    pageNotFound: string;
    audioLoad: string;
    audioPlayback: string;
    speechSystem: string;
    speechNotSupported: string;
    offlineTitle: string;
    offlineText: string;
    offlineRetry: string;
  };
  footer: {
    copyright: string;
  };
  profiles: {
    title: string;
    createTitle: string;
    namePlaceholder: string;
    chooseAvatar: string;
    chooseGender: string;
    createBtn: string;
    addProfile: string;
    deleteBtn: string;
    deleteConfirm: string;
    empty: string;
    backToSelection: string;
  };
  badges: {
    title: string;
    reset: string;
    rank: string;
    progress: (earned: number, total: number) => string;
    empty: string;
    start: string;
    confirmReset: string;
    onboarding: string;
    lockedAria: (title: string) => string;
    earnedAria: (title: string) => string;
    wardrobeTitle: string;
    noAccessories: string;
    equipBtn: string;
    equipped: string;
    unlockedTitle: string;
    unlockedMessage: (name: string) => string;
  };
  gallery: {
    title: string;
    subtitle: string;
    empty: string;
    unlockedAria: (name: string) => string;
    lockedAria: (name: string) => string;
  };
  safari: {
    title: string;
    welcome: string;
    victory: string;
    progressTitle: string;
    foundLabel: string;
    missingAnimals: (current: number, goal: number) => string;
    animalEncounter: (label: string) => string;
    alreadyHave: (label: string) => string;
    boost: (label: string) => string;
    hazard: (label: string) => string;
    diceRoll: (roll: number) => string;
    quizSuccess: (title: string) => string;
    quizFailure: string;
    reset: string;
    progress: (current: number, goal: number) => string;
    rollDiceAction: string;
    diceTitle: (name: string) => string;
    replay: string;
    discoveryTitle: (title: string) => string;
    journalTitle: string;
    emptyJournal: string;
  };
}
