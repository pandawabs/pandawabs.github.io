<script setup>
import { Swiper } from "swiper/vue"
</script>
<template>
  <swiper
    class="overflow-visible"
    :id="timelineId"
    :auto-height="true"
    :grab-cursor="true"
    :slides-per-view="1.5"
    :slides-offset-before="10"
    :space-between="0"
    :breakpoints="{
      576: {
        slidesPerView: 2,
        slidesOffsetBefore: 28
      },
      768: {
        slidesPerView: 3,
        slidesOffsetBefore: 32
      },
      992: {
        slidesPerView: 3.5,
        slidesOffsetBefore: 26
      },
      1200: {
        slidesPerView: 3.75,
        slidesOffsetBefore: 40
      },
      1400: {
        slidesPerView: 4,
        slidesOffsetBefore: 50
      },
      1512: {
        slidesPerView: 4.5,
        slidesOffsetBefore: 106
      },
      1650: {
        slidesPerView: 5,
        slidesOffsetBefore: 170
      },
      1900: {
        slidesPerView: 5.75,
        slidesOffsetBefore: 300
      },
      2500: {
        slidesPerView: 7.5,
        slidesOffsetBefore: 600
      }
    }"
  >
    <slot name="timeline-items"></slot>
    <template v-slot:container-start>
      <div class="timeline__line timeline__line--backline"></div>
    </template>
  </swiper>
</template>
<script>
export default {
  components: { Swiper },
  inject: {
    timelineId: {
      from: 'timelineId',
      default: `timeline-${Date.now()}`
    }
  }
}
</script>
