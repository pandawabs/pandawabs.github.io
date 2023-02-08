<script setup>
import SectionHeadline from "../sections/SectionHeadline.vue"
import SectionExpertise from "../sections/SectionExpertise.vue"
import SectionCareerJourney from "../sections/SectionCareerJourney.vue"
import SectionLearned from "../sections/SectionLearned.vue"
import SectionVoluntary from "../sections/SectionVoluntary.vue"
import SectionOrganization from "../sections/SectionOrganization.vue"
import SectionShowcase from "../sections/SectionShowcase.vue"
</script>

<template>
  <main>
    <section-headline/>
    <section-expertise/>
    <section-career-journey/>
    <div>
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col px-0">
            <section-showcase/>
            <section-learned/>
          </div>
          <div class="col px-0">
            <div class="row row-cols-1 row-cols-lg-2">
              <div class="col">
                <section-organization/>
              </div>
              <div class="col">
                <section-voluntary/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {
    SectionHeadline,
    SectionExpertise,
    SectionCareerJourney,
    SectionLearned,
    SectionVoluntary,
    SectionOrganization,
    SectionShowcase
  }
}
</script>
