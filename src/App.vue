<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { useCvData } from '@/composables/useCvData'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LoadingSkeleton from '@/components/ui-custom/LoadingSkeleton.vue'
import ErrorState from '@/components/ui-custom/ErrorState.vue'
import ProfileSection from '@/components/sections/ProfileSection.vue'
import TimelineSection from '@/components/sections/TimelineSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import OrganizationsSection from '@/components/sections/OrganizationsSection.vue'
import VolunteerSection from '@/components/sections/VolunteerSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Award, Users, Heart } from '@lucide/vue'

const { t, lang } = useLanguage()
const { data, status, error, refetch } = useCvData(lang)
</script>

<template>
  <AppHeader />

  <main class="min-h-[80vh]">
    <LoadingSkeleton v-if="status === 'loading' && !data" />

    <ErrorState
      v-else-if="status === 'error'"
      :message="error ?? undefined"
      @retry="refetch"
    />

    <template v-else-if="data">
      <ProfileSection :profile="data.profile" />
      <Separator class="max-w-5xl mx-auto" />
      <TimelineSection :experiences="data.experience" :education="data.education" />
      <Separator class="max-w-5xl mx-auto" />
      <SkillsSection :highlight-skills="data.highlight_skills" />

      <section class="max-w-5xl mx-auto px-4 py-8">
        <Accordion type="single" collapsible class="border rounded-lg">
          <AccordionItem value="certifications" class="border-b px-4">
            <AccordionTrigger>
              <div class="flex items-center gap-2 text-lg font-semibold">
                <Award class="size-5 shrink-0 text-primary" />
                <span>{{ t().certifications }}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent class="pb-4">
              <CertificationsSection :licenses="data.licenses_certifications" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="organizations" class="border-b px-4">
            <AccordionTrigger>
              <div class="flex items-center gap-2 text-lg font-semibold">
                <Users class="size-5 shrink-0 text-primary" />
                <span>{{ t().organizations }}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent class="pb-4">
              <OrganizationsSection :organizations="data.organizations" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="volunteer" class="px-4">
            <AccordionTrigger>
              <div class="flex items-center gap-2 text-lg font-semibold">
                <Heart class="size-5 shrink-0 text-primary" />
                <span>{{ t().volunteer }}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent class="pb-4">
              <VolunteerSection :volunteer="data.voluntary_works" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </template>
  </main>

  <AppFooter :version="data?.version ?? ''" :updated-at="data?.updated_at ?? 0" :social-profiles="data?.profile.contact.social_profiles" />
</template>
