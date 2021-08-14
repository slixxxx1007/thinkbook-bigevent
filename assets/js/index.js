$(function() {
        getUserInfo()
        var layer = layui.layer
        $("#btnLogout").on("click", function() {
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem("token")
                location.href = "/login.html"
                console.log("ok");
                layer.close(index);
            });
        })
    })
    // 定义获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.code !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            layui.layer.msg('获取用户信息成功')
            console.log(res);
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log(res.responseJSON);
        //     if (res.responseJSON.code === 1) {
        //         localStorage.removeItem("token")
        //         location.href = "/login.html"
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}