<template>
  <section id="section-expertise" class="mt-3 mt-lg-5">
    <div class="container">
      <h4 class="mb-4">{{ cv.templates.sections.contact.title }}</h4>
      <div class="row">
        <div class="col">
          <ul class="list-unstyled">
            <li class="mb-2">
              <a
                :href="`mailto:${cv.contact.email}`"
                title="Email"
                class="text-decoration-none"
              >
                <i aria-hidden="true" class="fa fa-envelope"></i> {{ cv.contact.email }}
              </a>
            </li>
            <li v-for="social_profile in cv.contact.social_profiles" :key="social_profile.id" class="mb-2">
              <a
                :href="social_profile.profile_url"
                target="_blank"
                rel="external nofollow"
                :title="social_profile.label"
                class="text-decoration-none"
              >
                <i aria-hidden="true" class="fab" :class="social_profile.icon"></i> {{ social_profile.profile_url }}
              </a>
            </li>
          </ul>
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