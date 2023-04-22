<template>
  <div class="PositionM">
    <div class="PositionM_top">
      <div class="PositionM_top_left">
        <button
          :class="{PositionM_top_left_button: true,PositionM_top_left_active: tab === 0}"
          @click="changeTab(0)"
        >
          全部
        </button>
        <button 
          :class="{PositionM_top_left_button: true,PositionM_top_left_active: tab === 1}"
          @click="changeTab(1)"
        >
          校招
        </button>
        
        <button 
          :class="{PositionM_top_left_button: true,PositionM_top_left_active: tab === 2}"
          @click="changeTab(2)"
        >
          实习
        </button>
        
        <button 
          :class="{PositionM_top_left_button: true,PositionM_top_left_active: tab === 3}"
          @click="changeTab(3)"
        >
          社招
        </button>
      </div>
      <div class="PositionM_top_right">
        <button class="PositionM_top_add" @click="gotoAdd">添加</button>
      </div>
    </div>
    <div class="PositionM_table" >
      <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="list" style="width: 98%">
        <el-table-column prop="date" label="创建时间" width="120">
          <template #default="scope">
            <span>{{ standardTime(+scope.row.time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="150" />
        <el-table-column prop="salaryLow" label="最低薪资" width="80" />
        <el-table-column prop="salaryUp" label="最高薪资" width="80"/>
        <el-table-column prop="salaryNumber" label="年薪" width="80"/>
        <el-table-column width="200"  label="岗位描述" >
          <template #default="scope">
            <div class="PositionM_limit">{{scope.row.p_describe}}</div>
          </template>
        </el-table-column>
        <el-table-column width="200"  label="岗位描述" >
          <template #default="scope">
            <div class="PositionM_limit">{{scope.row.p_require}}</div>
          </template>
        </el-table-column>
        <el-table-column width="200"  label="岗位描述" >
          <template #default="scope">
            <div class="PositionM_limit">{{scope.row.experience}}</div>
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作" class-name="PositionM_table_edit">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="PositionM_pagination" v-if="total > pageCount">
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
import "./PositionManage.scss";
import { useRouter } from "vue-router";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { getManagePosition } from "../../request/position";
import { standardTime } from "../../assets/js/standardTime";

export default {
  setup () {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      tab: 0,
      userId: store.state.user.userInfo.id || 0,
      page: 1,
      pageCount: 5,
      total: 0,
      list: [],
    });


    onMounted(() => {
      getList();
      store.commit('user/setRouter', '职位管理');
    });

    const gotoAdd = () => {
      router.push({
        path: "/positionAdd",
      })
    };

    const getList = async () => {
      const params = {
        userId: state.userId,
        state: state.tab,
        page: state.page,
        pageCount: state.pageCount,
      };
      const {data:res} = await getManagePosition(params);
      if(res.status === 0){
        state.list = res.data;
        state.total = res.total;
      }
    };

    const changeTab = (tab) => {
      state.tab = tab;
      getList();
    };

    const handleCurrentChange = (val) => {
      state.page = val;
      getList();
    };

    const handleEdit = (id) => {
      router.push({
        path: "/positionAdd",
        query: {
          id,
        }
      })
    };

    return {
      ...toRefs(state),
      gotoAdd,
      changeTab,
      standardTime,
      handleCurrentChange,
      handleEdit
    }
  }
}
</script>
