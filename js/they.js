$(function() {
	var aid = sessionStorage.aid;
	var rsidDate = localStorage.rsidDate;
	console.log(aid);
	var dev;
	if(isAndroid){
		dev = 'Android';
	}else if(isiOS){
		dev = 'ios';
	}else{
		dev = 'cms';
	}

	//时间
	function stringHandel(str) {
		'use strict';
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
	//框架信息
	function activityCircleInfo(aid, fn,dev) {
		$.ajax({
			type: "get",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/"+dev+"/activityCircleInfo/" + aid + "",
			async: true,
			success: fn,
			error: function() {
				alert('框架信息请求出错');
			}
		});

	}

	function onlookersShow(data) {
		var dataJson = JSON.parse(data);
		var status = dataJson.status;
		var msg = dataJson.msg;
		if(status == '0') {

			var bodys = dataJson.body;
			//		console.log(dataJson)
			//首图
			var indexPic = bodys.indexPic;
			if(!/\.(mp4)$/.test(indexPic)) {
				$('#playVideo').hide();
				$('#pauses').hide();
				$('#homePic').css({
					'height': '420px'
				});
				$('#homePic').css('background-image', 'url(' + indexPic + ')');
			} else {
				$('#homePic').css('background-image', 'url()');
				$('#homePic').css({
					'height': '280px'
				});
				$('#pauses').show();
				$('#playVideo').show();
				$('#playVideo').attr('src', indexPic);
				$('#source').attr('src', indexPic);
				//点击播放视频
				var myVideo = document.getElementById("playVideos");

				$('#pause').click(function() {
					if(myVideo.paused) {
						myVideo.play();
						$('#pause').hide();
					}
					$('#playVideos').attr('controls', 'true');
				});
			}
			//头图
			var headPic = bodys.headPic;
			if(!/\.(mp4)$/.test(headPic)) {
				$('#playVideos').hide();
				$('#pause').hide();
				$('#detailsPic').css('background-image', 'url(' + headPic + ')');
			} else {
				$('#pause').show();
				$('#playVideos').show();
				$('#playVideos').attr('src', headPic);
				$('#sources').attr('src', headPic);
				//点击播放视频
				var myVideo = document.getElementById("playVideos");

				$('#pause').click(function() {
					if(myVideo.paused) {
						myVideo.play();
						$('#pause').hide();
					}
					$('#playVideos').attr('controls', 'true');
				});
			}

			//活动主题
			var subject = bodys.subject;
			$('#title').html(subject);
			//摘要
			var description = bodys.description;
			$('#description').html(description);
			//活动关注人数
			var focusNum = bodys.focusNum;
			$('#attention').html(focusNum);
			//主办方
			var organizers = bodys.organizers;
			organizers.forEach(function(item, index) {
				//头像
				var name = item.username;
				$('.organizers').append('<span>' + name + '</span>');
			})
		} else {
			alert(msg);
		}
	}

	$(function() {
		activityCircleInfo(aid, onlookersShow,dev);
		organizersGraphic(aid, 1, organizersGraphicShow);
		userGraphic(aid, 1, organizersGraphicShow);
	});

	//被置顶的主办方图文信息
	function organizersGraphic(aid, page, fun) {
		$.ajax({
			type: "get",
			url: "/api/activity/organizersGraphic/" + aid + "/" + page + "/",
			async: false,
			success: fun,
			error: function() {
				alert('主办方置顶信息请求出错');
			}
		});
	}
	var organizersIndex = 0;

	function organizersGraphicShow(data) {
		var dataJson = JSON.parse(data);
		console.log(dataJson);
		var status = dataJson.status;
		var msg = dataJson.msg;
		if(status == '0') {
			var bodys = dataJson.body;
			var comments = bodys.comments;

			comments.forEach(function(item, index) {
				//评论信息
				function data_mask() {
					var secondCommend = item.secondCommend;
					secondCommend.forEach(function(item, index) {
						$('#commentsDate').append('<div class="commentData" id="commentData' + index + '"></div>');
						//名字
						var username = item.username;
						//内容
						var commentContent = item.commentContent;
						//cid
						var cid = item.cid;
						$('#commentData' + index + '').append('<span id="commentName">' + username + '&nbsp;<span>:</span></span><span id="comments">' + commentContent + '</span><div class="deleteClose" id="deleteClose' + organizersIndex + '" data-cid="' + cid + '"><img src="images/btn_close.png" alt="" /></div>');
					});
				};
				var commentType = item.commentType;
				var likeNum = item.likeNum;
				//图文
				if(commentType == '1') {
					var cid = item.cid;

					$('.all').append('<div class="graphic" id="graphic' + organizersIndex + '"></div>');
					$('#graphic' + organizersIndex + '').append('<span id="delete" class="delete' + organizersIndex + '" data-cid="' + cid + '">删除</span><div class="nameDetails"><div id="profileHead" class="profileHead' + organizersIndex + '"></div><div class="profileName"><p id="profilename" class="profilename' + organizersIndex + '"></p><p id="summary" class="summary' + organizersIndex + '"></p></div></div><div id="weui_panel"><div class="my-gallery" id="details' + organizersIndex + '" itemscope></div></div><div class="thumbsUp"><img src="images/btn_like_normal.png" alt="" /><div class="Thumbs" id="Thumbs' + organizersIndex + '"></div><span id="ThumbsNum" class="ThumbsNum' + organizersIndex + '">' + likeNum + '</span></div><p class="commentNum">评论共<span id="commentNum"></span>条&nbsp;<span id="view" class="view' + organizersIndex + '">查看</span></p>');

					//头像
					var headPic = item.headPic;
					$('.profileHead' + organizersIndex + '').css('background-image', 'url(' + headPic + ')');
					//名字
					var username = item.username;
					$('.profilename' + organizersIndex + '').html(username);
					//文字
					var commentContent = item.commentContent;
					commentContent.forEach(function(item, index) {
						var text = item.text;
						$('.summary' + organizersIndex + '').html(text);
						var pic = item.pic;
						var pics = JSON.parse(pic);
						//					var pics = pic.split(',');
						pics.forEach(function(item, picIndex) {
							if(pic.length == '1') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="width:100%;" height="400px" src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							if(pic.length >= '3') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="margin-top:10px;margin-right:10px;width:30%;" height="218px" src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							if(pic.length == '2') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="margin-right:10px;width:46%;" height="322px"; src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							var a = document.querySelectorAll('a');
							for(var k = 0; k < a.length; k++) {
								a[k].onclick = function(e) {
									e.preventDefault();
								}
							}
						})
					})

					//点赞人数
					var likes = item.likes;
					likes.forEach(function(item, index) {
						//点赞人头像
						var headPic = item.headPic;
						$('#Thumbs' + organizersIndex + '').appendTo('<span id="ThumbsNum">' + likeNum + '</span>');
						$('#Thumbs' + organizersIndex + '').append('<img src="' + headPic + '" alt=""/>');
					})
					//评论
					$('body').delegate('.view' + organizersIndex + '', 'click', function() {
						$('.masking').show();
						$('.masking_comments').show();
						data_mask();
					});
					$('.close').click(function() {
						$('.masking').hide();
						$('.masking_comments').hide();
						$('.commentData').empty();
					});
					//点赞人数
					$('.ThumbsNum' + organizersIndex + '').click(function() {
						$('.masking').show();
						$('.likeNum').show();
						//					var likes = item.likes;
						likes.forEach(function(item, index) {
							//点赞人头像
							var headPic = item.headPic;
							$('.likeNums').append('<img src="' + headPic + '" alt=""/>');
						})

					});
					$('.closesd').click(function() {
						$('.masking').hide();
						$('.likeNum').hide();
						$('.likeNums').empty();
					});
					//删除图文
					$('body').delegate('.delete' + organizersIndex + '', 'click', function() {
						var cid = $(this).data('cid');
						var parent1 = $(this).parent().remove();
						deleteGraphic(cid);
						console.log(parent1);
					})
					organizersIndex++;
				}
				//图片
				if(commentType == '2') {
					var cid = item.cid;
					$('.all').append('<div class="graphic" id="graphic' + organizersIndex + '"></div>');
					$('#graphic' + organizersIndex + '').append('<span id="delete" class="delete' + organizersIndex + '" data-cid="' + cid + '">删除</span><div class="nameDetails"><div id="profileHead" class="profileHead' + organizersIndex + '"></div><div class="profileName"><p id="profilename" class="profilename' + organizersIndex + '"></p><p id="summary" class="summary' + organizersIndex + '"></p></div></div><div id="weui_panel"><div class="my-gallery" id="details' + organizersIndex + '" itemscope></div></div><div class="thumbsUp"><img src="images/btn_like_normal.png" alt="" /><div class="Thumbs" id="Thumbs' + organizersIndex + '"></div><span id="ThumbsNum" class="ThumbsNum' + organizersIndex + '">' + likeNum + '</span></div><p class="commentNum">评论共<span id="commentNum"></span>条&nbsp;<span id="view" class="view' + organizersIndex + '">查看</span></p>');

					//头像
					var headPic = item.headPic;
					$('.profileHead' + organizersIndex + '').css('background-image', 'url(' + headPic + ')');
					//名字
					var username = item.username;
					$('.profilename' + organizersIndex + '').html(username);
					//文字
					var commentContent = item.commentContent;
					commentContent.forEach(function(item, index) {
						var text = item.text;
						$('.summary' + organizersIndex + '').html(text);
						var pic = item.pic;
						var pics = JSON.parse(pic);
						//					var pics = pic.split(',');
						//					console.log(pics)
						pics.forEach(function(item, picIndex) {
							if(pic.length == '1') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="width:100%;" height="400px" src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							if(pic.length >= '3') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="margin-top:10px;margin-right:10px;width:30%;" height="218px" src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							if(pic.length == '2') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="margin-right:10px;width:46%;" height="322px"; src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							var a = document.querySelectorAll('a');
							for(var k = 0; k < a.length; k++) {
								a[k].onclick = function(e) {
									e.preventDefault();
								}
							}
						})
					})
					//				//点赞人数
					var likes = item.likes;
					likes.forEach(function(item, index) {
						//点赞人头像
						var headPic = item.headPic;
						$('#Thumbs' + organizersIndex + '').append('<img src="' + headPic + '" alt=""/>');
					})
					//评论
					$('body').delegate('.view' + organizersIndex + '', 'click', function() {
						$('.masking').show();
						$('.masking_comments').show();
						data_mask();
					});
					$('.close').click(function() {
						$('.masking').hide();
						$('.masking_comments').hide();
						$('.commentData').empty();
					});
					//点赞人数
					$('.ThumbsNum' + organizersIndex + '').click(function() {
						$('.masking').show();
						$('.likeNum').show();
						//					var likes = item.likes;
						likes.forEach(function(item, index) {
							//点赞人头像
							var headPic = item.headPic;
							$('.likeNums').append('<img src="' + headPic + '" alt=""/>');
						})

					});
					$('.closesd').click(function() {
						$('.masking').hide();
						$('.likeNum').hide();
						$('.likeNums').empty();
					});
					//删除图文
					$('body').delegate('.delete' + organizersIndex + '', 'click', function() {
						var cid = $(this).data('cid');
						var parent1 = $(this).parent().remove();
						deleteGraphic(cid);
						console.log(parent1);
					})
					organizersIndex++;
				}
				//转发过来的评论
				if(commentType == '5') {
					var cid = item.cid;
					$('.all').append('<div class="graphic" id="graphic' + organizersIndex + '"></div>');
					$('#graphic' + organizersIndex + '').append('<span id="delete" class="delete' + organizersIndex + '" data-cid="' + cid + '">删除</span><div class="nameDetails"><div id="profileHead" class="profileHead' + organizersIndex + '"></div><div class="profileName"><p id="profilename" class="profilename' + organizersIndex + '"></p><p id="summary" class="summary' + organizersIndex + '"></p></div></div><div id="weui_panel"><div class="my-gallery" id="details' + organizersIndex + '" itemscope></div></div><div class="thumbsUp"><img src="images/btn_like_normal.png" alt="" /><div class="Thumbs" id="Thumbs' + organizersIndex + '"></div><span id="ThumbsNum" class="ThumbsNum' + organizersIndex + '">' + likeNum + '</span></div><p class="commentNum">评论共<span id="commentNum"></span>条&nbsp;<span id="view" class="view' + organizersIndex + '">查看</span></p>');

					//头像
					var headPic = item.headPic;
					$('.profileHead' + organizersIndex + '').css('background-image', 'url(' + headPic + ')');
					//名字
					var username = item.username;
					$('.profilename' + organizersIndex + '').html(username);
					//评论内容
					var commentContent = item.commentContent;
					var commentContents = commentContent.commentContent;
					//文字
					commentContents.forEach(function(item, index) {
						var text = item.text;
						$('.summary' + organizersIndex + '').html(text);
						var pic = item.pic;
						var pics = JSON.parse(pic);
						//					var pics = pic.split(',');
						pics.forEach(function(item, picIndex) {
							if(pic.length == '1') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="width:100%;" height="400px" src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							if(pic.length >= '3') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="margin-top:10px;margin-right:10px;width:30%;" height="218px" src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							if(pic.length == '2') {
								$('#details' + organizersIndex + '').append('<figure itemprop="associatedMedia" itemscope ><a href="' + item + '" itemprop="contentUrl" data-size="1024x1024"><img class="weui imgThree" style="margin-right:10px;width:46%;" height="322px"; src="' + item + '" itemprop="thumbnail" alt="Image description"></a></figuer>');
							}
							var a = document.querySelectorAll('a');
							for(var k = 0; k < a.length; k++) {
								a[k].onclick = function(e) {
									e.preventDefault();
								}
							}
						})
					})
					//点赞人数
					var likes = item.likes;
					likes.forEach(function(item, index) {
						//点赞人头像
						var headPic = item.headPic;
						$('#Thumbs' + organizersIndex + '').append('<img src="' + headPic + '" alt=""/>');
					})
					//评论
					$('body').delegate('.view' + organizersIndex + '', 'click', function() { //点击事件
						$('.masking').show();
						$('.masking_comments').show();
						//数据的展示
						data_mask();
					});
					$('.close').click(function() {
						$('.masking').hide();
						$('.masking_comments').hide();
						$('.commentData').empty();
					});
					//点赞人数
					$('.ThumbsNum' + organizersIndex + '').click(function() {
						$('.masking').show();
						$('.likeNum').show();
						//					var likes = item.likes;
						likes.forEach(function(item, index) {
							//点赞人头像
							var headPic = item.headPic;
							$('.likeNums').append('<img src="' + headPic + '" alt=""/>');
						})

					});
					$('.closesd').click(function() {
						$('.masking').hide();
						$('.likeNum').hide();
						$('.likeNums').empty();
					});
					//删除图文
					$('body').delegate('.delete' + organizersIndex + '', 'click', function() {
						var cid = $(this).data('cid');
						var parent1 = $(this).parent().remove();
						deleteGraphic(cid);
						console.log(parent1);
					})
					organizersIndex++;
				}

				//转发过来的活动
				if(commentType == '8') {
					var cid = item.cid;
					$('.all').append('<div class="graphic" id="graphic' + organizersIndex + '"></div>');
					$('#graphic' + organizersIndex + '').append('<span id="delete" class="delete' + organizersIndex + '" data-cid="' + cid + '">删除</span><div class="nameDetails"><div id="profileHead" class="profileHead' + organizersIndex + '"></div><div class="profileName"><p id="profilename" class="profilename' + organizersIndex + '"></p><p id="summary" class="summary' + organizersIndex + '"></p></div></div><div id="weui_panel"><div class="my-gallery" id="details' + organizersIndex + '" itemscope></div></div><div class="thumbsUp"><img src="images/btn_like_normal.png" alt="" /><div class="Thumbs" id="Thumbs' + organizersIndex + '"></div><span id="ThumbsNum" class="ThumbsNum' + organizersIndex + '">' + likeNum + '</span></div><p class="commentNum">评论共<span id="commentNum"></span>条&nbsp;<span id="view" class="view' + organizersIndex + '">查看</span></p>');

					//头像
					var headPic = item.headPic;
					$('.profileHead' + organizersIndex + '').css('background-image', 'url(' + headPic + ')');
					//名字
					var username = item.username;
					$('.profilenames' + organizersIndex + '').html(username);

					var commentContent = item.commentContent;
					//头图
					var logoPic = commentContent.logo;
					//时间
					var startDateTime = commentContent.beginDateTime;
					startDateTime = startDateTime.slice(0, 10);
					var endDateTime = commentContent.endDateTime;
					endDateTime = endDateTime.slice(0, 10);
					//人数
					var readersNum = commentContent.readersNum;
					//活动主题
					var subject = commentContent.subject;
					//描述
					var description = commentContent.description;
					$('.detail' + organizersIndex + '').append('<img src="' + logoPic + '" alt="" class="actImgs" width="100%" height="400px"/><div class="time"><span id="time" class="times' + organizersIndex + '"></span><span class="number"><span id="number">' + readersNum + '</span>人</span></div><p id="subjects">' + subject + '</p><p id="des">' + description + '</p>');
					$('.times' + organizersIndex + '').html(stringHandel(startDateTime) + '-' + stringHandel(endDateTime));
					//主办方
					var organizers = commentContent.organizers;
					organizers.forEach(function(item, index) {
						//主办方名字
						var name = item.name;
						$('.organs' + organizersIndex + '').append('<span>' + name + '</span>');
					})
					//点赞人数
					var likes = item.likes;
					likes.forEach(function(item, index) {
						//点赞人头像
						var headPic = item.headPic;
						$('#Thumbs' + organizersIndex + '').append('<img src="' + headPic + '" alt=""/>');
					})
					//评论
					$('body').delegate('.view' + organizersIndex + '', 'click', function() {
						$('.masking').show();
						$('.masking_comments').show();
						data_mask();
					});
					$('.close').click(function() {
						$('.masking').hide();
						$('.masking_comments').hide();
						$('.commentData').empty();
					});
					//点赞人数
					$('.ThumbsNum' + organizersIndex + '').click(function() {
						$('.masking').show();
						$('.likeNum').show();
						//					var likes = item.likes;
						likes.forEach(function(item, index) {
							//点赞人头像
							var headPic = item.headPic;
							$('.likeNums').append('<img src="' + headPic + '" alt=""/>');
						})

					});
					$('.closesd').click(function() {
						$('.masking').hide();
						$('.likeNum').hide();
						$('.likeNums').empty();
					});
					//删除图文
					$('body').delegate('.delete' + organizersIndex + '', 'click', function() {
						var cid = $(this).data('cid');
						var parent1 = $(this).parent().remove();
						deleteGraphic(cid);
						console.log(parent1);
					})
					organizersIndex++;
				}

			})

		} else {
			alert(msg);
		}

		//删除评论
		$('body').delegate('#deleteClose' + organizersIndex + '', 'click', function() {
			var cid = $(this).data('cid');
			var parent1 = $(this).parent().remove();
			deleteGraphicComment(cid);
			console.log(parent1);
		})
		

	}
	//非置顶的用户或主办方图文信息
	function userGraphic(aid, page, fn) {
		$.ajax({
			type: "get",
			url: "/api/activity/userGraphic/" + aid + "/" + page + "/",
			async: false,
			success: fn,
			error: function() {
				alert('请求出错');
			}
		});
	}

	//删除信息流下面的评论
	function deleteGraphicComment(cid) {
		$.ajax({
			type: "post",
			url: "/api/activity/deleteGraphicComment/" + cid + "",
			async: false,
			success: function(data) {
				console.log(data)
			},
			error: function() {
				alert('请求出错');
			}
		});
	}

	//详情预览
	function detailsShow(aid,dev) {
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
					//头图
					var headStr = bodys.marqueePic;
					$('#pic').css('background-image', 'url(' + headStr + ')');
					$('#active_zi').html(bodys.subject);
					$('#act_zi').html(bodys.description);
					//地址图片
					var mapStr = bodys.mapPic;
					$('#adds_ress').attr('src',mapStr);
//					$('#add_ress').css('background-image', 'url(' + mapStr + ')');
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
					var actStatus = data.status;
					$('#detailds').html(bodys.contents[2].content.text);
					$.each($('#detailds').find('p'), function(index, element) {
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
})