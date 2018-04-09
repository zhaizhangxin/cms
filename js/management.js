$(function() {
	var rsidDate = localStorage.rsidDate;
	var i = 1;
	var msg = '';
	var dev;
	if(isAndroid){
		dev = 'Android';
	}else if(isiOS){
		dev = 'ios';
	}else{
		dev = 'cms';
	}
	//	var uid = localStorage.uid;
	console.log(rsidDate);
	//点击出现箭头
	$('ul a').each(function() {
		if($($(this))[0].href == String(window.location))
			$('.a_index').addClass('a_index');
	});
	//时间
	function stringHandel(str) {
		var splitArr = str.split('-'),
			i;
		str = '';
		for(i = 0; i <= 2; i += 1) {
			if(splitArr[i][0] === '0') {
				splitArr[i] = splitArr[i].substr(1);
			}
		}
		str = splitArr[0] + '|' + splitArr[1] + '|' + splitArr[2] + '|';
		return str;
	}

	//发现草稿列表
	function find_draft(page, fn) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/findDraftList/" + page + "",
			async: false,
			success: fn,
			error: function() {
				alert('请求出错');
			}
		});
	}

	find_draft(1, show_content);

	function show_content(data) {
		//		console.log(data)
		var dateArr = JSON.parse(data);
		console.log(dateArr);
		var dataBody = dateArr.body;
		var pages = dataBody.totalPages;
		console.log(pages)
		var dataAct = dataBody.activities;
		dataAct.forEach(function(item, index) {
			//发布时间
			var time = item.insertTime;
			//			console.log(time)
			//主题
			var subject = item.subject;
			//活动id
			var aid = item.aid;
			//			console.log(aid)
			//主办方
			var dataOrgan = item.organizers;
			if(subject == '') {
				dataOrgan.forEach(function(organItem, indexStr) {
					var name = organItem.username;
					$('#name').append('<tr><th id="preview' + index + '" class="preview" data-id="' + aid + '"></th><th>' + name + '</th><th>' + time + '</th><th><button class="edit_ed" id="edit_ed' + index + '" data-id="' + aid + '">编辑</button></th></tr>');

				})
			}
			if(time == '') {
				dataOrgan.forEach(function(organItem, indexStr) {
					var name = organItem.username;
					$('#name').append('<tr><th id="preview' + index + '" class="preview" data-id="' + aid + '">' + subject + '</th><th>' + name + '</th><th></th><th><button class="edit_ed" id="edit_ed' + index + '" data-id="' + aid + '">编辑</button></th></tr>');

				})
			}
			if(dataOrgan == '') {
				$('#name').append('<tr><th id="preview' + index + '" class="preview" data-id="' + aid + '">' + subject + '</th><th></th><th>' + time + '</th><th><button class="edit_ed" id="edit_ed' + index + '" data-id="' + aid + '">编辑</button></th></tr>');
			}
			if(dataOrgan.length <= 1) {
				dataOrgan.forEach(function(organItem, indexStr) {
					var name = organItem.username;
					$('#name').append('<tr><th id="preview' + index + '" class="preview" data-id="' + aid + '">' + subject + '</th><th>' + name + '</th><th>' + time + '</th><th><button class="edit_ed" id="edit_ed' + index + '" data-id="' + aid + '">编辑</button></th></tr>');
				})
			}
			if(dataOrgan.length > 1) {
				dataOrgan.forEach(function(organItem, indexStr) {
					name = organItem.username;
				})
				var name;
				$('#name').append('<tr><th id="preview' + index + '" class="preview" data-id="' + aid + '">' + subject + '</th><th>' + name + '</th><th>' + time + '</th><th><button class="edit_ed" id="edit_ed' + index + '" data-id="' + aid + '">编辑</button></th></tr>');
			}
			if(i == '1') {
				$('#edit_ed' + index + '').on('click', function() {
					var aid = $(this).data('id');
					localStorage.aid = aid;
					edit(aid,dev);
				});
				$('#preview' + index + '').click(function() {
					var a = $(this).data('id');
					$('.a_find').show();
					$('.zhezhao').show();
					$('.home').show();

					pass(a,dev);
				});
			} else {
				$('#edit_ed' + index + '').on('click', function() {
					var aid = $(this).data('id');
					localStorage.aid = aid;
					console.log(aid);
					plore_edit(aid,dev);
				});
				$('#preview' + index + '').click(function() {
					var a = $(this).data('id');
					$('.a_explore').show();
					$('.zhezhao_a').show();
					$('.home').show();
					pass_explore(a,dev);
				});
			}

		})
		if(i == '1') {
			var ul_page = '<ul class="page"><li class="page_a home_page">首页</li><li class="page_a previous" data-id="1">上一页</li><li class="page_a next" data-id="1">下一页</li><li class="page_a last_page">尾页</li></ul>';
			var str = '';
			for(let i = 1; i <= pages; i++) {
				str += '<li class="page_a pages_num">' + i + '</li>';
			}
			$('.page').empty();
			$('.actity_one').append(ul_page);
			$('.page li').eq(1).after(str);
			pageDate(pages);
		} else {
			var ul_page = '<ul class="page"><li class="page_b home_page">首页</li><li class="page_b previous" data-id="1">上一页</li><li class="page_b next" data-id="1">下一页</li><li class="page_b last_page">尾页</li></ul>';
			var str = '';
			for(let i = 1; i <= pages; i++) {
				str += '<li class="page_b pages_num">' + i + '</li>';
			}
			$('.page').empty();
			$('.actity_one').append(ul_page);
			$('.page li').eq(1).after(str);
			pageDate(pages);
		}
	}
	//在编辑(发现)
	function edit(aid,dev) {
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/details/" + aid + "",
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				msg = data.msg;
				var bodys = data.body;
				//				//头图
				var indexPic = bodys.headPic;
				sessionStorage.marqueePic = indexPic;

				//视频截图(首页)
				var videoImageIndex = bodys.videoImageIndex;
				sessionStorage.videoImageIndex = videoImageIndex;
				//视频截图(头图)
				var videoImageLogo = bodys.videoImageLogo;
				sessionStorage.videoImageLogo = videoImageLogo;

				//				//首图
				var headPic = bodys.indexPic;
				sessionStorage.headPic = headPic;
				//				//活动主题
				var subject = bodys.subject;
				sessionStorage.subject = subject;
				//				//活动标语
				var description = bodys.description;
				sessionStorage.description = description;
				//				//活动收费
				var fee = bodys.fee;
				sessionStorage.fee = fee;
				//				//人数限制
				var number = bodys.activityNum;
				sessionStorage.number = number;
				//				//活动地址
				var address = bodys.address;
				sessionStorage.address = address;
				//				//活动图片
				var mapPic = bodys.mapPic;
				sessionStorage.mapPic = mapPic;
				//				//起始时间
				var beginDateTime = bodys.beginDateTime;
				sessionStorage.beginDateTime = beginDateTime;
				//				//结束时间
				var endDateTime = bodys.endDateTime;
				sessionStorage.endDateTime = endDateTime;
				//				//报名截止时间
				var registerEndTime = bodys.registerEndTime;
				sessionStorage.registerEndTime = registerEndTime;
				//				//主办方名称(头像)
				var organArr = bodys.organizers;
				organArr.forEach(function(item, index) {
					var name = item.username;
					sessionStorage.name = name;
				});
				//				//主办方手机
				var mobile = bodys.mobile;
				sessionStorage.mobile = mobile;
				//				//主办方座机
				var platformPhone = bodys.platformPhone;
				sessionStorage.platformPhone = platformPhone;
				//				//主办方邮箱
				var email = bodys.email;
				sessionStorage.email = email;
			}

		});
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data);
				//body里面的数据
				var bodys = data.body;
				var contents = bodys.contents[2].content.text;
				sessionStorage.contents = contents;

			}
		});
		window.location.href = "review.html";
	}
	//	在编辑(探索)
	function plore_edit(aid,dev) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/"+dev+"/explore/" + aid + "",
			async: false,
			dataType: 'json',
			success: function(data) {
				msg = data.msg;
				var bodys = data.body;
				//首图
				var indexPic = bodys.indexPic;
				sessionStorage.headPic = indexPic;
				//头图
				var headPic = bodys.headPic;
				sessionStorage.marqueePic = headPic;
				//活动主题
				var subject = bodys.subject;
				sessionStorage.subject = subject;

				//视频截图(首页)
				var videoImageIndex = bodys.videoImageIndex;
				sessionStorage.videoImageIndex = videoImageIndex;
				//视频截图(头图)
				var videoImageLogo = bodys.videoImageLogo;
				sessionStorage.videoImageLogo = videoImageLogo;
			},
			error: function() {
				alert('请求出错');
			}
		});
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data);
				//body里面的数据
				var bodys = data.body;
				var contents = bodys.contents[3].content.text;
				sessionStorage.contents = contents;
			},
			error: function() {
				alert('请求出错');
			}
		});
		window.location.href = "plore_edit.html";
	}

	//取消发现预览
	$('.zhezhao').click(function() {
		$('.a_find').hide();
		$('.home').hide();

		$(this).hide()
	});
	//取消探索预览
	$('.zhezhao_a').click(function() {
		$('.a_explore').hide();
		$('.home').hide();

		$(this).hide()
	});
	//预览发现
	function pass(aid,dev) {
		//框架信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/details/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data);
				//body里面的数据
				var bodys = data.body;
				//首图
				var headPic = bodys.indexPic;
				if(!/\.(mp4)$/.test(headPic)) {
					$('#playVideo').hide();
					$('#paused').hide();
					$('.home_subject').remove();
					$('.home_pics').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_5.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_6.png" /></div></div>');
					$('.home_pics').css({
						'height': '281px'
					});
					$('.sec_play').css({
						'height': '281px'
					});
					$('.home_num').css({
						'marginTop': '6px'
					});
					$('#home_des').css({
						'marginTop': '2px',
						'height': '24px',
						'overflow': 'hidden',
						'textOverflow': 'ellipsis',
						'display': '-webkit-box',
						'-webkit-line-clamp': '1',
						'-webkit-box-orient': 'vertical'
					});

					$('#home_pic').css('background-image', 'url(' + headPic + ')');
				} else {
					$('#home_pic').css('background-image', 'url()');
					$('.sec_play').css({
						'position': 'relative',
						'height': '241px'
					});
					$('.home_num').css({
						'marginTop': '10px'
					});
					$('#home_des').css({
						'marginTop': '10px',
						'height': '48px',
						'overflow': 'hidden',
						'textOverflow': 'ellipsis',
						'display': '-webkit-box',
						'-webkit-line-clamp': '2',
						'-webkit-box-orient': 'vertical'
					});
					$('.home_subject').remove();
					$('.sec_play').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_7.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_8.png" /></div></div>');
					$('#subject').css({
						'color': '#434343'
					});
					$('.home_subjectOne').css({
						'top': '-18px'
					})
					$('.home_pics').css({
						'height': '180px'
					});
					$('#home_pic').css({
						'height': '100%'
					});
					$('#paused').show();
					$('#playVideo').show();
					$('#playVideo').attr('src', headPic);
					//点击播放视频

					var myVideos = document.getElementById("playVideo");

					$('#paused').click(function() {
						if(myVideos.paused) {
							myVideos.play();
							$('#paused').hide();
						}
						$('#playVideo').attr('controls', 'true');

					});
				}
				//头图
				var headStr = bodys.headPic;
				if(!/\.(mp4)$/.test(headStr)) {
					$('#playVideos').hide();
					$('#pic img').hide();
					$('#pic').css('background-image', 'url(' + headStr + ')');
				} else {
					$('#pic').css('background-image', 'url()');
					$('#pic img').show();
					$('#playVideos').show();
					$('#playVideos').attr('src', headStr);
					//					$('#sources').attr('src', headStr);
					//点击播放视频
					var myVideo = document.getElementById("playVideos");

					$('#pic img').click(function() {
						if(myVideo.paused) {
							myVideo.play();
							$('#pic img').hide();
						}
						$('#playVideos').attr('controls', 'true');

					});
				}

				$('#active_zi').html(bodys.subject);
				//首页主题
				$('#subject').html(bodys.subject);
				//首页描述
				$('#home_des').html(bodys.description);
				$('#act_zi').html(bodys.description);
				//首页活动人数
				$('#homeNum').html(bodys.activityNum);
				//地址图片
				var mapStr = bodys.mapPic;
				$('#add_ress').css('background-image', 'url(' + mapStr + ')');
				$('#act_time').html(stringHandel(bodys.beginDateTime) + '-' + stringHandel(bodys.endDateTime));
				//首页发布时间
				$('#time').html(stringHandel(bodys.beginDateTime) + '-' + stringHandel(bodys.endDateTime));

				$('#act_address').html(bodys.address);
				$('#act_fee').html(bodys.fee);
				$('#act_num').html(bodys.activityNum);
				$('#act_date').html(bodys.registerEndTime);
				$('#num').html(bodys.attenceNum);
				$('#y_num').html(bodys.focusNum);
				//主办方信息
				var organArr = bodys.organizers;
				if(organArr == '') {
					return;
				} else {
					organArr.forEach(function(item, index) {
						$('.or_name').html('<span class="orgin"><img src="' + item.headPic + '" alt="" id="or_img"/><span id="or_name">' + item.username + '</span></span>');
						if($('.or_name').find('img').length > 0) {
							$(this).css({
								padding: 0
							});
						}
						//首页主办方
						$('.home_name').html('<span id="or_name">' + item.username + '</span>');

					});
				}
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				//body里面的数据
				var bodys = data.body;
				//				var actStatus = bodys.status;
				$('#details').html(bodys.contents[2].content.text);
				$.each($('#details').find('p'), function(index, element) {
					if($(element).find('img').length > 0) {
						$(this).css({
							padding: 0
						});
					}
				});
			}
		});
	}

	//	预览探索
	function pass_explore(aid,dev) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/"+dev+"/explore/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data)
				//body里面的数据
				var bodys = data.body;
				//首图
				var headPic = bodys.indexPic;
				if(!/\.(mp4)$/.test(headPic)) {
					$('#playVideo').hide();
					$('#paused').hide();
					$('.home_subject').remove();
					$('.home_pics').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_5.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_6.png" /></div></div>');
					$('.home_pics').css({
						'height': '281px'
					});
					$('.sec_play').css({
						'height': '281px'
					});
					$('.home_num').css({
						'marginTop': '6px'
					});
					$('#home_des').css({
						'marginTop': '2px',
						'height': '24px',
						'overflow': 'hidden',
						'textOverflow': 'ellipsis',
						'display': '-webkit-box',
						'-webkit-line-clamp': '1',
						'-webkit-box-orient': 'vertical'
					});
					$('#home_pic').css('background-image', 'url(' + headPic + ')');
				} else {
					$('#home_pic').css('background-image', 'url()');
					$('.sec_play').css({
						'position': 'relative',
						'height': '241px'
					});
					$('.home_num').css({
						'marginTop': '10px'
					});
					$('#home_des').css({
						'marginTop': '10px',
						'height': '48px',
						'overflow': 'hidden',
						'textOverflow': 'ellipsis',
						'display': '-webkit-box',
						'-webkit-line-clamp': '2',
						'-webkit-box-orient': 'vertical'
					});
					$('.home_subject').remove();
					$('.sec_play').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_7.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_8.png" /></div></div>');
					$('#subject').css({
						'color': '#434343'
					});
					$('.home_subjectOne').css({
						'top': '-18px'
					})
					$('.home_pics').css({
						'height': '180px'
					});
					$('#home_pic').css({
						'height': '100%'
					});
					$('#paused').show();
					$('#playVideo').show();
					$('#playVideo').attr('src', headPic);
					//点击播放视频
					var myVideos = document.getElementById("playVideo");

					$('#paused').click(function() {
						if(myVideos.paused) {
							myVideos.play();
							$('#paused').hide();
						}
						$('#playVideo').attr('controls', 'true');

					});
				}
				//头图
				var headStr = bodys.headPic;
				if(!/\.(mp4)$/.test(headStr)) {
					$('#explore_playVideo').hide();
					$('#pics img').hide();
					$('#pics').css('background-image', 'url(' + headStr + ')');
				} else {
					$('#pics').css('background-image', 'url()');
					$('#pics img').show();
					$('#explore_playVideo').show();
					$('#explore_playVideo').attr('src', headStr);
					//					$('#sources').attr('src', headStr);
					//点击播放视频
					var myVideo = document.getElementById("explore_playVideo");

					$('#pics img').click(function() {
						if(myVideo.paused) {
							myVideo.play();
							$('#pics img').hide();
						}
						$('#explore_playVideo').attr('controls', 'true');

					});
				}
				//发布时间
				var time = bodys.insertTime;
				$('#activityTime').html(time);
				//首页发布时间
				$('#time').html(time);
				$('#time').css({
					'marginLeft': '32%'
				})
				//首页主题
				$('#subject').html(bodys.subject);
				//阅读数
				var readNum = bodys.readersNum;
				$('#read_num').html(readNum);
				var organArr = bodys.organizers;
				if(organArr == '') {
					return;
				} else {
					organArr.forEach(function(item, index) {
						$('#head_pic').css('background-image', 'url(' + item.headPic + ')');
						$('#author_name').html(item.username);
						//首页主办方
						$('.home_name').html('<span id="or_name">' + item.username + '</span>');

					});
				}
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				//body里面的数据
				var bodys = data.body;
				//				var actStatus = bodys.status;
				$('#detail').html(bodys.contents[3].content.text);
				$.each($('#detail').find('p'), function(index, element) {
					if($(element).find('img').length > 0) {
						$(this).css({
							padding: 0
						});
					}
				});
			}
		});
	}

	//探索草稿列表
	function plore_draft(page, fn) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/exploreTheDraftList/" + page + "",
			async: false,
			success: fn,
			error: function() {
				alert('请求出错');
			}
		});
	}
	//点击显示不同的数据
	//	var type = 2;
	$('.explore_a').click(function() {
		i = $(this).index();
		var type = $(this).data('type');
		localStorage.type = type;
		console.log(localStorage.type)
		//		console.log(i)
		if(i == '1') {
			$('#name').empty();
			$('#name').append('<tr><th>活动名称</th><th>主办方</th><th>存稿时间</th><th>操作</th></tr>');
			find_draft(1, show_content);
		} else {

			$('#name').empty();
			$('#name').append('<tr><th>活动名称</th><th>主办方</th><th>存稿时间</th><th>操作</th></tr>');
			plore_draft(1, show_content);
		}
		$(this).css({
			'height': '32px',
			'background': '#6e7b08',
			'marginTop': '-1px',
			'border': '1px solid #6e7b08'
		}).siblings(this).css({
			'height': '30px',
			'background': 'none',
			'marginTop': 'none',
			'border': 'none'
		});
	});

	//分页
	var total_page = 1;

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
		//		//发现草稿
		$('.page_a').click(function() {
			$('#name').empty();
			$('#name').append('<tr><th>活动名称</th><th>主办方</th><th>存稿时间</th><th>操作</th></tr>');
			find_draft(total_page, show_content);
		});
		//探索草稿
		$('.page_b').click(function() {
			$('#name').empty();
			$('#name').append('<tr><th>活动名称</th><th>主办方</th><th>存稿时间</th><th>操作</th></tr>');
			plore_draft(total_page, show_content);
		});
	}

});