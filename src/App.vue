<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="h-screen w-screen flex relative overflow-hidden">
    <div>
      <RouterView />
    </div>
    <Navbar />
  </div>
</template>
