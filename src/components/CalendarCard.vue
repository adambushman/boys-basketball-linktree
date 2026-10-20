<script setup lang="ts">
import { ref } from 'vue'
import { CalendarPlus, Check, Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { calendarLinks } from '@/lib/calendar'

const props = defineProps<{ icsUrl: string; name: string }>()

const links = calendarLinks(props.icsUrl, props.name)
const copied = ref(false)

async function copyLink() {
  try {
    await navigator.clipboard.writeText(links.raw)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.prompt('Copy this calendar link:', links.raw)
  }
}

const options = [
  { label: 'iPhone / Apple', href: links.apple },
  { label: 'Google', href: links.google },
  { label: 'Outlook', href: links.outlook },
]
</script>

<template>
  <Card class="gap-4 border-jazz-sky/40 bg-jazz-black py-5">
    <CardHeader class="px-5">
      <CardTitle class="flex items-center gap-2 font-display text-xl uppercase tracking-wide">
        <CalendarPlus class="size-5 text-jazz-sky" />
        Team Calendar
      </CardTitle>
      <CardDescription class="text-white/70">
        Subscribe once. Games and practices update on your phone automatically.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-2 px-5">
      <Button
        v-for="opt in options"
        :key="opt.label"
        as="a"
        :href="opt.href"
        target="_blank"
        rel="noopener"
        class="h-12 justify-center bg-jazz-sky text-base font-semibold text-jazz-black hover:bg-jazz-sky/85"
      >
        Add to {{ opt.label }}
      </Button>
      <Button
        variant="ghost"
        class="h-11 text-white/80 hover:bg-white/10 hover:text-white"
        @click="copyLink"
      >
        <component :is="copied ? Check : Copy" />
        {{ copied ? 'Link copied' : 'Copy link for other apps' }}
      </Button>
    </CardContent>
  </Card>
</template>
