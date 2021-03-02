<template>
  <div>
    <component :is="type" v-bind="linkProps(to)">
      <slot />
    </component>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    to: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    type() {
      if (isExternal(this.to)) {
        return "a";
      }
      return "router-link";
    },
  },
  components: {},
  mounted() {},
  methods: {
    linkProps(path) {
      if (isExternal(path)) {
        return {
          href: path,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to: path,
      };
    },
  },
};
</script>

<style lang='less' scoped></style>
