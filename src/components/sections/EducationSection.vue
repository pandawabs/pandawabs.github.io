<script setup lang="ts">
import type { Education } from '@/types/cv'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/composables/useLanguage'
import { GraduationCap, Calendar } from '@lucide/vue'
import { computed } from 'vue'
import { formatDateRange } from '@/lib/date'

const props = defineProps<{
  education: Education[]
}>()
const { t, lang } = useLanguage()
const reverseOrderedEducation = computed(() => props.education.slice().reverse())
</script>

<template>
  <section id="education" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().education }}</h2>
    <div class="space-y-3 sm:space-y-4">
      <Card v-for="edu in reverseOrderedEducation" :key="edu.id" :class="{ 'border-primary/50': edu.currently_studying }">
        <CardHeader>
          <div class="flex items-start justify-between gap-4">
            <div>
              <CardTitle class="text-base">{{ edu.school }}</CardTitle>
              <CardDescription class="flex items-center gap-1 mt-1">
                <GraduationCap class="size-3" />
                {{ edu.degree }}{{ edu.field ? ` · ${edu.field}` : '' }}
              </CardDescription>
            </div>
            <Badge variant="outline" class="shrink-0 text-xs">
              <Calendar class="size-3 mr-1" />
              {{ formatDateRange(edu.date_start, edu.date_end, lang, edu.currently_studying ? t().present : '') }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div v-if="edu.grade" class="text-sm text-muted-foreground">
            GPA: {{ edu.grade }}
          </div>
          <div v-if="edu.activity_society.length" class="flex flex-wrap gap-1.5">
            <Badge v-for="act in edu.activity_society" :key="act" variant="secondary" class="text-xs">
              {{ act }}
            </Badge>
          </div>
          <Badge v-if="edu.currently_studying" variant="default" class="text-xs">
            {{ t().currentlyStudying }}
          </Badge>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
