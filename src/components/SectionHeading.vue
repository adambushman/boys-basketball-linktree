<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <h2 class="mb-3 flex items-center gap-3 font-display text-sm uppercase tracking-[0.2em] text-jazz-sky">
    {{ title }}
    <span class="h-px flex-1 bg-jazz-sky/30" />
  </h2>
</template>
