import service from "./index";


export function getManageActivity(params) {
  return service({
    method: "get",
    url: "/school/getManageActivity",
    params,
  });
}

export function getActivity(params) {
  return service({
    method: "get",
    url: "/school/getActivity",
    params,
  });
}

export function updateActivity(data) {
  return service({
    method: "post",
    url: "/school/updateActivity",
    data,
  });
}

export function addActivity(data) {
  return service({
    method: "post",
    url: "/school/addActivity",
    data,
  });
}
