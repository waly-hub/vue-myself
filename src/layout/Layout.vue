<template>
  <a-layout id="components-layout-demo-responsive" style="height: 100%">
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
          v-for="route in per_routes"
          :key="route.path"
          :base-path="route.path"
          :item="route"
        ></SidebarItem>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="right-menu" style="padding: 0 20px; float: left">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div class="breadcrumb">
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="right-menu">
          <div @click="logout">Log Out</div>
        </div>
      </a-layout-header>
      <Tabs class="tabs"></Tabs>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', height: '100%' }">
          <AppMain />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="textAlign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script>
import router from "@/router";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Tabs from "@/components/Tabs";
import AppMain from "@/components/AppMain";
import path from "path";
import SidebarItem from "./components/Sidebar/SidebarItem";
export default {
  data() {
    return {
      // routes: "",
      collapsed: false,
    };
  },
  components: {
    Breadcrumb,
    Tabs,
    AppMain,
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
  created() {
    // this.routes = this.$store.state.permission.routes;
    console.log(this.$store.state.permission.routes);
    console.log("-----", path.resolve("/aa", "index"));
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/member/login?redirect=${this.$route.fullPath}`);
    },
    navPage(target) {
      if (target.children) {
        if (target.children[0].meta.title === this.$route.meta.title) return;
        this.$router.push({
          path: target.path,
        });
      } else {
        if (target.meta.title === this.$route.meta.title) return;
        this.$router.push({
          path: target.path,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.breadcrumb {
  float: left;
  margin-left: 8px;
  width: 600px;
  height: 100%;
  margin-top: 20px;
  text-align: left;
}
.right-menu {
  float: right;
  margin-right: 8px;
  height: 100%;
}
.tabs {
  text-align: left;
  /deep/ .ant-tabs-nav-wrap {
    margin-left: 20px;
  }
}
</style>