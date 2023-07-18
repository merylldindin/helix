<script lang="ts" setup>
import { ComputedRef, computed } from "vue";
import { useDisplay } from "vuetify";

import FacebookIcon from "@/assets/animations/facebook-icon.json";
import LinkedinIcon from "@/assets/animations/linkedin-icon.json";
import TwitterIcon from "@/assets/animations/twitter-icon.json";
import { CustomLink } from "@/components/shared";
import { DEFAULT_URL } from "@/content";

const cProps = defineProps({
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

const encodeAsUrlParameters = (object: {
  [key: string]: string | number | undefined | null;
}) => {
  const parameters = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return parameters.length > 0 ? `?${parameters.join("&")}` : "";
};

const articleUrl: ComputedRef<string> = computed(() => {
  return `${DEFAULT_URL}${cProps.url}`;
});

const twitterUrl: ComputedRef<string> = computed(() => {
  return `https://twitter.com/share${encodeAsUrlParameters({
    text: cProps.quote,
    url: articleUrl.value,
  })}`;
});

const facebookUrl: ComputedRef<string> = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php${encodeAsUrlParameters({
    u: articleUrl.value,
  })}`;
});

const linkedinUrl: ComputedRef<string> = computed(() => {
  return `https://www.linkedin.com/sharing/share-offsite/${encodeAsUrlParameters({
    url: articleUrl.value,
  })}`;
});

const optionUrls: ComputedRef<
  { animation: unknown; arialabel: string; url: string; width: number }[]
> = computed(() => {
  return [
    {
      animation: LinkedinIcon,
      arialabel: "Share this article via LinkedIn",
      url: linkedinUrl.value,
      width: 36,
    },
    {
      animation: TwitterIcon,
      arialabel: "Share this article via Twitter",
      url: twitterUrl.value,
      width: 40,
    },
    {
      animation: FacebookIcon,
      arialabel: "Share this article via Facebook",
      url: facebookUrl.value,
      width: 56,
    },
  ];
});
</script>

<template>
  <div class="networks-wrapper">
    <CustomLink
      v-for="(option, index) in optionUrls"
      :key="index"
      :aria-label="option.arialabel"
      class="align-self-center ml-4"
      :color="$COLOR.DEL_RIO"
      external
      :prompt="undefined"
      rel="nofollow noopener noreferrer external"
      size="large"
      target="_blank"
      :to="option.url"
    >
      <client-only>
        <Vue3Lottie
          :animation-data="option.animation"
          :width="`${smAndDown ? 0.75 * option.width : option.width}px`"
        />
      </client-only>
    </CustomLink>
  </div>
</template>

<style lang="scss" scoped>
.networks-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin: 60px 0;
  border-radius: 16px;
  background-color: rgb(0 0 0 / 3%);

  @include sm-down {
    margin: 48px 0;
  }
}
</style>
