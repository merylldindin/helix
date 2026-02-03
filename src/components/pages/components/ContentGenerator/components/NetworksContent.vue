<script lang="ts" setup>
import { mdiFacebook, mdiLinkedin, mdiTwitter } from "@mdi/js";
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { CustomLink } from "@/components/shared";
import { DEFAULT_URL } from "@/content";

const cProps = defineProps({
  hasMoreContent: {
    default: false,
    type: Boolean,
  },
  quote: {
    default: "",
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
});

const { smAndDown } = useDisplay();

const buildShareUrl = (base: string, params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  return query ? `${base}?${query}` : base;
};

const articleUrl = computed(() => `${DEFAULT_URL}${cProps.url}`);

const iconSize = computed(() => (smAndDown.value ? "20" : "24"));

const shareOptions = computed(() => [
  {
    ariaLabel: "Share this article via LinkedIn",
    icon: mdiLinkedin,
    url: buildShareUrl("https://www.linkedin.com/sharing/share-offsite/", {
      url: articleUrl.value,
    }),
  },
  {
    ariaLabel: "Share this article via X",
    icon: mdiTwitter,
    url: buildShareUrl("https://x.com/share", {
      text: cProps.quote,
      url: articleUrl.value,
    }),
  },
  {
    ariaLabel: "Share this article via Facebook",
    icon: mdiFacebook,
    url: buildShareUrl("https://www.facebook.com/sharer/sharer.php", {
      u: articleUrl.value,
    }),
  },
]);
</script>

<template>
  <div class="networks-wrapper" :class="{ 'has-more-content': cProps.hasMoreContent }">
    <CustomLink
      v-for="option in shareOptions"
      :key="option.ariaLabel"
      :aria-label="option.ariaLabel"
      class="social-icon align-self-center"
      external
      rel="nofollow noopener noreferrer external"
      size="large"
      target="_blank"
      :to="option.url"
    >
      <v-icon :icon="option.icon" :size="iconSize" />
    </CustomLink>
  </div>
</template>

<style lang="scss" scoped>
.networks-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 48px 0 0;
  padding: 24px 0 0;
  border-top: 1px solid rgb(0 0 0 / 15%);

  &.has-more-content {
    padding-bottom: 24px;
    border-bottom: 1px solid rgb(0 0 0 / 15%);

    @include sm-down {
      padding-bottom: 20px;
    }
  }

  @include sm-down {
    margin: 36px 0 0;
    padding: 20px 0 0;
  }
}

.social-icon {
  color: rgb(var(--v-theme-primary));
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
}
</style>
