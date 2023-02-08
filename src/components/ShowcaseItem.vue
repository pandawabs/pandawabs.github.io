<template>
  <div class="row justify-content-center mb-4">
    <div v-if="withThumbnail" class="col-3">
      <img class="img-fluid rounded" loading="lazy" :alt="title" :src="imageThumbnail" />
    </div>
    <div :class="withThumbnail ? 'col-9' : 'col-12'">
      <h5 class="mb-0">
        <a v-if="projectUrl != null" :href="projectUrl"
          class="text-decoration-none text-reset" target="_blank" rel="external nofollow" title="Click to see Project">
          {{ title }}
          <i class="fa fa-link fa-xs text-primary" aria-hidden="true"></i>
        </a>
        <template v-else>{{ title }}</template>
      </h5>
      <p class="text-muted" :class="printMode ? 'mb-0' : 'mb-2'">{{ category }}</p>
      <p :class="{'mb-0' : printMode}">{{ description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    category: String,
    description: String,
    projectUrl: String,
    imageThumbnail: String,
    withThumbnail: {
      type: Boolean,
      default: true
    },
    printMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>