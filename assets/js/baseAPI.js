// $.ajaxPrefilter是jq的方法，在发起get，post，ajax前调用
$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3008" + options.url
        // console.log(options);
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    };
    // 无论请求成功与否，都会执行的回调函数
    options.complete = function(res) {
        // console.log(res.responseJSON);
        console.log(res);
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }
})