import service from "./index";

// 创作中心的comment
export function getACommnet(params) {
  return service({
    method: "get",
    url: "/comment/getACommnet",
    params,
  });
}

// 修改comment
export function updateComment(data) {
  return service({
    method: "post",
    url: "/comment/updateComment",
    data,
  });
}

// 发表评论
export function addComment(data) {
  return service({
    method: "post",
    url: "/comment/addComment",
    data,
  });
}

export function getMyComment(params) {
  return service({
    method: "get",
    url: "/user/getMyComment",
    params,
  });
}

// 删除comment
export function deleteComment(data) {
  return service({
    method: "post",
    url: "/comment/deleteComment",
    data,
  });
}

