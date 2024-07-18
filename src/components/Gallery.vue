<template>
  <div class="masonry-container p-8 relative">
    <div v-for="artwork in artworks" :key="artwork.id" class="masonry-item">
      <img
        :src="artwork.image_url"
        :alt="artwork.title"
        v-if="artwork.image_url"
      />
      <h2>{{ artwork.title }}</h2>
      <p>Artist: {{ artwork.artist_title }}</p>
    </div>

    <div ref="bottom" class="bottom-detector"></div>
  </div>
</template>

<script>
export default {
  props: ["artworks"],
  mounted() {
    this.setupInfiniteScroll();
  },
  methods: {
    setupInfiniteScroll() {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.$emit("load-more");
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(this.$refs.bottom);
    },
  },
};
</script>
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
    animation: fadeSlideUp 1.5s forwards;
    animation-delay: 6s;
  }
}

@media (max-width: 800px) {
  .masonry-item {
    padding: 2rem;
    animation: fadeSlideUp 1.5s forwards;
    animation-delay: 0s;
    opacity: 0; /* Ensure initial state is set correctly */
  }
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
