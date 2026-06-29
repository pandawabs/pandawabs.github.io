<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'
import { Sun, Moon } from '@lucide/vue'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleTheme" aria-label="Toggle theme">
    <Sun v-if="theme === 'dark'" class="size-5" />
    <Moon v-else class="size-5" />
  </Button>
</template>
