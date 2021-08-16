$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            newPwd: function(value) {
                if (value === $("[name=old_pwd]").val()) {
                    return "新密码不能与原密码一致"
                }

            },
            rePwd: function(value) {
                if (value !== $("[name=new_pwd]").val()) {
                    return "两次密码输入不一致"
                }

            }
        })
        // 用户点击选择图片
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: "PATCH",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg("更新密码失败!")
                }
                layer.msg("更新密码成功!")
                $(".layui-form")[0].reset()
            }
        })
    })

})