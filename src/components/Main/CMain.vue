<template>
  <div class="CMain">
    <header class="CMain_header">
      <CHeader />
    </header>
    <main class="CMain_main">
      <div class="CMain_left">
        <MainMenu />
      </div>
      <div class="CMain_content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import CHeader from './CHeader/CHeader.vue';
import "./CMain.scss";
import MainMenu from "./MainMenu/MainMenu.vue";

export default {
  components: {
    MainMenu,
    CHeader
  },
  setup () {

    return {}
  }
}
</script>
