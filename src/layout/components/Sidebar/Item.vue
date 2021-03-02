<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context;
    const vnodes = [];
    icon ? vnodes.push(<a-icon type={icon} />) : "";
    title ? vnodes.push(<span slot="title">{title}</span>) : "";
    return vnodes;
  },
};
</script>

<style lang='less' scoped></style>
