<script setup lang="ts">
import { computed } from 'vue'
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
      <TimelineSection :experiences="data.experience" :education="data.education" />
      <Separator class="max-w-5xl mx-auto" />
      <div class="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 gap-3 sm:gap-4">
        <CertificationsSection class="lg:row-span-2 overflow-y-auto" :licenses="data.licenses_certifications" />
        <div class="lg:col-start-2 lg:row-start-1 flex flex-col gap-4 sm:gap-5">
          <OrganizationsSection  :organizations="data.organizations" />
          <VolunteerSection :volunteer="data.voluntary_works" />
        </div>
      </div>
    </template>
  </main>

  <AppFooter />
</template>
