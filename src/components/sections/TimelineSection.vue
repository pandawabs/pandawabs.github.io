<script setup lang="ts">
import type { Experience, Education } from '@/types/cv'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/composables/useLanguage'
import { computed, ref, watch } from 'vue'
import { Building2, GraduationCap, MapPin, Calendar, X, Maximize2 } from '@lucide/vue'
import { formatDate, formatDateRange } from '@/lib/date'

interface TimelineItem {
  id: string
  type: 'experience' | 'education'
  dateStart: string
  dateEnd: string | null
  currentlyActive: boolean
  title: string
  subtitle: string
  descriptions: string[]
  skills: string[]
  grade?: string | null
  location?: string
}

const props = defineProps<{
  experiences: Experience[]
  education: Education[]
}>()

const { t, lang } = useLanguage()

const track = ref<HTMLElement | null>(null)
const dragging = ref(false)
const hasMoved = ref(false)
let startX = 0
let scrollLeft = 0
let velocity = 0
let lastX = 0
let lastTime = 0
let animId = 0
let activePointerId = -1
const DRAG_THRESHOLD = 5
const selectedItem = ref<TimelineItem | null>(null)

function onPointerUp(e: PointerEvent) {
  if (activePointerId !== e.pointerId) return
  activePointerId = -1
  window.removeEventListener('pointermove', onPointerMoveGlobal)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
  dragging.value = false
  if (hasMoved.value && Math.abs(velocity) > 0.1) {
    animate(velocity * 16)
  }
}

function onPointerMoveGlobal(e: PointerEvent) {
  if (e.pointerId !== activePointerId) return
  const dx = e.pageX - startX
  if (!dragging.value) {
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      dragging.value = true
    } else {
      return
    }
  }
  e.preventDefault()
  const now = performance.now()
  const dt = now - lastTime
  if (dt > 0) {
    velocity = (e.pageX - lastX) / dt
  }
  lastX = e.pageX
  lastTime = now
  hasMoved.value = true
  if (track.value) track.value.scrollLeft = scrollLeft - dx * 1.5
}

function onDown(e: PointerEvent) {
  if (activePointerId !== -1) return
  cancelAnimationFrame(animId)
  hasMoved.value = false
  velocity = 0
  startX = e.pageX
  scrollLeft = track.value?.scrollLeft ?? 0
  lastX = e.pageX
  lastTime = performance.now()
  activePointerId = e.pointerId
  window.addEventListener('pointermove', onPointerMoveGlobal)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function animate(speed: number) {
  const friction = 0.92
  const minSpeed = 0.5
  if (Math.abs(speed) < minSpeed) return
  if (track.value) track.value.scrollLeft -= speed
  speed *= friction
  animId = requestAnimationFrame(() => animate(speed))
}

function openModal(item: TimelineItem) {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedItem.value = null
  document.body.style.overflow = ''
}

watch(selectedItem, (val) => {
  if (!val) document.body.style.overflow = ''
})

function sortKey(dateStr: string): number {
  if (!dateStr) return 999999
  const parts = dateStr.split('-')
  const year = parseInt(parts[0], 10)
  const month = parts[1] ? parseInt(parts[1], 10) : 0
  return year * 100 + month
}

const combinedTimeline = computed<TimelineItem[]>(() => {
  const items: TimelineItem[] = [
    ...props.experiences.map((e) => ({
      id: `exp-${e.id}`,
      type: 'experience' as const,
      dateStart: e.date_start,
      dateEnd: e.date_end,
      currentlyActive: e.currently_working,
      title: e.title,
      subtitle: e.company,
      descriptions: e.descriptions,
      skills: e.skills,
      location: e.location,
    })),
    ...props.education.map((e) => ({
      id: `edu-${e.id}`,
      type: 'education' as const,
      dateStart: e.date_start,
      dateEnd: e.date_end,
      currentlyActive: e.currently_studying,
      title: e.school,
      subtitle: e.degree + (e.field ? ` · ${e.field}` : ''),
      descriptions: [],
      skills: e.activity_society,
      grade: e.grade,
    })),
  ]

  items.sort((a, b) => {
    const aStart = sortKey(a.dateStart)
    const bStart = sortKey(b.dateStart)
    if (aStart !== bStart) return bStart - aStart
    const aEnd = sortKey(a.dateEnd ?? '')
    const bEnd = sortKey(b.dateEnd ?? '')
    return bEnd - aEnd
  })

  return items.reverse()
})
</script>

<template>
  <section id="timeline" class="py-8">
    <h2 class="text-xl font-semibold mb-6 max-w-5xl mx-auto px-4">{{ t().timeline }}</h2>
    <div
      ref="track"
      class="overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none"
      :class="{ 'cursor-grabbing': dragging }"
      @pointerdown="onDown"
    >
      <div class="flex gap-0 px-4 min-w-max items-stretch relative">
        <div class="absolute top-[5px] left-0 right-0 h-0.5 bg-primary/30 pointer-events-none z-0" />

        <div
          v-for="(item, idx) in combinedTimeline"
          :key="item.id"
          class="flex flex-col items-center w-72 shrink-0 px-3"
        >
          <div
            :class="{ 'bg-amber-500': item.type === 'education', 'bg-primary': item.type === 'experience' }"
            class="size-3 rounded-full shadow-sm shrink-0 ring-2 ring-background z-1"
          />

          <div class="text-xs text-muted-foreground mt-1.5 mb-3 whitespace-nowrap font-medium">
            {{ formatDate(item.dateStart, lang) }}
          </div>

          <div
            class="w-full rounded-lg border bg-card p-4 shadow-sm space-y-2.5 min-h-[132px] flex flex-col cursor-pointer"
            role="button"
            tabindex="0"
            @click="openModal(item)"
            @keydown.enter="openModal(item)"
          >
            <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 v-if="item.type === 'experience'" class="text-primary size-3.5" />
              <GraduationCap v-else class="text-amber-500 size-3.5" />
              {{ item.type === 'experience' ? t().experience : t().education }}
              <Badge v-if="item.currentlyActive" class="text-[10px] ml-auto" :class="{ 'bg-amber-500': item.type === 'education', 'bg-primary': item.type === 'experience' }">
                {{ item.type === 'experience' ? t().currentlyWorking : t().currentlyStudying }}
              </Badge>
            </div>

            <p class="text-sm font-semibold leading-tight">{{ item.title }}</p>
            <p class="text-xs text-muted-foreground">{{ item.subtitle }}</p>

            <div v-if="item.location" class="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin class="size-3" />
              {{ item.location }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="selectedItem"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl space-y-4 max-h-[80vh] overflow-y-auto">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 v-if="selectedItem.type === 'experience'" class="text-primary size-3.5" />
                <GraduationCap v-else class="text-amber-500 size-3.5" />
                {{ selectedItem.type === 'experience' ? t().experience : t().education }}
              </div>
              <h3 class="text-lg font-semibold">{{ selectedItem.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ selectedItem.subtitle }}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="shrink-0 hover:bg-muted transition-colors"
              @click="closeModal"
              aria-label="Close"
            >
              <X class="size-5" />
            </button>
          </div>

          <div class="text-sm text-muted-foreground">
            {{ formatDateRange(selectedItem.dateStart, selectedItem.dateEnd, lang, selectedItem.currentlyActive ? t().present : '') }}
          </div>

          <div v-if="selectedItem.location" class="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin class="size-4" />
            {{ selectedItem.location }}
          </div>

          <div v-if="selectedItem.grade" class="text-sm text-muted-foreground">
            GPA: {{ selectedItem.grade }}
          </div>

          <div v-if="selectedItem.descriptions.length">
            <p class="text-sm font-medium mb-2">Descriptions</p>
            <p class="prose prose-sm dark:prose-invert text-justify max-w-none space-y-1">
              <ul>
                <li v-for="(desc, di) in selectedItem.descriptions" :key="di" class="prose-li">
                  {{ desc }}
                </li>
              </ul>
            </p>
          </div>

          <div v-if="selectedItem.skills.length">
            <p class="text-sm font-medium mb-2">{{ selectedItem.type === 'experience' ? 'Skills' : 'Activities' }}</p>
            <div v-if="selectedItem.type === 'experience'" class="flex flex-wrap gap-1.5">
              <Badge v-for="skill in selectedItem.skills" :key="skill" variant="secondary" class="text-xs">
                {{ skill }}
              </Badge>
              
            </div>
            <p v-else class="prose prose-sm dark:prose-invert text-justify max-w-none space-y-1">
              <ul>
                <li v-for="(desc, di) in selectedItem.skills" :key="skill" class="prose-li">
                  {{ desc }}
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
