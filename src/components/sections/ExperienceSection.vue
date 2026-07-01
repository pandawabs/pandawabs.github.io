<script setup lang="ts">
import type { Experience } from '@/types/cv'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/composables/useLanguage'
import { computed } from 'vue'
import { Building2, MapPin } from '@lucide/vue'
import { formatDateRange } from '@/lib/date'

const props = defineProps<{
  experiences: Experience[]
}>()

const { t, lang } = useLanguage()
const reverseOrderedExperiences = computed(() => props.experiences.slice().reverse())
</script>

<template>
  <section id="experience" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().experience }}</h2>
    <div class="space-y-3 sm:space-y-4">
      <Card v-for="exp in reverseOrderedExperiences" :key="exp.id">
        <CardHeader>
          <div class="flex items-start justify-between gap-4">
            <div>
              <CardTitle class="text-base">{{ exp.title }}</CardTitle>
              <CardDescription class="flex items-center gap-1 mt-1">
                <Building2 class="size-3" />
                {{ exp.company }}
              </CardDescription>
            </div>
            <Badge variant="outline" class="shrink-0 text-xs">
              {{ formatDateRange(exp.date_start, exp.date_end, lang, exp.currently_working ? t().present : '') }}
            </Badge>
          </div>
          <div class="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <MapPin class="size-3" />
              {{ exp.location }}
            </span>
            <span>{{ exp.employment_type }} · {{ exp.location_type }}</span>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <ul class="prose prose-sm max-w-none dark:prose-invert list-disc list-inside space-y-1">
            <li v-for="(desc, idx) in exp.descriptions" :key="idx" class="prose-li">{{ desc }}</li>
          </ul>
          <Separator v-if="exp.skills.length" />
          <div class="flex flex-wrap gap-1.5">
            <Badge v-for="skill in exp.skills" :key="skill" variant="secondary" class="text-xs">
              {{ skill }}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
