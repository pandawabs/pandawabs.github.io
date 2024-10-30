<template>
  <img
    class="img-thumbnail rounded-circle"
    loading="lazy"
    :alt="imageAlt"
    :src="imageSrc"
    :height="imageHeight"
    :width="imageWidth"
  />
</template>

<script>
export default {
  props: {
    imageSrc: String,
    imageHeight: String,
    imageWidth: String,
    imageAlt: String
  }
}
</script>
