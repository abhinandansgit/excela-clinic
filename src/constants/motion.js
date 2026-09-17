// Signature unified easing curve across all components in Excela Clinic
export const TRANSITION_EASE = [0.22, 1, 0.36, 1];

export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.6;
export const DURATION_SLOW = 0.9;

export const EASE_TRANSITION = {
  duration: DURATION_NORMAL,
  ease: TRANSITION_EASE
};

// Container stagger variants
export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Fade & Rise variant
export const FADE_IN_UP_VARIANT = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: TRANSITION_EASE
    }
  }
};

// Card scale & fade variant
export const CARD_STAGGER_VARIANT = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: TRANSITION_EASE
    }
  }
};

// Word reveal variant for headlines (wrapped in inline-block)
export const WORD_REVEAL_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  }
};

export const WORD_REVEAL_CHILD = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: TRANSITION_EASE
    }
  }
};
