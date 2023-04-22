<template>
  <div class="BiographicalN">
    <div class="BiographicalN_top">
      <div class="BiographicalN_top_list">
        <span class="BiographicalN_top_name">{{ name }}</span>
        <button :class="{BiographicalN_top_unread: true, BiographicalN_top_active: tab === 0}" @click="changeTab(0)">未查看</button>
        <button :class="{BiographicalN_top_pass: true, BiographicalN_top_active: tab === 2}" @click="changeTab(2)">以通过</button>
        <button :class="{BiographicalN_top_reject: true, BiographicalN_top_active: tab === 3}" @click="changeTab(3)">已拒绝</button>
        <button :class="{BiographicalN_top_interview: true, BiographicalN_top_active: tab === 4}" @click="changeTab(4)">邀面试</button>
      </div>
    </div>
    <div class="BiographicalN_table" >
      <el-table border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="list" style="width: 98%">
      <el-table-column prop="realName" label="姓名" width="150" />
      <el-table-column prop="phone" label="电话" width="200" />
      <el-table-column width="80"  label="性别" >
        <template #default="scope">
          <span>{{scope.row.sex ? '女' : '男'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="school" label="毕业学校" width="200"/>
      <el-table-column  label="简历" >
        <template #default="scope">
          <span class="BiographicalN_table_note">{{scope.row.bName}}</span>
          <span class="BiographicalN_table_check" @click="getManageANotes(scope.row.id, 1)">
            <a :href="scope.row.path" target="_blank">查看</a>
          </span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" >
        <template #default="scope">
          <button class="BiographicalN_table_pass" @click="getManageANotes(scope.row.id, 2)">通过</button>
          <button class="BiographicalN_table_reject" @click="getManageANotes(scope.row.id, 3)">拒绝</button>
          <button class="BiographicalN_table_interview" @click="getManageANotes(scope.row.id, 4)">邀请面试</button>
          <span>{{scope.noteName}}</span>
        </template>
    </el-table-column>
    </el-table>
    </div>
    <div class="BiographicalN_pagination" v-if="total > pageCount">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total" 
        :current-page="page"
        :page-size="pageCount"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import "./BiographicalNotes.scss";
import { useRoute } from "vue-router";
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { getManageNotes, changeManageANotes } from "../../request/position";

export default {
  setup () {
    const route = useRoute();
    const store = useStore();

    const state = reactive({
      tab: 0,
      name: route.query.name,
      id: route.query.id,
      userId: store.state.user.userInfo.id || 0,
      page: 1,
      pageCount: 5,
      total: 0,
      list: [],
    });



    const getList = async () => {
      const params = {
        id: state.id,
        state: state.tab,
        page: state.page,
        pageCount: state.pageCount,
      };
      const { data:res } = await getManageNotes(params);
      if(res.status === 0){
        state.list = res.data;
        state.total = res.total;
      }
    };

    watch(
      () => route.query,
      (val) => {
        state.name = val.name;
        state.id = val.id;
        if(val.id){
          getList();
          store.commit('user/setRouter', '简历详情');
        }
      },
      {immediate: true}
    );

    const handleCurrentChange = (val) => {
      state.page = val;
      getList();
    };

    const getManageANotes = async (id, state) => {
      const params = {
        id,
        state,
      };
      const { data:res } = await changeManageANotes(params);
      if(res.status === 0){
        getList();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
      
    }

    const changeTab = (tab) => {
      state.tab = tab;
      getList();
    };

    return {
      ...toRefs(state),
      handleCurrentChange,
      getManageANotes,
      changeTab,
    }
  }
}
</script>
