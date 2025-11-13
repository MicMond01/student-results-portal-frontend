// src/components/ui/Icon.tsx
import React from "react";
import { CgProfile } from "react-icons/cg";

export const Icon: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  dashboard: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M3 13h8V3H3v10Zm10 8h8v-6h-8v6ZM3 21h8v-6H3v6Zm10-8h8V3h-8v10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  students: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M3 7l9-4 9 4-9 4-9-4Zm2 5l7 3 7-3M5 12v5l7 3 7-3v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  courses: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 4h16v14H4z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 8h8M8 12h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  exams: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 3h12l3 4v14H3V3h3Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 12h6M9 16h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 19a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  profile: () => <CgProfile className="h-5 w-5" />,
};
