<template>
  <section id="section-expertise" class="mt-3 mt-lg-5">
    <div class="container">
      <h4 class="mb-4">{{ cv.templates.sections.expertise.title }}</h4>
      <div class="row row-cols-1 row-cols-lg-2">
        <div v-for="specialty in cv.expertise" :key="specialty.id" class="col">
          <div class="d-flex flex-column gap-2">
            <div class="d-none d-md-block align-self-start">
              <span class="h1">{{ specialty.icon }}</span>
            </div>
            <div class="mb-2 mb-lg-0">
              <h5 class="mt-1"><span class="d-inline-block d-md-none me-1">{{ specialty.icon }}</span> {{ specialty.name }}</h5>
              <p>{{ specialty.description }}</p>
            </div>
          </div>
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
