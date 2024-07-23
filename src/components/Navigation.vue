<template>
  <!-- Desktop Navigation -->
  <nav
    class="hidden z-20 lg:flex justify-between text-black fixed xl:bottom-20 xl:left-24 xl:border-0 xl:w-full w-full bottom-16 left-4 rounded-sm"
  >
    <div class="bg-white flex shadow-lg">
      <a href="/">
        <img
          src="../assets/logo.svg"
          alt="Art Institute Chicago"
          class="h-full xl:w-32 w-32 object-cover rounded-l-sm"
        />
      </a>
      <div class="w-full justify-between flex border border-neutral-200">
        <a
          class="flex-p-8 my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 px-6 lg:px-16 object-center w-full h-full text-center flex content-center transition-all"
          href="/visit"
          ><span class="mx-auto my-auto">Visit</span></a
        >
        <a
          class="flex-p-8 my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 px-6 lg:px-16 object-center w-full h-full text-center flex content-center transition-all"
          href="/about"
          ><span class="mx-auto my-auto">About</span></a
        >
      </div>
    </div>
    <div class="flex">
      <div
        class="w-full bg-white border-neutral-200 hover:bg-neutral-200 transition-all border justify-between mr-8 rounded-sm xl:mr-32 flex shadow-lg"
      >
        <button
          @click="buttonClicked"
          class="my-auto mx-auto font-semibold text-sm lg:text-lg p-6 object-center xl:size-24 size-24 text-center flex content-center"
          href="/about"
        >
          <img
            src="../assets/search-black.svg"
            alt="Art Institute Chicago"
            class="h-5 mx-auto my-auto object-contain rounded-l-sm"
          />
        </button>
      </div>
    </div>
  </nav>
  <!-- Mobile Navigation -->
  <nav
    class="flex z-10 justify-between lg:hidden text-black absolute w-full top-4 px-4 rounded-sm"
  >
    <div class="bg-white flex w-full shadow-lg">
      <a href="/">
        <img
          src="../assets/logo.svg"
          alt="Art Institute Chicago"
          class="h-full w-32 object-cover rounded-l-sm"
        />
      </a>
      <div
        class="w-full justify-between flex border border-neutral-200 hover:bg-neutral-200 transition-all"
      >
        <a
          class="flex-p-8 my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 px-6 object-center w-full h-full text-center flex content-center transition-all"
          href="https://www.artic.edu/visit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="mx-auto my-auto">Visit</span>
        </a>
        <a
          class="flex-p-8 my-auto mx-auto font-semibold text-sm lg:text-lg px-4 object-center w-full h-full text-center flex content-center"
          href="/about"
          ><span class="mx-auto my-auto">About</span></a
        >
      </div>

      <button
        @click="buttonClicked"
        class="my-auto mx-auto font-semibold border-l-0 border border-neutral-200 h-full text-sm lg:text-lg object-center rounded-r-sm w-32 text-center flex content-center"
        href="/about"
      >
        <img
          src="../assets/search-black.svg"
          alt="Search"
          class="h-4 mx-auto my-auto object-contain rounded-l-sm"
        />
      </button>
    </div>
    <!-- <div class="flex w-24 mr-8">
      
    </div> -->
  </nav>
</template>

<script>
export default {
  methods: {
    buttonClicked() {
      this.$emit("navigation-button-clicked");
    },
  },
};
</script>
