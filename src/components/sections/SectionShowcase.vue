<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination, Autoplay } from "swiper"
import ShowcaseItem from "../ShowcaseItem.vue"
</script>
<template>
  <section id="section-showcase" class="mt-3 mt-lg-5">
    <div class="container">
      <h4 class="mb-4">⭐️ {{ cv.templates.sections.showcase.title }}</h4>
      <swiper
        autoplay
        class="d-print-none"
        :modules="[ Pagination, Autoplay ]"
        :grab-cursor="true"
        :loop="true"
        :pagination="{ clickable: true }"
        :slides-per-view="1"
        :space-between="0"
      >
        <swiper-slide v-for="showcaseItem in [...cv.showcase].reverse()" :key="showcaseItem.id">
          <showcase-item
            :title="showcaseItem.title"
            :category="showcaseItem.category"
            :description="showcaseItem.description"
            :projectUrl="showcaseItem.project_url"
            :imageThumbnail="showcaseItem.image_thumbnail"
          />
        </swiper-slide>
      </swiper>
      <div class="d-none d-print-block mb-4">
        <showcase-item v-for="showcaseItem in [...cv.showcase].reverse()" :key="showcaseItem.id"
          :title="showcaseItem.title"
          :category="showcaseItem.category"
          :description="showcaseItem.description"
          :projectUrl="showcaseItem.project_url"
          :imageThumbnail="showcaseItem.image_thumbnail"
          :withThumbnail="false"
          :printMode="true"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: { Swiper, SwiperSlide, ShowcaseItem },
  inject: ['cv']
}
</script>