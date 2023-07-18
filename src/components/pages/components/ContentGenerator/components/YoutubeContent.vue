<script lang="ts" setup>
import { useDisplay } from "vuetify";

defineProps({
  source: {
    required: true,
    type: String,
  },
});

const { smAndDown } = useDisplay();
</script>

<template>
  <div class="youtube-player" :class="smAndDown ? 'my-6' : 'my-12'">
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      :frameborder="0"
      height="315"
      :src="source"
      title="YouTube video player"
      width="560"
    />
  </div>
</template>

<style lang="scss" scoped>
.youtube-player {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
