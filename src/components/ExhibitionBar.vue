<template>
  <!-- EXHIBITIONS -->
  <div
    class="flex flex-col gap-0 pt-4 pb-4 px-10 bg-neutral-950/80 rounded-md glass-shadow w-full"
  >
    <p class="text-2xl text-white">Current Exhibitions</p>
    <div></div>
    <Carousel
      :autoplay="3000"
      :wrap-around="true"
      class="p-4"
      v-bind="settings"
      :breakpoints="breakpoints"
    >
      <Slide v-for="exhibition in exhibitions" :key="exhibition.id">
        <div
          class="carousel__item bg-neutral-50/10 mx-2 backdrop-blur-md overflow-hidden glass-shadow rounded-sm"
        >
          <div class="flex gap-4">
            <img
              class="h-36 w-48 rounded-sm glass-shadow object-cover"
              :src="exhibition.image_url"
              :alt="exhibition.title"
              v-if="exhibition.image_url"
            />
            <div class="flex flex-col h-36 py-2 justify-between gap-2">
              <div>
                <h1 class="text-lg text-white line-clamp-2 text-left">
                  {{ exhibition.title }}
                </h1>
                <h1 class="text-lg text-neutral-400 line-clamp-2 text-left">
                  {{ exhibition.gallery_title }}
                </h1>
              </div>

              <h3 class="text-neutral-400 text-left">
                {{ formatDate(exhibition.aic_start_at) }} -
                {{ formatDate(exhibition.aic_end_at) }}
              </h3>
            </div>
          </div>
        </div>
      </Slide>

      <!-- <template #addons>
        <Navigation />
      </template> -->
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
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
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
        itemsToShow: 3,
        snapAlign: "start",
      },
    },
  }),
});
</script>
