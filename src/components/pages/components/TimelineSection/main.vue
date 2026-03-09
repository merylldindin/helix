<script lang="ts" setup>
import type { PropType } from "vue";

import { CustomLink, CustomSection } from "@/components/shared";
import type { TimelineContent } from "@/types";

import { TypeWriter } from "./components";

defineProps({
  timeline: {
    required: true,
    type: Array as PropType<TimelineContent[]>,
  },
});
</script>

<template>
  <CustomSection offset-y>
    <div v-for="(item, index) in timeline" :key="index" class="mb-4">
      <CustomLink
        :aria-label="`Read more about Meryll in the article ${item.name}`"
        class="mention-wrapper"
        rel="nofollow noopener noreferrer external"
        target="_blank"
        :to="item.href"
      >
        <TypeWriter class="mention-name" :delay="66 * index" :title="item.name" />

        <div class="mention-separator" />

        <span class="mention-year text-2"> {{ item.year }} </span>
      </CustomLink>
    </div>
  </CustomSection>
</template>

<style lang="scss" scoped>
.mention-wrapper {
  --mention-divider-opacity: 0.25;
  --mention-divider-opacity-hover: 0.5;
}

.mention-name {
  order: 1;

  @include sm-down {
    order: 3;
  }
}

.mention-separator {
  flex-grow: 1;
  display: flex;
  height: 1px;
  background-color: rgb(var(--v-theme-primary));
  opacity: var(--mention-divider-opacity);
  order: 2;
  transition: opacity 0.25s ease;

  @include sm-down {
    display: none;
  }
}

.mention-year {
  min-width: 36px;
  order: 3;

  @include sm-down {
    order: 1;
  }
}

.mention-wrapper {
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 1rem 3rem;
  border-radius: 3vh;
  gap: 1rem;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: rgb(var(--v-theme-primary) / 3%);

    .mention-separator {
      opacity: var(--mention-divider-opacity-hover);
    }
  }

  @include sm-down {
    border-radius: 4px;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
