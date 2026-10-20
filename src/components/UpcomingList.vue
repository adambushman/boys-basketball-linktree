<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUp, CalendarDays, Dumbbell, GraduationCap, Trophy } from 'lucide-vue-next'
import type { ScheduleItem } from '@/data/site'

const props = defineProps<{ items: ScheduleItem[] }>()

// '6:00 PM' / '18:00' → minutes after midnight, for sorting
function minutes(time?: string) {
  const m = time?.match(/(\d{1,2}):(\d{2})\s*([ap])?/i)
  if (!m) return 0
  let h = Number(m[1]) % 12
  if (m[3]?.toLowerCase() === 'p' || (!m[3] && Number(m[1]) >= 12)) h += 12
  return h * 60 + Number(m[2])
}

function iconFor(title: string) {
  const t = title.toLowerCase()
  if (t.includes('game')) return Trophy
  if (t.includes('practice')) return Dumbbell
  if (t.includes('clinic')) return GraduationCap
  return CalendarDays
}

const sorted = computed(() =>
  [...props.items]
    .sort((a, b) => a.date.localeCompare(b.date) || minutes(a.time) - minutes(b.time))
    .map((item) => {
      // Parse as a local calendar date so it never shifts across time zones
      const [y, mo, d] = item.date.split('-').map(Number)
      const day = new Date(y!, mo! - 1, d!)
      return {
        ...item,
        icon: iconFor(item.title),
        dateLabel: day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      }
    }),
)
</script>

<template>
  <ul v-if="sorted.length" class="divide-y divide-white/10 overflow-hidden rounded-xl bg-jazz-black/40 ring-1 ring-white/15">
    <li v-for="(item, i) in sorted" :key="i" class="flex items-center gap-4 px-4 py-4">
      <span class="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-jazz-purple">
        <component :is="item.icon" class="size-6" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="truncate font-display text-xl uppercase leading-tight tracking-wide">{{ item.title }}</p>
        <p class="text-sm text-white/70">{{ item.dateLabel }}</p>
      </div>
      <span v-if="item.time" class="shrink-0 text-sm font-semibold text-jazz-sky">{{ item.time }}</span>
    </li>
  </ul>
  <p v-else class="rounded-xl bg-jazz-black/40 px-4 py-4 text-sm text-white/60 ring-1 ring-white/15">
    Nothing scheduled this week.
  </p>
  <a
    href="#calendar"
    class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-jazz-sky underline-offset-4 hover:underline"
  >
    See calendar for all details
    <ArrowUp class="size-3.5" />
  </a>
</template>
