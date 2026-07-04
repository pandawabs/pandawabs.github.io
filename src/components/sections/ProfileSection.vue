<script setup lang="ts">
import type { Profile } from "@/types/cv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/composables/useLanguage";
import { MapPin, Briefcase, Mail, Calendar, Globe } from "@lucide/vue";
import { formatBirthDate } from "@/lib/date";

defineProps<{
  profile: Profile;
}>();

const { t, lang } = useLanguage();
</script>

<template>
  <section id="profile">
    <div
      class="h-28 sm:h-38 bg-linear-to-r from-primary/80 via-secondary/60 to-accent/70"
    />

    <div class="max-w-5xl mx-auto px-4 -mt-12 sm:-mt-16 pb-2">
      <div
        class="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start text-left space-y-3"
      >
        <Avatar class="size-32 sm:size-42 border-4 border-background shadow-md">
          <AvatarImage
            :src="profile.profile_picture_url"
            :alt="profile.first_name"
          />
          <AvatarFallback class="text-2xl">{{
            profile.nickname[0]
          }}</AvatarFallback>
        </Avatar>

        <div class="space-y-1 self-end sm:mb-4">
          <h1 class="text-2xl font-bold tracking-tight">
            {{ profile.first_name }} {{ profile.middle_name }}
            {{ profile.last_name }}
          </h1>
          <p class="text-muted-foreground">{{ profile.headline }}</p>

          <div
            class="flex flex-wrap justify-items-start sm:justify-center gap-2 pt-1"
          >
            <Badge variant="default" class="gap-1">
              <MapPin class="size-3" />
              {{ profile.current_location }}
            </Badge>
            <Badge variant="default" class="gap-1">
              <Briefcase class="size-3" />
              {{ profile.current_job.title }}
            </Badge>
          </div>
        </div>
      </div>

      <Separator class="my-6" />

      <div class="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 max-w-5xl mb-6">
        <div class="flex flex-col gap-3 sm:gap-4 max-w-5xl sm:max-w-xs">
          <div class="rounded-lg border bg-card p-3 sm:p-4 space-y-2 text-sm">
            <p class="text-sm font-medium">{{ t().about }}</p>
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
              class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail class="size-4" />
              {{ profile.contact.email }}
            </a>
          </div>

        </div>
        <div class="prose prose-sm max-w-5xl dark:prose-invert text-justify">
          <p>{{ profile.summary }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
