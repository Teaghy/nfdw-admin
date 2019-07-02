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
    if(status){
       statusTxt = '符合'; 
    }else{
       statusTxt = '不符合';
    }
    return statusTxt;
});
Vue.filter('percentStatusFmt', function (number) {
    var numtxt = '';
     if (number == 0) {
        return 0;
    }
    var numtxt=Number(number*100).toFixed(2);
    numtxt+="%";
    return numtxt;
});