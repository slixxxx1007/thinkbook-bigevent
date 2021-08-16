$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $("#btnChooseImage").on("click", function() {
        $("#file").click()
    })
    $("#file").change(function(e) {
            // 拿到用户选择的文件
            var filelist = e.target.files
            if (filelist.length === 0) {
                return layui.layer.msg("请选择照片")
            }
            // console.log(filelist);
            var file = e.target.files[0]
            var imgURl = URL.createObjectURL(file)
            $image
                .cropper("destroy")
                .attr('src', imgURl)
                .cropper(options)
        })
        // 确定上传图片
    $("#btnUpload").on("click", function() {
        console.log(222);
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: "PATCH",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})