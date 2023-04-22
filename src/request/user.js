import service from "./index";

// 注册
export function register(data) {
  return service({
    method: "post",
    url: "/user/regUserCompany",
    data,
  });
}

// 登录
export function login(data) {
  return service({
    method: "post",
    url: "/user/login",
    data: data,
  });
}

export function getMyInfo(params) {
  return service({
    method: "get",
    url: "/user/getMyInfo",
    params,
  });
}

export function updateMyInfo(data) {
  return service({
    method: "post",
    url: "/user/updateMyInfo",
    data,
  });
}

export function updatePassword(data) {
  return service({
    method: "post",
    url: "/user/updatePassword",
    data,
  });
}

export function updateUserPic(data) {
  return service({
    method: "post",
    url: "/upload/headImage",
    data,
  });
}
