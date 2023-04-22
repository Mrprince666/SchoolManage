<template>
  <div class="CommentM">
    <div class="CommentM_top">
      <button class="CommentM_top_add" @click="gotoAdd">添加</button>
    </div>
    <div class="CommentM_table" >
      <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center'}" :data="list" style="width: 98%">
        <el-table-column  label="创建时间"  width="200">
          <template #default="scope" >
            <span>{{standardTime(+scope.row.time)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="创建人" width="150" />
        <el-table-column prop="title" label="标题" width="250" />
        <el-table-column  label="内容" >
          <template #default="scope" >
            <div class="CommentM_limit">{{scope.row.content}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="like" label="点赞数" width="150" />
        <el-table-column  label="操作" class-name="CommentM_table_edit">
          <template #default="scope">
            <el-button  type="primary" size="small" @click="gotoCreationCenter(scope.row.id)"
              >查看</el-button
            >
            <el-button  type="danger" size="small" @click="deleteCommentItem(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
    </el-table>
    </div>
    <div class="CommentM_pagination" v-if="total > pageCount">
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
import "./CommentManage.scss";
import { useRouter } from "vue-router";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { getMyComment, deleteComment } from "../../request/comment";
import { standardTime } from "../../assets/js/standardTime.js";
import { ElMessage } from "element-plus";

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
      store.commit('user/setRouter', '评论管理');
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
        path: "/creationCenter"
      });
    };

    const getList = async () => {
      const params = {
        userId: state.userId,
        page: state.page,
        pageCount: state.pageCount,
      };
      const { data:res } = await getMyComment(params);
      if(res.status === 0){
        state.list = res.data;
        state.total = res.total;
      }
    };

    const handleCurrentChange = (val) => {
      state.page = val;
      getList();
    };

    const deleteCommentItem = async (id) => {
      const params = {
        id,
      };
      const { data: res } = await deleteComment(params);
      if (res.status === 0) {
        getList();
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    };

    const gotoCreationCenter = (id) => {
      router.push({
        path: "/creationCenter",
        query: {
          id,
        },
      });
    };

    return {
      ...toRefs(state),
      gotoEdit,
      handleCurrentChange,
      standardTime,
      gotoAdd,
      deleteCommentItem,
      gotoCreationCenter,
    }
  }
}
</script>
