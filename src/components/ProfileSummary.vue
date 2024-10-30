<script setup>
import ProfileInlineBio from "./ProfileInlineBio.vue"
</script>

<template>
  <label class="text-muted">{{ cv.profile.job.title }}</label>
  <h1 class="display-5">{{ cv.profile.fullname }}</h1>
  <profile-inline-bio
    :birth-date="cv.profile.birth.date"
    :gender="cv.profile.gender"
    :job-detail="cv.profile.job.detail"
    :job-status="cv.profile.job.status"
    :nationality="cv.profile.nationality"
    :hobbies="cv.profile.hobbies"
  />
  <p>{{ cv.profile.summary }}</p>
</template>

<script>
export default {
  components: { ProfileInlineBio },
  inject:['cv']
}
</script>
