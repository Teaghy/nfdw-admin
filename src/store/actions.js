import axios from "axios";
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

export default {
    //上传文件接口(暂时用element自带的上传插件)
    uploadBidding({ commit }, data){
        let url = "/bidding/upload";
        // let config = {
        //     headers: {'Content-Type': 'multipart/form-data'}
        // }
        axios.post(url,data)
            .then(res => {
                console.log(res)
                return false
                return res.data.data.records;
            })
            .then(json => {
                    commit("mGetBiddingList", json);
                })
    },
    //标书或项目列表接口
    mGetBiddingList({ commit }, data) {
        // let url = "/datadetail/{dataId}"
        let url = "/bidding/page";
        axios.post(url,data)
            .then(res => {
                return res.data.data.records;
            })
            .then(json => {
                    commit("mGetBiddingList", json);
                })
    }

}