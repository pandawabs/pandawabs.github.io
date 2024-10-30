<script setup>
import { SwiperSlide } from "swiper/vue";
import Timeline from "./timeline/BaseTimeline.vue";
import EducationTimelineItem from "./timeline/EducationTimelineItem.vue";
import WorkExperienceTimelineItem from "./timeline/WorkExperienceTimelineItem.vue";
</script>

<template>
  <timeline>
    <template #timeline-items>
      <swiper-slide v-for="exp in cv.experiences" :key="exp.id">
        <education-timeline-item v-if="exp.type == 'education'" :item="exp"/>
        <work-experience-timeline-item v-else-if="exp.type == 'work'" :item="exp"/>
      </swiper-slide>
    </template>
  </timeline>
</template>

<script>
export default {
  components: { SwiperSlide, Timeline, EducationTimelineItem, WorkExperienceTimelineItem },
  inject: ['cv'],
  provide() {
    return {
      timelineId: "timeline-career-journey",
    }
  }
}
</script>
