<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { assetUrl } from '@/lib/calendar'
import type { LinkItem } from '@/data/site'

defineProps<{ link: LinkItem }>()
</script>

<template>
  <a
    :href="assetUrl(link.url)"
    target="_blank"
    rel="noopener"
    class="group flex min-h-14 items-center gap-3 rounded-xl bg-white px-4 py-3 text-jazz-black shadow-lg shadow-black/20 transition active:scale-[0.98] hover:bg-jazz-sky focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jazz-sky"
  >
    <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-jazz-purple text-white">
      <component :is="link.icon" class="size-5" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block truncate font-semibold">{{ link.title }}</span>
      <span v-if="link.description" class="block truncate text-sm text-jazz-black/60">
        {{ link.description }}
      </span>
    </span>
    <ChevronRight class="size-5 shrink-0 text-jazz-black/40 transition group-hover:translate-x-0.5" />
  </a>
</template>
