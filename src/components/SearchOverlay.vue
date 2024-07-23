<template>
  <transition name="fade">
    <div v-if="showSearchOverlay" class="search-overlay">
      <div
        class="bg-neutral-950/50 backdrop-blur-md fixed inset-0 flex items-center justify-center z-[9999]"
      >
        <form
          class="flex gap-4 p-2 bg-white rounded-full shadow-lg border border-neutral-100 w-[900px]"
        >
          <div class="flex flex-col w-full pl-8">
            <label for="search" class="text-sm text-neutral-500 font-semibold"
              >Search</label
            >
            <input
              type="text"
              id="search"
              name="search"
              class="p-2 border-0 border-b focus:border-b-2 outline-none border-neutral-500 transition-all h-12"
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
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showSearchOverlay: Boolean,
  },
};
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
