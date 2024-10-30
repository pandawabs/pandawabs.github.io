<script setup>
import moment from "moment/min/moment-with-locales";
</script>

<template>
  <div class="timeline__line"></div>
  <div class="timeline__dot"></div>
  <div class="d-flex flex-column my-4 p-1">
    <small class="timeline__label mb-3">
      💼 {{ moment(item.date_start).format("MMM YYYY") }} -
      <span v-if="item.currently_working">{{ cv.templates.commons.present }}</span>
      <span v-else>{{ moment(item.date_end).format("MMM YYYY") }}</span>
    </small>
    <h5>{{ item.title }}</h5>
    <h6 v-if="item.company">{{ item.company }}</h6>
    <small class="text-muted">{{ item.location }}</small>
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
