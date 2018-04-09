//$(function(){
//	var dev;
//	if(isAndroid){
//		dev = 'Android';
//	}else if(isiOS){
//		dev = 'ios';
//	}else{
//		dev = 'cms';
//	}
//	//时间
//	function stringHandel(str) {
//		'use strict';
//		var splitArr = str.split('-'),
//			i;
//		str = '';
//		for(i = 0; i <= 2; i += 1) {
//			if(splitArr[i][0] === '0') {
//				splitArr[i] = splitArr[i].substr(1);
//			}
//		}
//		str = splitArr[0] + '年' + splitArr[1] + '月' + splitArr[2] + '日';
//		return str;
//	}
//	//评论
//	var cid = '';
//	var uid = '';
//	var aid = '';
//
//	//JavaScript函数：
//	var minute = 1000 * 60;
//	var hour = minute * 60;
//	var day = hour * 24;
//	//var halfamonth = day * 15;
//	var month = day * 30;
//
//	//评论显示时间
//	function getDateDiff(dateTimeStamp) {
//		var now = new Date().getTime() / 1000;
//		var diffValue = now - dateTimeStamp;
//		diffValue = diffValue * 1000;
//		var monthC = diffValue / month;
//		var weekC = diffValue / (7 * day);
//		var dayC = diffValue / day;
//		var hourC = diffValue / hour;
//		//			alert(hourC);
//		var minC = diffValue / minute;
//		var result;
//		if(monthC >= 1) {
//			result = +parseInt(monthC) + "个月前";
//		} else if(weekC >= 1) {
//			result = +parseInt(weekC) + "周前";
//		} else if(dayC >= 1) {
//			result = +parseInt(dayC) + "天前";
//		} else if(hourC >= 1) {
//			result = +parseInt(hourC) + "个小时前";
//		} else if(minC >= 1) {
//			result = +parseInt(minC) + "分钟前";
//		} else {
//			result = "刚刚";
//		}
//		return result;
//	}
//
//	var commentNumber;
//	//	预览探索
//	function pass_explore(aid,dev) {
//		$.ajax({
//			type: "get",
//			url: "/api/activity/"+dev+"/explore/" + aid + "",
//			async: true,
//			dataType: "json",
//			success: function(data) {
//				console.log(data)
//				//body里面的数据
//				var bodys = data.body;
//				
//				var headStr = bodys.headPic;
//				if(!/\.(mp4)$/.test(headStr)) {
//					$('#playVideos').hide();
//					$('#pause').hide()
//					$('#pic').css('background-image', 'url(' + headStr + ')');
//				} else {
//					var videoImage = bodys.videoImage;
//					$('#pic').append('<video id="playVideos" class="video-js vjs-default-skin vjs-big-play-centered" controls poster="' + videoImage + '" preload="none" data-setup="{}" playsinline><source src="' + headStr + '" id="sources" type="video/mp4"></source></video>');
//					var myPlayer = videojs('playVideos');
//					$('#pause').show();
//					$('#pause').click(function() {
//						$(this).hide()
//						myPlayer.play();
//					});
//				}
//				//发布时间
//				var time = bodys.insertTime;
//				$('#activityTime').html(time);
//				$('#activity_title').html(bodys.subject);
//				//阅读数
//				var readNum = bodys.readersNum;
//				$('#read_num').html(readNum);
//				//主办方信息
//				var organArr = bodys.organizers;
//				if(organArr == '') {
//					return;
//				} else {
//					organArr.forEach(function(item, index) {
//						$('#head_pic').css('background-image', 'url(' + item.headPic + ')');
//						$('#author_name').html(item.username);
//					});
//				}
//			}
//		});
//		//详细信息
//		$.ajax({
//			type: "get",
//			url: "/api/activity/"+dev+"/contents/" + aid + "",
//			async: true,
//			dataType: "json",
//			success: function(data) {
//				//body里面的数据
//				var bodys = data.body;
//				//				var actStatus = bodys.status;
//				$('#details').html(bodys.contents[3].content.text);
//				$.each($('#details').find('p'), function(index, element) {
//					if($(element).find('img').length > 0) {
//						$(this).css({
//							padding: 0
//						});
//					}
//				});
//			}
//		});
//		//评论
//		$.ajax({
//			type: "get",
//			url: "/api/activity/comment/" + aid + "/1/",
//			async: true,
//			success: function(data) {
//				var jsonData = JSON.parse(data);
//				console.log(jsonData)
//				var bodys = jsonData.body;
//				commentNumber = bodys.commentNumber;
//				$('#comment').html(bodys.commentNumber);
//				var commentArr = bodys.comments;
//				commentArr.forEach(function(item, index) {
//					var eid = item.cid;
//					var comTime = item.commentTime;
//					var resData = comTime;
//					resData = resData.replace(/-/g, '/');
//					var time = Date.parse(new Date(resData)) / 1000;
//					getDateDiff(time);
//					var times = getDateDiff(time);
//
//					$('.comment_content').append('<div id="comment_one' + index + '" class="comment_one"><div class="comment_qu"><img src="' + item.headPic + '" alt="" id="comment_img"/><div class="comment_right get-focus" data-cid="' + eid + '" id="commentRight' + index + '"><div class="com_rig"><span id="comment_name">' + item.username + '</span><span id="comment_time">' + times + '</span></div><span id="comment_cont">' + item.commentContent + '</span></div></div></div>');
//					if($('.comment_content').find('img').length > 0) {
//						$(this).css({
//							padding: 0
//						});
//					}
//				})
//			},
////			error: function() {
////				alert('评论请求出错');
////			}
//		});
//	}
//	//获取指定url的参数
//	function GetUrlParam(paraName) {　　　　
//		var url = document.location.toString();　　　　
//		var arrObj = url.split("?");
//
//		　　　　
//		if(arrObj.length > 1) {　　　　　　
//			var arrPara = arrObj[1].split("&");　　　　　　
//			var arr;
//
//			　　　　　　
//			for(var i = 0; i < arrPara.length; i++) {　　　　　　　　
//				arr = arrPara[i].split("=");
//
//				　　　　　　　　
//				if(arr != null && arr[0] == paraName) {　　　　　　　　　　
//					return arr[1];　　　　　　　　
//				}　　　　　　
//			}　　　　　　
//			return "";　　　　
//		}　　　　
//		else {　　　　　　
//			return "";　　　　
//		}　　
//	}
//	var id = GetUrlParam("id");
//	
//	pass_explore(id,dev);
//	
//	
//	//点击弹出报名/关注
//	$('.suspension_img').click(function(){
//		$('.suspension span').toggle({
//			'transform':'translateY(100px)'
//		});
//		var suspensionImg = $('.suspension_img').attr('src');
//		if(suspensionImg == 'images/btn_open.png'){
//			$('.suspension_img').attr('src','images/btn_close(1).png');
//		}else{
//			$('.suspension_img').attr('src','images/btn_open.png');
//		}
//	});
//	//点击关注
//	$('.likesBtn').click(function(){
//		var likesBth = $('.likesBtn').attr('src');
//		if(likesBth == 'images/btn_like_before.png'){
//			$('.likesBtn').attr('src','images/btn_like_after.png');
//		}else{
//			$('.likesBtn').attr('src','images/btn_like_before.png');
//		}
//	});
//	//点击报名
//	$('.enrollBtn').click(function(){
//		var enrollBtn = $('.enrollBtn').attr('src');
//		if(enrollBtn == 'images/btn_enroll_before.png'){
//			$('.enrollBtn').attr('src','images/btn_enroll_after.png');
//		}else{
//			$('.enrollBtn').attr('src','images/btn_enroll_before.png');
//		}
//	});
//})
