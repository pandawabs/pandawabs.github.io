<script setup lang="ts">
import type { License } from '@/types/cv'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/composables/useLanguage'
import { ExternalLink, Calendar } from '@lucide/vue'
import { computed } from 'vue'
import { formatDate } from '@/lib/date'

const props = defineProps<{
  licenses: License[]
}>()

const { t, lang } = useLanguage()
const reverseOrderedLicenses = computed(() => props.licenses.slice().reverse())
</script>

<template>
  <div class="flex flex-col gap-3 sm:gap-4">
    <Card v-for="lic in reverseOrderedLicenses" :key="lic.id">
      <CardHeader>
        <CardTitle class="text-sm">
          <a
            v-if="lic.credential_url"
            :href="lic.credential_url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline inline-flex items-center gap-1"
          >
            {{ lic.name }} <ExternalLink class="size-3 shrink-0" />
          </a>
          <template v-else>{{ lic.name }}</template>
        </CardTitle>
        <p class="text-xs text-muted-foreground">{{ lic.organization }}</p>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar class="size-3" />
          {{ formatDate(lic.date_issue, lang) }}
          <span v-if="lic.date_expire"> — {{ formatDate(lic.date_expire, lang) }}</span>
        </div>
        <div class="text-xs">ID: {{ lic.credential_id }}</div>
      </CardContent>
    </Card>
  </div>
</template>
