<script setup lang="ts">
import type { Profile, HighlightSkill } from '@/types/cv'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/composables/useLanguage'
import { MapPin, Briefcase, Mail, Calendar, Globe } from '@lucide/vue'
import { formatBirthDate } from '@/lib/date'

defineProps<{
  profile: Profile
  highlightSkills: HighlightSkill[]
}>()

const { t, lang } = useLanguage()

const socialIconMap: Record<string, string> = {
  LinkedIn: '🔗',
  Instagram: '📷',
  Facebook: '👤',
  GitHub: '💻',
  Medium: '📝',
  WhatsApp: '💬',
}
</script>

<template>
  <section id="profile">
    <div class="h-48 bg-gradient-to-r from-primary/80 via-secondary/60 to-accent/70" />

    <div class="max-w-5xl mx-auto px-4 -mt-16 pb-8">
      <div class="flex flex-col items-center text-center space-y-3">
        <Avatar class="size-32 border-4 border-background shadow-md">
          <AvatarImage :src="profile.profile_picture_url" :alt="profile.first_name" />
          <AvatarFallback class="text-2xl">{{ profile.nickname[0] }}</AvatarFallback>
        </Avatar>

        <div class="space-y-1">
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

      <Separator class="my-6" />

      <div class="max-w-3xl mx-auto mb-6">
        <div class="prose prose-sm max-w-none dark:prose-invert text-justify">
          <p>{{ profile.summary }}</p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
        <div class="rounded-lg border bg-card p-4 space-y-3">
          <p class="text-sm font-medium">{{ t().contact }}</p>
          <a
            :href="`mailto:${profile.contact.email}`"
            class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail class="size-4" />
            {{ profile.contact.email }}
          </a>
          <div class="flex flex-wrap gap-1.5">
            <a
              v-for="sp in profile.contact.social_profiles"
              :key="sp.id"
              :href="sp.profile_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted hover:bg-accent transition-colors"
            >
              {{ socialIconMap[sp.label] || '🔗' }} {{ sp.label }}
            </a>
          </div>
        </div>

        <div class="rounded-lg border bg-card p-4 space-y-2 text-sm">
          <p class="text-sm font-medium">{{ t().birth }}</p>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Calendar class="size-4 shrink-0" />
            {{ formatBirthDate(profile.birth.date, lang) }}
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <MapPin class="size-4 shrink-0" />
            {{ profile.birth.place }}
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Globe class="size-4 shrink-0" />
            {{ profile.nationality }}
          </div>
        </div>
      </div>

      <div class="rounded-lg border bg-card p-4 space-y-4 max-w-3xl mt-4 mx-auto">
        <p class="text-sm font-medium">{{ t().skills }}</p>
        <div v-for="group in highlightSkills" :key="group.category" class="space-y-1.5">
          <p class="text-xs font-medium text-muted-foreground">{{ group.category }}</p>
          <div class="flex flex-wrap gap-1.5">
            <Badge v-for="skill in group.skills" :key="skill" variant="secondary" class="text-xs">
              {{ skill }}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
