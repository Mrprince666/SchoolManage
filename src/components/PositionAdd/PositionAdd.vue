<template>
  <div class="PositionAdd">
    <div class="PositionAdd_content">
      <ul class="PositionAdd_list">
        <li class="PositionAdd_list_item">
          <label for="name" class="PositionAdd_list_item_label">岗位名称</label>
          <input type="text" id="name" class="PositionAdd_list_item_input" v-model="positionInfo.name">
        </li>
        <li class="PositionAdd_list_item">
          <label for="salaryLow" class="PositionAdd_list_item_label">最低薪资</label>
          <input type="text" id="salaryLow" class="PositionAdd_list_item_input" v-model="positionInfo.salaryLow">
        </li>
        <li class="PositionAdd_list_item">
          <label for="salaryUp" class="PositionAdd_list_item_label">最高薪资</label>
          <input type="text" id="salaryUp" class="PositionAdd_list_item_input" v-model="positionInfo.salaryUp">
        </li>
        <li class="PositionAdd_list_item">
          <label for="salaryType" class="PositionAdd_list_item_label">薪资类型</label>
          <el-select
            v-model="positionInfo.salaryType"
            class="PositionAdd_list_item_select"
            placeholder="请选择岗位类型"
            id="salaryType"
          >
            <el-option
              v-for="item in salaryTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </li>
        <li class="PositionAdd_list_item">
          <label for="salaryNumber" class="PositionAdd_list_item_label">月薪数/薪</label>
          <input type="text" id="salaryNumber" class="PositionAdd_list_item_input" v-model="positionInfo.salaryNumber">
        </li>
        <li class="PositionAdd_list_item">
          <label for="tradeId" class="PositionAdd_list_item_label">领域</label>
          <el-select
            v-model="positionInfo.tradeId"
            class="PositionAdd_list_item_select"
            placeholder="请选择领域"
            id="type"
          >
            <el-option
              v-for="item in positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </li>
        <li class="PositionAdd_list_item">
          <label for="type" class="PositionAdd_list_item_label">岗位类型</label>
          <el-select
            v-model="positionInfo.type"
            class="PositionAdd_list_item_select"
            placeholder="请选择岗位类型"
            id="type"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </li>
        <li class="PositionAdd_list_item">
          <label for="startTime" class="PositionAdd_list_item_label">招聘开始时间</label>
          <el-date-picker
            v-model="positionInfo.startTime"
            type="date"
            placeholder="开始时间"
            :size="size"
          />
        </li>
        <li class="PositionAdd_list_item">
          <label for="endTime" class="PositionAdd_list_item_label">招聘结束时间</label>
          <el-date-picker
            v-model="positionInfo.endTime"
            type="date"
            placeholder="结束时间"
            :size="size"
          />
        </li>
        <li class="PositionAdd_list_item">
          <label for="count" class="PositionAdd_list_item_label">招聘人数</label>
          <input type="text" id="count" class="PositionAdd_list_item_input" v-model="positionInfo.count">
        </li>
        <li class="PositionAdd_list_item">
          <label for="isSchool" class="PositionAdd_list_item_label">设置为莞工招聘</label>
          <el-switch v-model="positionInfo.isSchool" />
        </li>
      </ul>
      <div class="PositionAdd_address">
        <li class="PositionAdd_list_item">
          <label for="address" class="PositionAdd_list_item_label">地址</label>
          <input type="text" v-model="positionInfo.province" placeholder="填写省份" class="PositionAdd_list_item_input">
          <!-- <el-cascader placeholder="请选择城市" :options="cityList" :show-all-levels="false" @change="changeCity" /> -->
        </li>
        <li class="PositionAdd_list_item">
          <input type="text" v-model="positionInfo.cityName" placeholder="填写城市" class="PositionAdd_list_item_input">
        </li>
        <li class="PositionAdd_list_item">
          <input type="text" v-model="positionInfo.fullAddress" placeholder="地址全称" class="PositionAdd_list_item_input">
        </li>
      </div>
      <div class="PositionAdd_des">
        <span class="PositionAdd_des_name">职位要求标签(最多三个)</span>
        <ul class="PositionAdd_des_list">
          <input type="text" class="PositionAdd_list_item_input"  v-model="desTypeOne[0].content">
          <input type="text" class="PositionAdd_list_item_input" v-model="desTypeOne[1].content">
          <input type="text" class="PositionAdd_list_item_input" v-model="desTypeOne[2].content">
        </ul>
      </div>
      <div class="PositionAdd_des">
        <span class="PositionAdd_des_name">职位领域标签(最多三个)</span>
        <ul class="PositionAdd_des_list">
          <input type="text" class="PositionAdd_list_item_input" v-model="desTypeTwo[0].content">
          <input type="text" class="PositionAdd_list_item_input" v-model="desTypeTwo[1].content">
          <input type="text" class="PositionAdd_list_item_input" v-model="desTypeTwo[2].content">
        </ul>
      </div>
      <div class="PositionAdd_des">
        <label class="PositionAdd_des_name" id="describe">职位描述</label>
        <div>
          <textarea v-model="positionInfo.p_describe" id="describe" class="PositionAdd_des_textarea"></textarea>
        </div>
      </div>
      <div class="PositionAdd_des">
        <label class="PositionAdd_des_name" id="require">职位需求</label>
        <div>
          <textarea v-model="positionInfo.p_require" id="require" class="PositionAdd_des_textarea"></textarea>
        </div>
      </div>
      <div class="PositionAdd_des">
        <label class="PositionAdd_des_name" id="experience">优先条件</label>
        <div>
          <textarea v-model="positionInfo.experience" id="experience" class="PositionAdd_des_textarea"></textarea>
        </div>
      </div>
    </div>
    <div class="PositionAdd_foot">
      <div></div>
      <div class="PositionAdd_foot_right">
        <button class="PositionAdd_foot_goback" @click="goback">返回</button>
        <button class="PositionAdd_foot_add" @click="changeVisible" >{{ id? '修改' : '添加' }}</button>
        
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="提醒" width="30%" center>
        <div class="PositionAdd_center">
          {{ id ? '确定修改？' : '确定添加？' }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <button class="PositionAdd_define" @click="selectEdit">确定</button>
            <button class="PositionAdd_cancel" @click="dialogVisible = false">取消</button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "./PositionAdd.scss";
import { reactive, toRefs, onMounted, watch }  from "vue";
import { getAllPt, getAllCity, addPosition, getPositionDetails, updatePosition } from "../../request/position";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

export default {
  setup () {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      positionInfo: {
        name: '',
        salaryLow: '',
        salaryUp: '',
        type: 1,
        salaryNumber: '',
        salaryType: 0,
        tradeId: '',
        isSchool: 0,
        startTime: '',
        endTime: '',
        count: '',
        province: '',
        cityName: '',
        fullAddress: '',
        p_describe: '',
        p_require: '',
        experience: '',
      },
      positionList: [],
      cityList: [],
      desTypeOne: [ {content: ''}, {content: ''}, {content: ''} ],
      desTypeTwo: [ {content: ''}, {content: ''}, {content: ''} ],
      userId: store.state.user.userInfo.id,
      companyId: store.state.user.userInfo.companyId,
      id: route.query.id || 0,
      dialogVisible: false,
    });

    const typeList = [
      { id: 1, name: '校招'},
      { id: 2, name: '实习' },
      { id: 3, name: '社招' },
      { id: 4, name: '兼职' },
    ];

    const salaryTypeList = [
      { id: 0, name: '月薪' },
      { id: 1, name: '日薪' },
      { id: 2, name: '时薪' },
    ];

    onMounted(() => {
      getAllPosition();
      getCityList();
    });

    const getAllPosition = async () => {
      const { data: res } = await getAllPt();
      if (res.status === 0) {
        state.positionList = res.data;
      }
    };

    const getCityList = async () => {
      const { data: res } = await getAllCity();
      if (res.status === 0) {
        state.cityList = res.data;
      }
    };

    const changeCity = (val) => {
      state.positionInfo.province = state.cityList[val[0] - 1].label;
      state.positionInfo.cityName = val[1];
    };

    const addAPosition = async () => {
      const { positionInfo, companyId, userId } = state;

      const desTypeOne = state.desTypeOne.map((item) => {
        if(item.content.trim() !== '') return item.content;
      });
      const desTypeTwo = state.desTypeTwo.map((item) => {
        if(item.content.trim() !== '') return item.content;
      });

      const params = {
        ...positionInfo,
        isSchool: positionInfo.isSchool ? 1 : 0,
        desTypeOne,
        desTypeTwo,
        time: new Date().getTime(),
        startTime: new Date(positionInfo.startTime).getTime(),
        endTime: new Date(positionInfo.endTime).getTime(),
        companyId,
        userId,
      };
      const { data: res } = await addPosition(params);
      if (res.status === 0) {
        router.go(-1);
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    };

    const getPosition = async () => {
      const params = {
        id: state.id,
      };
      const {data: res} = await getPositionDetails(params);
      if(res.status === 0){
        state.positionInfo = res.data;
        state.positionInfo.isSchool = res.data.isSchool ? true : false;
        if(res.data.startTime){
          state.positionInfo.startTime = new Date(+res.data.startTime);
        }
        if(res.data.endTime){
          state.positionInfo.endTime = new Date(+res.data.endTime);
        }
        state.desTypeOne = res.desTypeOne;
        state.desTypeTwo = res.desTypeTwo;
        
      }
    };

    const updateMessage =  async () => {
      const { positionInfo, desTypeOne, desTypeTwo } = state;
      const parmas = {
        ...positionInfo,
        desTypeOne,
        desTypeTwo,
        startTime: new Date(positionInfo.startTime).getTime(),
        endTime: new Date(positionInfo.endTime).getTime(),
      };
      const { data: res } = await updatePosition(parmas);
      if( res.status === 0 ){
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };

    watch(
      () => route.query.id,
      (id) => {
        state.id = id;
        if(id){
          getPosition();
          store.commit('user/setRouter', '编辑职位');
        } else {
          store.commit('user/setRouter', '添加职位');
        }
      },
      { immediate: true }
    );

    const goback = () => {
      router.go(-1);
    };

    const changeVisible = () => {
      const { positionInfo } = state;
      for(let name in positionInfo){
        if(positionInfo[name].toString().trim() === '' && positionInfo[name].toString().trim() !== '0'){
          return ElMessage.warning('信息不全!');
        }
      }
      state.dialogVisible = true;
    };

    const selectEdit = () => {
      if(state.id){
        updateMessage();
      } else {
        addAPosition();
      }
      state.dialogVisible = false;
    };
    

    return {
      ...toRefs(state),
      typeList,
      salaryTypeList,
      changeCity,
      addAPosition,
      goback,
      updateMessage,
      changeVisible,
      selectEdit,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>