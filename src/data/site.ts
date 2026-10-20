// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file, commit, push —
// GitHub Actions rebuilds and redeploys the page automatically.
//
// Files: drop them in `public/files/` and link them as
// `files/your-file.pdf` (no leading slash).
//
// Icons: pick any from https://lucide.dev/icons and add it to the
// import line below (PascalCase, e.g. FileText, ClipboardList, Shirt).
// ─────────────────────────────────────────────────────────────

import type { Component } from 'vue'
import { BookOpen, FileText } from 'lucide-vue-next'

export interface LinkItem {
  title: string
  description?: string
  url: string
  icon: Component
}

export interface EventDetails {
  title: string
  // Leave fields as null until announced; they show as "TBA".
  date: string | null
  time: string | null
  place: string | null
  note?: string
}

export const site = {
  title: '3rd Grade Boys Basketball',
  subtitle: '2026–27 · Kaysville, UT',

  calendar: {
    name: '3rd Grade Boys Basketball',
    // Google Calendar → Settings → "Public address in iCal format"
    // (looks like https://calendar.google.com/calendar/ical/.../public/basic.ics)
    icsUrl: 'https://calendar.google.com/calendar/ical/REPLACE_ME/public/basic.ics',
  },

  pictures: {
    title: 'Team Pictures',
    date: null,
    time: null,
    place: null,
    note: 'Details coming soon. Check back here.',
  } satisfies EventDetails,

  links: [
    // { title: 'Practice Schedule', description: 'PDF', url: 'files/practice-schedule.pdf', icon: FileText },
    // { title: 'League Rules', url: 'https://example.com/rules', icon: BookOpen },
  ] as LinkItem[],

  coach: {
    name: 'Adam Bushman',
    role: 'Head Coach',
    // Put the photo at public/coach.jpg. Initials show until it exists.
    photo: 'coach.jpg',
  },
}
