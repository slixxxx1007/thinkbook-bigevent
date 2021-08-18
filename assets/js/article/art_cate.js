$(function() {
    var layer = layui.layer
    var form = layui.form
        // 初始化文章分类列表
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/cate/list",
            success: function(res) {
                // console.log(res);
                var htmlStr = template("tpl", res)
                $("tbody").html(htmlStr)
            }
        })
    }
    //弹出层
    // 关闭弹出层所需要的index值
    var addIndex = null

    $("#btnAddCate").on("click", function() {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/cate/add",
            data: $("#form-add").serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg("新增文章分类失败！")
                }
                initArtCateList()
                layer.msg("新增文章分类成功！")
                layer.close(addIndex)
            }
        })
    })

    // 关闭弹出层所需要的index值
    var editIndex = null
        // 点击修改按钮事件弹出层
    $("body").on("click", '.btn-edit', function() {
        editIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        var id = $(this).attr('data-id');
        $.ajax({
            method: "GET",
            url: "/my/cate/info?id=" + id,
            success: function(res) {
                // 填入两个值，第一个是被填入的表单，第二个是填入表单的数据，需要表单的name与返回数据的name一直致
                form.val('form-edit', res.data)
            }
        })
    })

    // 点击确认按钮请求修改数据
    $("body").on("submit", "#form-edit", function(e) {
            e.preventDefault()

            $.ajax({
                method: "put",
                url: "/my/cate/info",
                data: $(this).serialize(),
                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg('更新分类数据失败！')
                    }
                    layer.msg('更新分类数据成功！')
                        // 关闭弹出层
                    layer.close(editIndex)
                    initArtCateList()
                }
            })
        })
        //点击删除
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'DELETE',
                url: '/my/cate/del?id=' + id,
                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})