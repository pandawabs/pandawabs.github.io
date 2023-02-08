<script setup>
import ProfilePicture from "../ProfilePicture.vue"
import ProfileSummary from "../ProfileSummary.vue"
</script>

<template>
  <section id="section-headline" class="mt-3 mt-lg-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-5 mb-md-0 text-center text-lg-end">
          <profile-picture
            :image-src="cv.profile.profpic_url"
            image-height="280"
            image-width="280"
            image-alt="Profile Picture"
          />
        </div>
        <div class="col-md-6 col-lg-6 align-self-end">
          <profile-summary/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {ProfilePicture, ProfileSummary},
  inject: ['cv']
}
</script>