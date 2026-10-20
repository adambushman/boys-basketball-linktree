<script setup lang="ts">
import { computed } from 'vue'
import { Calendar, Camera, Clock, MapPin } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <CardHeader class="flex flex-row items-center justify-between gap-2 px-5">
      <CardTitle class="flex items-center gap-2 font-display text-xl uppercase tracking-wide">
        <Camera class="size-5 text-jazz-sky" />
        {{ event.title }}
      </CardTitle>
      <Badge
        v-if="!announced"
        class="shrink-0 border-transparent bg-white text-[11px] font-semibold uppercase tracking-wide text-jazz-purple"
      >
        Not yet announced
      </Badge>
    </CardHeader>
    <CardContent class="px-5">
      <dl class="divide-y divide-white/10 rounded-lg bg-white/5">
        <div v-for="row in rows" :key="row.label" class="flex items-center gap-3 px-4 py-3">
          <component :is="row.icon" class="size-4 shrink-0 text-jazz-sky" />
          <dt class="w-12 text-sm text-white/60">{{ row.label }}</dt>
          <dd class="text-sm font-medium" :class="row.value ? 'text-white' : 'text-white/45 italic'">
            {{ row.value ?? 'TBA' }}
          </dd>
        </div>
      </dl>
      <p v-if="event.note" class="mt-3 text-sm text-white/60">{{ event.note }}</p>
    </CardContent>
  </Card>
</template>
