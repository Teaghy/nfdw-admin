import axios from "axios";
import {mGetBiddingList,
        mGetStrategyTree, //获取对比策略树
        mGetCompareStrategy, //获取对比策略
        mGetBiddingTop,  //获取标包Top5
        mGetBiddingDetail, //获取标包详情
        mExportComparePDF
} from "@/api/data.js";
import {mlogin} from "@/api/user.js";
let baseUrl= "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "/api"  //开发环境配置请求代理
        break;
    case 'production':
        baseUrl = ""   //生产环境url
        break;
}
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true; //携带cookie

export default {
    //登录
     login({commit}, params) {
        return new Promise((resolve, reject) => {
            mlogin(params).then(res => {
                const data = res.data;
                commit("updateUserInfo", data)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    //标书或项目列表接口
    getBiddingList({commit}, queryParam) {
        return new Promise((resolve, reject) => {
            mGetBiddingList(queryParam).then(res => {
                const data = res.data;
                commit("getBiddingList", data.data.records)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    //获取标包详情
    getBiddingDetail({commit},queryParam){
        return new Promise((resolve,reject)=>{
            mGetBiddingDetail(queryParam).then(res =>{
                const data = res.data;
                commit('uploadBiddingInfo',data.data);
                resolve(data);
            }).catch(err =>{
                reject(err)
            })
        })
    },
    //获取对比策略树的接口
    getStrategyTree({commit}){
        return new Promise((resolve, reject) => {      
            mGetStrategyTree().then(res => {
                const data = res.data;
                commit("updateStrategyTreeData", data.data)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    //对比策略
    getCompareStrategy({commit}, queryParam) {
        return new Promise((resolve, reject) => {      
            mGetCompareStrategy(queryParam).then(res => {
                const data = res.data;
                commit("updateCompareStrategyData", data.data.records)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    //标包top5
    getBiddingTop({commit}, queryParam){
        return new Promise((resolve, reject) => {      
            mGetBiddingTop(queryParam).then(res => {
                const data = res.data;
                commit("updateBiddingTopData", data.data)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    //导出pdfmExportComparePDF
    exportComparePDF({commit},queryParam){
        return new Promise((resolve, reject) => {      
            mExportComparePDF(queryParam).then(res => {
                const data = res;
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}