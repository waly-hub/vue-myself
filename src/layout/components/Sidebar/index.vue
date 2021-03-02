<template>
  <div id="app">
    <div style="width: 256px">
      <a-button
        type="primary"
        @click="toggleCollapsed"
        style="margin-bottom: 16px"
      >
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <a-menu
        :defaultSelectedKeys="['1']"
        :defaultOpenKeys="['2']"
        mode="inline"
        theme="dark"
        :inlineCollapsed="collapsed"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key" />
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { version } from "ant-design-vue";
import Submenu from "./Submenu";
export default {
  name: "App",
  data() {
    return {
      moment,
      version,
      collapsed: false,
      list: [
        {
          key: "1",
          title: "Option 1",
        },
        {
          key: "2",
          title: "Navigation 2",
          children: [
            {
              key: "2.1",
              title: "Navigation 3",
              children: [{ key: "2.1.1", title: "Option 2.1.1" }],
            },
          ],
        },
      ],
    };
  },
  components: {
    Submenu,
  },
  mounted() {},
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>



