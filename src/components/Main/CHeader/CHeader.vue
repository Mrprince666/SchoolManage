<template>
  <div class="CHeader">
    <div class="CHeader_logo">
      <WorkLogo width="50"/>
      <span class="CHeader_logo_name">东理企业</span>
    </div>
    <div class="CHeader_content">
      <div class="CHeader_left">
        <span class="CHeader_left_router">{{message}}</span>
      </div>
      <div class="CHeader_right">
        <button class="CHeader_right_logout" @click="logout">退出</button>
        <img @click="gotoMyInfo" class="CHeader_right_img" :src="userInfo.pic" alt="头像">
      </div>
    </div>
  </div>
</template>

<script>
import './CHeader.scss';
import WorkLogo from '@/common/Logo/WorkLogo.vue';
import { useStore } from "vuex";
import { reactive, toRefs, watch } from "vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    WorkLogo
  },
  setup () {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      userInfo: store.state.user.userInfo,
      message: store.state.user.router,
    });

    watch(
      () => store.state.user.router,
      (message) => {
        state.message = message;
      },
      { immediate: true }
    );

    watch(
      () => store.state.user.userInfo,
      (val) => {
        state.userInfo = val;
      },
      { immediate: true }
    );

    const gotoMyInfo = () => {
      router.push('/userInfo');
    };

    const logout = () => {
      router.push('/login');
      store.commit('user/deleteUserInfo');
    };

    return {
      ...toRefs(state),
      gotoMyInfo,
      logout
    }
  }
}
</script>
