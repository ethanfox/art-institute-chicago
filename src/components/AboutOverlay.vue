<template>
  <transition name="about-fade">
    <div v-if="showAboutOverlay" class="search-overlay">
      <div
        class="bg-neutral-950/50 backdrop fixed inset-0 flex flex-col gap-8 items-center justify-center z-[10] px-2 md:px-16 lg:px-32 xl:px-64 2xl:px-96"
      >
        <!-- SEARCH -->
        <div
          class="flex flex-col gap-20 px-4 py-8 lg:p-8 bg-white mt-32 lg:mt-0 rounded-sm glass-shadow border border-neutral-100 w-full"
        >
          <div class="flex flex-col w-full px-2 md:px-8 gap-8">
            <div class="flex w-full justify-between">
              <h1 class="text-6xl tracking-tight text-neutral-950">About</h1>
              <button
                alt="Close"
                @click="closeButtonClicked"
                class="bg-[#b50938] text-white hover:bg-[#810032] size-14 my-auto rounded-full transition-all p-4"
              >
                <img
                  src="../assets/close-menu.svg"
                  alt="Search"
                  class="h-full mx-auto my-auto object-contain rounded-l-sm"
                />
              </button>
            </div>

            <p class="text-lg text-neutral-950">
              This page was created by
              <span class="font-semibold"> Ethan Fox </span> . This site was
              developed using Vue.js and styled with Tailwind CSS. Leveraging
              the Art Institute of Chicago's public API, this online gallery
              features the entire collection of works and displays the museum's
              current exhibitions. This project is hosted on GitHub Pages.
            </p>
          </div>
          <div class="flex flex-col gap-4 w-full px-2 md:px-8">
            <p class="text-lg text-left font-semibold text-neutral-950">
              To learn more about me:
            </p>
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="flex gap-1">
                <img
                  src="../assets/user.svg"
                  alt="Search"
                  class="size-8 mx-auto my-auto object-contain rounded-l-sm"
                />
                <a
                  href="https://www.ethanjamesfox.com"
                  target="_blank"
                  class="text-lg w-full text-[#b50938] my-auto hover:underline"
                  >Visit my website</a
                >
              </div>
              <div class="flex gap-1">
                <img
                  src="../assets/github.svg"
                  alt="Search"
                  class="h-8 mx-auto my-auto object-contain rounded-l-sm"
                />
                <a
                  href="https://github.com/ethanfox"
                  target="_blank"
                  class="text-lg w-full text-[#b50938] my-auto hover:underline"
                  >View Github Profile</a
                >
              </div>
              <div class="flex gap-1">
                <img
                  src="../assets/linkedin.svg"
                  alt="Search"
                  class="h-8 mx-auto my-auto object-contain rounded-l-sm"
                />
                <a
                  href="https://www.linkedin.com/in/ethanjamesfox/"
                  target="_blank"
                  class="text-lg w-full text-[#b50938] my-auto hover:underline"
                  >Connect on LinkedIn</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  components: {},
  methods: {
    closeButtonClicked() {
      this.$emit("close-button-clicked");
    },
  },
  props: {
    showAboutOverlay: Boolean,
  },
  setup(props) {
    return {};
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

.about-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.5s ease;
}

.about-fade-enter-from .backdrop,
.search-fade-leave-to .backdrop {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.about-fade-enter-to .backdrop,
.about-fade-leave-from .backdrop {
  opacity: 1;
  backdrop-filter: blur(8px);
}
</style>
