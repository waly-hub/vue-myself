<template>
  <a-row
    type="flex"
    align="middle"
    justify="center"
    style="height: 100%"
  >
    <a-col :span="8">
      <a-form
        layout="vertical"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
          >
            Log in
          </a-button>
          <a-button @click="getInfo">Get Info</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>

</template>

<script>
import request from "@/utils/request.js";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "test" }),
      redirect: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const { query } = route;
        console.log(query);
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    // featUserSignIn(data) {
    //   return request({
    //     url: `/recommend/user/sign_in`,
    //     method: "POST",
    //     data,
    //   });
    // },
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("user/login", values).then(() => {
            console.log("登录完啦，跳到别的页面");
            this.$router.push(
              {
                path: this.redirect || "/",
              },
              // 路由第一次从登陆页面跳转到首页会报错，暂时不知道是什么问题
              // 写一个空的回调可以处理
              () => {}
            );
            // location.reload();
          });
        }
      });
    },
    getInfo() {
      this.$store.dispatch("user/getInfo").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>