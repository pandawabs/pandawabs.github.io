<script setup lang="ts">
import type { Profile } from '@/types/cv'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/composables/useLanguage'
import { Mail, MapPin, Calendar, Globe } from '@lucide/vue'
import { computed } from 'vue'
import { formatBirthDate } from '@/lib/date'

const props = defineProps<{
  profile: Profile
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

const birthStr = computed(() => formatBirthDate(props.profile.birth.date, lang.value))
</script>

<template>
  <section id="about" class="max-w-5xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">{{ t().about }}</h2>
    <div class="grid gap-6 md:grid-cols-3">
      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle>{{ t().about }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="prose prose-sm max-w-none dark:prose-invert text-justify">
            <p>{{ profile.summary }}</p>
          </div>
          <Separator />
          <div class="space-y-2">
            <p class="text-sm font-medium">{{ t().contact }}</p>
            <div class="flex flex-wrap gap-2">
              <a
                :href="`mailto:${profile.contact.email}`"
                class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail class="size-4" />
                {{ profile.contact.email }}
              </a>
            </div>
            <div class="flex flex-wrap gap-2 pt-1">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">{{ t().birth }}</CardTitle>
          <CardDescription>{{ t().location }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Calendar class="size-4" />
            {{ birthStr }}
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <MapPin class="size-4" />
            {{ profile.birth.place }}
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Globe class="size-4" />
            {{ profile.nationality }}
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
