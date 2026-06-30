<script setup lang="ts">
import type { Experience } from '@/types/cv'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/composables/useLanguage'
import { reactive, computed } from 'vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

const props = defineProps<{
  experiences: Experience[]
}>()

const { t } = useLanguage()

const allSkills = computed(() => {
  const set = new Set<string>()
  for (const exp of props.experiences) {
    for (const skill of exp.skills) {
      set.add(skill)
    }
  }
  return Array.from(set).sort()
})

const openItems = reactive<Record<number, boolean>>({ [props.experiences[0]?.id || 0]: true })

function toggle(id: number) {
  openItems[id] = !openItems[id]
}
</script>

<template>
  <section id="skills" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().skills }}</h2>

    <Card class="mb-4">
      <CardHeader>
        <CardTitle class="text-base">All Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-1.5">
          <Badge v-for="skill in allSkills" :key="skill" variant="secondary" class="text-xs">
            {{ skill }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
