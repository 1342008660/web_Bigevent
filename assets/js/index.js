$(function () {
    if (localStorage.getItem('token') === null) {
        location.href = '/login.html'
    }
    // 隐藏用户头像
    $('.text-avatar').hide()
    $('.layui-nav-img').hide()


    // 调用 getUserInfo 获取用户信息
    getUserInfo();

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 提示音用户确认是否退出
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭confim询问框
            layer.close(index);

        });
    })
})

function getUserInfo() {

    $.ajax({
        method: 'GET',  //默认get
        url: '/my/userinfo',  //默认当前页
        // heades 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {  //请求成功回调
            console.log(localStorage.getItem('token'));
            console.log(res);

            if (res.status !== 0) {
                return layui.layer.msg('用户信息获取失败！')
            }
            layer.msg('登陆成功')
            renderAvatar(res.data)
        },
        // complete: function (res) {

        //     console.log(res.responseJSON.status);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // } //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置

    })
}

// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nicknam || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').prop('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        // $('.text-avatar').html().show();
        $('.layui-nav-img').hide()

        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}