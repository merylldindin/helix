<script lang="ts" setup>
import { PropType } from "vue";

import { CustomLink, CustomSection } from "@/components/shared";

defineProps({
  timeline: {
    required: true,
    type: Array as PropType<{ href: string; name: string; year: number }[]>,
  },
});
</script>

<template>
  <CustomSection offset-y>
    <div v-for="(item, index) in timeline" :key="index" class="mb-4">
      <CustomLink
        :aria-label="`Read more about Meryll in the article ${item.name}`"
        class="mention-wrapper"
        external
        rel="nofollow noopener noreferrer external"
        target="_blank"
        :to="item.href"
      >
        <span class="mention-name text-2 text-ellipsis"> {{ item.name }} </span>

        <div class="mention-separator" />

        <span class="mention-year text-2"> {{ item.year }} </span>
      </CustomLink>
    </div>
  </CustomSection>
</template>

<style lang="scss" scoped>
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
  background-color: rgb(0 0 0 / 25%);
  order: 2;

  @include sm-down {
    display: none;
  }
}

.mention-year {
  min-width: 28px;
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

  &:hover {
    background-color: rgb(0 0 0 / 3%);

    .mention-separator {
      background-color: rgb(0 0 0 / 50%);
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
