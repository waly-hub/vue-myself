<template>
  <div>
    <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed">
      <template v-for="item in per_routes">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="item.children && item.children.length === 1"
            :key="item.key"
          >
            <a-icon type="pie-chart" />
            <span>{{ item.children[0].meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key" />
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
    };
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
  },
};
</script>



