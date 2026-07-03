<script setup lang="ts">
import type { VoluntaryWork } from '@/types/cv'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/composables/useLanguage'
import { Calendar } from '@lucide/vue'
import { formatDateRange } from '@/lib/date'

defineProps<{
  volunteer: VoluntaryWork[]
}>()

const { t, lang } = useLanguage()
</script>

<template>
  <div class="flex flex-col-reverse gap-4">
    <Card v-for="v in volunteer" :key="v.id">
      <CardHeader>
        <CardTitle class="text-sm">{{ v.organization }}</CardTitle>
        <p class="text-xs text-muted-foreground">{{ v.role }}</p>
      </CardHeader>
      <CardContent class="space-y-2 text-xs text-muted-foreground">
        <p>{{ v.cause }}</p>
        <p>
          <Calendar class="size-3 inline mr-1" />
          {{ formatDateRange(v.date_start, v.date_end, lang, v.currently_volunteering ? t().present : '') }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
