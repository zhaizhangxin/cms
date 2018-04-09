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
	var top = 0;
	//查询
	function Inquire(name, page, Inq) {
		$.ajax({
			type: "get",
			url: "/api/activity/searchActivityList/" + name + "/" + page + "/",
			async: false,
			success: Inq,
			error: function() {
				alert('fail');
			}
		});
	}

	//已通过
	function explored(top, type, page, fun) {
		var url = "/api/activity/activityReviewTop/1/" + top + "/" + type + "/" + page + "";
		$.ajax({
			type: "get",
			url: url,
			async: false,
			dataType: "json",
			success: fun,
			error: function() {
				alert('请求数据失败');
			}
		});
	}

	function pass_show(data) {
		console.log(data);
		//body里面的数据
		var status = data.status;
		var msg = data.msg;
		if(status == '0') {

			var bodys = data.body;
			var pages = bodys.totalPages; //总页数
			//探索总数
			var exArr = bodys.UPCOMING;
			$('#ex_num').html(exArr);
			//发现总数
			var findArr = bodys.UNPUBLISHED;
			$('#find_num').html(findArr);
			//围观总数
			var onArr = bodys.ONGOING;
			$('#gather_num').html(onArr);
			//他们总数
			var theyArr = bodys.COMPLETE;
			$('#they_num').html(theyArr);
			//activities数组
			var actAyy = bodys.activities;
			actAyy.forEach(function(actAyyitem, index) {
				//推分栏
				var pushColumn = actAyyitem.pushColumnsPage;
				//推首页
				var pushIndex = actAyyitem.pushIndexPage;
				//置顶首页
				var upTime = actAyyitem.upTime;
				//置顶分栏
				var upTimeColumns = actAyyitem.upTimeColumns;
				//活动id
				var actId = actAyyitem.aid;
				//参看人数
				var readersNum = actAyyitem.readersNum;
				//						console.log(actId);
				//活动主题
				var sub = actAyyitem.subject;
				//发布时间
				var insert = actAyyitem.insertTime;
				//主办方信息
				var organizersAyy = actAyyitem.organizers;
				if(sub == '') {
					organizersAyy.forEach(function(item, indexStr) {
						var organname = item.username;
						$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on"></th><th>' + organname + '</th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><th class="readNum" data-id="' + actId + '">'+readersNum+'</th><tr>');
						//推首
						if(pushIndex == '1') {
							$('.push_first').eq(index).html('已推');
							$('.push_first').eq(index).css({
								'background': "#929292"
							});
						}
						//置顶
						if(upTime != '') {
							$('.sticky').eq(index).html('已置');
							$('.sticky').eq(index).css({
								'background': "#929292"
							});
						}
						//推分栏
						if(pushColumn == '1') {
							$('.push_column').eq(index).html('已推');
							$('.push_column').eq(index).css({
								'background': "#929292"
							});
						}
						//置分栏
						if(upTimeColumns != '') {
							$('.set_column').eq(index).html('已置');
							$('.set_column').eq(index).css({
								'background': "#929292"
							});
						}
					})
				}
				if(insert == '') {
					organizersAyy.forEach(function(item, indexStr) {
						var organname = item.username;
						$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th></th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><th class="readNum" data-id="' + actId + '">'+readersNum+'</th><tr>');
						//推首
						if(pushIndex == '1') {
							$('.push_first').eq(index).html('已推');
							$('.push_first').eq(index).css({
								'background': "#929292"
							});
						}
						//置顶
						if(upTime != '') {
							$('.sticky').eq(index).html('已置');
							$('.sticky').eq(index).css({
								'background': "#929292"
							});
						}
						//推分栏
						if(pushColumn == '1') {
							$('.push_column').eq(index).html('已推');
							$('.push_column').eq(index).css({
								'background': "#929292"
							});
						}
						//置分栏
						if(upTimeColumns != '') {
							$('.set_column').eq(index).html('已置');
							$('.set_column').eq(index).css({
								'background': "#929292"
							});
						}

					})
				}
				if(organizersAyy == '') {
					$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th></th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><th class="readNum" data-id="' + actId + '">'+readersNum+'</th><tr>');
					//推首
					if(pushIndex == '1') {
						$('.push_first').eq(index).html('已推');
						$('.push_first').eq(index).css({
							'background': "#929292"
						});
					}
					//置顶
					if(upTime != '') {
						$('.sticky').eq(index).html('已置');
						$('.sticky').eq(index).css({
							'background': "#929292"
						});
					}
					//推分栏
					if(pushColumn == '1') {
						$('.push_column').eq(index).html('已推');
						$('.push_column').eq(index).css({
							'background': "#929292"
						});
					}
					//置分栏
					if(upTimeColumns != '') {
						$('.set_column').eq(index).html('已置');
						$('.set_column').eq(index).css({
							'background': "#929292"
						});
					}
				}
				if(organizersAyy.length <= 1) {
					organizersAyy.forEach(function(item, indexStr) {
						//主办方name
						var organname = item.username;
						$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '">未读</th><th class="readNum" data-id="' + actId + '">'+readersNum+'</th><tr>');
						//推首
						if(pushIndex == '1') {
							$('.push_first').eq(index).html('已推');
							$('.push_first').eq(index).css({
								'background': "#929292"
							});
						}
						//置顶
						if(upTime != '') {
							$('.sticky').eq(index).html('已置');
							$('.sticky').eq(index).css({
								'background': "#929292"
							});
						}
						//推分栏
						if(pushColumn == '1') {
							$('.push_column').eq(index).html('已推');
							$('.push_column').eq(index).css({
								'background': "#929292"
							});
						}
						//置分栏
						if(upTimeColumns != '') {
							$('.set_column').eq(index).html('已置');
							$('.set_column').eq(index).css({
								'background': "#929292"
							});
						}
					})
				}
				if(organizersAyy.length > 1) {
					organizersAyy.forEach(function(item) {
						itemName = item.username;
					})
					var itemName;
					//				console.log(itemName)
					$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + itemName + '</th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><th class="readNum" data-id="' + actId + '">'+readersNum+'</th><tr>');
					//推首
					if(pushIndex == '1') {
						$('.push_first').eq(index).html('已推');
						$('.push_first').eq(index).css({
							'background': "#929292"
						});
					}
					//置顶
					if(upTime != '') {
						$('.sticky').eq(index).html('已置');
						$('.sticky').eq(index).css({
							'background': "#929292"
						});
					}
					//推分栏
					if(pushColumn == '1') {
						$('.push_column').eq(index).html('已推');
						$('.push_column').eq(index).css({
							'background': "#929292"
						});
					}
					//置分栏
					if(upTimeColumns != '') {
						$('.set_column').eq(index).html('已置');
						$('.set_column').eq(index).css({
							'background': "#929292"
						});
					}
				}

			})
		} else {
			alert(msg);
		}
		var ul_page = '<ul class="page"><li class="page_b home_page">首页</li><li class="page_b previous" data-id="1">上一页</li><li class="page_b next" data-id="1">下一页</li><li class="page_b last_page">尾页</li></ul>';
		var str = '';
		for(let i = 1; i <= pages; i++) {
			str += '<li class="page_b pages_num">' + i + '</li>';
		}
		$('.page').empty();
		$('.pass_activity').append(ul_page);
		$('.page li').eq(1).after(str);
		pageDate(pages);
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
				sessionStorage.aid = i;
				window.open("onlookers.html");
				//				window.location.replace('onlookers.html');
			}
			if(type == '0') {
				var i = $(this).data('id');
				sessionStorage.aid = i;
				window.open("they.html");

				//				window.location.replace('they.html');
			}
		});
		//点击预览数据
		$('.readNum').click(function() {
			if(type == '2') {
				var i = $(this).data('id');
				sessionStorage.aid = i;
				window.open("echarts.html");
				
			}
			if(type == '3') {
				var i = $(this).data('id');
				sessionStorage.aid = i;
				window.open("echarts.html");
			}
			if(type == '1') {
				var i = $(this).data('id');
				sessionStorage.aid = i;
				window.open("echarts.html");
			}
			if(type == '0') {
				var i = $(this).data('id');
				sessionStorage.aid = i;
				window.open("echarts.html");
			}
		});
		//推首
		function push(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/1/",
				async: false,
				success: function(data) {
					var jsonData = JSON.parse(data);
					var msg = jsonData.msg;
					if(msg != '修改成功') {
						alert(msg);
					}
				},
				error: function() {
					alert('推首失败');
				}
			});
		}
		$('.push_first').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				push(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');

				explored(top, type, total_page, pass_show);
			} else {
				//				alert('您已推首');
			}
		})

		//置顶
		function sticky(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/2/",
				async: false,
				success: function(data) {
					console.log(data);
					var jsonData = JSON.parse(data);
					var msg = jsonData.msg;
					if(msg != '修改成功') {
						alert(msg);
					}
				},
				error: function() {
					alert('置顶失败');
				}
			});
		}

		$('.sticky').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				sticky(aid);
				//				push(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//				alert('您已置顶');
			}
		})

		//推分栏
		function push_column(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/3/",
				async: false,
				success: function(data) {
					console.log(data);
					var jsonData = JSON.parse(data);
					var msg = jsonData.msg;
					if(msg != '修改成功') {
						alert(msg);
					}
				},
				error: function() {
					alert('推分栏失败');
				}
			});
		}
		$('.push_column').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				push_column(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//				alert('您已推分栏');
			}
		})
		//置分栏
		function set_column(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/4/",
				async: false,
				success: function(data) {
					console.log(data);
					var jsonData = JSON.parse(data);
					var msg = jsonData.msg;
					if(msg != '修改成功') {
						alert(msg);
					}
				},
				error: function() {
					alert('置分顶失败');
				}
			});
		}
		$('.set_column').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				set_column(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//				alert('您已置分栏');
			}
		})
		//删除
		function deleDate(aid, status) {
			$.ajax({
				type: "post",
				url: "/api/activity/modifyTheAuditStatus/" + aid + "/" + status + "/",
				async: false,
				success: function(data) {
					console.log(data);
					var jsonData = JSON.parse(data);
					var status = jsonData.status;
					var msg = jsonData.msg;
					if(status != '0') {
						alert(msg);
					}
				},
				error: function() {
					alert('删除失败');
				}
			});
		}
		$('.delete').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				deleDate(aid, 3);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//							alert('已回退');
			}
		})
	}

	//点击不同的li传递不同的参数
	$('.passed_a').click(function() {
		type = $(this).data('type');
		$('.all_a').attr('data-top', 0);
		$('.pass_act').empty();
		$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
		explored(0, type, 1, pass_show)
	});
	$('.all_a').click(function() {
		top = $(this).index();
		$('.pass_act').empty();
		$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
		explored(top, type, 1, pass_show)
	});

	//点击li颜色变化
	$('.passed_a').on('click', function() {
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
		(function() {
			$('.all_a:first').css('color', '#6e7b08');
			$('.all_a:not(:first)').css('color', '#000');
		}())
	});
	(function() {
		$('.all_a:first').css('color', '#6e7b08');
		explored(0, type, 1, pass_show);
	}())
	$('.all_a').on('click', function() {
		$(this).css({
			'color': '#6e7b08'
		}).siblings(this).css({
			'color': '#000'
		});
	});

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
		//已通过
		$('.page_b').click(function() {
			$('.pass_act').empty();
			$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th><th>数据</th></tr>');
			explored(top, type, total_page, pass_show);
		});
	}
	//取消探索预览
	$('.zhezhao_a').click(function() {
		$('.a_explore').hide();
		$('.home').hide();
		$(this).hide();
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
		$(this).hide();
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
						'marginLeft': '22%'
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
					console.log(data);
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
				alert('详情请求失败')
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
					//				console.log(dataStr)
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
		});

	}

})