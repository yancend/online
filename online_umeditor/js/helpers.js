/**
 * Created by dongyancen on 14-2-18.
 */
function nextProgress(callbackF){
    $.ajax({
        url: 'php/actionsWithProgress.php',
        type: 'post',
        data: 'f=nextProgress',

        success: function (msg) {
            if (!msg || !eval("(" + msg + ")")) {//没有返回结果或者返回false
               //todo
                return false;
            }
            else {
                var rel = eval("(" + msg + ")");
                if(rel === true){
                    //todo
                    callbackF();
                    return true;
                }else{
                    //todo
                    return false;
                }

            }
        },
        error: function (xhr, msg) {
            return false;
        }
    });
}
function nextStep(){
    var pageUrl = arguments[0] ? arguments[0] : 'index.php';
    nextProgress(function(){window.open(pageUrl,'_self');});
}
function rollbackProgress(dest,callbackF){
    $.ajax({
        url: 'php/actionsWithProgress.php',
        type: 'post',
        data: 'f=rollbackProgress&dest='+dest,

        success: function (msg) {
            if (!msg || !eval("(" + msg + ")")) {//没有返回结果或者返回false
                //todo
                return false;
            }
            else {
                var rel = eval("(" + msg + ")");
                if(rel === true){
                    //todo
                    callbackF();
                    return true;
                }else{
                    //todo
                    return false;
                }

            }
        },
        error: function (xhr, msg) {
            return false;
        }
    });
}
function  rollback(dest){
    var pageUrl = arguments[0] ? arguments[0] : 'index.php';
    rollbackProgress(dest,function(){window.open(pageUrl,'_self');});
}