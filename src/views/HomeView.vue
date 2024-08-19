<template>
  <div class="w-screen h-svh overflow-y-scroll bg-neutral-100">
    <transition mode="out-in" name="fade">
      <div
        v-if="isFirstVisit"
        key="loading"
        class="w-screen h-screen gap-2 flex bg-[#b50938]"
      >
        <div class="flex flex-col md:flex-row gap-2 mx-auto my-auto">
          <h1 class="xl:text-8xl text-3xl flex-none text-white my-auto mx-auto">
            Art Institute Chicago
          </h1>

          <div class="flex">
            <div
              class="custom-counter text-6xl md:text-8xl xl:text-[14rem] italic pr-3 text-white tracking-tighter overflow-hidden my-auto mx-auto flex font-display"
            >
              {{ formattedNumber }}
              <h1
                class="text-6xl md:text-8xl xl:text-[14rem] text-white italic tracking-tighter my-auto mx-auto font-display"
              >
                %
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div v-else key="loaded" class="relative">
        <Navigation
          @navigation-button-clicked="
            (showSearchOverlay = !showSearchOverlay), (showAboutOverlay = false)
          "
          @about-button-clicked="
            (showAboutOverlay = !showAboutOverlay), (showSearchOverlay = false)
          "
        />

        <Gallery :artworks="artworks" @load-more="loadMoreArtworks" />
        <SearchOverlay
          :showSearchOverlay="showSearchOverlay"
          @close-button-clicked="showSearchOverlay = !showSearchOverlay"
        />
        <AboutOverlay
          @close-button-clicked="showAboutOverlay = !showAboutOverlay"
          :showAboutOverlay="showAboutOverlay"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import AboutOverlay from "../components/AboutOverlay.vue";
import Navigation from "../components/Navigation.vue";
import SearchOverlay from "../components/SearchOverlay.vue";
import Gallery from "../components/Gallery.vue";
import axios from "axios";
import { ref, onMounted, computed } from "vue";

export default {
  components: { Navigation, Gallery, SearchOverlay, AboutOverlay },
  data() {
    return {
      showSearchOverlay: false,
      showAboutOverlay: false,
    };
  },
  setup() {
    let number = ref(1);
    const loading = ref(true);
    const artworks = ref([]);
    const page = ref(1);
    const uniqueArtworkIds = new Set();

    const formattedNumber = computed(() => {
      if (number.value >= 100) {
        return number.value.toString();
      } else {
        return number.value.toString().padStart(2, " ");
      }
    });

    const animateNumber = (target, duration) => {
      const start = number.value;
      const range = target - start;
      const startTime = performance.now();

      const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          number.value = Math.round(start + (range * elapsedTime) / duration);
          requestAnimationFrame(updateNumber);
        } else {
          number.value = target;
        }
      };

      requestAnimationFrame(updateNumber);
    };

    onMounted(() => {
      const isFirstVisit = !localStorage.getItem("hasVisited");

      if (isFirstVisit) {
        console.log("First visit");
        setTimeout(() => {
          animateNumber(90, 2000);
        }, 100);

        setTimeout(() => {
          animateNumber(100, 1000);
        }, 2100);

        setTimeout(() => {
          localStorage.setItem("hasVisited", "true");
          fetchArtworks();
        }, 3000);
      } else {
        fetchArtworks();
      }
    });

    const fetchArtworks = async () => {
      loading.value = true;
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks",
          {
            params: {
              limit: 20,
              page: page.value,
              fields: "id,title,image_id,artist_title",
            },
          }
        );

        const newArtworks = response.data.data
          .filter(
            (artwork) => !uniqueArtworkIds.has(artwork.id) && artwork.image_id
          )
          .map((artwork) => {
            uniqueArtworkIds.add(artwork.id);
            return {
              ...artwork,
              image_url: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
            };
          });

        artworks.value = newArtworks;
        page.value++;
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setTimeout(() => {
          loading.value = false;
        }, 3000);
      }
    };

    const loadMoreArtworks = async () => {
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks",
          {
            params: {
              limit: 20,
              page: page.value,
              fields: "id,title,image_id,artist_title",
            },
          }
        );

        const newArtworks = response.data.data
          .filter(
            (artwork) => !uniqueArtworkIds.has(artwork.id) && artwork.image_id
          )
          .map((artwork) => {
            uniqueArtworkIds.add(artwork.id);
            return {
              ...artwork,
              image_url: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
            };
          });

        artworks.value = [...artworks.value, ...newArtworks];
        page.value++;
      } catch (error) {
        console.error("Error loading more artworks:", error);
      }
    };

    onMounted(fetchArtworks);

    return {
      loading,
      artworks,
      formattedNumber,
      loadMoreArtworks,
    };
  },
};
</script>
<style scoped>
/* ************************ */
/* ************************ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ******************************* */
/* GALLERY TRANSITION */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  transition-delay: 2s;
  opacity: 0;
  transform: translateY(30px);
}
/* GALLERY TRANSITION */
/* ******************************* */
/* .custom-counter {
  width: 24rem;
  text-align: right;
} */
</style>
