// Builds "subscribe" links for each major calendar app from one public .ics URL.
export function calendarLinks(icsUrl: string, name: string) {
  const webcal = icsUrl.replace(/^https?:\/\//, 'webcal://')
  const enc = encodeURIComponent

  return {
    // iPhone, iPad, Mac (Apple Calendar) and most desktop apps handle webcal://
    apple: webcal,
    google: `https://calendar.google.com/calendar/render?cid=${enc(webcal)}`,
    outlook: `https://outlook.live.com/calendar/0/addfromweb?url=${enc(icsUrl)}&name=${enc(name)}`,
    raw: icsUrl,
  }
}

// Resolves repo-hosted paths (e.g. "files/schedule.pdf") against the GitHub Pages base path.
export function assetUrl(path: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '')
}
