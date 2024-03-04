export const Breakpoints = {
  // => @media (min-width: 640px) { ... }
  ['sm']: '640px',
  // => @media (min-width: 768px) { ... }
  ['md']: '768px',
  // => @media (min-width: 1024px) { ... }
  ['lg']: '1024px',
  // => @media (min-width: 1280px) { ... }
  ['xl']: '1280px',
  // => @media (min-width: 1536px) { ... }
  ['2xl']: '1536px',
} as const;
export type TBreakpoints = keyof typeof Breakpoints;
export type TBreakpointsValue = (typeof Breakpoints)[TBreakpoints];
