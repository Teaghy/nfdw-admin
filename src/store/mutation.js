export default {
    uploadBiddingInfo(state, data){
        state.uploadBiddingInfoData = data;
    },
    mGetBiddingList(state, data) {
        state.mGetBiddingListData = data;
    },
    updateUserInfo(state, data){
        state.userInfo = data
    }
}