<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      style="text-align: left"
      :selectedKeys="activeMenu"
      :open-keys="openKeys"
      @openChange="onOpenChange"
    >
      <template v-for="item in per_routes">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="item.children && item.children.length === 1"
            :key="item.path"
            @click="navTo(item.children[0].path)"
          >
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
            <span>{{ item.children[0].meta.title }}</span>
          </a-menu-item>
          <SubMenu v-else :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./Submenu";
export default {
  name: "",
  data() {
    return {
      collapsed: false,
      openKeys: [],
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      const arr = [];
      arr.push(path);
      return arr;
    },
  },
  props: {
    per_routes: {
      type: Array,
    },
  },
  components: {
    SubMenu,
  },
  mounted() {
    console.log(this.per_routes);
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    navTo(path) {
      console.log(path);
      console.log(this.$route);
      if (this.$route.path === path) return;
      this.$router.push({
        path,
      });
    },
    onOpenChange(openKeys) {
      console.log("openKeys", openKeys);
      const latestOpenKey = openKeys.find((key) => {
        console.log("key", key);
        this.openKeys.indexOf(key) === -1;
      });
      console.log("latestOpenKey", latestOpenKey);
      // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      //   this.openKeys = openKeys;
      // } else {
      //   this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      // }
    },
  },
};
</script>



