<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useCvData } from '@/composables/useCvData'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LoadingSkeleton from '@/components/ui-custom/LoadingSkeleton.vue'
import ErrorState from '@/components/ui-custom/ErrorState.vue'
import ProfileSection from '@/components/sections/ProfileSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import OrganizationsSection from '@/components/sections/OrganizationsSection.vue'
import VolunteerSection from '@/components/sections/VolunteerSection.vue'
import { Separator } from '@/components/ui/separator'

const { lang } = useLanguage()
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
      <ProfileSection :profile="data.profile" :highlight-skills="data.highlight_skills" />
      <Separator class="max-w-5xl mx-auto" />
      <ExperienceSection :experiences="data.experience" />
      <Separator class="max-w-5xl mx-auto" />
      <EducationSection :education="data.education" />
      <Separator class="max-w-5xl mx-auto" />
      <CertificationsSection :licenses="data.licenses_certifications" />
      <Separator class="max-w-5xl mx-auto" />
      <OrganizationsSection :organizations="data.organizations" />
      <Separator class="max-w-5xl mx-auto" />
      <VolunteerSection :volunteer="data.voluntary_works" />
    </template>
  </main>

  <AppFooter />
</template>
