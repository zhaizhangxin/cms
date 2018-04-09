$(function() {
	$('.registered').click(function() {
		alert('请在APP内注册');
//		window.location.replace('registered.html');
	});
	
	function login(device) {
		$.ajax({
			type: "post",
			url: "/api/user/" + device + "/loginPass",
			data: $('.login').serialize(),
			dataType: "json",
			async: true,
			success: function(data) {
				var status = data.status;
				var msg = data.msg;
				if(status == '0') {
					console.log(data);
					var bodys = data.body;
					var rsid = bodys.rsid;
					sessionStorage.rsid = rsid;
//					window.location.replace('find.html');
					window.location.href = document.referrer;
				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('请求出错');
			}
		});
	}

	if(isiOS) {
		$('.login_back').click(function() {
			login('ios');
		});
	}
	if(isAndroid) {
		$('.login_back').click(function() {
			login('android');
		});
	}
});