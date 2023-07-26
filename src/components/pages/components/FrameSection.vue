<script lang="ts" setup>
import { PropType } from "vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomImage, CustomSection } from "@/components/shared";
import { DeliveredImage } from "@/types";

defineProps({
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  title: {
    required: true,
    type: String,
  },
});

const { smAndDown } = useDisplay();
</script>

<template>
  <CustomSection fullscreen snap>
    <template #background>
      <CustomImage class="image-wrapper custom-shadow" cover :image="image" />
    </template>

    <div class="title-wrapper">
      <CustomHeadline
        class="headline-wrapper custom-shadow"
        :level="2"
        :text="title"
        :typography="`text-foam text-cartesian title-typography ${
          smAndDown ? 'headline-3' : 'headline-2'
        }`"
      />
    </div>
  </CustomSection>
</template>

<style lang="scss" scoped>
.image-wrapper {
  height: calc(100% - 112px);
  max-width: calc(100vw - 64px);
  margin: 80px 32px 32px;
  opacity: 1;

  @include sm-down {
    height: calc(100% - 80px);
    max-width: calc(100% - 32px);
    margin: 64px 16px 16px;
  }
}

.title-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headline-wrapper {
  padding: 2rem 4rem;
  background-color: rgb(0 0 0 / 33%);
  border-radius: 10px;

  @include sm-down {
    padding: 1.5rem 3rem;
    border-radius: 0 10px 10px 0;
  }
}
</style>
