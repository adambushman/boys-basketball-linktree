<script setup lang="ts">
import CalendarCard from '@/components/CalendarCard.vue'
import CoachCard from '@/components/CoachCard.vue'
import EventCard from '@/components/EventCard.vue'
import InfoCard from '@/components/InfoCard.vue'
import LinkButton from '@/components/LinkButton.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import UpcomingList from '@/components/UpcomingList.vue'
import { site } from '@/data/site'
</script>

<template>
  <div class="min-h-dvh bg-jazz-purple">
    <header class="relative overflow-hidden pt-[calc(3rem+env(safe-area-inset-top))] pb-16 text-center">
      <!-- Subtle court circle behind the title -->
      <div
        class="pointer-events-none absolute left-1/2 top-4 size-72 -translate-x-1/2 rounded-full border-2 border-white/10"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-md px-4">
        <p class="font-display text-sm uppercase tracking-[0.3em] text-jazz-sky">
          {{ site.subtitle }}
        </p>
        <h1 class="mt-2 font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
          {{ site.title }}
        </h1>
      </div>
      <!-- Generic Wasatch ridgeline -->
      <svg
        class="absolute inset-x-0 bottom-0 h-12 w-full text-jazz-black/35"
        viewBox="0 0 400 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 48V34l38-18 26 12 40-24 30 16 22-10 44 26 34-20 30 14 42-26 36 22 28-10 30 16v16Z"
        />
      </svg>
    </header>

    <main class="pb-10">
      <div class="mx-auto flex max-w-md flex-col gap-8 px-4 pt-4">
        <section>
          <SectionHeading title="Coach" />
          <CoachCard v-bind="site.coach" />
        </section>

        <section id="calendar" class="scroll-mt-6">
          <SectionHeading title="Team Calendar" />
          <CalendarCard :ics-url="site.calendar.icsUrl" :name="site.calendar.name" />
        </section>

        <section>
          <SectionHeading title="Upcoming" />
          <UpcomingList :items="site.upcoming" />
        </section>

        <section v-if="site.planFor.length">
          <SectionHeading title="Plan For" />
          <div class="flex flex-col gap-4">
            <EventCard v-for="event in site.planFor" :key="event.title" :event="event" />
          </div>
        </section>

        <section v-if="site.links.length">
          <SectionHeading title="Links & Files" />
          <div class="flex flex-col gap-3">
            <LinkButton v-for="link in site.links" :key="link.url" :link="link" />
          </div>
        </section>

        <section v-if="site.otherInfo.length">
          <SectionHeading title="Other Info" />
          <div class="flex flex-col gap-4">
            <InfoCard v-for="item in site.otherInfo" :key="item.title" :item="item" />
          </div>
        </section>
      </div>

      <footer class="mt-12 text-center text-xs text-white/40">
        {{ site.title }} · {{ site.subtitle }}
      </footer>
    </main>
  </div>
</template>
