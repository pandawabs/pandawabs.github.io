<script setup>
import moment from "moment/min/moment-with-locales";
import SectionContact from "../sections/SectionContact.vue"
</script>

<template>
  <section-contact class="d-none d-print-block"/>
  <footer class="py-3 mt-4 border-top d-print-none">
    <div class="container d-flex flex-wrap justify-content-between">
      <div class="col-md-6 d-flex align-items-start flex-column">
        <span><a class="text-muted text-decoration-none" href="#main">© {{ moment().format('YYYY') }} {{ cv.profile.fullname }}</a> · <small><a :href="cv.fork_url" class="text-decoration-none" target="_blank" rel="external nofollow">{{ cv.templates.footer.fork }}</a></small></span>
        <small class="text-muted">v{{ cv.version }} — {{ `${cv.templates.footer.last_update} ` + moment(cv.updated_at).fromNow(false) }} · {{ cv.templates.footer.powered_by }} <a href="https://pages.github.com/" class="text-decoration-none" target="_blank" rel="external nofollow"><i aria-hidden="true" class="fab fa-github"></i> GitHub Pages</a></small>
      </div>
      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex mt-2">
        <li v-for="social_profile in cv.contact.social_profiles" :key="social_profile.id" class="me-3 me-md-0 ms-0 ms-md-3">
          <a
            :href="social_profile.profile_url"
            target="_blank"
            rel="external nofollow"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :data-bs-title="social_profile.label"
          >
            <i aria-hidden="true" class="fab fa-xl" :class="social_profile.icon"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  components: { SectionContact },
  inject: ['cv']
}
</script>