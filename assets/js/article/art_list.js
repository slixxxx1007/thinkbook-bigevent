$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
        // 定义查询参数将来请求数据的时候，
        // 需要将请求参数对象提交到服务器
    var q = {
            pagenum: 1, // 页码值，默认请求第一页的数据
            pagesize: 2, // 每页显示几条数据，默认每页显示2条
            cate_id: '', // 文章分类的 Id
            state: '' // 文章的发布状态

        }
        // 定义时间过滤器
    template.defaults.imports.dateFormate = function(date) {
        const dt = new Date()
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDay())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    }

    // 定义补零函数
    function padZero(n) {
        return n < 10 ? "0" + n : n
    }
    // 初始化文章列表
    initTable()

    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg("获取分类数据失败")
                }
                var htmlStr = template("tpl_table", res)
                $("tbody").html(htmlStr)
                renderpage(res.total)
            }
        })
    }
    // 初始化分类列表
    initcate()

    function initcate() {
        $.ajax({
            method: "GET",
            url: "/my/cate/list",
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg("获取分类列表失败")
                }
                var htmlStr = template("tpl_cate", res)
                $("[name=cate_id]").html(htmlStr)
                    // 解决页面初始化时分类无法显示问题
                form.render()
            }
        })
    }

    // 筛选功能
    $("#form-search").on("submit", function(e) {
            e.preventDefault()
                // 获取选择框里的值，重新赋值给查询参数q的配置项，然后重新渲染页面
            var cate_id = $("[name=cate_id]").val()
            var state = $("[name=state]").val()
                // console.log(cate_id, state);
            q.cate_id = cate_id
            q.state = state
            initTable()
        })
        // 分页功能
    function renderpage(total) {
        // laypage是layui的分页方方法
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10, 20],
            // 分页发生切换的时候触发jump回调
            // 触发jump回调的方式有两种，第二种是调用laypage.render()函数时触发
            // first是laypage.render()返回的第二个参数
            // 调用laypage.render()函数时触发时返回的是布尔值
            jump: function(obj, first) {
                // console.log(first);
                // console.log(obj);这里的obj接受的是我们定义的pagebox里的配置项
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    $("body").on("click", ".btn-delete", function() {
        // console.log("ok");
        var len = $(".btn-delete").length
        var id = $(this).attr("data-id")
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: "DELETE",
                url: "/my/article/info?id=" + id,
                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg("删除文章失败！")
                    }
                    // 判断本页还有几条数据，如果是最后一条，则页码值减一再刷新页面
                    if (len === 1) {
                        // 判断当前页码值是否为一，如果为一则页码值等于一，不进行减一的操作
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    layer.msg("删除文章成功！")

                    initTable()

                }
            })
            layer.close(index);
        });
    })

})