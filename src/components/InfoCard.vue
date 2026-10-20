<script setup lang="ts">
import type { InfoItem } from '@/data/site'

defineProps<{ item: InfoItem }>()

// Splits "a **b** c" into segments so bold text renders without v-html
function segments(text: string) {
  return text.split('**').map((t, i) => ({ text: t, bold: i % 2 === 1 }))
}
</script>

<template>
  <article :id="item.id ? `info-${item.id}` : undefined" class="scroll-mt-6 rounded-xl bg-jazz-black/40 p-5 ring-1 ring-white/15">
    <h3 class="flex items-start gap-2 font-display text-lg uppercase leading-snug tracking-wide">
      <component :is="item.icon" class="mt-0.5 size-5 shrink-0 text-jazz-sky" />
      {{ item.title }}
    </h3>
    <blockquote class="mt-3 space-y-2 border-l-4 border-jazz-sky pl-4 text-sm leading-relaxed text-white/80">
      <p v-if="item.source" class="font-medium text-white/60 italic">{{ item.source }}</p>
      <p v-for="(para, i) in item.body" :key="i">
        <template v-for="(seg, j) in segments(para)" :key="j">
          <strong v-if="seg.bold" class="font-semibold text-white">{{ seg.text }}</strong>
          <template v-else>{{ seg.text }}</template>
        </template>
      </p>
    </blockquote>
  </article>
</template>
