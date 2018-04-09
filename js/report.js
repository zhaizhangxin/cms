$(function() {
	var rsidDate = localStorage.rsidDate;
	var device;
	var total_page = 1;
	if(isAndroid){
		device = 'Android';
	}else if(isiOS){
		device = 'ios';
	}else{
		device = 'cms';
	}
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
		var pages = bodys.totalPages; //总页数
//		举报信息
		var reports = bodys.reports;
		reports.forEach(function(item,index){
			//		活动名称
			var subject = item.subject;
			var rid = item.rid;
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
			
			if(subject == ''){
				organizers.forEach(function(organitem,organindex){
	//				主办方名字
					username = organitem.username; 
				})
				var username;
				$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on"></th><th>' + username + '</th><th>' + uname + '</th><th>'+ type +'</th><th>'+ createTime +'</th><th><button class="pass" data-rid="'+rid+'" data-switch="on">属实</button></th><th><button class="nopass" data-rid="'+rid+'" data-switch="on">不实</button></th></tr>');
			}
			if(uname == ''){
				organizers.forEach(function(organitem,organindex){
	//				主办方名字
					username = organitem.username; 
				})
				var username;
				$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>' + username + '</th><th></th><th>'+ type +'</th><th>'+ createTime +'</th><th><button class="pass" data-rid="'+rid+'" data-switch="on">属实</button></th><th><button class="nopass" data-rid="'+rid+'" data-switch="on">不实</button></th></tr>');
			}
			if(createTime == ''){
				organizers.forEach(function(organitem,organindex){
	//				主办方名字
					username = organitem.username; 
				})
				var username;
				$('').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>' + username + '</th><th>' + uname + '</th><th>'+ type +'</th><th></th><th><button class="pass" data-rid="'+rid+'" data-switch="on">属实</button></th><th><button class="nopass" data-rid="'+rid+'" data-switch="on">不实</button></th></tr>');
			}
			if(organizers == ''){
				$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th></th><th>' + uname + '</th><th>'+ type +'</th><th>'+ createTime +'</th><th><button class="pass" data-rid="'+rid+'" data-switch="on">属实</button></th><th><button class="nopass" data-rid="'+rid+'" data-switch="on">不实</button></th></tr>');
			}else{
				if(organizers.length <= 1 && subject != ''){
					organizers.forEach(function(organitem,organindex){
		//				主办方名字
						username = organitem.username;
						$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>'+username+'</th><th>' + uname + '</th><th>'+ type +'</th><th>'+ createTime +'</th><th><button class="pass" data-rid="'+rid+'" data-switch="on">属实</button></th><th><button class="nopass" data-rid="'+rid+'" data-switch="on">不实</button></th></tr>');
					})
				}
				if(organizers.length > 1){
					organizers.forEach(function(organitem,organindex){
		//				主办方名字
						username = organitem.username;
					})
					var username;
					$('.pass_act').append('<tr><th class="clickDate" id="clickDate' + index + '" data-switch="on">'+subject+'</th><th>'+username+'</th><th><span id="or_name">'+uname+'</span></th><th>'+ type +'</th><th>'+ createTime +'</th><th><button class="pass" data-rid="'+rid+'" data-switch="on">属实</button></th><th><button class="nopass" data-rid="'+rid+'" data-switch="on">不实</button></th></tr>');
					
				}
			}
			
			
		})
		
		var ul_page = '<ul class="page"><li class="page_a home_page">首页</li><li class="page_a previous" data-id="1">上一页</li><li class="page_a next" data-id="1">下一页</li><li class="page_a last_page">尾页</li></ul>';
		var str = '';
		for(let i = 1; i <= pages; i++) {
			str += '<li class="page_a pages_num">' + i + '</li>';
		}

		$('.page').empty();
		$('.actity_one').append(ul_page);
		$('.page li').eq(1).after(str);
		pageDate(pages);
		
//			是否属实
		function push(device,rid,checkStatus){
			$.ajax({
				type:"post",
				url:"/search/activity/"+device+"/modifyReportReviewStatus/"+rid+"/"+checkStatus+"",
				async:true,
				success:function(data){
					var dataArr = JSON.parse(data);
					var status = dataArr.status;
					var msg = dataArr.msg;
					if(status != '0') {
						alert(msg);
					}
				},
				error:function(){
					alert('修改失败');
				}
			});
		}
//		属实
		$('.pass').on('click',function(){
			var rid = $(this).data('rid');
			if($(this).data('switch') == 'on'){
				$(this).data('switch','off');
				$(this).css({
					'background': '#929292'
				});
			}
			push(device,rid,1);
		});
//		不属实
		$('.nopass').on('click', function() {
			var rid = $(this).data('rid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				$(this).css({
					'background': '#929292'
				});
			}
			push(device,rid,2);
		})
	}
	
	
	//分页
	function pageDate(pages) {
		$('.pages_num').click(function() {
			total_page = $(this).text();
		});
		//上一页
		$('.previous').click(function() {
			if(total_page != 1) {
				total_page--;
			}

		});
		//下一页
		$('.next').click(function() {
			if(total_page != pages) {
				total_page++;
				if(total_page >= pages) {
					total_page = pages;
				}
			}
		});
		//首页
		$('.home_page').click(function() {
			total_page = $(this).index() + 1;
		});
		//尾页
		$('.last_page').click(function() {
			total_page = pages;
		});
		//待审核
		$('.page_a').click(function() {
			$('#name').empty();
			//			$('#name').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>通过</th><th>未通过</th></tr>');
			explore(type, total_page, show__content);
		});
	}

	searchReportInfo(0, total_page, searchReport);

})