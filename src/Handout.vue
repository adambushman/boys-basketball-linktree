<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Printer, ScanLine } from 'lucide-vue-next'
import QRCode from 'qrcode'
import BasketballIcon from '@/components/icons/BasketballIcon.vue'
import { site } from '@/data/site'

const homework = site.homework
const qrUrl = `${site.url}#homework`
const qrSvg = ref('')

const print = () => window.print()

onMounted(async () => {
  // Generated locally from our own URL, so v-html is safe here
  qrSvg.value = await QRCode.toString(qrUrl, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' })
})

const parts = homework
  ? [
      { label: 'Drill', text: homework.drill.caption },
      { label: 'Watch a Pro', text: homework.watchAPro.caption },
    ]
  : []
</script>

<template>
  <!-- Screen-only toolbar -->
  <div class="sticky top-0 z-10 flex flex-wrap items-center justify-center gap-3 bg-jazz-purple px-4 py-3 text-white print:hidden">
    <p class="text-sm">Letter paper · 100% scale · cut along the dashed lines</p>
    <button
      class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-jazz-black hover:bg-jazz-sky"
      @click="print"
    >
      <Printer class="size-4" />
      Print
    </button>
  </div>

  <p v-if="!homework" class="p-8 text-center print:hidden">No homework set in site.ts.</p>

  <!-- 8.5 × 11 sheet; @page supplies the 0.25in print margin -->
  <div v-else class="mx-auto my-6 w-[8.5in] bg-white p-[0.25in] shadow-xl print:m-0 print:w-auto print:p-0 print:shadow-none">
    <div class="grid grid-cols-2 grid-rows-4">
      <article
        v-for="n in 8"
        :key="n"
        class="relative flex h-[2.625in] w-[4in] overflow-hidden bg-white outline-1 -outline-offset-[0.5px] outline-dashed outline-neutral-300"
      >
        <!-- Brand bar -->
        <div class="w-[0.12in] shrink-0 bg-jazz-purple" />
        <div class="w-[0.04in] shrink-0 bg-jazz-sky" />

        <div class="flex min-w-0 flex-1 flex-col py-[0.16in] pr-[0.12in] pl-[0.16in]">
          <div class="flex items-center gap-[0.08in]">
            <span class="rounded-[3px] bg-jazz-black px-[0.07in] py-[0.02in] font-display text-[8pt] tracking-[0.15em] text-white uppercase">
              Homework
            </span>
            <span v-if="homework.completeBy" class="truncate text-[7.5pt] font-semibold">
              Complete by {{ homework.completeBy }}
            </span>
          </div>

          <h2 class="mt-[0.07in] font-display text-[26pt] leading-none tracking-wide text-jazz-purple uppercase">
            {{ homework.principle }}
          </h2>

          <p v-if="homework.why" class="mt-[0.06in] text-[8pt] leading-snug text-neutral-700">
            <span class="font-bold text-jazz-black">Why it matters:</span> {{ homework.why }}
          </p>

          <p class="mt-[0.08in] text-[6.5pt] font-bold tracking-[0.15em] text-neutral-500 uppercase">Two parts</p>
          <ol class="mt-[0.04in] space-y-[0.05in]">
            <li v-for="(part, i) in parts" :key="part.label" class="flex items-start gap-[0.06in] text-[8pt] leading-snug">
              <span class="grid size-[0.18in] shrink-0 place-items-center rounded-full bg-jazz-sky text-[7pt] font-bold">
                {{ i + 1 }}
              </span>
              <span>
                <span class="font-bold">{{ part.label }}:</span>
                {{ part.text }}
              </span>
            </li>
          </ol>

          <p class="mt-auto truncate text-[5pt] tracking-[0.12em] text-neutral-400 uppercase">
            {{ site.title }} · {{ site.subtitle }}
          </p>
        </div>

        <!-- QR column -->
        <div class="flex w-[1.12in] shrink-0 flex-col items-center justify-center gap-[0.06in] border-l border-neutral-200 px-[0.1in]">
          <BasketballIcon class="size-[0.2in] text-jazz-purple" />
          <div class="size-[0.88in] [&>svg]:size-full" v-html="qrSvg" />
          <p class="flex items-center gap-[0.03in] text-[6.5pt] font-bold text-jazz-purple uppercase">
            <ScanLine class="size-[0.11in]" />
            Scan to watch
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
