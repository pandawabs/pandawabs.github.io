<script setup>
import { computed } from 'vue'
import moment from "moment/min/moment-with-locales";

import LayoutHeader from './components/layouts/LayoutHeader.vue'
import LayoutMain from './components/layouts/LayoutMain.vue'
import LayoutFooter from './components/layouts/LayoutFooter.vue'
import PageNotFound from './components/PageNotFound.vue'
import { cv as CVDocuments } from "./js/cv_loader";
</script>

<template>
  <template v-if="CVDocuments[language]">
    <LayoutHeader />
    <LayoutMain />
    <LayoutFooter />
  </template>
  <template v-else>
    <PageNotFound />
  </template>
</template>

<script>
const urlParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
})

export default {
  data() {
    return {
      language: String
    }
  },
  computed: {
    availableLanguage() {
      let languages = {}

      for (const key in CVDocuments) {
        if (Object.hasOwnProperty.call(CVDocuments, key)) {
          const selectedCv = CVDocuments[key]
          languages[key] = selectedCv.language
        }
      }
      return languages
    }
  },
  provide() {
    return {
      cv: computed(() => CVDocuments[this.language]),
      available_language: this.availableLanguage
    }
  },
  created() {
    this.language = urlParams.lang ?? 'en'
    moment.locale(this.language)
  },
  methods: {
    changeLanguage(lang = "en") {
      this.language = lang
    }
  },
  mounted() {
    this.emitter.on('change_language', (lang) => this.changeLanguage(lang))
  },
  watch: {
    language(newValue) {
      moment.locale(newValue)
    }
  }
}
</script>
