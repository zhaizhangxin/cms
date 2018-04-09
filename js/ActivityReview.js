$(function() {
	var rsidDate = localStorage.rsidDate;
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
	if(isAndroid) {
		alert('这是Android');
	}
	if(isiOS) {
		$('.zhezhao').css({
			'height': '1600px'
		});
		$('.a').css({
			'width': '100%',
			'top': '0px',
			'left': '0px'
		});
		$('.zhe_show').css({
			'width': '100%',
			'height': '100%'
		});
		$('.head').css({
			'height': '100px',
			'lineHeight': '100px'
		});
		$('.head_img').css({
			'height': '45px',
			'marginLeft': '20px'
		});
		$('.head_img img').css({
			'width': '45px'
		});
		$('.head_find').css({
			'fontSize': '30px'
		});
		$('.head_share').css({
			'height': '45px',
			'marginRight': '20px'
		});
		$('.head_share img').css({
			'width': '45px'
		});
		$('.pic_act').css({
			'margin': '0px 20px'
		});
		$('#pic').css({
			'height': '520px'
		});
		$('#active_zi').css({
			'marginTop': '20px',
			'fontSize': '30px',
			'lineHeight': '40px'
		});
		$('#act_zi').css({
			'marginTop': '20px',
			'marginBottom': '20px',
			'lineHeight': '30px',
			'fontSize': '24px'
		});
		$('.col-ys').css({
			'height': '20px'
		})
		$('.information').css({
			'margin': '18px 20px 0px 20px'
		})
		$('#add_ress').css({
			'width': '220px',
			'height': '300px'
		})
		$('.in_time').css({
			'width': '67%',
			'marginLeft': '8px',
			'fontSize': '22px',
			'letterSpacing': '2px'
		});

		$('.act_time').css({
			'marginTop': '34px',
			'fontSize': '22px'
		})
		$('.information .xian').css({
			"marginTop": "30px"
		});
		$('.bao_num').css({
			'height': '80px',
			'lineHeight': '80px'
		})
		$('._bm').css({
			'fontSize': '22px'
		});
		$('._bm img').css({
			'width': '25px',
			'height': '25px'
		});
		$('#details').css({
			'fontSize': 'none',
			'color': 'none',
			'lineHeight': 'none'
		});
		$('.o_info').css({
			'margin': '0px 20px'
		});
		$('.organ_info').css({
			'height': '66px',
			'lineHeight': '66px'
		});
		$('.or_in').css({
			'fontSize': '22px'
		});
		$('.head_share img').click(function() {
			$('.zhezhao').hide();
			$('.a').hide();
		});
	}
	var type = 2;
	var total_page = 1;
	var sub = '';
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

	//待审核
	function explore(type, page, fn) {
		var url = "/api/activity/activityReview/0/" + type + "/" + page + ""
		$.ajax({
			type: 'get',
			url: url,
			dataType: "json",
			async: true,
			success: fn,
			error: function() {
				alert('fail');
			}
		});
	}

	function show__content(data) {
		console.log(data)
		var bodys = data.body; //body里面的数据
		var pages = bodys.totalPages; //总页数
		//发现总数
		var findArr = bodys.UNPUBLISHED;
		$('#f_num').html(findArr);
		//探索总数
		var exArr = bodys.UPCOMING;
		$('#e_num').html(exArr);
		var actAyy = bodys.activities; //activities数组
		actAyy.forEach(function(actAyyitem, index) {
			//			console.log(actAyyitem)
			var actId = actAyyitem.id; //活动id
			sub = actAyyitem.subject; //活动主题
			var insert = actAyyitem.insertTime; //发布时间
			var organizersAyy = actAyyitem.organizers; //主办方信息
			if(sub == '') {
				organizersAyy.forEach(function(item, indexStr) {
					organname = item.name;
				})
				var organname;
				$('#name').append('<tr><th></th><th class="clickDate" id="clickDate' + index + '" data-id="' + actId + '" data-switch="on"></th><th>' + organname + '</th><th>' + insert + '</th><th><button class="pass" data-switch="on" data-aid="' + actId + '">通过</button></th><th><button class="nopass" data-switch="on" data-aid="' + actId + '">未通过</button></th></tr>');
			}
			if(insert == '') {
				organizersAyy.forEach(function(item, indexStr) {
					organname = item.name;
					var organname;
				})
				$('#name').append('<tr><th></th><th class="clickDate" id="clickDate' + index + '" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th></th><th><button class="pass" data-switch="on" data-aid="' + actId + '">通过</button></th><th><button class="nopass" data-switch="on" data-aid="' + actId + '">未通过</button></th></tr>');
			}
			if(organizersAyy == '') {
				$('#name').append('<tr><th></th><th class="clickDate" id="clickDate' + index + '" data-id="' + actId + '" data-switch="on">' + sub + '</th><th></th><th>' + insert + '</th><th><button class="pass" data-switch="on" data-aid="' + actId + '">通过</button></th><th><button class="nopass" data-switch="on" data-aid="' + actId + '">未通过</button></th></tr>');
			}else{
				if(organizersAyy.length <= 1 && sub != '') {
					organizersAyy.forEach(function(item, indexStr) {
						//主办方name
						organname = item.name;
						$('#name').append('<tr><th></th><th id="clickDate' + index + '" class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th>' + insert + '</th><th><button class="pass" data-switch="on" data-aid="' + actId + '">通过</button></th><th><button class="nopass" data-switch="on" data-aid="' + actId + '">未通过</button></th></tr>');
					})
				}
				if(organizersAyy.length > 1) {
					organizersAyy.forEach(function(item) {
						itemName = item.name;
					})
					var itemName;
					console.log(itemName)
					$('#name').append('<tr><th></th><th id="clickDate' + index + '" class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th><span id="or_name">' + itemName + '</span></th><th>' + insert + '</th><th><button class="pass" data-switch="on" data-aid="' + actId + '">通过</button></th><th><button class="nopass" data-switch="on" data-aid="' + actId + '">未通过</button></th></tr>');
				}
				
			}
			

			//点击预览
			if(type == '2') {
				$('#clickDate' + index + '').click(function() {
					var i = $(this).data('id');
					$('.a').show();
					$('.zhezhao').show();
					pass(i);
				})
			} else {
				$('#clickDate' + index + '').click(function() {
					var i = $(this).data('id');
					$('.a_explore').show();
					$('.zhezhao_a').show();
					pass_explore(i);
				})
			}
			//通过、未通过
			function push(aid, status) {
				$.ajax({
					type: "post",
					url: "/api/activity/modifyTheAuditStatus/" + aid + "/" + status + "/",
					async: true,
					success: function(data) {
						//console.log(data);
					},
					error: function() {
						alert('fail');
					}
				});
			}
			//通过
			$('.pass').on('click', function() {
				var aid = $(this).data('aid');
				if($(this).data('switch') == "on") {
					$(this).data('switch', 'off');
					$(this).css({
						'background': '#929292'
					});
					push(aid, 1);
					explore(type, total_page)
				} else {
					//alert('已通过');
				}
			})
			//未通过
			$('.nopass').on('click', function() {
				var aid = $(this).data('aid');
				if($(this).data('switch') == "on") {
					$(this).data('switch', 'off');
					$(this).css({
						'background': '#929292'
					});
					push(aid, 2);
					explore(type, total_page)
				} else {
					//alert('未通过');
				}
			})
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
	}

	//点击不同的li传递不同的参数
	$('.explore_a').click(function() {
		type = $(this).data('type');
		console.log(type);
		$('#name').empty();
		$('#name').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>通过</th><th>未通过</th></tr>');
		explore(type, 1, show__content);
	});
	//点击li颜色变化
	$('.explore_a').on('click', function() {
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
	//默认发现
	(function() {
		explore(2, 1, show__content);
		$('.efind').css({
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

	$('#status').click(function() {
		$('#name').empty();
		$('#name').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>通过</th><th>未通过</th></tr>');
		(function() {
			explore(2, 1, show__content);
			$('.efind').css({
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
		//待审核
		$('.page_a').click(function() {
			$('#name').empty();
			$('#name').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>通过</th><th>未通过</th></tr>');
			explore(type, total_page, show__content);
		});
		//已通过
		$('.page_b').click(function() {
			$('.pass_act').empty();
			$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
			explored(top, type, total_page, pass_show);
		});
		//未通过
		$('.page_c').click(function() {
			$('.did_pass').empty();
			$('.did_pass').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>操作</th></tr>');
			explor(type, total_page, nopass_show);
		});
		//已删除
		$('.page_d').click(function() {
			$('.did_dele').empty();
			$('.did_dele').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>删除时间</th></tr>');
			deleteAlready(type, total_page, delete_show);
		});
		//		console.log(total_page);
	}
	//取消探索预览
	$('.zhezhao_a').click(function() {
		$('.a_explore').hide();
		$(this).hide()
	});
	//	预览探索
	function pass_explore(aid) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/explore/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data)
				//body里面的数据
				var bodys = data.body;
				//头图
				var headStr = bodys.marqueePic;
				$('#pics').css('background-image', 'url(' + headStr + ')');
				//发布时间
				var time = bodys.insertTime;
				$('#activityTime').html(time);
				//阅读数
				var readNum = bodys.readersNum;
				$('#read_num').html(readNum);
				var organArr = bodys.organizers;
				if(organArr == '') {
					return;
				} else {
					organArr.forEach(function(item, index) {
						$('#head_pic').css('background-image', 'url(' + item.logoPic + ')');
						$('#author_name').html(item.name);
					});
				}
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/contents/" + aid + "",
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
	//取消发现预览
	$('.zhezhao').click(function() {
		$('.a').hide();
		$(this).hide()
	});
	//预览发现
	function pass(aid) {
		//框架信息
		$.ajax({
			type: "get",
			url: "/api/activity/details/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data);
				//body里面的数据
				var bodys = data.body;
				//头图
				var headStr = bodys.marqueePic;
				$('#pic').css('background-image', 'url(' + headStr + ')');
				$('#active_zi').html(bodys.subject);
				$('#act_zi').html(bodys.description);
				//地址图片
				var mapStr = bodys.mapPic;
				$('#add_ress').css('background-image', 'url(' + mapStr + ')');
				$('#act_time').html(stringHandel(bodys.beginDateTime) + '-' + stringHandel(bodys.endDateTime));
				$('#act_address').html(bodys.address);
				$('#act_fee').html(bodys.fee);
				$('#act_num').html(bodys.number);
				$('#act_date').html(bodys.registerEndTime);
				$('#num').html(bodys.attenceNumber);
				$('#y_num').html(bodys.readersNum);
				//主办方信息
				var organArr = bodys.organizers;
				if(organArr == '') {
					return;
				} else {
					organArr.forEach(function(item, index) {
						$('.or_name').html('<span class="orgin"><img src="' + item.logoPic + '" alt="" id="or_img"/><span id="or_name">' + item.name + '</span></span>');
						if($('.or_name').find('img').length > 0) {
							$(this).css({
								padding: 0
							});
						}
					});
				}
			}
		});
		//详细信息
		$.ajax({
			type: "get",
			url: "/api/activity/contents/" + aid + "",
			async: true,
			dataType: "json",
			success: function(data) {
				//body里面的数据
				var bodys = data.body;
				var actStatus = data.status;
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

	//已通过
	function explored(top, type, page, fun) {
		var url = "/api/activity/activityReviewTop/1/" + top + "/" + type + "/" + page + "";
		$.ajax({
			type: "get",
			url: url,
			async: true,
			dataType: "json",
			success: fun,
			error: function() {
				alert('fail');
			}
		});
	}

	function pass_show(data) {
		console.log(data);
		//body里面的数据
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
			var actId = actAyyitem.id;
			//						console.log(actId);
			//活动主题
			var sub = actAyyitem.subject;
			//发布时间
			var insert = actAyyitem.insertTime;
			//主办方信息
			var organizersAyy = actAyyitem.organizers;
			if(sub == '') {
				organizersAyy.forEach(function(item, indexStr) {
					var organname = item.name;
					$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on"></th><th>' + organname + '</th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><tr>');
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
					var organname = item.name;
					$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th></th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><tr>');
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
				$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th></th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><tr>');
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
					var organname = item.name;
					$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '">未读</th><tr>');
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
					itemName = item.name;
				})
				var itemName;
				//				console.log(itemName)
				$('.pass_act').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + itemName + '</th><th>' + insert + '</th><th><button class="push_first" data-aid="' + actId + '" data-switch="on">推</button></th><th><button class="sticky" data-switch="on" data-aid="' + actId + '">置</button></th><th><button class="push_column" data-switch="on"  data-aid="' + actId + '">推</button></th><th><button class="set_column" data-switch="on"  data-aid="' + actId + '">置</button></th><th><button class="delete"  data-aid="' + actId + '" data-switch="on">删除</button></th><th class="read pass_one" data-id="' + actId + '" data-switch="on">未读</th><tr>');
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
				$('.zhezhao').show();
				pass(i);
			}
			if(type == '3') {
				var i = $(this).data('id');
				$('.a_explore').show();
				$('.zhezhao_a').show();
				pass_explore(i);
			}
		});
		//推首
		function push(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/1/",
				async: true,
				success: function(data) {
					console.log(data);
				},
				error: function() {
					alert('fail');
				}
			});
		}
		$('.push_first').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				push(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//				alert('您已推首');
			}
		})
		//置顶
		$('.sticky').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				sticky(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//				alert('您已置顶');
			}
		})

		function sticky(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/2/",
				async: true,
				success: function(data) {
					console.log(data);
				},
				error: function() {
					alert('fail');
				}
			});
		}
		//推分栏
		function push_column(aid) {
			$.ajax({
				type: "post",
				url: "/api/activity/stickyOrPushIndex/" + aid + "/3/",
				async: true,
				success: function(data) {
					console.log(data);
				},
				error: function() {
					alert('fail');
				}
			});
		}
		$('.push_column').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				push_column(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
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
				async: true,
				success: function(data) {
					console.log(data);
				},
				error: function() {
					alert('fail');
				}
			});
		}
		$('.set_column').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				set_column(aid);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
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
				async: true,
				success: function(data) {
					console.log(data);
				},
				error: function() {
					alert('fail');
				}
			});
		}
		$('.delete').on('click', function() {
			var aid = $(this).data('aid');
			if($(this).data('switch') == "on") {
				$(this).data('switch', 'off');
				deleDate(aid, 3);
				$('.pass_act').empty();
				$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
				explored(top, type, total_page, pass_show);
			} else {
				//							alert('已回退');
			}
		})
	}
	//	var type = 3;
	var top = 0;
	//点击不同的li传递不同的参数
	$('.passed_a').click(function() {
		type = $(this).data('type');
		$('.all_a').attr('data-top', 0);
		$('.pass_act').empty();
		$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
		explored(0, type, 1, pass_show)
	});
	$('.all_a').click(function() {
		top = $(this).index();
		$('.pass_act').empty();
		$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
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
	//默认探索
	$('#passed').click(function() {
		$('.pass_act').empty();
		$('.pass_act').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>推首</th><th>置顶</th><th>推分栏</th><th>置分栏</th><th>删除</th><th>查看</th></tr>');
		(function() {
			explored(0, 2, 1, pass_show);
			$('.finded').css({
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
	});

	//未通过
	function explor(type, page, un) {
		$.ajax({
			type: "get",
			url: "/api/activity/activityReview/2/" + type + "/" + page + "",
			async: true,
			dataType: "json",
			success: un,
			error: function() {
				alert('fail');
			}
		});
	}

	function nopass_show(data) {
		console.log(data);
		//body里面的数据
		var bodys = data.body;
		var pages = bodys.totalPages; //总页数
		//		console.log(pages);
		//activities数组
		var actAyy = bodys.activities;
		actAyy.forEach(function(actAyyitem, index) {
			//活动id
			var actId = actAyyitem.id;
			//活动主题
			var sub = actAyyitem.subject;
			//发布时间
			var insert = actAyyitem.insertTime;
			//主办方信息
			var organizersAyy = actAyyitem.organizers;
			if(sub == '') {
				organizersAyy.forEach(function(item, index) {
					//主办方name
					var organname = item.name;
					$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on"></th><th>' + organname + '</th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');

				})
			}
			if(insert == '') {
				organizersAyy.forEach(function(item, index) {
					//主办方name
					var organname = item.name;
					$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th></th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');

				})
			}
			if(organizersAyy == '') {
				$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th></th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');
			}
			if(organizersAyy.length <= 1) {
				organizersAyy.forEach(function(item, index) {
					//主办方name
					var organname = item.name;
					$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');
				})
			}
			if(organizersAyy.length > 1) {
				organizersAyy.forEach(function(item) {
					itemName = item.name;
				})
				var itemName;
				$('.did_pass').append('<tr><th></th><th class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + itemName + '</th><th>' + insert + '</th><th><button class="operating" data-switch="on" data-aid="' + actId + '">回退</button></th><tr>');

			}
		})
		//点击预览
		$('.clickDate').click(function() {
			if(type == '2') {
				var i = $(this).data('id');
				$('.a').show();
				$('.zhezhao').show();
				pass(i);
			}
			if(type == '3') {
				var i = $(this).data('id');
				$('.a_explore').show();
				$('.zhezhao_a').show();
				pass_explore(i);
			}
		});
		//回退
		function push(aid, status) {
			$.ajax({
				type: "post",
				url: "/api/activity/modifyTheAuditStatus/" + aid + "/" + status + "/",
				async: true,
				success: function(data) {
					console.log(data);
				},
				error: function() {
					alert('fail');
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
				explor(type, total_page, nopass_show);
				//				$('.did_pass').load(location.href + '.did_pass');
			} else {
				//							alert('已回退');
			}
		})

		var ul_page = '<ul class="page"><li class="page_c home_page">首页</li><li class="page_c previous" data-id="1">上一页</li><li class="page_c next" data-id="1">下一页</li><li class="page_c last_page">尾页</li></ul>';
		var str = '';
		for(let i = 1; i <= pages; i++) {
			str += '<li class="page_c pages_num">' + i + '</li>';
		}
		$('.page').empty();
		$('.actity_two').append(ul_page);
		$('.page li').eq(1).after(str);
		pageDate(pages);
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
	//默认发现
	$('#nopass').click(function() {
		$('.did_pass').empty();
		$('.did_pass').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>操作</th></tr>');
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
	});

	//已删除
	function deleteAlready(type, page, nn) {
		$.ajax({
			type: "get",
			url: "/api/activity/activityReview/3/" + type + "/" + page + "",
			async: true,
			success: nn,
			error: function() {
				alert('fail');
			}
		});
	}

	function delete_show(data) {
		var jsonDate = JSON.parse(data);
		//		console.log(jsonDate);
		//body里面的数据
		var bodys = jsonDate.body;
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
			var actId = actAyyitem.id;
			//活动主题
			var sub = actAyyitem.subject;
			//删除时间
			var update = actAyyitem.updateTime;
			//发布时间
			var insert = actAyyitem.insertTime;
			//主办方信息
			var organizersAyy = actAyyitem.organizers;
			if(sub == '') {
				organizersAyy.forEach(function(item, index) {
					//主办方name
					var organname = item.name;
					$('.did_dele').append('<tr><th></th><th  class="clickDate" data-id="' + actId + '" data-switch="on"></th><th>' + organname + '</th><th>' + insert + '</th><th>' + update + '</th><tr>');

				})
			}
			if(insert == '') {
				organizersAyy.forEach(function(item, index) {
					//主办方name
					var organname = item.name;
					$('.did_dele').append('<tr><th></th><th  class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th></th><th>' + update + '</th><tr>');

				})
			}
			if(organizersAyy == '') {
				$('.did_dele').append('<tr><th></th><th  class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th></th><th>' + insert + '</th><th>' + update + '</th><tr>');
			}
			if(organizersAyy.length <= 1) {
				organizersAyy.forEach(function(item, index) {
					//主办方name
					var organname = item.name;
					$('.did_dele').append('<tr><th></th><th  class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + organname + '</th><th>' + insert + '</th><th>' + update + '</th><tr>');
				})
			}
			if(organizersAyy.length > 1) {
				organizersAyy.forEach(function(item) {
					itemName = item.name;
				})
				var itemName;
				$('.did_dele').append('<tr><th></th><th  class="clickDate" data-id="' + actId + '" data-switch="on">' + sub + '</th><th>' + itemName + '</th><th>' + insert + '</th><th>' + update + '</th><tr>');

			}
		})
		//点击预览
		$('.clickDate').click(function() {
			if(type == '2') {
				var i = $(this).data('id');
				$('.a').show();
				$('.zhezhao').show(); {
					pass(i);
				}
			}
			if(type == '3') {
				var i = $(this).data('id');
				$('.a_explore').show();
				$('.zhezhao_a').show();
				pass_explore(i);
			}
		});

		var ul_page = '<ul class="page"><li class="page_d home_page">首页</li><li class="page_d previous" data-id="1">上一页</li><li class="page_d next" data-id="1">下一页</li><li class="page_d last_page">尾页</li></ul>';
		var str = '';
		for(let i = 1; i <= pages; i++) {
			str += '<li class="page_d pages_num">' + i + '</li>';
		}
		//		已通过
		$('.page').empty();
		$('.actity_three').append(ul_page);
		$('.page li').eq(1).after(str);
		pageDate(pages);
	}
	$('.passed_b').click(function() {
		type = $(this).data('type');
		$('.did_dele').empty();
		$('.did_dele').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>删除时间</th></tr>');
		deleteAlready(type, 1, delete_show)
	});

	$('.passed_b').on('click', function() {
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
	//默认探索(第一页)
	$('#delete').click(function() {
		$('.did_dele').empty();
		$('.did_dele').append('<tr><th>#</th><th>活动名称</th><th>主办方</th><th>发布时间</th><th>删除时间</th></tr>');
		(function() {
			deleteAlready(1, 1, delete_show);
			//			$('.find_pass').css({
			//				'height': '32px',
			//				'background': '#6e7b08',
			//				'marginTop': '-1px',
			//				'border': '1px solid #6e7b08'
			//			}).siblings(this).css({
			//				'height': '30px',
			//				'background': 'none',
			//				'marginTop': 'none',
			//				'border': 'none'
			//			});
		})();

		(function() {
			$('.passed_b:first').css({
				'background': '#6e7b08',
				'border': '1px solid #6e7b08'
			});
			$('.passed_b:not(:first)').css({
				'background': 'none',
				'border': 'none'
			});
		}())
	});
	//选项卡(最外层)
	$('.status_a').click(function() {
		var i = $(this).index();
		$('.explore').eq(i).show();
		$('.explore').eq(i).siblings().hide();
		$(this).css({
			'height': '34px',
			'marginTop': '-1px',
			'background': '#007b7b',
			'border': '1px solid #146a70'
		}).siblings(this).css({
			'height': '32px',
			'background': 'none',
			'border': 'none'
		});
	});

})