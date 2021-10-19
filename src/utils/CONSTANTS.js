// const DEFAULT_ANIMATE_DURATION = 0.4;
export const POPUP_DELAY = 1;
export const POPUP_DURATION = 0.4;
export const BUTTONS_SLIDE_DURATION = 0.3;
export const BUTTONS_SLIDE_DELAY = 0.6;
export const POPUP_OPEN_DURATION = 0.4;
// export const POPUP_OPEN_DURATION = 2;
export const POPUP_OPEN_DELAY = 0;
export const POPUP_CLOSE_DURATION = 0.2;
export const POPUP_CLOSE_DELAY = 0.2;
export const TODO_CONTENT_OPEN_DURATION = 0.4;
export const TODO_CONTENT_OPEN_DELAY =
  POPUP_OPEN_DURATION + POPUP_OPEN_DELAY - 0.2;
export const TODO_CONTENT_CLOSE_DURATION = 0.4;
export const TODO_CONTENT_CLOSE_DELAY =
  POPUP_CLOSE_DURATION + POPUP_CLOSE_DELAY + 0.3;
export const TODO_DELETE_DELAY = 2;

export const ITEM_MAIN_TRANSITION_DURATION = 0.2;
export const ITEM_INNER_TRANSITION_DURATION = 0.2;

export const ELEVATIONS = {
  small: `
    0.5px 1px 1px hsl(var(--shadow-color) / 0.7)
  `,
  medium: `
    1px 2px 2px hsl(var(--shadow-color) / 0.333),
    2px 4px 4px hsl(var(--shadow-color) / 0.333),
    3px 6px 6px hsl(var(--shadow-color) / 0.333)
  `,
  large: `
    1px 2px 2px hsl(var(--shadow-color) / 0.2),
    2px 4px 4px hsl(var(--shadow-color) / 0.2),
    4px 8px 8px hsl(var(--shadow-color) / 0.2),
    8px 16px 16px hsl(var(--shadow-color) / 0.2)
  `,
  xl: `
    1px 2px 2px hsl(var(--shadow-color) / 0.2),
    2px 4px 4px hsl(var(--shadow-color) / 0.2),
    4px 8px 8px hsl(var(--shadow-color) / 0.2),
    8px 16px 16px hsl(var(--shadow-color) / 0.2),
    16px 32px 32px hsl(var(--shadow-color) / 0.2)
  `,
};
