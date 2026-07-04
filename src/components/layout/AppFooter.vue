<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { yearNow } from '@/lib/date';

const { t } = useLanguage()
</script>

<template>
  <footer class="border-t py-6 mt-12 no-print">
    <div class="max-w-5xl mx-auto px-4 text-center text-xs text-muted-foreground">
      © {{ yearNow() }} {{ t().footerText }}
    </div>
  </footer>
</template>
