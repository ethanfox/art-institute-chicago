<template>
  <nav
    class="flex text-black absolute bg-white xl:bottom-20 xl:left-24 xl:border-0 border-t border-neutral-400 xl:w-auto w-full bottom-0 left-0 rounded-sm"
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
        class="flex-p-8 my-auto mx-auto font-semibold text-lg hover:bg-neutral-200 px-16 object-center w-full h-full text-center flex content-center transition-all"
        href="/visit"
        ><span class="mx-auto my-auto">Visit</span></a
      >
      <a
        class="flex-p-8 my-auto mx-auto font-semibold text-lg hover:bg-neutral-200 px-16 object-center w-full h-full text-center flex content-center transition-all"
        href="/about"
        ><span class="mx-auto my-auto">About</span></a
      >
    </div>
  </nav>
</template>
