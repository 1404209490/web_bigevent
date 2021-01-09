$(function(){
    $('#showReg').on('click',function(){
        $('.login').hide()
        $('.reg').show()
    })
    $('#showLogin').on('click',function(){
        $('.reg').hide()
        $('.login').show()
    })
    var form=layui.form
    form.verify({
        //校验两次输入的密码是否一样
        repassworf:function(){
            if( $(".password1").val() !== $('.password2').val()){
                return '两次密码不一样'

            }
        },
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] 
      });
      //触发注册表单事件
      $('.reg').on('submit',function(e){
          //阻止表单默认行为
          e.preventDefault();
          //发起请求注册新用户
         $.post('http://api-breakingnews-web.itheima.net/api/reguser',{username:$('.reg [name=username').val(),password:$('.reg [name=password]').val()},function(res){
            if(res.status !==0 ){
               return console.log(res.message);
            }
            layer.msg('注册成功，请登录！')
            //跳转到登录页面
            $('#showLogin').click()
         })
      })
      //触发登录表单事件
      $('.login').on('submit',function(e){
          //阻止表单默认行为
          e.preventDefault();
          //发起登录请求
          $.post('http://api-breakingnews-web.itheima.net/api/login',{username:$('.login [name=username').val(),password:$('.login [name=password]').val()},function(res){
            if(res.status !==0 ){
                return console.log('登录失败！');
             }
             layer.msg('登录成功')
             //将登录成功得到的token字符串，保存到localStorage中
             localStorage.setItem('token',res.token)
             
            location.href = '/index.html'
          
          })

      })
})