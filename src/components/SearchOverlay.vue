<template>
  <transition name="search-fade">
    <div v-if="showSearchOverlay" class="search-overlay">
      <div
        class="bg-neutral-950/50 backdrop fixed inset-0 flex flex-col gap-8 items-center justify-center z-[10] sm:px-8 px-8 md:px-16 lg:px-32 xl:px-64"
      >
        <button
          alt="Close"
          @click="closeButtonClicked"
          class="bg-[#b50938] text-white hover:bg-[#810032] absolute top-4 right-4 size-14 my-auto rounded-full transition-all p-4"
        >
          <img
            src="../assets/close-menu.svg"
            alt="Search"
            class="h-full mx-auto my-auto object-contain rounded-l-sm"
          />
        </button>
        <!-- SEARCH -->
        <form
          @submit.prevent="navigateToSearchResults"
          class="flex gap-4 p-2 bg-white rounded-full glass-shadow border border-neutral-100 w-full"
        >
          <div class="flex flex-col w-full pl-8">
            <label for="search" class="text-sm text-neutral-950 font-semibold"
              >Search Artworks</label
            >
            <input
              v-model="searchQuery"
              placeholder="Search by name, artist, year, medium, or style"
              type="text"
              id="search"
              name="search"
              class="border-0 border-b focus:border-b-2 outline-none border-neutral-500 transition-all h-10"
            />
          </div>
          <button
            alt="Search"
            type="submit"
            class="bg-[#b50938] text-white hover:bg-[#810032] size-14 my-auto rounded-full transition-all p-4"
          >
            <img
              src="../assets/search.svg"
              alt="Search"
              class="h-5 mx-auto my-auto object-contain rounded-l-sm"
            />
          </button>
        </form>
        <!-- EXHIBITIONS -->
        <div class="px-2 w-full">
          <ExhibitionBar :exhibitions="exhibitions" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watchEffect } from "vue";
import axios from "axios";
import ExhibitionBar from "./ExhibitionBar.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useRouter } from "vue-router";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    ExhibitionBar,
  },
  props: {
    showSearchOverlay: Boolean,
  },
  methods: {
    closeButtonClicked() {
      this.$emit("close-button-clicked");
    },
  },

  setup(props) {
    const router = useRouter();
    const exhibitionPage = ref(1);
    const loadingExhibitions = ref(true);
    const exhibitions = ref([]);
    const searchQuery = ref("");
    const fetchExhibitions = async () => {
      loadingExhibitions.value = true;
      try {
        console.log("Fetching exhibitions...");
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

        const response = await axios.get(
          "https://api.artic.edu/api/v1/exhibitions/search",
          {
            params: {
              query: {
                bool: {
                  must: [
                    { range: { aic_start_at: { lte: today } } },
                    { range: { aic_end_at: { gte: today } } },
                  ],
                },
              },
              fields:
                "id,title,image_id,image_url,aic_start_at,aic_end_at,gallery_title",
              limit: 100,
              page: exhibitionPage.value,
            },
          }
        );

        const newExhibitions = response.data.data.map((exhibition) => ({
          ...exhibition,
          // image_url: exhibition.image_id
          //   ? `https://www.artic.edu/iiif/2/${exhibition.image_id}/full/200,/0/default.jpg`
          //   : null,
        }));
        exhibitions.value = newExhibitions;
        exhibitionPage.value++;
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
      } finally {
        console.log("Exhibitions fetched");
        console.log(exhibitions.value);
        setTimeout(() => {
          loadingExhibitions.value = false;
        }, 3000);
      }
    };

    const navigateToSearchResults = () => {
      console.log("searchQuery.value", searchQuery.value);
      if (searchQuery.value.trim()) {
        router.push({ name: "SearchResults", query: { q: searchQuery.value } });
      }
    };

    watchEffect(() => {
      if (props.showSearchOverlay && exhibitions.value.length === 0) {
        fetchExhibitions();
        console.log("exhibitions.value", exhibitions.value);
      }
    });

    return {
      loadingExhibitions,
      exhibitions,
      navigateToSearchResults,
      searchQuery,
    };
  },
};
</script>

<style scoped>
.backdrop {
  transition:
    backdrop-filter 0.5s ease,
    opacity 0.5s ease;
  backdrop-filter: blur(8px);
}
.search-overlay {
  position: fixed;
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.5s ease;
}

.search-fade-enter-from .backdrop,
.search-fade-leave-to .backdrop {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.search-fade-enter-to .backdrop,
.search-fade-leave-from .backdrop {
  opacity: 1;
  backdrop-filter: blur(8px);
}

/* .search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.5s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}  */
</style>
