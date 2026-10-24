<script setup lang="ts">
import { computed } from 'vue'
import { Dumbbell, Play, Star } from 'lucide-vue-next'
import type { Homework, HomeworkVideo } from '@/data/site'

const props = defineProps<{ homework: Homework }>()

// Pulls the video ID out of watch?v=, youtu.be/, shorts/ and embed/ links
function youtubeId(url: string) {
  return url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)?.[1]
}

const videos = computed(() =>
  (
    [
      { label: 'Drill', icon: Dumbbell, video: props.homework.drill },
      { label: 'Watch a Pro', icon: Star, video: props.homework.watchAPro },
    ] as { label: string; icon: typeof Dumbbell; video: HomeworkVideo }[]
  ).map((v) => ({ ...v, id: youtubeId(v.video.url) })),
)
</script>

<template>
  <div class="rounded-xl bg-jazz-black/40 p-5 ring-1 ring-white/15">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">This week's focus</p>
    <h3 class="mt-1 font-display text-3xl uppercase leading-none tracking-wide">{{ homework.principle }}</h3>
    <p v-if="homework.why" class="mt-2 text-sm text-white/75">
      <span class="font-semibold text-jazz-sky">Why it matters:</span> {{ homework.why }}
    </p>

    <div class="mt-5 grid grid-cols-2 gap-3">
      <div v-for="v in videos" :key="v.label">
        <p class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-jazz-sky">
          <component :is="v.icon" class="size-3.5 shrink-0" />
          {{ v.label }}
        </p>
        <a
          v-if="v.id"
          :href="v.video.url"
          target="_blank"
          rel="noopener"
          class="group relative block aspect-video overflow-hidden rounded-lg bg-jazz-black ring-1 ring-white/15"
        >
          <img
            :src="`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`"
            :alt="`${v.label}: ${homework.principle} video`"
            loading="lazy"
            class="size-full object-cover transition group-hover:scale-[1.02]"
          />
          <span class="absolute inset-0 grid place-items-center bg-black/20">
            <span class="grid size-10 place-items-center rounded-full bg-jazz-purple text-white shadow-lg ring-2 ring-white/80">
              <Play class="ml-0.5 size-4 fill-current" />
            </span>
          </span>
        </a>
        <div
          v-else
          class="grid aspect-video place-items-center rounded-lg border-2 border-dashed border-white/15 text-xs text-white/45"
        >
          Coming soon
        </div>
        <p v-if="v.video.caption" class="mt-2 text-xs leading-snug text-white/60">{{ v.video.caption }}</p>
      </div>
    </div>
  </div>
</template>
