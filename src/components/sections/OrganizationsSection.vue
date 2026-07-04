<script setup lang="ts">
import type { Organization } from '@/types/cv'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/composables/useLanguage'
import { Calendar } from '@lucide/vue'
import { computed } from 'vue'
import { formatDateRange } from '@/lib/date'

const props = defineProps<{
  organizations: Organization[]
}>()

const { t, lang } = useLanguage()
const reverseOrderedOrganizations = computed(() => props.organizations.slice().reverse())
</script>

<template>
  <div class="space-y-3">
    <Card v-for="org in reverseOrderedOrganizations" :key="org.id">
      <CardHeader>
        <CardTitle class="text-sm">{{ org.name }}</CardTitle>
        <p class="text-xs text-muted-foreground">{{ org.position }}</p>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar class="size-3" />
          {{ formatDateRange(org.date_start, org.date_end || '', lang, org.membership_ongoing ? t().ongoing : '') }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>
