<script setup lang="ts">
import ThemeToggle from "@/components/ui-custom/ThemeToggle.vue";
import LanguageSwitcher from "@/components/ui-custom/LanguageSwitcher.vue";
import { useLanguage } from "@/composables/useLanguage";
import { useAnalytics } from "@/composables/useAnalytics";
import { useTheme } from '@/composables/useTheme'
import { Download } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const { lang, t } = useLanguage();
const { theme } = useTheme()
const { trackEvent } = useAnalytics()

const pdfFiles: Record<string, string> = {
  en: '/Pandawa Bagus Sudewa Resume - 2026.pdf',
  id: '/Pandawa Bagus Sudewa Resume (Bahasa Indonesia) - 2026.pdf',
}

function onDownloadClick() {
  trackEvent('download_resume', { language: lang.value })
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur no-print"
  >
    <div class="max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
      <a href="/" class="text-decoration-none">
        <svg
          id="head-logo"
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          width="100%"
          viewBox="4.60787 69.4754 287.8 71.06"
        >
          <path
            stroke="currentColor"
            stroke-width="2.71493125"
            fill="none"
            d="m7.3228 129.8524c4.7059 3.2624 9.4117 5.8824 14.1177 5.1317 9.4119-1.5015 18.8234-16.4857 28.2353-14.1177 9.412 2.3681 18.8236 22.0885 28.2353 14.1177 5.2946-4.4841 10.5884-17.7312 15.294-27.0682 4.7056-9.3369 8.8231-15.8473 12.9412-15.2848 3.6783.5024 7.3561 6.6477 11.0337 14.1176 5.7337 11.646 11.467 26.5121 17.2016 28.2353 8.9813 2.6989 17.961-26.8401 26.9421-28.2353v0c.431-.0669.8622-.0694 1.2932 0v0h-0c9.4124 1.5148 18.8233 37.1233 28.2353 28.2353 4.0267-3.8025 8.0522-15.7507 12.0774-28.2353C208.315 90.046 213.7 72.3813 219.2522 72.1918c5.5522-.1895 11.0458 17.5621 16.5399 34.5569 3.8431 11.8881 7.6865 23.4063 11.5308 28.2353 9.4119 11.8224 18.8234-16.4515 28.2353-28.2353 4.7056-5.8915 9.4118-7.6608 14.1176-5.3082"
          />
        </svg>
      </a>
      <div class="flex items-center gap-3">
        <LanguageSwitcher />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                class="rounded-full"
                variant="outline"
                size="icon"
                as-child
              >
                <a :href="pdfFiles[lang]" download @click="onDownloadClick">
                  <Download class="size-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ t().downloadResume }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
