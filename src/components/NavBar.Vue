<template>
  <nav class="flex text-black absolute bg-white bottom-20 left-24 rounded-sm">
    <a href="/">
      <img
        src="../assets/logo.svg"
        alt="Art Institute Chicago"
        class="h-full w-32 object-cover rounded-l-sm"
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

<script>
export default {
  name: "Navbar",
};
</script>
