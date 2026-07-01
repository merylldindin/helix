<script setup lang="ts">
import type { PropType } from "vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import type { DeliveredVideo } from "@/types";

const cProps = defineProps({
  useMobileSource: {
    default: true,
    type: Boolean,
  },
  video: {
    required: true,
    type: Object as PropType<DeliveredVideo>,
  },
  width: {
    default: "100%",
    type: String,
  },
});

const { smAndDown } = useDisplay();

const videoSource = computed(() => {
  if (cProps.useMobileSource && smAndDown.value && cProps.video.mobile) {
    return cProps.video.mobile;
  }

  return cProps.video.source;
});

const videoRef = ref<HTMLVideoElement | null>(null);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  const element = videoRef.value;
  if (!element) return;

  element.muted = true;

  if (typeof IntersectionObserver === "undefined") {
    void element.play().catch(() => undefined);
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          void element.play().catch(() => undefined);
        } else {
          element.pause();
        }
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(element);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="custom-video-wrapper" :style="{ width }">
    <video
      :key="videoSource"
      ref="videoRef"
      :aria-label="video.altText"
      autoplay
      class="custom-video"
      loop
      muted
      playsinline
      :poster="video.poster"
      preload="metadata"
    >
      <source :src="videoSource" type="video/mp4" />
    </video>
  </div>
</template>

<style lang="scss" scoped>
.custom-video-wrapper {
  position: relative;
  display: block;
}

.custom-video {
  display: block;
  width: 100%;
  height: auto;
}
</style>
