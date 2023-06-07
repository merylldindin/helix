<script lang="ts" setup>
import { ComputedRef, computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

const route = useRoute();

interface BreadcrumbSchema {
  name: string;
  item?: string;
}

const breadcrumbs: ComputedRef<BreadcrumbSchema[]> = computed(() => {
  const result = [{ item: "/", name: "Home" }];
  const routePath = route.path.split("/").filter(Boolean);

  let path = "";

  for (let index = 0; index < routePath.length; index += 1) {
    const name = routePath[index].charAt(0).toUpperCase() + routePath[index].slice(1);

    path += `/${routePath[index]}`;

    result.push({ item: `${path}/`, name });
  }

  return result;
});

const { smAndDown, mdAndDown } = useDisplay();

const displayedBreadcrumbs: ComputedRef<BreadcrumbSchema[]> = computed(() => {
  console.log("breadcrumbs", breadcrumbs.value);
  if (smAndDown.value) {
    return breadcrumbs.value.slice(-2, -1).filter((item) => item.name !== "Home");
  }

  if (mdAndDown.value) {
    return breadcrumbs.value.slice(-3).filter((item) => item.name !== "Home");
  }

  return breadcrumbs.value.filter((item) => item.name !== "Home");
});
</script>

<template>
  <ul v-if="displayedBreadcrumbs.length > 0" class="page-breadcrumbs">
    <span class="mr-4"> / </span>

    <li v-for="(item, index) in displayedBreadcrumbs" :key="index">
      <nuxt-link
        v-if="index < displayedBreadcrumbs.length - 1"
        class="text-decoration-none text-1 text-cartesian text-uppercase"
        :to="item.item"
      >
        {{ item.name }}
      </nuxt-link>

      <span v-else class="text-decoration-none text-1 text-cartesian text-uppercase">
        {{ item.name }}
      </span>

      <span v-if="index < displayedBreadcrumbs.length - 1"> / </span>
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

  @include xs-only {
    top: 1.6rem;
    left: 1.6rem;
  }
}
</style>
