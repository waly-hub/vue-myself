<template>
  <div>
    <template v-for="item of per_routes">
      <template v-if="item.children && item.children.length === 1">
        <a-menu-item
          :key="item.path"
          style="text-align: left"
          @click="navPage(item)"
          v-if="!item.hidden"
        >
          <a-icon
            :type="item.children[0].meta.icon ? item.children[0].meta.icon : ''"
          />
          <span class="nav-text">{{ item.children[0].meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <a-sub-menu
          :key="item.path"
          style="text-align: left"
          v-if="!item.hidden"
        >
          <span slot="title">
            <a-icon :type="item.meta.icon ? item.meta.icon : ''" />
            <span>{{ item.meta.title }}</span>
          </span>
          <template v-for="child of item.children">
            <a-menu-item
              :key="child.path"
              style="text-align: left"
              @click="navPage(child)"
            >
              {{ child.meta.title }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {},
};
</script>

<style lang='less' scoped></style>
