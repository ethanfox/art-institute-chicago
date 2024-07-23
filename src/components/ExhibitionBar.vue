<template>
  <!-- EXHIBITIONS -->
  <div
    class="flex flex-col gap-4 pt-2 pb-4 px-10 bg-white rounded-full glass-shadow border border-neutral-100 w-full"
  >
    <p class="text-sm text-neutral-950 font-semibold">Current Exhibitions</p>
    <Carousel class="p-0" v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="exhibition in exhibitions" :key="exhibition.id">
        <div
          class="carousel__item bg-white overflow-hidden border glass-shadow rounded-full"
        >
          <div class="flex gap-4">
            <img
              class="size-12 rounded-full glass-shadow"
              :src="exhibition.image_url"
              :alt="exhibition.title"
              v-if="exhibition.image_url"
            />
            <h1 class="font-bold text-sm line-clamp-2 text-left">
              {{ exhibition.title }}
            </h1>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
  <!-- EXHIBITIONS -->
</template>
<script>
import { defineComponent } from "vue";
// import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default defineComponent({
  props: ["exhibitions"],
  name: "Breakpoints",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: "center",
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    },
  }),
});
</script>
