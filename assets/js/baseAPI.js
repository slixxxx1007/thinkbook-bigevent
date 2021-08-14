// $.ajaxPrefilter是jq的方法，在发起get，post，ajax前调用
$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3008" + options.url
        // console.log(options);
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    };
    options.complete = function(res) {
        console.log(res.responseJSON);
        if (res.responseJSON.code === 1) {
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }
})