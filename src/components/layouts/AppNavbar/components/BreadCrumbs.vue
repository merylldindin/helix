<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { CustomHeadline } from "@/components/shared";
import { WEBSITE_TITLE_CONTENT } from "@/content";
import { RoutePath } from "@/types";

import { useRoute } from "#imports";

const route = useRoute();

interface BreadcrumbSchema {
  name: string;
  item?: string;
}

const { smAndDown, mdAndDown } = useDisplay();

const breadcrumbs: ComputedRef<BreadcrumbSchema[]> = computed(() => {
  const result: BreadcrumbSchema[] = [];
  const routePath = route.path.split("/").filter(Boolean);

  let path = "";

  for (const element of routePath) {
    const words = element.split("-");

    const name = words
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    path += `/${element}`;

    const validRoute = Object.values(RoutePath).includes(`${path}/` as RoutePath);

    if (validRoute) {
      result.push({ item: `${path}/`, name });
    } else {
      result.push({ name });
    }
  }

  if (routePath.length > 1 && result.length > 1) {
    const pathSuffix = routePath.at(-1);
    const previousItem = result.at(-2);

    if (previousItem && previousItem.item) {
      previousItem.item = `${previousItem.item}#${pathSuffix}`;
    }
  }

  return result;
});

const displayedBreadcrumbs: ComputedRef<BreadcrumbSchema[]> = computed(() => {
  if (smAndDown.value) {
    return breadcrumbs.value.slice(-2, -1);
  }

  if (mdAndDown.value) {
    return breadcrumbs.value.slice(-3);
  }

  return breadcrumbs.value;
});
</script>

<template>
  <div class="breadcrumbs-container">
    <nuxt-link class="text-decoration-none website-title-link" to="/">
      <CustomHeadline
        class="website-title"
        :level="1"
        :text="WEBSITE_TITLE_CONTENT.headline"
        typography="headline-4 text-major-mono-display"
      />
    </nuxt-link>

    <ul v-if="displayedBreadcrumbs.length > 0" class="breadcrumbs-list">
      <li
        v-for="(item, index) in displayedBreadcrumbs"
        :key="index"
        class="align-self-center d-flex"
      >
        <span class="text-1 breadcrumb-separator">/</span>

        <nuxt-link
          v-if="(index < displayedBreadcrumbs.length - 1 || smAndDown) && item.item"
          class="breadcrumb-text text-decoration-none text-1 text-cartesian text-uppercase"
          :to="item.item"
        >
          {{ item.name }}
        </nuxt-link>

        <span
          v-else
          class="breadcrumb-text text-decoration-none text-1 text-cartesian text-uppercase"
        >
          {{ item.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
li {
  list-style: none;
}

.breadcrumbs-container {
  position: absolute;
  transition: all 0.3s ease-in-out;
  align-items: center;
  top: 50%;
  left: 4rem;
  z-index: 2;
  display: flex;
  flex-direction: row;
  transform: translateY(-50%);

  @include xs-only {
    left: 1.6rem;
  }
}

.breadcrumbs-list {
  z-index: 2;
  display: flex;
  flex-direction: row;
}

.website-title-link {
  color: rgb(var(--v-theme-primary));
  transition: color 0.35s ease;
}

.website-title {
  :deep(h1) {
    color: rgb(var(--v-theme-primary)) !important;
    transition: color 0.35s ease;
  }
}

.breadcrumb-text {
  margin-top: 3px;
  align-self: center;

  @include xs-only {
    margin-top: 2px;
    font-size: 14px !important;
  }
}

.breadcrumb-separator {
  align-self: center;
  margin: 0 2rem;

  @include md-down {
    margin: 0 1.5rem;
  }

  @include xs-only {
    margin: 0 1rem;
  }
}
</style>
