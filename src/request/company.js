import service from "./index";

export function getCompany(params) {
  return service({
    method: "get",
    url: "/company/getCompany",
    params,
  });
}

export function updateCompany(data) {
  return service({
    method: "post",
    url: "/company/updateCompany",
    data,
  });
}

export function addAddress(data) {
  return service({
    method: "post",
    url: "/company/addAddress",
    data,
  });
}

export function deleteAddress(data) {
  return service({
    method: "post",
    url: "/company/deleteAddress",
    data,
  });
}

export function addTreatment(data) {
  return service({
    method: "post",
    url: "/company/addTreatment",
    data,
  });
}

export function deleteTreatment(data) {
  return service({
    method: "post",
    url: "/company/deleteTreatment",
    data,
  });
}

export function getAllCompany() {
  return service({
    method: "get",
    url: "/company/getAllCompany",
  });
}

export function addCompany(data) {
  return service({
    method: "post",
    url: "/company/addCompany",
    data,
  });
}