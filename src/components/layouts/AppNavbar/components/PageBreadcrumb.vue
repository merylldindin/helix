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
    <li
      v-for="(item, index) in displayedBreadcrumbs"
      :key="index"
      class="align-self-center d-flex"
    >
      <span v-if="index < displayedBreadcrumbs.length" class="text-1 mx-4"> / </span>

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
</template>

<style lang="scss" scoped>
li {
  list-style: none;
}

.page-breadcrumbs {
  position: absolute;
  top: 2.5rem;
  left: 34rem;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  display: flex;
  flex-direction: row;

  @include md-down {
    top: 2rem;
    left: 24rem;
  }

  @include sm-down {
    top: 1.6rem;
    left: 19rem;
  }

  @include xs-only {
    top: 1.4rem;
    left: 16.5rem;
  }
}

.breadcrumb-text {
  margin-top: 1.5px;
}

.separator-offset {
  @include sm-down {
    margin-top: -1px;
  }
}
</style>
