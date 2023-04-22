<template>
  <div class="MainMenu">
    <el-menu
        active-text-color="#009241"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        router
      >
      <el-menu-item index="/companyInfo">
          <el-icon><setting /></el-icon>
          <span>企业信息</span>
        </el-menu-item>
        <el-menu-item index="/ChatRoom">
          <el-icon><setting /></el-icon>
          <span>沟通</span>
        </el-menu-item>
        <el-menu-item index="/position">
          <el-icon><setting /></el-icon>
          <span>职位管理</span>
        </el-menu-item>
        <el-menu-item index="/positionDelivery">
          <el-icon><setting /></el-icon>
          <span>投简情况</span>
        </el-menu-item>
        <el-menu-item index="/activityManage">
          <el-icon><setting /></el-icon>
          <span>活动管理</span>
        </el-menu-item>
        <el-menu-item index="/commentManage">
          <el-icon><setting /></el-icon>
          <span>评论管理</span>
        </el-menu-item>
        <el-menu-item index="/userInfo">
          <el-icon><setting /></el-icon>
          <span>我的质料</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
import './MainMenu.scss';

export default {
  setup () {
    

    return {}
  }
}
</script>
