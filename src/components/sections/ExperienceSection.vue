<script setup lang="ts">
import type { Experience } from '@/types/cv'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/composables/useLanguage'
import { computed, reactive } from 'vue'
import { Building2, MapPin, ChevronDown, ChevronUp } from '@lucide/vue'
import { formatDateRange } from '@/lib/date'

const props = defineProps<{
  experiences: Experience[]
}>()

const { t, lang } = useLanguage()
const openItems = reactive<Record<number, boolean>>({ 1: true })
const reverseOrderedExperiences = computed(() => props.experiences.slice().reverse())

function toggle(id: number) {
  openItems[id] = !openItems[id]
}
</script>

<template>
  <section id="experience" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().experience }}</h2>
    <div class="space-y-4">
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
          <Collapsible v-model:open="openItems[exp.id]" as="div">
            <CollapsibleContent class="space-y-2">
              <ul class="prose prose-sm max-w-none dark:prose-invert list-disc list-inside space-y-1">
                <li v-for="(desc, idx) in exp.descriptions" :key="idx">{{ desc }}</li>
              </ul>
            </CollapsibleContent>
            <CollapsibleTrigger v-if="exp.descriptions.length > 1" as-child>
              <Button variant="ghost" size="sm" class="mt-2" @click="toggle(exp.id)">
                <component :is="openItems[exp.id] ? ChevronUp : ChevronDown" class="size-4" />
                {{ openItems[exp.id] ? 'Less' : 'More' }}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
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
