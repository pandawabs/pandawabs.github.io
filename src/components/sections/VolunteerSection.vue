<script setup lang="ts">
import type { VoluntaryWork } from '@/types/cv'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/composables/useLanguage'
import { Heart, Calendar } from '@lucide/vue'

defineProps<{
  volunteer: VoluntaryWork[]
}>()

const { t } = useLanguage()
</script>

<template>
  <section id="volunteer" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().volunteer }}</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      <Card v-for="v in volunteer" :key="v.id">
        <CardHeader>
          <CardTitle class="text-sm flex items-center gap-2">
            <Heart class="size-4 text-secondary" />
            {{ v.organization }}
          </CardTitle>
          <p class="text-xs text-muted-foreground">{{ v.role }}</p>
        </CardHeader>
        <CardContent class="space-y-2 text-xs text-muted-foreground">
          <p>{{ v.cause }}</p>
          <p>
            <Calendar class="size-3 inline mr-1" />
            {{ v.date_start }} — {{ v.date_end || t().present }}
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
