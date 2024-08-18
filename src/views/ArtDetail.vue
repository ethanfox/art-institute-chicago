<template>
  <div class="artwork-detail" v-if="artwork">
    <h1>{{ artwork.title }}</h1>
    <img
      :src="artwork.image_url"
      :alt="artwork.title"
      v-if="artwork.image_url"
    />
    <p>Artist: {{ artwork.artist_title }}</p>
    <p>Date: {{ artwork.date_start }}</p>
    <p>Origin: {{ artwork.place_of_origin }}</p>
    <p>Artist Display: {{ artwork.artist_display }}</p>
    <p>On Display: {{ artwork.is_on_view }}</p>
    <div v-if="!artwork.on_loan_display">
      <p>Gallery: {{ artwork.gallery_title }}, {{ artwork.gallery_id }}</p>
    </div>
    <div v-else v-html="artwork.on_loan_display"></div>

    <p>Style: {{ artwork.style_title }}</p>
    <p>Classification: {{ artwork.classification_title }}</p>
    <p>Medium: {{ artwork.medium_display }}</p>
    <p>Themes: {{ artwork.theme_titles }}</p>
    <p>Techniques: {{ artwork.technique_titles }}</p>
    <p>Inscription: {{ artwork.inscriptions }}</p>
    <!-- Add more details as needed -->
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      artwork: null,
    };
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
