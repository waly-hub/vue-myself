<template>
  <div>
    <h1>Permission page</h1>
    <div>{{ message }}</div>
    <button @click="changeMessage">点击</button>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      message: "first message",
    };
  },
  components: {},
  mounted() {},
  methods: {
    changeMessage() {
      this.message = "second message";
    },
  },
};
</script>

<style lang='less' scoped></style>
