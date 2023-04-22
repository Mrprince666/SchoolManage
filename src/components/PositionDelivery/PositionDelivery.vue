<template>
  <div class="PositionD">
    <div class="PositionD_table" >
      <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="list" style="width: 98%">
      <el-table-column prop="name" label="职位名称" width="220" />
      <el-table-column prop="count" label="招聘人数" width="150" />
      <el-table-column prop="deliverCount" label="投递数/份" width="150"/>
      <el-table-column prop="passCount" label="已通过/份" width="150"/>
      <el-table-column prop="interviewCount" label="邀面试/份" width="150"/>
      <el-table-column prop="rejectCount" label="已拒绝/份" width="150"/>
      <el-table-column prop="unreadCount" width="150"  label="待查看" />
      <el-table-column  label="操作" class-name="PositionD_table_edit">
        <template #default="scope">
          <el-button  type="primary" size="small" @click="gotoNotes(scope.row.id, scope.row.name)"
            >查看</el-button
          >
        </template>
    </el-table-column>
    </el-table>
    </div>
    <div class="PositionD_pagination" v-if="total > pageCount">
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
import "./PositionDelivery.scss";
import { useRouter } from "vue-router";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { getNotesCount } from "../../request/position";

export default {
  setup () {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      userId: store.state.user.userInfo.id || 0,
      page: 1,
      pageCount: 5,
      total: 0,
      list: [],
    });


    onMounted(() => {
      getList();
      store.commit('user/setRouter', '投递情况');
    });


    const gotoNotes = (id, name) => {
      router.push({
        path: "/biographicalNotes",
        query: {
          id,
          name,
        }
      });
    };

    const getList = async () => {
      const params = {
        userId: state.userId,
        page: state.page,
        pageCount: state.pageCount,
      };
      const { data:res } = await getNotesCount(params);
      if(res.status === 0){
        state.list = res.data;
      }
    };

    const handleCurrentChange = (val) => {
      state.page = val;
      getList();
    };



    return {
      ...toRefs(state),
      gotoNotes,
      handleCurrentChange,
    }
  }
}
</script>
