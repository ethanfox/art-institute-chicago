<template>
  <div class="masonry-container">
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
import { useRouter } from "vue-router";
export default {
  props: ["artworks"],
  setup() {
    const router = useRouter();

    const navigateToArtDetail = (artworkId) => {
      console.log(artworkId);
      router.push({ name: "ArtDetail", params: { id: artworkId } });
    };

    return { navigateToArtDetail };
  },
  data() {
    return {
      columnCount: 3,
      observer: null,
    };
  },
  mounted() {
    this.updateColumnCount();
    window.addEventListener("resize", this.updateColumnCount);
    this.setupInfiniteScroll();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateColumnCount);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    setupInfiniteScroll() {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.$emit("load-more");
          }
        },
        { rootMargin: "200px" }
      );
      this.$nextTick(() => {
        if (this.$refs.bottom) {
          this.observer.observe(this.$refs.bottom);
        }
      });
    },
    updateColumnCount() {
      if (window.innerWidth >= 1200) {
        this.columnCount = 3;
      } else if (window.innerWidth >= 768) {
        this.columnCount = 2;
      } else {
        this.columnCount = 1;
      }
    },
    getColumnArtworks(columnIndex) {
      return this.artworks.filter(
        (_, index) => index % this.columnCount === columnIndex - 1
      );
    },
  },
  watch: {
    artworks() {
      this.$nextTick(this.setupInfiniteScroll);
    },
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
