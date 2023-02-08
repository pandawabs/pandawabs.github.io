<script setup>
import IconLogoWithLoading from "../icons/IconLogoWithLoading.vue"
</script>
<template>
  <header class="sticky-top sticky-md-none py-3 bg-light border-bottom d-print-none">
    <div class="container">
      <div
        class="
          d-flex
          flex-wrap
          justify-content-between
          align-items-center
        "
      >
        <a href="/" class="d-flex text-decoration-none">
          <icon-logo-with-loading/>
        </a>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <div class="dropdown">
              <button
                type="button"
                id="dropdown-language"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="btn btn-primary btn-sm rounded-pill dropdown-toggle px-3"
                style="height: 36px; padding-left: 1rem;"
              >
                {{ cv.language }}
              </button>
              <ul aria-labelledby="dropdown-language" class="dropdown-menu">
                <li v-for="(lang, index) in available_language" :key="index">
                  <a class="dropdown-item" :class="{active:(cv.language == lang)}" role="menu" :href="`?lang=${index}`" @click.prevent="selectLanguage(index)">{{ lang }}</a>
                </li>
              </ul>
            </div>
          </li>
          <li class="list-inline-item">
            <button
              type="button"
              @click="sendEmail(cv.contact.email)"
              class="btn btn-primary btn-sm rounded-circle p-0 mx-auto"
              style="width: 36px; height: 36px;"
              :title="cv.templates.header.email"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              :data-bs-title="cv.templates.header.email"
            >
              <i aria-hidden="true" class="fa fa-envelope fa-fw"></i>
            </button>
          </li>
          <li class="list-inline-item">
            <button
              type="button"
              @click="doPrint()"
              class="btn btn-primary btn-sm rounded-circle p-0 mx-auto"
              style="width: 36px; height: 36px;"
              :title="cv.templates.header.print"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              :data-bs-title="cv.templates.header.print"
            >
              <i aria-hidden="true" class="fa fa-print fa-fw"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  components: { IconLogoWithLoading },
  inject: ['cv', 'available_language'],
  methods: {
    selectLanguage(lang) {
      this.emitter.emit('change_language', lang)
    },
    sendEmail(email) {
      window.location = `mailto:${email}`
    },
    doPrint() {
      window.print()
    }
  }
}
</script>
