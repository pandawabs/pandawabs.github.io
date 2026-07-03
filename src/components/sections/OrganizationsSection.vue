<script setup lang="ts">
import type { Organization } from '@/types/cv'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/composables/useLanguage'
import { Users, Calendar } from '@lucide/vue'
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
        <div class="flex items-start justify-between gap-4">
          <div>
            <CardTitle class="text-sm flex items-center gap-2">
              {{ org.name }}
            </CardTitle>
            <p class="text-xs text-muted-foreground mt-1">{{ org.position }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs text-muted-foreground whitespace-nowrap">
              <Calendar class="size-3 inline mr-1" />
              {{ formatDateRange(org.date_start, org.date_end || '', lang, org.membership_ongoing ? t().ongoing : '') }}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  </div>
</template>
