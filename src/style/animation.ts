import { keyframes } from 'glamor';

export const COLOR_FADE_IN_TRANSITION = `150ms ease-in-out`;

export const FADE_IN = keyframes({
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
});

export const SCALE_IN = keyframes({
  '0%': {
    transform: `scale(0)`
  },
  '100%': {
    transform: `scale(1)`
  }
});

export const SCALE_OUT = keyframes({
  '0%': {
    transform: `scale(1)`
  },
  '100%': {
    transform: `scale(0)`
  }
});
