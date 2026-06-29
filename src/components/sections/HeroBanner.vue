<script setup lang="ts">
import type { Profile } from '@/types/cv'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/composables/useLanguage'
import { MapPin, Briefcase } from '@lucide/vue'

defineProps<{
  profile: Profile
}>()

const { t } = useLanguage()
</script>

<template>
  <section class="relative">
    <div class="h-48 bg-gradient-to-r from-primary/80 via-secondary/60 to-accent/70" />
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex flex-col items-center -mt-16 space-y-3 pb-8">
        <Avatar class="size-32 border-4 border-background shadow-md">
          <AvatarImage :src="profile.profile_picture_url" :alt="profile.first_name" />
          <AvatarFallback class="text-2xl">{{ profile.nickname[0] }}</AvatarFallback>
        </Avatar>
        <div class="text-center space-y-1">
          <h1 class="text-2xl font-bold tracking-tight">
            {{ profile.first_name }} {{ profile.middle_name }} {{ profile.last_name }}
          </h1>
          <p class="text-muted-foreground">{{ profile.headline }}</p>
          <div class="flex flex-wrap justify-center gap-2 pt-1">
            <Badge variant="secondary" class="gap-1">
              <MapPin class="size-3" />
              {{ profile.current_location }}
            </Badge>
            <Badge variant="secondary" class="gap-1">
              <Briefcase class="size-3" />
              {{ profile.current_job.title }}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
