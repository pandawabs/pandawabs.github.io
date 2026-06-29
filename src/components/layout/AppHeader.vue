<script setup lang="ts">
import ThemeToggle from '@/components/ui-custom/ThemeToggle.vue'
import LanguageSwitcher from '@/components/ui-custom/LanguageSwitcher.vue'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur no-print">
    <div class="max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
      <span class="font-semibold text-sm tracking-tight">{{ t().siteTitle }}</span>
      <div class="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
