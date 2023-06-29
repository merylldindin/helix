<script lang="ts" setup>
import { ComputedRef, computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

import { CustomHeadline } from "@/components/shared";
import { WEBSITE_TITLE_CONTENT } from "@/content";
import { RoutePath } from "@/types";

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
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    path += `/${element}`;

    if (Object.values(RoutePath).includes(`${path}/` as RoutePath)) {
      result.push({ item: `${path}/`, name });
    } else {
      result.push({ name });
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
    <nuxt-link class="text-decoration-none" to="/">
      <CustomHeadline
        :level="1"
        :text="WEBSITE_TITLE_CONTENT.headline"
        typography="headline-4 text-slate-gray text-major-mono-display"
      />
    </nuxt-link>

    <ul v-if="displayedBreadcrumbs.length > 0" class="breadcrumbs-list">
      <li
        v-for="(item, index) in displayedBreadcrumbs"
        :key="index"
        class="align-self-center d-flex"
      >
        <span
          v-if="index < displayedBreadcrumbs.length"
          class="text-1 breadcrumb-separator"
        >
          /
        </span>

        <nuxt-link
          v-if="index < displayedBreadcrumbs.length - 1 || smAndDown"
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
  top: 1.8rem;
  left: 4rem;
  z-index: 2;
  display: flex;
  flex-direction: row;

  @include xs-only {
    top: 1.6rem;
    left: 1.6rem;
  }
}

.breadcrumbs-list {
  z-index: 2;
  display: flex;
  flex-direction: row;
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
