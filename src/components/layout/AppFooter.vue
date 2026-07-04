<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { yearNow } from "@/lib/date";
import dayjs from "dayjs";
import { computed } from "vue";
import GitHubIcon from "../icons/GitHubIcon.vue";

const props = defineProps<{
  version: string;
  updatedAt: number;
}>();

const { t, lang } = useLanguage();
const dateToNow = computed(() =>
  dayjs(props.updatedAt).locale(lang.value).fromNow(),
);
</script>

<template>
  <footer class="border-t py-6 mt-12 no-print">
    <div
      class="max-w-5xl mx-auto px-4 text-center text-xs text-muted-foreground"
    >
      <p>
        &copy; {{ yearNow() }} {{ t().footerText }} v{{ version }} &mdash;
        {{ t().latestUpdate }} {{ dateToNow }} &bullet;
        <a
          href="https://pages.github.com/"
          title="Powered by GitHub Pages"
          class="inline-flex align-middle items-center gap-1"
          target="_blank"
          rel="external nofollow"
        >
          Powered by
          <GitHubIcon :size="14" class="shrink-0" />
          GitHub Pages
        </a>
      </p>
    </div>
  </footer>
</template>
