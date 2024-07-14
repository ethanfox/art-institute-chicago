<template>
  <div class="w-screen h-screen overflow-y-scroll bg-neutral-100">
    <div v-if="loading && artworks.length === 0">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="masonry-container">
      <div v-for="artwork in artworks" :key="artwork.id" class="masonry-item">
        <img
          :src="artwork.image_url"
          :alt="artwork.title"
          v-if="artwork.image_url"
        />
        <h2>{{ artwork.title }}</h2>
        <p>Artist: {{ artwork.artist_title }}</p>
      </div>
    </div>
    <div ref="bottom" class="bottom-detector"></div>
    <div v-if="loading && artworks.length > 0">Loading more...</div>
  </div>
</template>

<style scoped>
.masonry-container {
  column-count: 3; /* Adjust based on your preferred layout */
  column-gap: 3rem;
  width: 100%;
}

@media (max-width: 1200px) {
  .masonry-container {
    column-count: 3;
  }
}

@media (max-width: 1100px) {
  .masonry-container {
    column-count: 2;
  }
}

@media (max-width: 800px) {
  .masonry-container {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  background: white;
  border-radius: 0px;
  padding: 6rem;
  margin-bottom: 3rem;
  display: inline-block;
  width: 100%;
}

@media (max-width: 1600px) {
  .masonry-item {
    padding: 4rem;
  }
}

@media (max-width: 800px) {
  .masonry-item {
    padding: 2rem;
  }
}
.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
}

.masonry-item h2 {
  font-size: 1em;
  margin: 10px 0 5px;
}

.masonry-item p {
  font-size: 0.8em;
  margin: 0;
}

.bottom-detector {
  height: 20px;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      artworks: [],
      loading: false,
      error: null,
      page: 1,
      observer: null,
    };
  },
  mounted() {
    this.fetchArtworks();
    this.setupInfiniteScroll();
  },
  methods: {
    async fetchArtworks() {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks",
          {
            params: {
              limit: 20,
              page: this.page,
              fields: "id,title,image_id,artist_title",
            },
          }
        );
        const newArtworks = response.data.data.map((artwork) => ({
          ...artwork,
          image_url: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
          size: this.getRandomSize(),
        }));
        this.artworks = [...this.artworks, ...newArtworks];
        this.page++;
      } catch (error) {
        this.error = "An error occurred while fetching artworks";
        console.error("Error fetching artworks:", error);
      } finally {
        this.loading = false;
      }
    },
    getRandomSize() {
      const sizes = ["small", "medium", "large"];
      return sizes[Math.floor(Math.random() * sizes.length)];
    },
    setupInfiniteScroll() {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.loading) {
            this.fetchArtworks();
          }
        },
        { rootMargin: "200px" }
      );

      this.$nextTick(() => {
        this.observer.observe(this.$refs.bottom);
      });
    },
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>
