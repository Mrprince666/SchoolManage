<template>
  <div class="UserR">
    <div class="UserR_logo">
      <Logo :width="80" />
    </div>
    <div class="UserR_container">
      <div class="UserR_content">
        <ul class="UserR_list">
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="phone">用户电话</label>
            <input v-model="register.phone" class="UserR_list_item_input" type="text" id="phone">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="password">用户密码</label>
            <input v-model="register.password" class="UserR_list_item_input" type="password" id="password">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="realName">用户姓名</label>
            <input v-model="register.realName" class="UserR_list_item_input" type="text" id="realName">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="shortName">企业简称</label>
            <input v-model="register.shortName" class="UserR_list_item_input" type="text" id="shortName">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="fullName">企业全名</label>
            <input v-model="register.fullName" class="UserR_list_item_input" type="text" id="fullName">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="societyNumber">统一社会信用代码</label>
            <input v-model="register.societyNumber" class="UserR_list_item_input" type="text" id="societyNumber">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="employeeNum">企业员工数</label>
            <input v-model="register.employeeNum" class="UserR_list_item_input" type="text" id="employeeNum">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="boss">企业法人</label>
            <input v-model="register.boss" class="UserR_list_item_input" type="text" id="boss">
          </li>
          <li class="UserR_list_item">
            <label class="UserR_list_item_label" for="type">企业类型</label>
            <input v-model="register.type" class="UserR_list_item_input" type="text" id="type">
          </li>
        </ul>
      </div>
      <div class="UserR_foot">
        <button class="UserR_foot_reg" @click="changeVisible">注册</button>
        <button class="UserR_foot_goback" @click="goback">返回</button>
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="提醒" width="30%" center>
        <div class="UserR_center">
           确定注册？ 
        </div>
        <template #footer>
          <span class="dialog-footer">
            <button class="UserR_define" @click="addMessage">确定</button>
            <button class="UserR_cancel" @click="dialogVisible = false">取消</button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "./UserRegister.scss";
import Logo from "../../common/Logo/WorkLogo.vue";
import { reactive, toRefs } from "vue";
import { ElMessage } from  "element-plus";
import { addCompany } from "../../request/company";
import router from '@/router';

export default {
  components: {
    Logo
  },
  setup () {
    const state = reactive({
      register: {
        phone: "",
        password: "",
        realName: "",
        shortName: "",
        fullName: "",
        societyNumber: "",
        employeeNum: "",
        boss: "",
        type: "",
      },
      dialogVisible: false,
    });

    const changeVisible = () => {
      const { phone, password, realName, shortName, fullName, societyNumber, employeeNum, boss, type } = state.register;
      if(phone.trim() === '' || password.trim() === '' || realName.trim() === '' ||
        shortName.trim() === '' || fullName.trim() === '' || societyNumber.trim() === '' ||
        employeeNum.trim() === '' || boss.trim() === '' || type.trim() === ''
      ){
        return ElMessage.warning('信息不全！');
      }
      state.dialogVisible = true;
    
    };

    const addMessage = async () => {
      const {data: res} = await addCompany(state.register);
      if(res.status === 0){
        router.push('/login');
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
        state.dialogVisible = false;
      }
    };

    const goback = () => {
      router.push('/login');
    };


    return {
      ...toRefs(state),
      changeVisible,
      addMessage,
      goback,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>