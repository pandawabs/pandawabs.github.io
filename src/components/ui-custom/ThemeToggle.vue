<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'
import { useAnalytics } from '@/composables/useAnalytics'
import { Sun, Moon } from '@lucide/vue'

const { theme, toggleTheme } = useTheme()
const { trackEvent } = useAnalytics()

function onToggle() {
  toggleTheme()
  trackEvent('theme_toggle', { theme: theme.value })
}
</script>

<template>
  <Button class="rounded-full" variant="ghost" size="icon" @click="onToggle" aria-label="Toggle theme">
    <Sun v-if="theme === 'dark'" class="size-5" />
    <Moon v-else class="size-5" />
  </Button>
</template>
