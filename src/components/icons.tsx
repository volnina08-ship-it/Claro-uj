import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconMail = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M5 4h4l1.7 4.3-2.2 1.6a13 13 0 0 0 5.6 5.6l1.6-2.2L20 15v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);

export const IconChevronRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const IconChevronLeft = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m15 5-7 7 7 7" />
  </svg>
);

export const IconChevronDown = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconBurger = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconFacebook = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}>
    <path d="M13.5 21v-7h2.4l.5-3h-2.9V9.2c0-.9.3-1.5 1.6-1.5h1.4V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3Z" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconUpload = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 16V4m0 0 4 4m-4-4L8 8" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13a1.5 1.5 0 0 1-1.5 1.4h-7A1.5 1.5 0 0 1 7 20L6 7" />
    <path d="M10 11v6m4-6v6" />
  </svg>
);

export const IconArrowUp = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 19V5m0 0-6 6m6-6 6 6" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 5v14m0 0-6-6m6 6 6-6" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconLogout = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4m-4-4h12" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);
