<template>
  <div class="ActivityAdd">
    <div class="ActivityAdd_header">校招会编辑</div>
    <div class="ActivityAdd_content">
      <div class="ActivityAdd_des">
        <span class="ActivityAdd_des_label">标题</span>
        <div>
          <textarea v-model="activityInfo.title"></textarea>
        </div>
      </div>
      <ul class="ActivityAdd_list">
        <!-- <li class="ActivityAdd_list_item">
          <label for="title" class="ActivityAdd_list_item_label">标题</label>
          <input v-model="activityInfo.title" type="text" id="title" class="ActivityAdd_list_item_input">
        </li> -->
        <li class="ActivityAdd_list_item">
          <label for="place" class="ActivityAdd_list_item_label">地点</label>
          <input v-model="activityInfo.place" type="text" id="place" class="ActivityAdd_list_item_input">
        </li>
        <li class="ActivityAdd_list_item">
          <label for="contacts" class="ActivityAdd_list_item_label">负责人</label>
          <input v-model="activityInfo.contacts" type="text" id="contacts" class="ActivityAdd_list_item_input">
        </li>
        <li class="ActivityAdd_list_item">
          <label for="website" class="ActivityAdd_list_item_label">官网地址</label>
          <input v-model="activityInfo.website" type="text" id="website" class="ActivityAdd_list_item_input">
        </li>
        <li class="ActivityAdd_list_item">
          <label for="email" class="ActivityAdd_list_item_label">邮箱</label>
          <input v-model="activityInfo.email" type="text" id="email" class="ActivityAdd_list_item_input">
        </li>
        <li class="ActivityAdd_list_item">
          <label for="telephone" class="ActivityAdd_list_item_label">电话</label>
          <input v-model="activityInfo.telephone" type="text" id="telephone" class="ActivityAdd_list_item_input">
        </li>
        <li class="ActivityAdd_list_item">
          <label for="startTime" class="ActivityAdd_list_item_label">开始时间</label>
          <el-date-picker
            type="date"
            placeholder="开始时间"
            id="startTime"
            v-model="activityInfo.startTime"
          />
        </li>
        <li class="ActivityAdd_list_item">
          <label for="endTime" class="ActivityAdd_list_item_label">结束时间</label>
          <el-date-picker
            type="date"
            placeholder="开始时间"
            id="endTime"
            v-model="activityInfo.endTime"
          />
        </li>
      </ul>
      <div class="ActivityAdd_des">
        <span class="ActivityAdd_des_label">活动图片</span>
        <div>
          <UploadImgs :limit="1" :imgUrls="imgUrls" :delBase64="delBase64" :getBase64="getBase64"/>
        </div>
      </div>
    </div>
    <div class="ActivityAdd_foot">
      <div></div>
      <div class="ActivityAdd_foot_right">
        <button class="ActivityAdd_goback" @click="goback">返回</button>
        <button class="ActivityAdd_foot_add" v-if="!id" @click="changeVisible">添加</button>
        <button class="ActivityAdd_foot_add" v-if="id" @click="changeVisible">修改</button>
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="提醒" width="30%" center>
        <div class="ActivityAdd_center">
          {{ id ? '确定修改？' : '确定添加？' }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <button class="ActivityAdd_define" @click="selectEdit">确定</button>
            <button class="ActivityAdd_cancel" @click="dialogVisible = false">取消</button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "./ActivityAdd.scss";
import UploadImgs from "../../common/UploadImg/UploadImgs.vue";
import { reactive, toRefs, watch } from "vue";
import { getActivity, updateActivity, addActivity } from "../../request/school";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default {
  components: {
    UploadImgs,
  },
  setup () {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    
    const state = reactive({
      activityInfo: {
        title: '',
        startTime: '',
        endTime: '',
        place: '', 
        contacts: '',
        website: '',
        email: '',
        telephone: '',
      },
      id: route.query.id,
      imgUrls: [],
      pic: null,
      base64: '',
      dialogVisible: false,
      companyId: store.state.user.userInfo.companyId,
    });


    const getInfo = async () => {
      const params = {
        id: state.id,
      }
      const { data: res } = await getActivity(params);
      if(res.status === 0){
        state.activityInfo = res.data;
        state.activityInfo.startTime = new Date(+res.data.startTime);
        state.activityInfo.endTime = new Date(+res.data.endTime);
        state.imgUrls =  [{ url: res.data.pic}];
        state.pic = res.data.pic;
      }
    };

    watch(
      () => route.query.id,
      (id) => {
        state.id = id;
        if(id){
          getInfo();
          store.commit('user/setRouter', '编辑宣讲会');
        } else {
          store.commit('user/setRouter', '添加宣讲会');
        }
      },
      { immediate: true }
    );

    const getBase64 = (base64) => {
      state.base64 = base64;
    };

    const delBase64 = () => {
      state.pic = null;
    };

    const selectEdit = () => {
      if(state.id) {
        updateMessage();
      } else {
        addMessage();
      }
    };

    const updateMessage = async () => {
      const { activityInfo } = state;
      const params = {
        ...activityInfo,
        startTime: new Date(activityInfo.startTime).getTime(),
        endTime: new Date(activityInfo.endTime).getTime(),
        pic: state.pic,
        imgData: state.base64,
      };
      const { data: res } = await updateActivity(params);
      if(res.status === 0){
        router.go(-1);
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };

    const changeVisible = () => {
      const { activityInfo } = state;
      if( activityInfo.title.trim() === '' || !activityInfo.endTime || !activityInfo.startTime || activityInfo.place.trim() === '' || activityInfo.telephone.trim() === '' || activityInfo.email.trim() === '' || activityInfo.contacts.trim() === '' || activityInfo.website.trim() === ''){
        return ElMessage.warning('信息不全!');
      }
      state.dialogVisible = true;
    };

    const addMessage = async () => {
      const { activityInfo } = state;
      const params = {
        ...activityInfo,
        companyId: state.companyId,
        pic: state.pic,
        imgData: state.base64,
        startTime: new Date(activityInfo.startTime).getTime(),
        endTime: new Date(activityInfo.endTime).getTime(),
        time: new Date().getTime(),
      };
      const { data: res } = await addActivity(params);
      if(res.status === 0){
        router.go(-1);
        ElMessage.success(res.message);
      } else{
        ElMessage.error(res.message);
      }
    };



    const goback = () => {
      router.go(-1);
    };

    return {
      ...toRefs(state),
      getBase64,
      delBase64,
      changeVisible,
      goback,
      selectEdit,
    }
  }
}
</script>
