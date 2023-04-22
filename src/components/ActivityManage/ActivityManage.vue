<template>
  <div class="ActivityM">
    <div class="ActivityM_top">
      <button class="ActivityM_top_add" @click="gotoAdd">添加</button>
    </div>
    <div class="ActivityM_table" >
      <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="list" style="width: 98%">
        <el-table-column  label="创建时间"  width="150">
          <template #default="scope" >
            <span>{{standardTime(+scope.row.time)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="250" />
        <el-table-column prop="contacts" label="负责人" width="150" />
        <el-table-column prop="place" label="建办地点" width="200" />
        <el-table-column  label="开始时间"  width="150">
          <template #default="scope" >
            <span>{{standardTime(+scope.row.startTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="结束时间"  width="150">
          <template #default="scope" >
            <span>{{standardTime(+scope.row.endTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作" class-name="ActivityM_table_edit">
          <template #default="scope">
            <el-button  type="primary" size="small" @click="gotoEdit(scope.row.id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div class="ActivityM_pagination" v-if="total > pageCount">
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
import "./ActivityManage.scss";
import { useRouter } from "vue-router";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { getManageActivity } from "../../request/school";
import { standardTime } from "../../assets/js/standardTime.js";

export default {
  setup () {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      companyId: store.state.user.userInfo.companyId || 0,
      page: 1,
      pageCount: 5,
      total: 0,
      list: [],
    });


    onMounted(() => {
      getList();
      store.commit('user/setRouter', '宣讲会');
    });


    const gotoEdit = (id) => {
      router.push({
        path: "/ActivityAdd",
        query: {
          id,
        }
      });
    };

    const gotoAdd = () => {
      router.push({
        path: "/ActivityAdd"
      });
    };

    const getList = async () => {
      const params = {
        companyId: state.companyId,
        page: state.page,
        pageCount: state.pageCount,
      };
      const { data:res } = await getManageActivity(params);
      if(res.status === 0){
        state.list = res.data;
        state.total = res.total;
      }
    };

    const handleCurrentChange = (val) => {
      state.page = val;
      getList();
    };



    return {
      ...toRefs(state),
      gotoEdit,
      handleCurrentChange,
      standardTime,
      gotoAdd
    }
  }
}
</script>
