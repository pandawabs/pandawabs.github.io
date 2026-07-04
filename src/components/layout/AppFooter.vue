<script setup lang="ts">
import type { SocialProfile } from "@/types/cv";
import { useLanguage } from "@/composables/useLanguage";
import { yearNow } from "@/lib/date";
import dayjs from "dayjs";
import { computed, type Component } from "vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import MediumIcon from "@/components/icons/MediumIcon.vue";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon.vue";

const props = defineProps<{
  version: string;
  updatedAt: number;
  socialProfiles?: SocialProfile[];
}>();

const { t, lang } = useLanguage();
const dateToNow = computed(() =>
  dayjs(props.updatedAt).locale(lang.value).fromNow(),
);

const socialIconMap: Record<string, Component> = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  GitHub: GitHubIcon,
  Medium: MediumIcon,
  WhatsApp: WhatsAppIcon,
};
</script>

<template>
  <footer class="border-t py-6 mt-12 no-print">
    <div
      class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <div class="text-xs text-muted-foreground text-center sm:text-left">
        <p>
          &copy; {{ yearNow() }} {{ t().footerText }} v{{ version }} &mdash;
          {{ t().latestUpdate }} {{ dateToNow }} &bullet;
          <a
            href="https://pages.github.com/"
            title="Powered by GitHub Pages"
            class="inline-flex align-middle items-center gap-1 text-primary hover:text-accent transition-colors"
            target="_blank"
            rel="external nofollow"
          >
            Powered by
            <GitHubIcon :size="14" class="shrink-0" />
            GitHub Pages
          </a>
        </p>
      </div>
      <div v-if="socialProfiles?.length" class="flex items-center gap-2">
        <a
          v-for="sp in socialProfiles"
          :key="sp.id"
          :href="sp.profile_url"
          :title="sp.label"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-accent transition-colors"
        >
          <component
            :is="socialIconMap[sp.label]"
            :size="22"
            class="shrink-0"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
