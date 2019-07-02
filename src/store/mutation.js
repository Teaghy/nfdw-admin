function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = '';
        }
    }
    return c;
}
export default {
    uploadBiddingInfo(state, data){
        state.uploadBiddingInfoData = data;
    },
    getBiddingList(state, data) {
        state.mGetBiddingListData = data;
    },
    updateUserInfo(state, data){
        state.userInfo = data
    },
    updateStrategyTreeData(state, data){
        state.strategyTreeData = data
    },
    updateCompareStrategyData(state, data){
        state.compareStrategyData = data
    }, 
    updateBiddingTopData(state,data){
        state.biddingTopData = data
    },
    //重置state的值
     mResState(state){  
        var copyState = deepCopy(state);  //拷贝state对象    
        for(var i in copyState){
            state[i] = copyState[i]  // 递归赋值
        }
    }
}