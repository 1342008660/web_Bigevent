$(function () {

    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6)
                return '昵称长度必须在1 ~ 6个字符之间！'
        }
    })

    initUserInfo();
    $('.layui-input-block [name = username]').on('click',function(){
        layer.msg('登录名无法修改!')
    })
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                form.val('formUserInfo', res.data)
            },

        })
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    $('.layui-form').on('submit', function (e) {
        // console.log($(this).serialize());
        // console.log(decodeURIComponent($('.layui-form').serialize()));
        e.preventDefault()
        $.ajax({
            type: "POST",  //默认get
            url: "/my/userinfo",  //默认当前页
            data: decodeURIComponent($(this).serialize()),  //格式{key:value}
            success: function (res) {  //请求成功回调
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
        
    })

    
})






