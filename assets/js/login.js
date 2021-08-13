$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    // 校验密码
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    // 注册请求事件
    $("#form-reg").on("submit", function(e) {
        // 阻止默认提交事件，通过ajax来发起请求
        e.preventDefault()
        var data = {
            username: $("#form-reg [name=username]").val(),
            password: $("#form-reg [name=password]").val(),
            repassword: $("#form-reg [name=repassword]").val()
        };
        $.post("/api/reg", data, function(res) {
            if (res.code !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功，请登录!")
                // 模拟点击事件
            $("#link_login").click()
        });
    });

    // 登陆实现
    $("#form-login").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg("登录失败")
                }
                console.log(res);
                layer.msg("登录成功");
                localStorage.setItem("token", res.token)
                location.href = "../../index.html"
            }
        })
    })
})