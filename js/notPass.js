$(function() {
	var rsidDate = localStorage.rsidDate;
	var dev;
	if(isAndroid){
		dev = 'Android';
	}else if(isiOS){
		dev = 'ios';
	}else{
		dev = 'cms';
	}
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
	var type = 2;
	var total_page = 1;
	//查询
	function Inquire(name, page, Inq) {
		$.ajax({
			type: "get",
			url: "/api/activity/searchActivityList/" + name + "/" + page + "/",
			async: true,
			success: Inq,
			error: function() {
				alert('fail');
			}
		});
	}

	//未通过
	function explor(type, page, un) {
		$.ajax({
			type: "get",
			url: "/api/activity/activityReview/2/" + type + "/" + page + "",
			async: false,
			dataType: "json",
			success: un,
			error: function() {
				alert('请求数据失败');
			}
		});
	}

	function nopass_show(data) {
		console.log(data);
		var status = data.status;
		var msg = data.msg;
		if(status == '0') {

			//body里面的数据
			var bodys = data.body;
			var pages = bodys.totalPages; //总页数
			//探索总数
			var exArr = bodys.UPCOMING;
			$('#expl_num').html(exArr);
			//发现总数
			var findArr = bodys.UNPUBLISHED;
			$('#finded_num').html(findArr);
			//围观总数
			var onArr = bodys.ONGOING;
			$('#gathe_num').html(onArr);
			//他们总数
			var theyArr = bodys.COMPLETE;
			$('#theyed_num').html(theyArr);

			//activities数组
			var actAyy = bodys.activities;
			actAyy.forEach(function(actAyyitem, index) {
				//活动id
				var actId = actAyyitem.aid;
				//活动主题
				var sub = actAyyitem.subject;
				//发布时间
				var insert = actAyyitem.insertTime;
				//主办方信息
				var organizersAyy = actAyyitem.organizers;
				if(sub == '') {
					organizersAyy.forEach(function(item, index) {
						//主办方name
						var organname = item.username;
						$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on"></th><th>' + organname + '</th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');

					})
				}
				if(insert == '') {
					organizersAyy.forEach(function(item, index) {
						//主办方name
						var organname = item.username;
						$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th></th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');

					})
				}
				if(organizersAyy == '') {
					$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th></th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');
				}
				if(organizersAyy.length <= 1) {
					organizersAyy.forEach(function(item, index) {
						//主办方name
						var organname = item.username;
						$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');
					})
				}
				if(organizersAyy.length > 1) {
					organizersAyy.forEach(function(item) {
						itemName = item.username;
					})
					var itemName;
					$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + itemName + '</th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');

				}
			})
		} else {
			alert(msg);
		}
		//点击预览
		$('.clickDate').click(function() {
			if(type == '2') {
				var i = $(this).data('id');
				$('.a').show();
				$('.show_announcement').hide();
				$('.zhezhao').show();
				$('.home').show();

				pass(i,dev);
			}
			if(type == '3') {
				var i = $(this).data('id');
				$('.a_explore').show();
				$('.zhezhao_a').show();
				$('.home').show();

				pass_explore(i,dev);
			}
			if(type == '1') {
				var i = $(this).data('id');
				$('.onlookerThey').show();
				$('.zhezhao').show();
				onlookers(i,dev);
			}
			if(type == '0') {
				var i = $(this).data('id');
				$('.onlookerThey').show();
				$('.zhezhao').show();
				activityCircleInfo(i,dev);
			}
		});
		//回退
		function push(aid, status) {
			$.ajax({
				type: "post",
				url: "/api/activity/modifyTheAuditStatus/" + aid + "/" + status + "/",
				async: true,
				success: function(data) {
					var dataArr = JSON.parse(data);
					var status = dataArr.status;
					var msg = dataArr.msg;
					if(status != '0') {
						alert(msg);
					}

				},
				error: function() {
					alert('回退失败');
				}
			});
		}
		//回退
		$('.operating').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				$(this).html('已退');
				$(this).css({
					'background': '#929292'
				});
				push(aid, 0);
				explor(type, total_page);
			} else {
				//							alert('已回退');
			}
		})

		var ul_page = '<ul class="page"><li class="page_c home_page">首页</li><li class="page_c previous" data-id="1">上一页</li><div class="pages_c"></div><li class="page_c next" data-id="1">下一页</li><li class="page_c last_page">尾页</li></ul>';
		var str = '';
		for(let i = 1; i <= pages; i++) {
			str += '<li class="page_c pages_num">' + i + '</li>';

		}
		$('.page').empty();
		$('.actity_two').append(ul_page);

		$('.pages_c').append(str);
		pageDate(pages);

		$('.pages_c li').on('click', function() {
			$(this).addClass('currentli').siblings().removeClass('currentli');
		})

	}
	//点击不同的li传递不同的参数
	$('.explore_b').click(function() {
		type = $(this).data('type');
		$('.did_pass').empty();
		$('.did_pass').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>操作</th></tr>');
		explor(type, 1, nopass_show)
	});

	//点击li颜色变化
	$('.explore_b').on('click', function() {
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
	(function() {
		explor(2, 1, nopass_show);
		$('.find_pass').css({
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
	})();
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
		//未通过
		$('.page_c').click(function() {
			$('.did_pass').empty();
			$('.did_pass').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>操作</th></tr>');
			explor(type, total_page, nopass_show);
		});
	}
	//取消探索预览
	$('.zhezhao_a').click(function() {
		$('.a_explore').hide();
		$('.home').hide();

		$(this).hide()
	});
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
				console.log(data);
				var status = data.status;
				var msg = data.msg;
				if(status == '0') {
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
							'marginTop':'6px'
						});
						$('#home_des').css({
							'marginTop':'2px',
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
							'marginTop':'10px'
						});
						$('#home_des').css({
							'marginTop':'10px',
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
					$('#activity_title').html(bodys.subject);
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
				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('框架信息请求失败');
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				var status = data.status;
				var msg = data.msg;
				if(status == '0') {
					//body里面的数据
					var bodys = data.body;
					//				var actStatus = bodys.status;
					$('#detail').html(bodys.contents[3].content.text);
					$.each($('#detail').find('p'), function(index, element) {
						if($(element).find('img').length > 0) {
							$(this).css({
								padding: 0
							});
							$(this).find('img').attr("style","");
						}
					});

				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('详情信息请求失败');
			}
		});
	}
	//取消发现预览
	$('.zhezhao').click(function() {
		$('.show_announcements').empty();
		$('.or_name').empty();
		$('.home_name').empty();
		$('.a').hide();
		$('.home').hide();
		$(this).hide()
	});
	//点击进入公告
	$('#announcement_all').click(function() {
		$('.show_announcement').show();
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
				var status = data.status;
				var msg = data.msg;
				if(status == '0') {
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
							'marginTop':'6px'
						});
						$('#home_des').css({
							'marginTop':'2px',
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
							'marginTop':'10px'
						});
						$('#home_des').css({
							'marginTop':'10px',
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
					//首页报名
					$('#signUp_up').html(bodys.attenceNum);
					//首页关注
					$('#signUp').html(bodys.focusNum);
					//地址图片
					var mapStr = bodys.mapPic;
					$('#adds_ress').attr('src',mapStr);
//					$('#add_ress').css('background-image', 'url(' + mapStr + ')');
					$('#act_time').html(stringHandel(bodys.beginDateTime) + '-' + stringHandel(bodys.endDateTime));
					//首页发布时间
					$('#time').html(stringHandel(bodys.beginDateTime) + '-' + stringHandel(bodys.endDateTime));
					$('#time').css({
						'marginLeft': '15%'
					})
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
							$('.or_name').append('<span class="orgin"><img src="' + item.headPic + '" alt="" id="or_img"/><span id="or_name">' + item.username + '</span></span>');
							if($('.or_name').find('img').length > 0) {
								$(this).css({
									padding: 0
								});
							}
							//首页主办方
							//						$('.home_name').html('<span id="or_name">' + item.username + '</span>');
							$('.home_name').append('<span class="home_names"><img src="' + item.headPic + '" alt="" id="home_img"/><span id="home_name">' + item.username + '</span></span>');
						});
					}
				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('框架信息请求失败');
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				var status = data.status;
				var msg = data.msg;
				if(status == '0') {
					//body里面的数据
					var bodys = data.body;
					//				var actStatus = data.status;
					$('#details').html(bodys.contents[2].content.text);
					$.each($('#details').find('p'), function(index, element) {
						if($(element).find('img').length > 0) {
							$(this).css({
								padding: 0
							});
							$(this).find('img').attr("style","");
						}
					});

				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('详情请求失败');
			}
		});
		//公告
		$.ajax({
			type: "get",
			url: "/api/activity/announcement/" + aid + "/1/6/",
			async: true,
			success: function(data) {
				var dataStr = JSON.parse(data);
				var status = dataStr.status;
				var msg = dataStr.msg;
				if(status == '0') {
					var bodys = dataStr.body;
					var commentNumber = bodys.commentNumber;
					$('#announcement').html(commentNumber);
					var comments = bodys.comments;
					if(JSON.stringify(comments) == '[]') {
						$('.o_infos').hide();
					} else {
						$('.o_infos').show();
						comments.forEach(function(item, index) {
							var commentContent = item.commentContent;
							$('#announcements').html(commentContent);
							var commentTime = item.commentTime;
							$('#commentTime').html(commentTime);
						})

						comments.forEach(function(item, index) {
							var commentContent = item.commentContent;
							var commentTime = item.commentTime;
							$('.show_announcements').append('<p class="show_announcement_time">' + commentTime + '</p><p class="show_announcement_cont">' + commentContent + '</p>');
						})
					}
				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('公告请求出错');
			}

		});
		$('#announcement_headImg').click(function() {
			$('.show_announcement').hide();
			//			$('.show_announcements').empty();
		});

	}
	//取消围观/他们预览
	$('.zhezhao').click(function() {
		$('.onlookerThey').hide();
		$(this).hide();
	});
	//围观预览
	function onlookers(aid,dev) {
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/onlookers/" + aid + "",
			async: true,
			headers: {
				rsid: rsidDate
			},
			success: function(data) {
				var dataJson = JSON.parse(data);
				console.log(dataJson);
				var stauts = dataJson.status;
				var msg = dataJson.msg;
				if(status == '0') {
					var bodys = dataJson.body;
					//首图
					var headPic = bodys.indexPic;
					if(!/\.(mp4)$/.test(headPic)) {
						$('#onlookerHead_playVideos').hide();
						$('#onlookerHead img').hide();
						$('#onlookerHead').css({
							'height': '241px'
						});
						$('#onlookerHead').css('background-image', 'url(' + headPic + ')');
					} else {
						$('#onlookerHead').css('background-image', 'url()');
						$('#onlookerHead').css({
							'height': '180px'
						});
						$('#onlookerHead img').show();
						$('#onlookerHead_playVideos').show();
						$('#onlookerHead_playVideos').attr('src', headPic);
						//点击播放视频
						var myVideos = document.getElementById("onlookerHead_playVideos");

						$('#onlookerHead img').click(function() {
							if(myVideos.paused) {
								myVideos.play();
								$('#onlookerHead img').hide();
							}
							$('#onlookerHead_playVideos').attr('controls', 'true');

						});
					}
					//头图
					var headStr = bodys.headPic;
					if(!/\.(mp4)$/.test(headStr)) {
						$('#onlookerHead_playVideo').hide();
						$('#onlookerLogo img').hide();
						$('#onlookerLogo').css('background-image', 'url(' + headStr + ')');
					} else {
						$('#onlookerLogo').css('background-image', 'url()');
						$('#onlookerLogo img').show();
						$('#onlookerHead_playVideo').show();
						$('#onlookerHead_playVideo').attr('src', headStr);
						//点击播放视频
						var myVideo = document.getElementById("onlookerHead_playVideo");
						$('#onlookerLogo img').click(function() {
							if(myVideo.paused) {
								myVideo.play();
								$('#onlookerLogo img').hide();
							}
							$('#onlookerHead_playVideo').attr('controls', 'true');

						});
					}
					//描述
					var description = bodys.description;
					if(description != '') {
						$('#onlookerDes').html(description);
						$('#onlookerDes').css({
							'background': '#D0D0D0'
						});
					}
					//主题
					var subject = bodys.subject;
					if(subject != '') {
						$('#onlookerTitle').html(subject);
						$('#onlookerTitle').css({
							'background': '#D0D0D0'
						});
					}
				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('框架信息请求出错');
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				var status = data.status;
				var msg = data.msg;
				if(status == '0') {
					//body里面的数据
					var bodys = data.body;
					console.log(bodys)
					$('#onlookerDet').html(bodys.contents[1].content.text);
					$.each($('#onlookerDet').find('p'), function(index, element) {
						if($(element).find('img').length > 0) {
							$(this).css({
								padding: 0
							});
						}
					});
				} else {
					alert(msg);
				}

			},
			error: function() {
				alert('详情信息请求失败');
			}
		});
	}
	//	他们预览
	function activityCircleInfo(aid,dev) {
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/activityCircleInfo/" + aid + "",
			async: true,
			headers: {
				rsid: rsidDate
			},
			success: function(data) {
				var dataJson = JSON.parse(data);
				console.log(dataJson);
				var status = dataJson.status;
				var msg = dataJson.msg;
				if(status == '0') {
					var bodys = dataJson.body;
					//首图
					var headPic = bodys.indexPic;
					if(!/\.(mp4)$/.test(headPic)) {
						$('#onlookerHead_playVideos').hide();
						$('#onlookerHead img').hide();
						$('#onlookerHead').css({
							'height': '241px'
						});
						$('#onlookerHead').css('background-image', 'url(' + headPic + ')');
					} else {
						$('#onlookerHead').css('background-image', 'url()');
						$('#onlookerHead').css({
							'height': '180px'
						});
						$('#onlookerHead img').show();
						$('#onlookerHead_playVideos').show();
						$('#onlookerHead_playVideos').attr('src', headPic);
						//点击播放视频
						var myVideos = document.getElementById("onlookerHead_playVideos");

						$('#onlookerHead img').click(function() {
							if(myVideos.paused) {
								myVideos.play();
								$('#onlookerHead img').hide();
							}
							$('#onlookerHead_playVideos').attr('controls', 'true');

						});
					}
					//头图
					var headStr = bodys.headPic;
					if(!/\.(mp4)$/.test(headStr)) {
						$('#onlookerHead_playVideo').hide();
						$('#onlookerLogo img').hide();
						$('#onlookerLogo').css('background-image', 'url(' + headStr + ')');
					} else {
						$('#onlookerLogo').css('background-image', 'url()');
						$('#onlookerLogo img').show();
						$('#onlookerHead_playVideo').show();
						$('#onlookerHead_playVideo').attr('src', headStr);
						//点击播放视频
						var myVideo = document.getElementById("onlookerHead_playVideo");
						$('#onlookerLogo img').click(function() {
							if(myVideo.paused) {
								myVideo.play();
								$('#onlookerLogo img').hide();
							}
							$('#onlookerHead_playVideo').attr('controls', 'true');

						});
					}
					//描述
					var description = bodys.description;
					if(description != '') {
						$('#onlookerDes').html(description);
						$('#onlookerDes').css({
							'background': '#D0D0D0'
						});
					}
					//主题
					var subject = bodys.subject;
					if(subject != '') {
						$('#onlookerTitle').html(subject);
						$('#onlookerTitle').css({
							'background': '#D0D0D0'
						});
					}
				} else {
					alert(msg);
				}
			},
			error: function() {
				alert('矿建信息请求出错');
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/"+dev+"/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				var status = data.status;
				var msg = data.msg;
				if(status == '0'){
					//body里面的数据
					var bodys = data.body;
					console.log(bodys)
					$('#onlookerDet').html(bodys.contents[2].content.text);
					$.each($('#onlookerDet').find('p'), function(index, element) {
						if($(element).find('img').length > 0) {
							$(this).css({
								padding: 0
							});
						}
					});
				}else{
					alert(msg);
				}
			},
			error:function(){
				alert('详情请求失败');
			}
		});
	}

})