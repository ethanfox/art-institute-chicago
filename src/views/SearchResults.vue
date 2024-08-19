<template>
  <div
    class="backdrop absolute w-full mt-8 flex gap-8 items-center justify-center z-[10] sm:px-8 px-8 md:px-16 lg:px-32 xl:px-64"
  >
    <button
      alt="Close"
      @click="goBackToHome"
      class="bg-white text-black hover:bg-neutral-200 glass-effect py-4 px-8 flex my-auto rounded-full transition-all p-4"
    >
      <img
        src="../assets/Angle-left.svg"
        alt="Search"
        class="h-full size-6 mx-auto my-auto text-black object-contain rounded-l-sm"
      />
      <span class="my-auto"> Back </span>
    </button>
    <!-- SEARCH -->
    <form
      @submit.prevent="performNewSearch"
      class="flex gap-4 p-2 bg-white rounded-full glass-effect w-full"
    >
      <div class="flex flex-col w-full pl-8">
        <label for="search" class="text-sm text-neutral-950 font-semibold"
          >Search Artworks</label
        >
        <input
          v-model="newSearchQuery"
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
  </div>
  <div class="masonry-container bg-neutral-100 pt-32">
    <div class="masonry-column" v-for="i in columnCount" :key="i">
      <transition-group name="fade-slide-up" tag="div">
        <div
          v-for="artwork in getColumnArtworks(i)"
          :key="artwork.id"
          class="masonry-item hover:shadow-lg transition-all cursor-pointer"
          @click="navigateToArtDetail(artwork.id)"
        >
          <img
            :src="artwork.image_url"
            :alt="artwork.title"
            v-if="artwork.image_url"
          />
          <div class="artwork-info">
            <h2>{{ artwork.title }}</h2>
            <p>Artist: {{ artwork.artist_title }}</p>
          </div>
        </div>
      </transition-group>
    </div>
    <div ref="bottom" class="bottom-detector"></div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const artworks = ref([]);
    const page = ref(1);
    const loading = ref(false);
    const uniqueArtworkIds = new Set();
    const columnCount = ref(3);
    const observer = ref(null);
    const newSearchQuery = ref("");

    const searchQuery = computed(() => route.query.q || "");

    const performSearch = async () => {
      if (loading.value) return;
      loading.value = true;
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks/search",
          {
            params: {
              q: searchQuery.value,
              fields:
                "id,title,artist_title,image_id,date_display,medium_display,style_titles",
              limit: 20,
              page: page.value,
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
        console.error("Error performing search:", error);
      } finally {
        loading.value = false;
      }
    };

    const performNewSearch = () => {
      if (newSearchQuery.value.trim()) {
        router.push({
          name: "SearchResults",
          query: { q: newSearchQuery.value },
        });
      }
    };

    const goBackToHome = () => {
      router.push({ name: "home" }); // Assuming 'Home' is the name of your root route
    };

    const getColumnArtworks = (columnIndex) => {
      return artworks.value.filter(
        (_, index) => index % columnCount.value === columnIndex - 1
      );
    };

    const navigateToArtDetail = (artworkId) => {
      router.push({ name: "ArtDetail", params: { id: artworkId } });
    };

    const setupInfiniteScroll = () => {
      observer.value = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading.value) {
            performSearch();
          }
        },
        { rootMargin: "200px" }
      );
      if (document.querySelector(".bottom-detector")) {
        observer.value.observe(document.querySelector(".bottom-detector"));
      }
    };

    const updateColumnCount = () => {
      if (window.innerWidth >= 1200) {
        columnCount.value = 3;
      } else if (window.innerWidth >= 768) {
        columnCount.value = 2;
      } else {
        columnCount.value = 1;
      }
    };

    onMounted(() => {
      performSearch();
      updateColumnCount();
      window.addEventListener("resize", updateColumnCount);
      setupInfiniteScroll();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateColumnCount);
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    watch(searchQuery, () => {
      artworks.value = [];
      uniqueArtworkIds.clear();
      page.value = 1;
      newSearchQuery.value = searchQuery.value;
      performSearch();
    });
    return {
      artworks,
      columnCount,
      getColumnArtworks,
      navigateToArtDetail,
      newSearchQuery,
      performNewSearch,
      goBackToHome,
    };
  },
};
</script>

<style scoped>
.masonry-container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  padding-left: 2rem;
  padding-right: 2rem;
}

.masonry-column {
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .masonry-column {
    flex-basis: 50%;
  }
}

@media (min-width: 1200px) {
  .masonry-column {
    flex-basis: 33.333%;
  }
}

.masonry-item {
  break-inside: avoid;
  background: white;
  padding-left: 4rem;
  padding-top: 4rem;
  padding-right: 4rem;
  padding-bottom: 1rem;
  border-radius: 0px;
  margin-bottom: 20px;
  overflow: hidden;
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
}

.artwork-info {
  padding: 1rem;
}

.masonry-item h2 {
  font-size: 1em;
  margin: 0 0 5px;
}

.masonry-item p {
  font-size: 0.8em;
  margin: 0;
}

.bottom-detector {
  width: 100%;
  height: 20px;
  clear: both;
}

@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up-move {
  transition: transform 0.5s ease;
}
</style>
