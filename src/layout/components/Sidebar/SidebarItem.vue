<template>
  <div>
    <div v-if="!item.hidden">
      <!-- 
        !onlyOneChild.children  判断是否有子路由
        onlyOneChild.noShowingChildren  如果没有子路由的情况，onlyOneChild.noShowingChildren被赋值为true
       -->
      <template
        v-if="
          hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
        "
      >
        <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
          <a-menu-item :key="item.path">
            <Item
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="onlyOneChild.meta.title"
            >
            </Item>
          </a-menu-item>
        </AppLink>
      </template>
      <a-sub-menu v-else :key="props.item.path">
        <template slot="title">
          <Item
            :icon="props.item.meta && props.item.meta.icon"
            :title="props.item.meta && props.item.meta.title"
          />
        </template>

        <SidebarItem
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        ></SidebarItem>
      </a-sub-menu>
    </div>
  </div>
</template>

<script>
import AppLink from "./Link";
import Item from "./Item";
import { isExternal } from "@/utils/validate";
import path from "path";
export default {
  name: "SidebarItem",
  data() {
    return {
      onlyOneChild: null,
    };
  },
  props: {
    item: {
      type: Object,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  components: {
    AppLink,
    Item,
  },
  mounted() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
      // 只有一条子路由
      if (showingChildren.length === 1) {
        return true;
      }
      // 如果如有中没有子路由，则展示该路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(routePath, this.basePath);
    },
  },
};
</script>

<style lang='less' scoped></style>
