<script setup>
import moment from "moment/min/moment-with-locales";
</script>

<template>
  <ol class="breadcrumb font-weight-bold mx-0 mt-2 mb-4 p-0">
    <li class="breadcrumb-item">
      <span>{{ gender }}</span
      >
    </li>
    <li class="breadcrumb-item">
      <span
        :data-bs-title="moment(birthDate).format('MMM YYYY')"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
      >🎂 {{ moment(birthDate).fromNow(true) }}</span>
    </li>
    <li class="breadcrumb-item">
      <span>{{ nationality }}</span>
    </li>
    <li class="breadcrumb-item">
      <span
      :data-bs-title="jobDetail"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      >💼 {{ jobStatus }}</span>
    </li>
    <li class="breadcrumb-item">
      <span>{{ cv.templates.sections.headline.hobbies }}: {{ hobbies }}</span>
    </li>
  </ol>
</template>

<script>
export default {
  inject: ['cv'],
  props: {
    birthDate: String,
    gender: String,
    jobDetail: String,
    jobStatus: String,
    nationality: String,
    hobbies: String,
  },
};
</script>
