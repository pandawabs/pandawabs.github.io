<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { FileText } from '@lucide/vue'

defineProps<{
  message?: string
}>()

const { t } = useLanguage()
</script>

<template>
  <div class="py-12 text-center space-y-2">
    <FileText class="size-8 mx-auto text-muted-foreground" />
    <p class="text-sm text-muted-foreground">{{ message || t().noData }}</p>
  </div>
</template>
