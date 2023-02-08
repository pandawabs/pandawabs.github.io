<script setup>
import moment from "moment/min/moment-with-locales";
</script>

<template>
  <section id="section-organization" class="mt-3 mt-lg-5">
    <div class="container">
      <h4 class="mb-4">🎯 {{ cv.templates.sections.organization.title }}</h4>
      <div
        class="col-12 mb-4"
        v-for="organization in [...cv.organizations].reverse()"
        :key="organization.id"
      >
        <h5>{{ organization.name }}</h5>
        <p class="mb-0">{{ organization.position }}</p>
        <small class="mb-0">
          <em>{{ moment(organization.date_start).format('MMM YYYY') }} - {{ organization.membership_ongoing ? cv.templates.commons.present : moment(organization.date_end).format('MMM YYYY') }}</em>
        </small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ['cv']
}
</script>
