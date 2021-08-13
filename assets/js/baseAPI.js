// $.ajaxPrefilter是jq的方法，在发起get，post，ajax前调用
$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3008" + options.url
        // console.log(options);
})