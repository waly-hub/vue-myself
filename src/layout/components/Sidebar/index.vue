<template>
  <div>
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <SidebarItem
          v-for="(route, index) in per_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></SidebarItem>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    SidebarItem,
  },
  computed: {
    // ...mapGetters({
    //   routes: "permission_routes",
    // }),
    per_routes: function () {
      return this.$store.state.permission.routes;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang='less' scoped></style>
