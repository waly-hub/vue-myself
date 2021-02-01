<template>
  <a-layout
    id="components-layout-demo-responsive"
    style="height: 100%"
  >
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
      <a-menu
        theme="dark"
        mode="inline"
      >
        <template v-for="item of per_routes">
          <template v-if="item.children && item.children.length === 1">
            <a-menu-item
              :key="item.path"
              style="text-align: left;"
              @click="navPage(item)"
              v-if="!item.hidden"
            >
              <a-icon :type="item.children[0].meta.icon ? item.children[0].meta.icon : ''" />
              <span class="nav-text">{{item.children[0].meta.title}}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu
              :key="item.path"
              style="text-align: left;"
              v-if="!item.hidden"
            >
              <span slot="title">
                <a-icon :type="item.meta.icon ? item.meta.icon : ''" />
                <span>{{item.meta.title}}</span>
              </span>
              <template v-for="child of item.children">
                <a-menu-item
                  :key="child.path"
                  style="text-align: left;"
                  @click="navPage(child)"
                >
                  {{child.meta.title}}
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <div
          class="right-menu"
          style="padding: 0 20px;float:left;"
        >
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
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', height: '100%' }">
          <router-view></router-view>
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
export default {
  data() {
    return {
      // routes: "",
      collapsed: false,
    };
  },
  components: {
    Breadcrumb,
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
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    async logout() {
      console.log(this.$route);
      await this.$store.dispatch("user/logout");
      this.$router.push(`/member/login?redirect=${this.$route.fullPath}`);
    },
    navPage(target) {
      console.log(this.$route);
      console.log(target);
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
</style>