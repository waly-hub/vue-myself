<template>
  <div>
    <a-tabs
      @change="changePage"
      :active-key="activePage"
      :hide-add="true"
      type="editable-card"
      @edit="editPage"
    >
      <!-- <a-tab-pane v-for="(item,index) in pageList" :key="item.id" :tab="item"></a-tab-pane> -->
      <a-tab-pane
        :id="page.fullPath"
        :key="page.fullPath"
        v-for="page in pageList"
      >
        <span slot="tab">{{ page.meta.title }}</span>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const indexKey = "/dashboard/index";
export default {
  name: "",
  data() {
    return {
      pageList: [],
      linkList: [],
      activePage: "",
    };
  },
  created() {
    if (this.$route.fullPath !== indexKey) {
      this.pageList.push({
        name: "Dashboard",
        fullPath: "/dashboard/index",
        meta: {
          icon: "dashboard",
          title: "Dashboard",
        },
        path: "/dashboard/index",
      });
      this.linkList.push(indexKey);
    }
    this.pageList.push(this.$route);
    this.linkList.push(this.$route.fullPath);
    this.activePage = this.$route.fullPath;

    console.log(this.$route);
  },
  watch: {
    $route: function (newRoute) {
      this.activePage = newRoute.fullPath;
      if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.pageList.push(Object.assign({}, newRoute));
        this.linkList.push(newRoute.fullPath);
      }
      // else if (this.linkList.indexOf(newRoute.fullPath) >= 0) {

      // }
    },
    // activePage: function (key) {
    //   console.log("xxx");
    //   let index = this.linkList.lastIndexOf(key);
    //   let waitRouter = this.pageList[index];
    //   this.$router.push(Object.assign({}, waitRouter));
    //   // this.changeTitle(waitRouter.meta.title)
    // },
  },
  components: {},
  mounted() {},
  methods: {
    changePage(key) {
      this.activePage = key;
      let index = this.linkList.lastIndexOf(key);
      let waitRouter = this.pageList[index];
      this.$router.push(Object.assign({}, waitRouter));
      // this.changeTitle(waitRouter.meta.title)
    },
    remove(key) {
      if (key === indexKey) {
        this.$message.warning("首页标签不能关闭");
        return;
      }
      let index = this.linkList.indexOf(key);
      console.log(index);
      this.pageList.splice(index, 1);
      this.linkList.splice(index, 1);
      if (this.activePage === key) {
        this.activePage = this.linkList[index - 1];
        this.$router.push(Object.assign({}, this.pageList[index - 1]));
      }
    },
    editPage(key, action) {
      console.log(action, key);
      this[action](key);
    },
  },
};
</script>

<style lang='less' scoped>
</style>
