<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/composables/useLanguage'
import { AlertCircle } from '@lucide/vue'

defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()

const { t } = useLanguage()
</script>

<template>
  <div class="max-w-lg mx-auto py-20 px-4 text-center space-y-4">
    <AlertCircle class="size-12 mx-auto text-destructive" />
    <p class="text-muted-foreground">{{ message || t().error }}</p>
    <Button variant="outline" @click="emit('retry')">{{ t().retry }}</Button>
  </div>
</template>
