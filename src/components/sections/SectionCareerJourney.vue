<script setup>
import moment from "moment/min/moment-with-locales";
import CareerJourneyTimeline from "../CareerJourneyTimeline.vue";
</script>

<template>
  <section id="section-career-journey" class="mt-3 mt-lg-5 overflow-hidden">
    <div class="container">
      <h4 class="mb-4 d-block d-print-none">{{ cv.templates.sections.experience.title }}</h4>
      <div class="row d-none d-print-flex">
        <div class="col-12">
          <h4 class="mb-4">💼 {{ cv.templates.sections.experience.title_print_work }}</h4>
          <div class="mb-4" v-for="exp in workExperiences(cv.experiences)" :key="exp.id">
            <small class="text-primary mb-3">
              {{ moment(exp.date_start).format("MMM YYYY") }} -
              <span v-if="exp.currently_working">{{ cv.templates.commons.present }}</span>
              <span v-else>{{ moment(exp.date_end).format("MMM YYYY") }}</span>
            </small>
            <h5>{{ exp.title }}</h5>
            <h6 v-if="exp.company">
              {{ exp.company }} <small v-if="exp.location" class="text-muted">{{ `${cv.templates.commons.at} ${exp.location}`}}</small>
            </h6>
            <p class="mb-2" v-if="exp.job_description">
              {{ exp.job_description }}
            </p>
            <p v-if="exp.skills">
              <strong>{{ cv.templates.sections.experience.work_skills }}:</strong> {{ exp.skills.join(' · ') }}
            </p>
          </div>
        </div>
        <div class="col-12">
          <h4 class="mb-4">🎓 {{ cv.templates.sections.experience.title_print_education }}</h4>
          <div class="mb-4" v-for="exp in educationExperiences(cv.experiences)" :key="exp.id">
            <small class="text-orange mb-3">
              {{ moment(exp.date_start).format("MMM YYYY") }} -
              <span v-if="exp.currently_studying">{{ cv.templates.commons.present }}</span>
              <span v-else>{{ moment(exp.date_end).format("MMM YYYY") }}</span>
            </small>
            <h5>{{ exp.school }} <small class="text-muted fw-normal">| {{ exp.degree }}<span v-if="exp.grade">, {{ exp.grade }}</span></small></h5>
            <small class="text-muted" v-if="exp.activity_society.length > 0">
              {{ cv.templates.sections.experience.education_activities }}: {{ exp.activity_society.join(', ') }}
            </small>
          </div>
        </div>
      </div>
    </div>
    <career-journey-timeline class="d-block d-print-none" />
  </section>
</template>

<script>
export default {
  components: { CareerJourneyTimeline },
  inject: ['cv'],
  methods: {
    educationExperiences(experiences) {
      return experiences.filter((exp) => exp.type == 'education').reverse()
    },
    workExperiences(experiences) {
      return experiences.filter((exp) => exp.type == 'work').reverse()
    },
  }
}
</script>
