// All user-facing copy lives here so it can be tweaked without touching logic.
// (PRD §7, §38 — everything configurable.)

export const site = {
  recipientName: 'maaike',

  dates: {
    graduation: '2026-10-15',
    birthday: '2026-11-09',
    // The selection locks the day AFTER this date. Also enforced server-side.
    selectionDeadline: '2026-10-25',
  },

  landing: {
    kicker: 'For maaike ✨',
    lines: [
      'A little something for the girl who just graduated.',
      'And for the birthday that is coming very soon...',
    ],
    heading: 'Your Gift Awaits',
    subheading:
      'You have worked hard, dreamed big, and reached another beautiful milestone.',
    cta: 'Begin Your Journey ✨',
  },

  welcome: {
    salutation: 'Dear maaike,',
    body: [
      'Congratulations on your graduation. ❤️',
      'You have reached a beautiful new chapter, and I wanted to give you something a little different this time.',
      'Instead of choosing your gift for you...',
      'I want you to choose it yourself.',
      'So take your time. Explore. Dream a little.',
      'And choose whatever makes you happiest. ✨',
    ],
    cta: 'Show Me My Gifts',
  },

  gifts: {
    heading: 'Choose Your Magic ✨',
    subheading: 'There is something here for every kind of adventure.',
    hintSingle: 'Choose what makes your heart happy.',
    hintSelected: 'A beautiful choice. ✨',
    hintMultiple: 'Your little collection is coming together.',
    cta: 'These are my choices ✨',
    // Shown (with no numbers) when a pick would exceed the hidden budget.
    tooMuchMagic: {
      title: "That's a little too much magic for one adventure. ✨",
      body: 'Maybe choose one of these instead, or remove something from your current collection.',
    },
    exclusiveConfirm: {
      title: 'This one is a whole adventure by itself. ✨',
      body: 'Are you sure this is the one? Choosing it will gently set aside your other picks.',
      confirm: 'Yes, this is the one ❤️',
      cancel: 'Let me keep exploring',
    },
  },

  dinnerReveal: {
    title: 'And one thing comes with every gift...',
    body: 'Dinner with me. ❤️',
    note: 'That one was never up for negotiation.',
  },

  review: {
    heading: 'Your Little Collection ✨',
    dinnerLine: 'Dinner with me.',
    dinnerNote: 'Always included.',
    cta: 'This Is My Choice ❤️',
    back: 'I Want To Change Something',
    ready: 'Ready to make it official?',
  },

  success: {
    heading: 'For maaike, with love. ❤️',
    lines: [
      "It's official. ✨",
      'Your gift has been chosen.',
      "I'll take care of the rest.",
      "And I'll see you before your birthday. ❤️",
    ],
    closing: 'Until then... keep being magical.',
    footer: 'Keep being you.',
  },

  pin: {
    createTitle: 'Create your secret PIN 🔐',
    createSubtitle:
      "You'll use this little secret to come back and change your gift later.",
    returnTitle: 'Welcome back, maaike ✨',
    returnSubtitle: 'Enter your secret PIN',
    successMessage: 'Welcome back ❤️',
    mismatch: 'Those two little secrets do not match. Try once more. ✨',
    wrong: "That's not quite it. Try again. ✨",
    lockedOut:
      'Too many tries, my love. Take a little breath and try again in a moment. ✨',
  },

  sealed: {
    title: 'The magic has been sealed. ✨',
    body: 'Your choice has been saved and is now being prepared.',
  },

  // Soft background music (never autoplays — PRD §44). Drop an audio file at
  // public/audio/theme.mp3 to enable; otherwise the button quietly hides.
  music: {
    src: 'audio/theme.mp3',
  },

  progress: ['Discover', 'Choose', 'Make It Yours'],

  // Rare, subtle easter eggs shown when clicking a star (PRD §43).
  easterEggs: [
    "Psst... you're very cute.",
    'I hope you\'re smiling right now.',
    'Yes, I really made a whole website for you.',
    'You did it. I always knew you would. ❤️',
  ],
} as const

export type SiteConfig = typeof site
