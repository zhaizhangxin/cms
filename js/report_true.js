$(function() {
	var rsidDate = localStorage.rsidDate;
	//点击出现箭头
	$('ul a').each(function() {
		if($($(this))[0].href == String(window.location))
			$('.a_index').addClass('a_index');
	});

	function searchReportInfo(checkStatus, page, fn) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/search/activity/android/searchReportInfo/" + checkStatus + "/" + page + "",
			async: true,
			success: fn,
			error: function() {
				alert('请求数据失败,请重新请求')
			}
		});
	}

	function searchReport(data) {
		var data = JSON.parse(data);
		console.log(data);
		var bodys = data.body;
//		举报信息
		var reports = bodys.reports;
		reports.forEach(function(item,index){
			//		活动名称
			var subject = item.subject;
			//		主办方
			var organizers = item.organizers;
//				举报人
			var uname = item.username;
			//		举报内容
			var type = item.type;
			if(type == '1'){
				type = '色情低俗'
			}
			if(type == '2'){
				type = '政治敏感'
			}
			if(type == '3'){
				type = '涉嫌违法犯罪'
			}
			if(type == '4'){
				type = '侵权（抄袭、侵犯名誉等）'
			}
			//		举报时间
			var createTime = item.createTime;
//			审核时间
			var checkTime = item.checkTime;
			if(subject == ''){
				organizers.forEach(function(organitem,organindex){
	//				主办方名字
					username = organitem.username; 
				})
				var username;
				$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on"></th><th>' + username + '</th><th>' + uname + '</th><th>'+ type +'</th><th>'+ createTime +'</th><th>'+checkTime+'</th></tr>');
			}
			if(uname == ''){
				organizers.forEach(function(organitem,organindex){
	//				主办方名字
					username = organitem.username; 
				})
				var username;
				$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>' + username + '</th><th></th><th>'+ type +'</th><th>'+ createTime +'</th><th>'+checkTime+'</th></tr>');
			}
			if(createTime == ''){
				organizers.forEach(function(organitem,organindex){
	//				主办方名字
					username = organitem.username; 
				})
				var username;
				$('').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>' + username + '</th><th>' + uname + '</th><th>'+ type +'</th><th></th><th>'+checkTime+'</th></tr>');
			}
			if(organizers == ''){
				$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th></th><th>' + uname + '</th><th>'+ type +'</th><th>'+ createTime +'</th><th>'+checkTime+'</th></tr>');
			}else{
				if(organizers.length <= 1 && subject != ''){
					organizers.forEach(function(organitem,organindex){
		//				主办方名字
						username = organitem.username;
						$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>'+username+'</th><th>' + uname + '</th><th>'+ type +'</th><th>'+ createTime +'</th><th>'+checkTime+'</th></tr>');
					})
				}
				if(organizers.length > 1){
					organizers.forEach(function(organitem,organindex){
		//				主办方名字
						username = organitem.username;
					})
					var username;
					$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>'+username+'</th><th><span id="or_name">'+uname+'</span></th><th>'+ type +'</th><th>'+ createTime +'</th><th>'+checkTime+'</th></tr>');
					
				}
			}
			
			
		})
	}

	searchReportInfo(1, 1, searchReport);

})