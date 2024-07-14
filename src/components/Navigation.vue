<template>
  <!-- Desktop Navigation -->
  <nav
    class="hidden lg:flex justify-between text-black absolute xl:bottom-20 xl:left-24 xl:border-0 xl:w-full w-full bottom-16 left-4 rounded-sm"
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
        class="w-full bg-white border-neutral-200 border justify-between mr-8 rounded-sm xl:mr-32 flex shadow-lg"
      >
        <a
          class="my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 p-6 object-center xl:size-24 size-24 text-center flex content-center transition-all"
          href="/about"
        >
          <img
            src="../assets/search-black.svg"
            alt="Art Institute Chicago"
            class="h-5 mx-auto my-auto object-contain rounded-l-sm"
        /></a>
      </div>
    </div>
  </nav>
  <!-- Mobile Navigation -->
  <nav
    class="flex justify-between lg:hidden text-black absolute xl:bottom-20 xl:left-24 xl:border-0 w-full top-8 left-4 rounded-sm"
  >
    <div class="bg-white flex">
      <a href="/">
        <img
          src="../assets/logo.svg"
          alt="Art Institute Chicago"
          class="h-full w-32 object-cover rounded-l-sm"
        />
      </a>
      <div class="w-full justify-between flex border border-neutral-200">
        <a
          class="flex-p-8 my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 px-6 object-center w-full h-full text-center flex content-center transition-all"
          href="/visit"
          ><span class="mx-auto my-auto">Visit</span></a
        >
        <a
          class="flex-p-8 my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 px-6 object-center w-full h-full text-center flex content-center transition-all"
          href="/about"
          ><span class="mx-auto my-auto">About</span></a
        >
      </div>
    </div>
    <div class="flex w-28">
      <div
        class="w-full bg-white border border-l-0 md:border-l border-neutral-200 justify-between mr-8 rounded-sm xl:mr-32 flex"
      >
        <a
          class="my-auto mx-auto font-semibold text-sm lg:text-lg hover:bg-neutral-200 object-center w-full text-center flex content-center transition-all"
          href="/about"
        >
          <img
            src="../assets/search-black.svg"
            alt="Search"
            class="h-4 mx-auto my-auto object-contain rounded-l-sm"
        /></a>
      </div>
    </div>
  </nav>
</template>
