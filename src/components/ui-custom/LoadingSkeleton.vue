<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
    <!-- Hero skeleton -->
    <div class="space-y-4 flex flex-col items-center">
      <Skeleton class="h-32 w-full rounded-lg" />
      <Skeleton class="h-24 w-24 rounded-full" />
      <Skeleton class="h-6 w-64" />
      <Skeleton class="h-4 w-48" />
    </div>
    <!-- Section skeletons -->
    <div v-for="i in 4" :key="i" class="space-y-3">
      <Skeleton class="h-6 w-40" />
      <Skeleton class="h-32 w-full rounded-lg" />
    </div>
  </div>
</template>
