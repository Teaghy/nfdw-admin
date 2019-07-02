import axios from "axios";

export const mGetBiddingList = queryData => {
  let url = "/project/page";
  return axios.request({
    url: url+'?'+queryData,
    method: 'get'
  })
}
export const mGetCompareStrategy = queryData => {
  let url = "/bidding/compare";
  return axios.request({
    url: url+'?'+queryData,
    method: 'get',
  })
}
export const mGetStrategyTree = () => {
  let url = "/strategy/tree";
  return axios.request({
    url: url,
    method: 'get',
  })
}
export const mGetBiddingTop = queryData => {
  let url = "/bidding/top";
  return axios.request({
    url: url,
    method: 'post',
    data:queryData
  })
}
export const mGetBiddingDetail = queryData => {
  let url = "/project/detail";
  return axios.request({
    url: url,
    method: 'post',
    data:queryData
  })
}
export const mExportComparePDF = queryData => {
  let url = "/bidding/compare2Pdf";
  return axios.request({
    url: url+'?'+queryData,
    method: 'get',
    responseType:'blob'
  })
}

