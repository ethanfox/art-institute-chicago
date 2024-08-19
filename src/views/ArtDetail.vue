<template>
  <div class="w-screen min-h-screen bg-neutral-100">
    <div
      class="artwork-detail bg-neutral-100 gap-16 flex flex-col p-12"
      v-if="artwork"
    >
      <div class="w-full">
        <button
          alt="Close"
          @click="goBack"
          class="bg-white text-black hover:bg-neutral-200 glass-effect py-4 px-8 flex my-auto rounded-full transition-all p-4"
        >
          <img
            src="../assets/Angle-left.svg"
            alt="Back"
            class="h-full size-6 mx-auto my-auto text-black object-contain rounded-l-sm"
          />
          <span class="my-auto"> Back </span>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div class="col-span-1">
          <img
            class="bg-white p-16 glass-effect"
            :src="artwork.image_url"
            :alt="artwork.title"
            v-if="artwork.image_url"
          />
        </div>

        <div class="flex flex-col gap-4">
          <p class="text-xl font-semibold">
            {{ artwork.is_on_view ? "Currently on Display" : "Not on Display" }}
          </p>
          <h1 class="text-6xl tracking-tight">
            {{ artwork.title }}
          </h1>

          <p class="text-2xl">Artist: {{ artwork.artist_display }}</p>
          <div class="grid grid-cols-3">
            <p class="text-lg">Date: {{ artwork.date_start }}</p>
            <p>Origin: {{ artwork.place_of_origin }}</p>
          </div>

          <div v-if="artwork.is_on_view">
            <p>
              Gallery: {{ artwork.gallery_title }}, {{ artwork.gallery_id }}
            </p>
          </div>
          <div
            v-if="artwork.on_loan_display"
            v-html="artwork.on_loan_display"
          ></div>

          <div v-if="artwork.style_title">
            <p>Style: {{ artwork.style_title }}</p>
          </div>

          <p>Classification: {{ artwork.classification_title }}</p>
          <p>Medium: {{ artwork.medium_display }}</p>
        </div>
      </div>

      <!-- Add more details as needed -->
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      artwork: null,
    };
  },
  setup() {
    const goBack = () => {
      window.history.back();
    };
    return { goBack };
  },
  created() {
    // Fetch artwork details using the ID from the route
    const artworkId = this.$route.params.id;
    this.fetchArtworkDetails(artworkId);
  },
  methods: {
    async fetchArtworkDetails(id) {
      try {
        const response = await axios.get(
          `https://api.artic.edu/api/v1/artworks/${id}`,
          {
            params: {
              fields:
                "id,title,image_id,artist_title,date_start,place_of_origin,artist_display,medium_display,is_on_view,on_loan_display,style_title,classification_title,material_titles,theme_titles,technique_titles,gallery_title,inscriptions,gallery_id",
            },
          }
        );

        const artworkData = response.data.data;
        this.artwork = {
          ...artworkData,
          image_url: `https://www.artic.edu/iiif/2/${artworkData.image_id}/full/843,/0/default.jpg`,
        };
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      }
    },
  },
};
</script>
