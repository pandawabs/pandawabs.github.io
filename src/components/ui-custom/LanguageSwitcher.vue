<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/composables/useLanguage'

const { lang, setLanguage } = useLanguage()
</script>

<template>
  <div class="flex gap-1">
    <Button
      :variant="lang === 'en' ? 'default' : 'outline'"
      size="sm"
      @click="setLanguage('en')"
    >
      EN
    </Button>
    <Button
      :variant="lang === 'id' ? 'default' : 'outline'"
      size="sm"
      @click="setLanguage('id')"
    >
      ID
    </Button>
  </div>
</template>
