<script lang="ts" setup>
import { CustomSection, LegalFooter } from "@/components";
</script>

<template>
  <div>
    <v-main>
      <CustomSection>
        <slot />
      </CustomSection>
    </v-main>

    <LegalFooter />
  </div>
</template>
