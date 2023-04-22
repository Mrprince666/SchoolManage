import service from "./index";

// 职位分类
export function getAllPt() {
  return service({
    method: "get",
    url: "/position/getAllPt",
  });
}

export function getManagePosition(params) {
  return service({
    method: "get",
    url: "/position/getManagePosition",
    params,
  });
}

export function getNotesCount(params) {
  return service({
    method: "get",
    url: "/position/getNotesCount",
    params,
  });
}

export function getManageNotes(params) {
  return service({
    method: "get",
    url: "/position/getManageNotes",
    params,
  });
}

export function changeManageANotes(data) {
  return service({
    method: "post",
    url: "/position/changeManageANotes",
    data,
  });
}

export function getAllCity() {
  return service({
    method: "get",
    url: "/position/getAllCity",
  });
}

export function addPosition(data) {
  return service({
    method: "post",
    url: "/position/addPosition",
    data,
  });
}

export function getPositionDetails(params) {
  return service({
    method: "get",
    url: "/position/getPositionDetails",
    params,
  });
}

export function updatePosition(data) {
  return service({
    method: "post",
    url: "/position/updatePosition",
    data,
  });
}
