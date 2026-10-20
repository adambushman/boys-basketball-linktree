<script setup lang="ts">
import { computed } from 'vue'
import { ArrowDown, Calendar, Camera, Clock, MapPin } from 'lucide-vue-next'
import BasketballIcon from '@/components/icons/BasketballIcon.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { assetUrl } from '@/lib/calendar'
import type { EventDetails } from '@/data/site'

const props = defineProps<{ event: EventDetails }>()

const announced = computed(() => !!(props.event.date || props.event.time || props.event.place))

const rows = computed(() => [
  { icon: Calendar, label: 'Date', value: props.event.date },
  { icon: Clock, label: 'Time', value: props.event.time },
  { icon: MapPin, label: 'Place', value: props.event.place },
])
</script>

<template>
  <Card class="gap-4 border-white/15 bg-jazz-black/40 py-5">
    <CardHeader class="px-5">
      <CardTitle class="flex items-center gap-2 font-display text-xl uppercase tracking-wide">
        <component :is="event.matchup ? BasketballIcon : Camera" class="size-5 text-jazz-sky" />
        {{ event.title }}
      </CardTitle>
    </CardHeader>
    <CardContent class="px-5">
      <div
        v-if="event.matchup"
        class="mb-3 flex items-center justify-center gap-4 rounded-lg bg-white px-4 py-3 text-jazz-black"
      >
        <div class="flex flex-1 flex-col items-center gap-1">
          <img :src="assetUrl(event.matchup.away.logo)" :alt="event.matchup.away.name" class="size-14 object-contain" />
          <span class="text-center text-xs font-semibold">{{ event.matchup.away.name }}</span>
        </div>
        <span class="font-display text-2xl text-jazz-purple">@</span>
        <div class="flex flex-1 flex-col items-center gap-1">
          <img :src="assetUrl(event.matchup.home.logo)" :alt="event.matchup.home.name" class="size-14 object-contain" />
          <span class="text-center text-xs font-semibold">{{ event.matchup.home.name }}</span>
        </div>
      </div>
      <dl v-if="announced" class="divide-y divide-white/10 rounded-lg bg-white/5">
        <div v-for="row in rows" :key="row.label" class="flex items-center gap-3 px-4 py-3">
          <component :is="row.icon" class="size-4 shrink-0 text-jazz-sky" />
          <dt class="w-12 text-sm text-white/60">{{ row.label }}</dt>
          <dd class="text-sm font-medium" :class="row.value ? 'text-white' : 'text-white/45 italic'">
            {{ row.value ?? 'TBA' }}
          </dd>
        </div>
      </dl>
      <p v-else class="text-sm text-white/60">{{ event.note }}</p>
      <a
        v-if="event.footnote"
        :href="event.footnote.href"
        class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-jazz-sky underline-offset-4 hover:underline"
      >
        {{ event.footnote.text }}
        <ArrowDown class="size-3.5" />
      </a>
    </CardContent>
  </Card>
</template>
