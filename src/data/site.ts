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
import {
  Apple,
  Award,
  BookOpen,
  Handshake,
  TableProperties,
  Ticket,
  UtensilsCrossed,
  ClipboardList
} from 'lucide-vue-next'

export interface LinkItem {
  title: string
  description?: string
  url: string
  icon: Component
}

export interface ScheduleItem {
  // Usually "Practice", "Clinic" or "Game" (picks the icon automatically).
  title: string
  date: string // 'YYYY-MM-DD'
  time?: string // '6:00 PM'
}

export interface Team {
  name: string
  logo: string // path under public/, e.g. 'logos/jazz.svg'
}

export interface EventDetails {
  title: string
  // Leave all three null until announced; the note shows instead.
  date: string | null
  time: string | null
  place: string | null
  note?: string
  matchup?: { away: Team; home: Team }
  // Small link under the tile, e.g. to an Other Info tile: { text, href: '#info-id' }
  footnote?: { text: string; href: string }
}

export interface InfoItem {
  id?: string // lets other tiles link here with href: '#info-<id>'
  title: string
  icon: Component
  source?: string
  // One string per paragraph. Wrap text in **double asterisks** for bold.
  body: string[]
}

export const site = {
  title: '3rd Grade Boys Basketball',
  subtitle: '2026-27 · Kaysville, UT',

  coach: {
    name: 'Adam Bushman',
    role: 'Head Coach',
    photo: 'coach.jpg',
  },

  calendar: {
    name: '3rd Grade Boys Basketball',
    icsUrl: 'https://calendar.google.com/calendar/ical/9e33970c003f71266fd9b363e559bd9b8863be5f5a52aa12f1b2cbb1a157d2fd%40group.calendar.google.com/public/basic.ics',
  },

  // This week's events. Order doesn't matter; they're sorted by date/time.
  upcoming: [
    { title: 'Clinic', date: '2026-10-24', time: '10:00 AM' },
    { title: 'Practice', date: '2026-10-28', time: '5:30 PM' },
  ] as ScheduleItem[],

  planFor: [
    {
      title: 'Jr Jazz Game Night',
      date: 'Wednesday, November 11',
      time: '7:00 PM',
      place: 'Delta Center',
      matchup: {
        away: { name: 'Orlando Magic', logo: 'logos/magic.svg' },
        home: { name: 'Utah Jazz', logo: 'logos/jazz.svg' },
      },
      footnote: { text: 'See below for more info', href: '#info-jazz-tickets' },
    },
    {
      title: 'Team Pictures',
      date: null,
      time: null,
      place: null,
      note: 'Details coming soon. Check back here.',
    },
  ] as EventDetails[],

  links: [
    { title: 'League Rules', description: 'PDF', url: 'files/kaysvillerec_Basketball_rules_34_grade_2025.pdf', icon: BookOpen },
    { title: 'Healthy Snack Sign-up', description: 'Google Sheet', url: 'https://docs.google.com/spreadsheets/d/1hfn-lGntF_drNEYCvwkXp06Uy407H7lMO-QGl0GnxtU/edit?usp=sharing', icon: ClipboardList },
    { title: 'QuickScores', description: 'Application', url: 'https://www.quickscores.com/Orgs/ResultsDisplay.php?OrgDir=kaysvillerec&LeagueID=1753079&TeamID=15396270', icon: TableProperties },
    { title: '"I CAN MAKE THE DIFFERENCE" Award', description: 'Sportsmanship Initiative', url: 'https://www.kaysville.gov/825/Kaysville-Sportsmanship-Zone', icon: Handshake },
    { title: '#EatLikeAChampion', description: 'Healthy Snacks Initiative', url: 'https://ut-kaysville.civicplus.com/1044/Eat-Like-a-Champion', icon: Apple },
    // { title: 'Practice Schedule', description: 'PDF', url: 'files/practice-schedule.pdf', icon: FileText },
  ] as LinkItem[],

  otherInfo: [
    {
      id: 'jazz-tickets',
      title: 'Jr Jazz Game Night Tickets',
      icon: Ticket,
      body: [
        'Each player gets **TWO** vouchers for the Jazz game. This will be sent to each player and they can redeem their tickets online. When they redeem the ticket they can buy additional discount tickets if they choose.',
        'We will send out tickets once we get them.',
      ],
    },
    {
      title: 'Food & Drink at Games',
      icon: UtensilsCrossed,
      source: 'Per instructions from Kaysville City:',
      body: [
        'There is NO food allowed at any game!!! If you are going to do treats it must be done after the game outside! Also, only water is allowed in the buildings and MUST have a lid on the container. You will be asked to throw away food or drinks if you bring them to the schools.',
      ],
    },
    {
      title: 'Good Sport Utah',
      icon: Award,
      source: 'Per instructions from Kaysville City:',
      body: [
        "The Jazz are doing the Good Sport Utah program this year. Each game the opposing team's coach will award a player on our team a card for demonstrating sportsmanship. This card will invite them to a party at the arena at the end of the year.",
      ],
    },
    {
      title: 'Sportsmanship Zone / "I CAN MAKE THE DIFFERENCE" Award',
      icon: Handshake,
      source: 'Per instructions from Kaysville City:',
      body: [
        'Parents, coaches and other players will be able to nominate people that they see showing good sportsmanship. Our motto at Kaysville Recreation is "Amazing Play"; please help us keep this as a safe environment to learn to play.',
      ],
    },
    {
      title: '#EatLikeAChampion',
      icon: Apple,
      source: 'Per instructions from Kaysville City:',
      body: [
        '**Eat Like A Champion** encourages healthier snack choices at youth sporting events. Together, we can help our young athletes stay energized, hydrated, and ready to play while building healthy habits that can last a lifetime.',
        'Participate by bringing healthy snacks to your games, take a photo, and post it using #EatLikeAChampion. #EATLIKEAchampionKAYS posts will be entered into a prize drawing.',
      ],
    },
  ] as InfoItem[],
}
