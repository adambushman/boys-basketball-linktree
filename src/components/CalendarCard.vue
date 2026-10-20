<script setup lang="ts">
import { ref } from 'vue'
import { CalendarPlus, Check, Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import CalendarAppIcon from '@/components/icons/CalendarAppIcon.vue'
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
  { app: 'apple', label: 'Apple', href: links.apple },
  { app: 'google', label: 'Google', href: links.google },
  { app: 'outlook', label: 'Outlook', href: links.outlook },
] as const
</script>

<template>
  <Card class="gap-4 border-jazz-sky/40 bg-jazz-black py-5">
    <CardHeader class="px-5">
      <CardDescription class="flex items-start gap-2 text-white/70">
        <CalendarPlus class="mt-0.5 size-5 shrink-0 text-jazz-sky" />
        Subscribe once. Games and practices update on your phone automatically.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-2 px-5">
      <div class="flex gap-2">
        <Button
          v-for="opt in options"
          :key="opt.label"
          as="a"
          :href="opt.href"
          target="_blank"
          rel="noopener"
          class="h-12 flex-1 gap-1.5 bg-jazz-sky text-base font-semibold text-jazz-black hover:bg-jazz-sky/85"
        >
          <CalendarAppIcon :app="opt.app" class="size-4" />
          {{ opt.label }}
        </Button>
      </div>
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
