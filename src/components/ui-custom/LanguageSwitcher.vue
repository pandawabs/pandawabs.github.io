<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { useAnalytics } from '@/composables/useAnalytics'

const { lang, setLanguage } = useLanguage()
const { trackEvent } = useAnalytics()

function onToggle() {
  const next = lang.value === 'en' ? 'id' : 'en'
  setLanguage(next)
  trackEvent('language_switch', { language: next })
}
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer select-none">
    <span class="text-sm font-medium">{{ lang === 'en' ? 'EN' : 'ID' }}</span>
    <button
      type="button"
      role="switch"
      :aria-checked="lang === 'id'"
      class="relative inline-flex h-5 w-9 shrink-0 rounded-full border border-input bg-muted transition-colors"
      @click="onToggle"
    >
      <span
        class="pointer-events-none block h-4 w-4 my-0.25 rounded-full bg-foreground transition-transform"
        :class="lang === 'id' ? 'translate-x-[19px]' : 'translate-x-[2px]'"
      />
    </button>
  </label>
</template>
