<script setup lang="ts">
import { mdiClose, mdiMagnifyMinusOutline, mdiMagnifyPlusOutline } from "@mdi/js";
import type { PropType } from "vue";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

import type { DeliveredImage } from "@/types";
import { ImageDarkModeTreatment } from "@/types";

const cProps = defineProps({
  aspectRatio: {
    default: undefined,
    type: Number,
  },
  cover: {
    default: false,
    type: Boolean,
  },
  followTheme: {
    default: true,
    type: Boolean,
  },
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  useMobileSource: {
    default: true,
    type: Boolean,
  },
  width: {
    default: "100%",
    type: String,
  },
});

const isInvertOnDark = computed(
  () => cProps.image.darkModeTreatment === ImageDarkModeTreatment.INVERT_ON_DARK
);

const { mdAndUp, smAndDown } = useDisplay();

const imageSource = computed(() => {
  if (cProps.useMobileSource && smAndDown.value && cProps.image.mobile) {
    return cProps.image.mobile;
  }

  return cProps.image.source;
});

const imageLazySource = computed(() => {
  if (cProps.useMobileSource && smAndDown.value && cProps.image.lazyMobile) {
    return cProps.image.lazyMobile;
  }

  return cProps.image.lazySource;
});

const imageKey = computed(() => `${imageSource.value}:${imageLazySource.value ?? ""}`);

const imageClasses = computed(() => ({
  "custom-image-follow-theme": cProps.followTheme && !isInvertOnDark.value,
  "custom-image-invert-on-dark": isInvertOnDark.value,
}));

const isZoomEnabled = computed(() => cProps.image.zoomable === true && mdAndUp.value);
const isZoomDialogOpen = ref(false);

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.5;
const zoomLevel = ref(1);

const zoomImageStyle = computed(() => ({
  transform: `scale(${zoomLevel.value})`,
  transformOrigin: "center center",
  transition: "transform 0.15s ease-out",
}));

const canZoomIn = computed(() => zoomLevel.value < ZOOM_MAX);
const canZoomOut = computed(() => zoomLevel.value > ZOOM_MIN);

const openZoomDialog = (): void => {
  zoomLevel.value = 1;
  isZoomDialogOpen.value = true;
};

const closeZoomDialog = (): void => {
  isZoomDialogOpen.value = false;
};

const zoomIn = (): void => {
  zoomLevel.value = Math.min(ZOOM_MAX, zoomLevel.value + ZOOM_STEP);
};

const zoomOut = (): void => {
  zoomLevel.value = Math.max(ZOOM_MIN, zoomLevel.value - ZOOM_STEP);
};
</script>

<template>
  <div
    :aria-label="isZoomEnabled ? 'Open image in zoom view' : undefined"
    class="custom-image-wrapper"
    :class="{ 'custom-image-wrapper--zoomable': isZoomEnabled }"
    :role="isZoomEnabled ? 'button' : undefined"
    :tabindex="isZoomEnabled ? 0 : undefined"
    @click="isZoomEnabled && openZoomDialog()"
    @keydown.enter.prevent="isZoomEnabled && openZoomDialog()"
    @keydown.space.prevent="isZoomEnabled && openZoomDialog()"
  >
    <v-img
      :key="imageKey"
      :alt="image.altText"
      :aspect-ratio="aspectRatio"
      :class="imageClasses"
      :cover="cover"
      :eager="image.eager"
      :lazy-src="imageLazySource"
      :src="imageSource"
      :width="width"
    />

    <v-dialog
      v-if="isZoomEnabled"
      v-model="isZoomDialogOpen"
      :class="imageClasses"
      max-width="95dvw"
      width="95dvw"
    >
      <div class="custom-image-zoom-dialog">
        <div class="custom-image-zoom-toolbar">
          <button
            aria-label="Zoom out"
            class="custom-image-zoom-button"
            :disabled="!canZoomOut"
            type="button"
            @click="zoomOut"
          >
            <v-icon :icon="mdiMagnifyMinusOutline" />
          </button>

          <button
            aria-label="Zoom in"
            class="custom-image-zoom-button"
            :disabled="!canZoomIn"
            type="button"
            @click="zoomIn"
          >
            <v-icon :icon="mdiMagnifyPlusOutline" />
          </button>

          <button
            aria-label="Close zoom view"
            class="custom-image-zoom-button"
            type="button"
            @click="closeZoomDialog"
          >
            <v-icon :icon="mdiClose" />
          </button>
        </div>

        <div class="custom-image-zoom-canvas">
          <img
            :alt="image.altText"
            class="custom-image-zoom-target"
            :src="image.source"
            :style="zoomImageStyle"
          />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.custom-image-wrapper {
  position: relative;

  &--zoomable {
    cursor: zoom-in;

    &:focus-visible {
      outline: 2px solid rgb(var(--v-theme-primary));
      outline-offset: 2px;
    }
  }
}

.custom-image-zoom-dialog {
  display: flex;
  flex-direction: column;
  height: 95dvh;
  background-color: rgb(var(--v-theme-background));
  border: 1px solid rgb(var(--v-theme-on-surface));
}

.custom-image-zoom-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid rgb(var(--v-theme-on-surface));
}

.custom-image-zoom-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: rgb(var(--v-theme-on-surface));
  border: 1px solid rgb(var(--v-theme-on-surface));
  border-radius: 50%;
  cursor: pointer;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid rgb(var(--v-theme-primary));
    outline-offset: 2px;
  }
}

.custom-image-zoom-canvas {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 0;
}

.custom-image-zoom-target {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

:root[data-app-theme="dark"] .custom-image-invert-on-dark .custom-image-zoom-target {
  filter: invert(1);
}

:root[data-app-theme="dark"] .custom-image-follow-theme {
  background-color: rgb(var(--v-theme-background));
}

:root[data-app-theme="dark"]
  .custom-image-follow-theme
  :is(
    img,
    [class~="v-img__img"],
    [class~="v-img__img--preload"],
    [class~="v-img__picture"] img
  ) {
  filter: invert(1) hue-rotate(180deg);
  mix-blend-mode: screen;
}

:root[data-app-theme="dark"]
  .custom-image-invert-on-dark
  :is(
    img,
    [class~="v-img__img"],
    [class~="v-img__img--preload"],
    [class~="v-img__picture"] img
  ) {
  filter: invert(1);
}
</style>
