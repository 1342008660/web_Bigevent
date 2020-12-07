$(function () {

    // 点击“注册”链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击"登陆"链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象

    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()自定义校验规则

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function (value) {
            // 通过形参那倒的是确认密码框中的内容
            // 还需要那倒密码框中的内容
            // 然后进行等于判断
            // 如果判断失败则return一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })


    // 注册、监听注册表单的提交事件

    $('#form_reg').on("submit", function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 发起Ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        $.post('/api/reguser', data, function (res) {

            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        })

    })


    // 监听登陆表单提交事件
    $("#form_login").on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            url: "/api/login",  //默认当前页
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {  //请求成功回调
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')

                localStorage.setItem('token',res.token);
                location.href = '/index.html'
                // location.href = '/index.html'
            }
        })
    })
})