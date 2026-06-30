<script setup lang="ts">
import type { Organization } from '@/types/cv'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  <section id="organizations" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().organizations }}</h2>
    <div class="space-y-3">
      <Card v-for="org in reverseOrderedOrganizations" :key="org.id">
        <CardHeader>
          <div class="flex items-start justify-between gap-4">
            <div>
              <CardTitle class="text-sm flex items-center gap-2">
                <Users class="size-4 text-primary" />
                {{ org.name }}
              </CardTitle>
              <p class="text-xs text-muted-foreground mt-1">{{ org.position }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs text-muted-foreground">
                <Calendar class="size-3 inline mr-1" />
                {{ formatDateRange(org.date_start, org.date_end || '', lang, org.membership_ongoing ? t().ongoing : '') }}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>
