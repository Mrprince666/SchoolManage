<template>
  <div class="Login_login">
    <div class="Login_container">
      <div class="Login_left">
        <span class="Login_logo"><Logo :width="100" /></span>
        <span class="Login_left_name">东理企业</span>
        <span class="Login_left_context">
          <span class="Login_left_text">专注于应届生</span>
          <span class="Login_left_text">专注于本校生</span>
          <span class="Login_left_text">高质量服务</span>
        </span>
      </div>
      <div class="Login_right">
        <div class="Login_right_tab">
          <span
            class="Login_right_tab_item"
            :class="activeName === 'login' ? 'Login_active' : ''"
            @click="changeTab('login')"
            >登录</span
          >
          <span
            class="Login_right_tab_item"
            :class="activeName === 'register' ? 'Login_active' : ''"
            @click="changeTab('register')"
            >注册</span
          >
        </div>
        <div class="Login_right_form Login_conter" v-if="activeName === 'login'">
          <input
            type="text"
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            class="Login_right_form_input"
          />
          <input
            type="password"
            v-model="loginForm.password"
            placeholder="请输密码"
            class="Login_right_form_input"
          />
        </div>
        <div class="Login_right_form Login_reg" v-else>
          <input
            type="text"
            v-model="register.phone"
            placeholder="请输入手机号"
            class="Login_right_form_input"
          />
          <input
            type="password"
            v-model="register.password"
            placeholder="请输密码"
            class="Login_right_form_input"
          />
          <input
            type="text"
            v-model="register.realName"
            placeholder="请输用户名"
            class="Login_right_form_input"
          />
          <!-- <el-select
            v-model="register.companyId"
            class="Login_right_form__select"
            placeholder="请选择企业"
            id="type"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.fullName"
              :value="item.id"
            />
          </el-select> -->
        </div>
        <button class="Login_right_button" @click="handleButton">
          {{ activeName === "login" ? "登录" : "注册" }}
        </button>
        <div class="Login_right_text" v-if="activeName === 'login'">官网看看</div>
        <div class="Login_right_text" v-else @click="gotoReg">企业注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Logo from "../../common/Logo/WorkLogo.vue";
import "./WorkLogin.scss";
import { register, login } from "../../request/user.js";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { getAllCompany } from "../../request/company";

export default {
  components: {
    Logo,
  },
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const state = reactive({
      activeName: "login",
      loginForm: {
        phone: "",
        password: "",
        type: 1,
      },
      register: {
        phone: "",
        password: "",
        realName: "",
        companyId: "",
      },
      companyList: [],
    });

    onMounted(() => {
      getCompany();
    });

    // 修改tab状态
    const changeTab = (tab) => {
      state.activeName = tab;
    };

    const handleButton = () => {
      state.activeName === "login" ? userLogin() : userRegister();
    };

    const userLogin = async () => {
      if (
        state.loginForm.phone.trim() === "" ||
        state.loginForm.password.trim() === ""
      ) {
        ElMessage.error("信息未填写完整!");
        return;
      }
      const { data: res } = await login(state.loginForm);
      if (res.status === 0) {
        store.commit("user/setToken", res.token);
        store.commit("user/setUserInfo", res.data);
        router.push('/');
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    };

    const userRegister = async () => {
      if (
        state.register.phone.trim() === "" ||
        state.register.password.trim() === "" ||
        state.register.realName.trim() === "" ||
        !state.register.companyId
      ) {
        ElMessage.error("信息未填写完整!");
        return;
      }
      const { data: res } = await register(state.register);
      if (res.status === 0) {
        ElMessage.success(res.message);
        state.loginForm.password = state.register.password;
        state.loginForm.phone = state.register.phone;
        state.register.password = "";
        state.register.phone = "";
        state.register.realName = "";
        state.register.companyId ="";
        state.activeName = "login";
      } else {
        ElMessage.error(res.message);
      }
    };

    const getCompany = async () => {
      const {data : res} = await getAllCompany();
      if(res.status === 0){
        state.companyList = res.data;
      }
    };

    const gotoReg = () => {
      router.push('/userRegister');
    };

    return {
      ...toRefs(state),
      changeTab,
      userRegister,
      userLogin,
      handleButton,
      gotoReg,
    };
  },
};
</script>
