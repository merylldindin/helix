<script lang="ts" setup>
defineProps({
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
    <div v-if="$slots.background" class="custom-section__background">
      <slot name="background" />
    </div>

    <div
      v-if="$slots.default && !hideContainer"
      class="section-wrapper"
      :class="{
        'section-wrapper--offset-y': offsetY,
        'section-wrapper--fullscreen': fullscreen,
      }"
    >
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.custom-section {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;

  &__background {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &--snap {
    scroll-snap-align: start;
  }

  &--fullscreen {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
}

.section-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: $page-max-width;
  margin: 0 auto;
  padding-right: $page-padding;
  padding-left: $page-padding;

  &--fullscreen {
    padding-top: 66px;
    padding-bottom: $page-padding;
  }

  &--offset-y {
    padding-top: 12rem;
    padding-bottom: 8rem;

    @include sm-down {
      padding-top: 8rem;
      padding-bottom: 4rem;
    }
  }
}
</style>
