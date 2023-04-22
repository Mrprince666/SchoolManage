<template>
  <div class="CompanyInfo">
    <ul class="CompanyInfo_list">
      <li class="CompanyInfo_list_item">
        <label for="fullName">公司全名</label>
        <input type="text"
          placeholder="请输入内容"
          id="fullName"
          class="CompanyInfo_list_item_input"
          v-model="companyInfo.fullName"
        >
      </li>
      <li class="CompanyInfo_list_item">
        <label for="shortName">公司简称</label>
        <input v-model="companyInfo.shortName" type="text" placeholder="请输入内容" id="shortName" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="boss">公司法人</label>
        <input v-model="companyInfo.boss" type="text" placeholder="请输入内容" id="boss" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="type">成立时间</label>
        <input v-model="companyInfo.startAddress" type="text" placeholder="请输入内容" id="type" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="startAddress">注册地址</label>
        <input v-model="companyInfo.startTime" type="text" placeholder="请输入内容" id="startAddress" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="societyNumber">统一社会信用代码</label>
        <input v-model="companyInfo.societyNumber" type="text" placeholder="请输入内容" id="societyNumber" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="workTimeStart">上班时间</label>
        <input v-model="companyInfo.workTimeEnd" type="text" placeholder="请输入内容" id="workTimeStart" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="workTimeEnd">上班时间</label>
        <input v-model="companyInfo.workTimeStart" type="text" placeholder="请输入内容" id="workTimeEnd" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="workTimeType">周末情况</label>
        <input v-model="companyInfo.workTimeType" type="text" placeholder="请输入内容" id="workTimeType" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="website">公司官网</label>
        <input  v-model="companyInfo.website" type="text" placeholder="请输入内容" id="website" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="territory">领域</label>
        <input v-model="companyInfo.territory" type="text" placeholder="请输入内容" id="territory" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="employeeNum">公司人数</label>
        <input  v-model="companyInfo.employeeNum" type="text" placeholder="请输入内容" id="employeeNum" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="finance">融资情况</label>
        <input v-model="companyInfo.finance" type="text" placeholder="请输入内容" id="finance" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="businessStatus">资金情况</label>
        <input v-model="companyInfo.businessStatus" type="text" placeholder="请输入内容" id="businessStatus" class="CompanyInfo_list_item_input">
      </li>
      <li class="CompanyInfo_list_item">
        <label for="startMoney">注册资金</label>
        <input v-model="companyInfo.startMoney" type="text" placeholder="请输入内容" id="startMoney" class="CompanyInfo_list_item_input">
      </li>
    </ul>
    <div class="CompanyInfo_des">
      <div>
        <label for="">地址</label>
      </div>
      <div class="CompanyInfo_des_create">
        <input placeholder="请输入城市名称" type="text" v-model="city" class="CompanyInfo_list_item_input">
        <input placeholder="请输入全称" type="text" v-model="fullAddress" class="CompanyInfo_list_item_input">
        <button class="CompanyInfo_define" @click="addAAddress">添加</button>
      </div>
      <div class="CompanyInfo_des_table">
        <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="addressList" style="width: 50%">
          <el-table-column  label="城市" >
            <template #default="scope" >
              <span>{{scope.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="全称" >
            <template #default="scope" >
              <span>{{scope.row.fullAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作" >
            <template #default="scope" >
              <button class="CompanyInfo_cancel" @click="deleteAAddress(scope.row.id)">删除</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="CompanyInfo_des">
      <div>
        <label for="">公司福利</label>
      </div>
      <div class="CompanyInfo_des_create">
        <input placeholder="请输入名称" type="text" v-model="content" class="CompanyInfo_list_item_input">
        <button class="CompanyInfo_define" @click="addATreatment">添加</button>
      </div>
      <div class="CompanyInfo_des_table">
        <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="treatment" style="width: 50%">
          <el-table-column  label="名称" >
            <template #default="scope" >
              <span>{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作" >
            <template #default="scope" >
              <button class="CompanyInfo_cancel" @click="deleteATreatment(scope.row.id)">删除</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="CompanyInfo_des">
      <div>
        <label for="">公司头像</label>
      </div>
      <div class="CompanyInfo_des_img">
        <UploadImgs :limit="1" :imgUrls="imgUrls" :getBase64="getBase64" :delBase64="delBase64"/>
      </div>
    </div>
    <div class="CompanyInfo_des">
      <li class="CompanyInfo_list_item">
        <div>
          <label for="introduction">公司介绍</label>
        </div>
        <textarea id="introduction" v-model="companyInfo.introduction"></textarea>
      </li>
    </div>
    <div class="CompanyInfo_des">
      <li class="CompanyInfo_list_item">
        <div><label for="scope">经营范围</label></div>
        <textarea id="scope" v-model="companyInfo.scope"></textarea>
      </li>
    </div>
    <div class="CompanyInfo_floor">
      <div></div>
      <div class="CompanyInfo_floor_list">
        <button class="CompanyInfo_floor_edit" @click="dialogVisible = true">修改</button>
        <button class="CompanyInfo_floor_cancel" @click="handleCancel">取消</button>
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="提醒" width="30%" center>
        <div class="CompanyInfo_center">
          确定修改？
        </div>
        <template #footer>
          <span class="dialog-footer">
            <button class="CompanyInfo_define" @click="updateMessage">确定</button>
            <button class="CompanyInfo_cancel" @click="dialogVisible = false">取消</button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "./CompanyInfo.scss";
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { getCompany, updateCompany, deleteAddress, addAddress, addTreatment, deleteTreatment } from "../../request/company";
import { ElMessage } from "element-plus";
import UploadImgs from "../../common//UploadImg/UploadImgs.vue";

export default {
  components: {
    UploadImgs,
  },


  setup () {
    const store = useStore();
    const state = reactive({
      companyId: store.state.user.userInfo.companyId,
      companyInfo: {},
      rowInfo: {},
      addressList: [],
      imgUrls: [ { url: ''} ],
      rowUrls: [ { url: ''} ],
      base64: '',
      pic: null,
      dialogVisible: false,
      city: '',
      fullAddress: '',
      treatment: [],
      content: '',
    });

    onMounted(() => {
      getMessage();
      store.commit('user/setRouter', '公司信息');
    });

    const getMessage = async () => {
      const params = {
        companyId: state.companyId,
      };
      const { data: res } = await getCompany(params);
      if(res.status === 0){
        state.companyInfo = JSON.parse(JSON.stringify(res.company));
        state.rowInfo = JSON.parse(JSON.stringify(res.company));
        state.addressList = JSON.parse(JSON.stringify(res.addressList));
        state.rowUrls[0].url = res.company.pic;
        state.imgUrls[0].url = res.company.pic;
        state.pic = res.company.pic;
        state.treatment = res.treatment;
      }
    };

    const handleCancel  = () => {
      state.companyInfo = JSON.parse(JSON.stringify(state.rowInfo));
      state.imgUrls = JSON.parse(JSON.stringify(state.rowUrls));
      ElMessage.success('取消成功！');
    };

    const updateMessage = async () => {
      const { companyInfo, pic, base64 } = state;
      const params = {
        ...companyInfo,
        pic,
        imgData: base64,
      };
      const { data: res } = await updateCompany(params);
      if(res.status === 0){
        state.dialogVisible = false;
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    };
    
    const getBase64 = (base64) => {
      state.base64 = base64;
    };

    const delBase64 = () => {
      state.pic = null;
    };

    const addAAddress = async () => {
      if(state.city.trim() === '' || state.fullAddress.trim() === ''){
        return ElMessage.warning('请填写完整！');
      }
      const params = {
        companyId: state.companyId,
        city: state.city,
        fullAddress: state.fullAddress,
      };
      const { data: res } = await addAddress(params);
      if(res.status === 0){
        state.city = '';
        state.fullAddress = '';
        state.addressList = res.data;
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };

    const deleteAAddress = async (id) => {
      const params = {
        companyId: state.companyId,
        id,
      };
      const { data: res } = await deleteAddress(params);
      if(res.status === 0){
        state.addressList = res.data;
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };

    const addATreatment = async () => {
      if(state.content.trim() === ''){
        return ElMessage.warning('请填写完整！');
      }
      const params = {
        companyId: state.companyId,
        content: state.content,
      };
      const { data: res } = await addTreatment(params);
      if(res.status === 0){
        state.content = ''
        state.treatment = res.data;
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };

    const deleteATreatment  = async (id) => {
      const params = {
        companyId: state.companyId,
        id,
      };
      const { data: res } = await deleteTreatment(params);
      if(res.status === 0){
        state.treatment = res.data;
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };

    return {
      ...toRefs(state),
      handleCancel,
      getBase64,
      delBase64,
      updateMessage,
      addAAddress,
      deleteAAddress,
      addATreatment,
      deleteATreatment,
    };
  }
}
</script>

<style lang="scss" scoped>

</style>