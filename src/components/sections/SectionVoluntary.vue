<script setup>
import moment from "moment/min/moment-with-locales";
</script>

<template>
  <section id="section-voluntary" class="mt-3 mt-lg-5">
    <div class="container">
      <h4 class="mb-4">🍀 {{ cv.templates.sections.voluntary.title }}</h4>
      <div class="row">
        <div class="col">
          <div
            class="mb-4"
            v-for="voluntary in [...cv.voluntary_works].reverse()"
            :key="voluntary.id"
          >
            <h5>{{ voluntary.role }}</h5>
            <h6 class="mb-1">{{ voluntary.organization }}</h6>
            <p class="mb-0">
              <small><em>
                {{ moment(voluntary.date_start).format('MMM YYYY') }} - {{ voluntary.currently_volunteering ? cv.templates.commons.present : moment(voluntary.date_end).format('MMM YYYY') }}
              </em></small>
            </p>
            <small class="mb-4 text-muted" v-if="voluntary.cause">{{ voluntary.cause }}</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ['cv']
}
</script>
