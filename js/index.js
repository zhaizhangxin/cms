$(function() {
	//点击出现箭头
	$('ul a').each(function() {
		if($($(this))[0].href == String(window.location))
			$('.a_index').addClass('a_index');
	});

	$('#loginIn').click(function() {
		login();
	});

	function login() {
		var nameDate = $('#name').val();
		var passDate = $('#pass').val();
		//		console.log(passDate)
//		if(nameDate != 'admin') {
//			alert('用户名或密码错误');
//		} else if(nameDate == '') {
//			alert('用户名不能为空');
//		} else if(passDate != 'admin123') {
//			alert('用户名或密码错误');
//		} else if(passDate == '') {
//			alert('密码不能为空');
//		} else {
			$.ajax({
				type: "post",
				url: "/api/auth/cmsLogin",
				data: $('#login').serialize(),
				dataType: "json",
				async: false,
				success: function(data) {
					var status = data.status;
					var msg = data.msg;
					if(status == '0') {
						console.log(data);
						var bodys = data.body;
						var user = bodys.user;
						rsidDate = bodys.rsid;
						uid = user.uid;
						localStorage.rsidDate = rsidDate;
						localStorage.uid = uid;
						window.location.replace('reviewed.html');

						console.log(localStorage.rsidDate);
						console.log(localStorage.uid);
					} else {
						alert(msg);
					}
				},
				error: function() {
					alert('请求错误');
				}
			});

//		}
	}

	//按下的是那个键
	window.document.onkeydown = disableRefresh;

	function disableRefresh(evt) {
		evt = (evt) ? evt : window.event
		if(evt.keyCode) {
			if(evt.keyCode == 13) {
				login();
			}
		}
	}
})