<script setup>
import moment from "moment/min/moment-with-locales";
</script>

<template>
  <section id="section-expertise" class="mt-3 mt-lg-5">
    <div class="container">
      <h4 class="mb-4">📚 {{ cv.templates.sections.learned.title }}</h4>
      <div class="col-12 mb-4"
        v-for="licer in [...cv.licenses_certifications].reverse()"
        :key="licer.id"
      >
        <h5>
          <a
            v-if="licer.credential_url != null"
            :href="licer.credential_url"
            class="text-decoration-none text-reset"
            target="_blank"
            rel="external nofollow"
            :title="cv.templates.sections.learned.title_link"
          >
            {{ licer.name }}
            <i class="fa fa-link fa-xs text-primary" aria-hidden="true"></i>
          </a>
          <span v-else>{{ licer.name }}</span>
        </h5>
        <h6 class="mb-1">{{ licer.organization }}</h6>
        <p class="mb-0">
          <small><em>
            {{ cv.templates.sections.learned.issued }} {{ moment(licer.date_issue).format('MMM YYYY') }} &#183; {{ licer.date_expire ? `${cv.templates.sections.learned.expire} ${moment(licer.date_expire).format('MMM YYYY')}` : cv.templates.sections.learned.no_expire }}
          </em></small>
        </p>
        <small class="mb-0 text-muted"
          v-if="licer.credential_id"
        >{{ cv.templates.sections.learned.credential }} {{ licer.credential_id }}</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ['cv']
}
</script>
