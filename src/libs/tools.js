export const addRedem = (str,diff)=>{
    var strText=str
    for(var i=0 ; i<diff.length ; i++){
        var start = strText.substring(0,diff[i][0]+i*9)
        var end =strText.substring(diff[i][1]+i*9)
        var em ='<em>'+strText.substring(diff[i][0]+i*9,diff[i][1]+i*9)+'</em>'
        strText=start +em +end	          
    }
    return strText
}
export const addgreen = (str,diff)=>{
    var strText=str
    for(var i=0 ; i<diff.length ; i++){
        var start = strText.substring(0,diff[i][0]+i*7)
        var end =strText.substring(diff[i][1]+i*7)
        var em ='<i>'+strText.substring(diff[i][0]+i*7,diff[i][1]+i*7)+'</i>'
        strText=start +em +end	          
    }
    return strText
}