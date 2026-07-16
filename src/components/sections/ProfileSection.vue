<script setup lang="ts">
import type { Profile } from "@/types/cv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/composables/useLanguage";
import { useAnalytics } from "@/composables/useAnalytics";
import { MapPin, Briefcase, Mail, Calendar, Globe } from "@lucide/vue";
import { formatBirthDate } from "@/lib/date";

defineProps<{
  profile: Profile;
}>();

const { t, lang } = useLanguage();
const { trackEvent } = useAnalytics()

function onEmailClick() {
  trackEvent('email_click')
}
</script>

<template>
  <section id="profile">
    <div
      class="h-28 sm:h-38 bg-linear-to-r from-primary/80 via-secondary/60 to-accent/70"
    />

    <div class="max-w-5xl mx-auto px-4 -mt-16 sm:-mt-20 pb-2">
      <div
        class="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start sm:items-center text-center sm:text-left space-y-3"
      >
        <Avatar class="size-32 sm:size-42 mx-auto sm:mx-0 border-4 border-background shadow-md">
          <AvatarImage
            :src="profile.profile_picture_url"
            :alt="profile.first_name"
          />
          <AvatarFallback class="text-2xl">{{
            profile.nickname[0]
          }}</AvatarFallback>
        </Avatar>

        <div class="space-y-1 self-end mx-auto sm:mx-0 sm:mb-4">
          <h1 class="text-2xl font-bold tracking-tight">
            {{ profile.first_name }} {{ profile.middle_name }}
            {{ profile.last_name }}
          </h1>
          <p class="text-muted-foreground">{{ profile.headline }}</p>
        </div>
      </div>

      <div class="flex flex-col-reverse sm:flex-row gap-8 max-w-5xl mt-12 mb-6">
        <div class="shrink">
          <div class="flex flex-col rounded-lg border bg-card p-3 sm:p-4 space-y-2 text-xs">
            <p class="font-bold">{{ t().about }}</p>
            <div class="flex items-center gap-2 text-muted-foreground">
              <Briefcase class="size-4 shrink-0" />
              {{ profile.current_job.title }}
            </div>
            <div class="flex items-center gap-2 text-muted-foreground">
              <MapPin class="size-4 shrink-0" />
              {{ profile.current_location }}
            </div>
            <div class="flex items-center gap-2 text-muted-foreground">
              <Calendar class="size-4 shrink-0" />
              {{ formatBirthDate(profile.birth.date, lang) }}
            </div>
            <div class="flex items-center gap-2 text-muted-foreground">
              <Globe class="size-4 shrink-0" />
              {{ profile.nationality }}
            </div>
            <a
              :href="`mailto:${profile.contact.email}`"
              class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              @click="onEmailClick"
            >
              <Mail class="size-4" />
              {{ profile.contact.email }}
            </a>
          </div>
        </div>
        <div class="grow">
          <p class="prose prose-sm dark:prose-invert text-justify italic">
            {{ profile.summary }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
