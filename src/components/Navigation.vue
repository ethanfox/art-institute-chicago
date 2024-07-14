<template>
  <nav
    class="flex text-black absolute bg-white xl:bottom-20 xl:left-24 xl:border-0 xl:w-auto w-auto bottom-24 left-4 rounded-sm"
  >
    <a href="/">
      <img
        src="../assets/logo.svg"
        alt="Art Institute Chicago"
        class="h-full xl:w-32 w-24 object-cover rounded-l-sm"
      />
    </a>

    <div class="w-full justify-between flex shadow-lg">
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
  </nav>
</template>
