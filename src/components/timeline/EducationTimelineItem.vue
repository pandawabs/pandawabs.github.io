<script setup>
import moment from "moment/min/moment-with-locales";
</script>

<template>
  <div class="timeline__line timeline__line--orange"></div>
  <div class="timeline__dot timeline__dot--orange"></div>
  <div class="d-flex flex-column my-4 p-1">
    <small class="timeline__label--orange mb-3">
      🎓 {{ moment(item.date_start).format('YYYY') }} -
      <span v-if="item.currently_studying">{{ cv.templates.commons.present }}</span>
      <span v-else>{{ moment(item.date_end).format('YYYY') }}</span>
    </small>
    <h5>{{ item.school }}</h5>
    <h6>{{ item.degree }}<span v-if="item.grade">, {{ item.grade }}</span></h6>
    <small class="text-muted" v-if="item.activity_society.length > 0">{{ cv.templates.sections.experience.education_activities }}: {{ item.activity_society.join(', ') }}</small>
  </div>
</template>

<script>
export default {
  inject: ['cv'],
  props: {
    item: Object
  }
}
</script>
