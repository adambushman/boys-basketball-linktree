<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { assetUrl } from '@/lib/calendar'

const props = defineProps<{ name: string; role: string; photo?: string }>()

const initials = computed(() =>
  props.name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl bg-jazz-black/40 p-4 ring-1 ring-white/15">
    <Avatar class="size-20 ring-2 ring-jazz-sky ring-offset-2 ring-offset-jazz-black">
      <AvatarImage v-if="photo" :src="assetUrl(photo)" :alt="name" class="object-cover" />
      <AvatarFallback class="bg-jazz-purple font-display text-2xl text-white">
        {{ initials }}
      </AvatarFallback>
    </Avatar>
    <div>
      <p class="font-display text-2xl uppercase leading-tight tracking-wide">{{ name }}</p>
      <p class="text-sm font-medium uppercase tracking-[0.15em] text-jazz-sky">{{ role }}</p>
    </div>
  </div>
</template>
