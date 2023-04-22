import { createRouter, createWebHistory } from "vue-router";
import { ElMessage } from "element-plus";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../components/Main/CMain.vue"),
    redirect: "/position",
    children: [
      {
        path: "/ChatRoom",
        name: "ChatRoom",
        component: () => import("../components/ChatRoom/ChatRoom.vue"),
      },
      {
        path: "/position",
        name: "Position",
        component: () => import("../components/PositionManage/PositionManage.vue"),
      },
      {
        path: "/positionDelivery",
        name: "PositionDelivery",
        component: () => import("../components/PositionDelivery/PositionDelivery.vue"),
      },
      {
        path: "/biographicalNotes",
        name: "BiographicalNotes",
        component: () => import("../components/BiographicalNotes/BiographicalNotes.vue"),
      },
      {
        path: "/companyInfo",
        name: "CompanyInfo",
        component: () => import("../components/CompanyInfo/CompanyInfo.vue"),
      },
      {
        path: "/positionAdd",
        name: "PositionAdd",
        component: () => import("../components/PositionAdd/PositionAdd.vue"),
      },
      {
        path: "/userInfo",
        name: "UserInfo",
        component: () => import("../components/MPUserInfo/MPUserInfo.vue"),
      },
      {
        path: "/activityManage",
        name: "ActivityManage",
        component: () => import("../components/ActivityManage/ActivityManage.vue"),
      },
      {
        path: "/activityAdd",
        name: "ActivityAdd",
        component: () => import("../components/ActivityAdd/ActivityAdd.vue"),
      },
      {
        path: "/creationCenter",
        name: "CreationCenter",
        component: () => import("../components/CreationCenter/CreationCenter.vue"),
      },
      {
        path: "/commentManage",
        name: "CommentManage",
        component: () => import("../components/CommentManage/CommentManage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login/WorkLogin.vue"),
  },
  {
    path: "/userRegister",
    name: "UserRegister",
    component: () => import("../components/UserRegister/UserRegister.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.path == "/ChatRoom" ||
    to.path == "/position" ||
    to.path == "/positionDelivery" ||
    to.path == "/biographicalNotes" ||
    to.path == "/companyInfo" ||
    to.path == "/positionAdd" ||
    to.path == "/userInfo" ||
    to.path == "/activityAdd" ||
    to.path == "/creationCenter"
  ) {
    const token = sessionStorage.getItem("token");
    if (token === null || token === "") {
      ElMessage.error("您还没有登录，请先登录");
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
