<script lang="ts" setup>
defineProps({
  dark: {
    default: false,
    type: Boolean,
  },
  fullscreen: {
    default: false,
    type: Boolean,
  },
  hideContainer: {
    default: false,
    type: Boolean,
  },
  offsetY: {
    default: false,
    type: Boolean,
  },
  snap: {
    default: false,
    type: Boolean,
  },
});
</script>

<template>
  <section
    class="custom-section"
    :class="{
      'custom-section--fullscreen': fullscreen,
      'custom-section--offset-y': offsetY,
      'custom-section--snap': snap,
    }"
  >
    <slot name="background" />

    <v-container
      v-if="$slots.default && !hideContainer"
      class="section-wrapper"
      :class="{
        'section-wrapper--offset-y': offsetY,
      }"
    >
      <slot />
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
.custom-section {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;

  &--snap {
    scroll-snap-align: start;
  }

  &--fullscreen {
    width: 100%;
    height: 100vh;
  }
}

.section-wrapper {
  z-index: 2;

  &--offset-y {
    padding-top: 12rem;

    @include sm-down {
      padding-top: 10rem;
    }
  }
}
</style>
