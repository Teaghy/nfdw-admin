import Vue from 'vue';

Vue.filter('openStatusFmt', function (status) {
    var statusTxt = '';
    switch (status) {
        case 0: statusTxt = '否'; break;
        case 1: statusTxt = '是'; break;
    }
    return statusTxt;
});
Vue.filter('strategyStatusFmt', function (status) {
    var statusTxt = '';
    switch (status) {
        case 0: statusTxt = '符合'; break;
        case 1: statusTxt = '不符合'; break;
    }
    return statusTxt;
});