<script setup lang="ts">
import type { HighlightSkill } from '@/types/cv'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/composables/useLanguage'
import { Sparkles } from '@lucide/vue'

defineProps<{
  highlightSkills: HighlightSkill[]
}>()

const { t } = useLanguage()
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 pt-8 pb-4 space-y-4">
    <div class="flex items-center gap-2">
      <Sparkles class="size-5 shrink-0 text-primary" />
      <p class="text-lg font-semibold">{{ t().skills }}</p>
    </div>
    <div
      v-for="group in highlightSkills"
      :key="group.category"
      class="space-y-1.5"
    >
      <p class="text-xs font-medium text-muted-foreground">
        {{ group.category }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <Badge
          v-for="skill in group.skills"
          :key="skill"
          variant="default"
          class="text-xs"
        >
          {{ skill }}
        </Badge>
      </div>
    </div>
  </section>
</template>
