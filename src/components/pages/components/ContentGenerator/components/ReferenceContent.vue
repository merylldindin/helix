<script lang="ts" setup>
import type { PropType } from "vue";
import { useDisplay } from "vuetify";

import { CustomLink } from "@/components/shared";
import type { ReferenceItem } from "@/types";

defineProps({
  reference: {
    required: true,
    type: Object as PropType<ReferenceItem>,
  },
});

const { smAndDown } = useDisplay();
</script>

<template>
  <CustomLink
    class="d-flex flex-column"
    external
    rel="noopener noreferrer nofollow external"
    target="_blank"
    :to="reference.href"
  >
    <div class="reference-wrapper">
      <div
        class="reference-container"
        :class="{ 'mb-3': smAndDown && reference.detail }"
      >
        <p class="reference-text text-1 text-ellipsis">
          {{ reference.text }}
        </p>

        <div v-if="reference.detail" class="reference-separator" />

        <span v-if="reference.detail" class="reference-detail text-2">
          <span v-if="smAndDown">—</span> {{ reference.detail }}
        </span>
      </div>

      <p
        v-if="reference.description"
        class="text-2 text-blue-grey-darken-2 mt-n1"
        :class="smAndDown ? 'mb-3' : 'mb-1'"
      >
        {{ reference.description }}
      </p>
    </div>
  </CustomLink>
</template>

<style lang="scss" scoped>
.reference-text {
  order: 1;

  @include sm-down {
    order: 1;
  }
}

.reference-separator {
  flex-grow: 1;
  display: flex;
  height: 1px;
  background-color: rgb(0 0 0 / 25%);
  order: 2;

  @include sm-down {
    display: none;
  }
}

.reference-detail {
  min-width: 32px;
  order: 3;

  @include sm-down {
    order: 1;
  }
}

.reference-container {
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @include sm-down {
    flex-direction: column;
    align-items: flex-start;
  }
}

.reference-wrapper {
  width: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
  border-radius: 3vh;
  gap: 1rem;

  &:hover {
    background-color: rgb(0 0 0 / 3%);

    .reference-separator {
      background-color: rgb(0 0 0 / 50%);
    }
  }

  @include sm-down {
    border-radius: 4px;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
