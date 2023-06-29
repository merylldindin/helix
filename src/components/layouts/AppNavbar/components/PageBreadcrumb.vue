<script lang="ts" setup>
import { ComputedRef, computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

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
  <ul v-if="displayedBreadcrumbs.length > 0" class="page-breadcrumbs">
    <span class="mr-4 text-1 separator-offset"> / </span>

    <li
      v-for="(item, index) in displayedBreadcrumbs"
      :key="index"
      class="align-self-center"
    >
      <nuxt-link
        v-if="index < displayedBreadcrumbs.length - 1 || smAndDown"
        class="text-decoration-none text-1 text-cartesian text-uppercase"
        :to="item.item"
      >
        {{ item.name }}
      </nuxt-link>

      <span v-else class="text-decoration-none text-1 text-cartesian text-uppercase">
        {{ item.name }}
      </span>

      <span v-if="index < displayedBreadcrumbs.length - 1" class="text-1 ml-2 mr-4">
        /
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
li {
  list-style: none;
}

.page-breadcrumbs {
  position: absolute;
  top: 2.7rem;
  left: 35rem;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  display: flex;
  flex-direction: row;

  @include md-down {
    top: 2.1rem;
    left: 25.5rem;
  }

  @include sm-down {
    top: 1.6rem;
    left: 20rem;
  }

  @include xs-only {
    top: 1.55rem;
    left: 18rem;
  }
}

.separator-offset {
  @include sm-down {
    margin-top: -1px;
  }
}
</style>
