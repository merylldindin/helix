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

    <v-container
      v-if="$slots.default && !hideContainer"
      class="section-wrapper"
      :class="{
        'section-wrapper--offset-y': offsetY,
        'section-wrapper--fullscreen': fullscreen,
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

  &--fullscreen {
    padding-top: 66px;
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
