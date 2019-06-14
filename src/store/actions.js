import axios from "axios";
axios.defaults.baseURL = "http://10.96.8.56:8080";

export default {
    //上传文件接口
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