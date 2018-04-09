//$(function(){
//	var rsid = sessionStorage.rsid;
//		console.log(rsid);
//
//		//时间
//		function stringHandel(str) {
//			var splitArr = str.split('-'),
//				i;
//			str = '';
//			for(i = 0; i <= 2; i += 1) {
//				if(splitArr[i][0] === '0') {
//					splitArr[i] = splitArr[i].substr(1);
//				}
//			}
//			str = splitArr[0] + '|' + splitArr[1] + '|' + splitArr[2] + '|';
//			return str;
//		}
//
//		//评论
//		var cid = '';
//		var uid = '';
//		var aid = '';
//
//		//JavaScript函数：
//		var minute = 1000 * 60;
//		var hour = minute * 60;
//		var day = hour * 24;
//		//var halfamonth = day * 15;
//		var month = day * 30;
//
//		//评论显示时间
//		function getDateDiff(dateTimeStamp) {
//			var now = new Date().getTime() / 1000;
//			var diffValue = now - dateTimeStamp;
//			diffValue = diffValue * 1000;
//			var monthC = diffValue / month;
//			var weekC = diffValue / (7 * day);
//			var dayC = diffValue / day;
//			var hourC = diffValue / hour;
//			//			alert(hourC);
//			var minC = diffValue / minute;
//			var result;
//			if(monthC >= 1) {
//				result = +parseInt(monthC) + "个月前";
//			} else if(weekC >= 1) {
//				result = +parseInt(weekC) + "周前";
//			} else if(dayC >= 1) {
//				result = +parseInt(dayC) + "天前";
//			} else if(hourC >= 1) {
//				result = +parseInt(hourC) + "个小时前";
//			} else if(minC >= 1) {
//				result = +parseInt(minC) + "分钟前";
//			} else {
//				result = "刚刚";
//			}
//			return result;
//		}
//
//		var commentNumber;
//		var subject;
//		var description;
//		var headPic;
//
//		function pass(aid) {
//			//框架信息
//			$.ajax({
//				type: "get",
//				url: "/api/activity/details/" + aid + "",
//				async: false,
//				dataType: "json",
//				success: function(data) {
//					console.log(data);
//					//body里面的数据
//					var bodys = data.body;
//					//头图
//					var headStr = bodys.headPic;
//					if(!/\.(mp4)$/.test(headStr)) {
//						$('#playVideos').hide();
//						$('#pause').hide()
//						$('#pic').css('background-image', 'url(' + headStr + ')');
//					} else {
//						var videoImage = bodys.videoImage;
//						$('#pic').html('<video id="playVideos" class="video-js vjs-default-skin vjs-big-play-centered" controls poster="' + videoImage + '" preload="none" data-setup="{}" playsinline><source src="' + headStr + '" id="sources" type="video/mp4"></source></video>');
//						var myPlayer = videojs('playVideos');
//						$('#pause').show();
//						$('#pause').click(function() {
//							$(this).hide()
//							myPlayer.play();
//						});
//					}
//					headPic = bodys.headPic;
//					subject = bodys.subject;
//					description = bodys.description;
//					$('#active_zi').html(bodys.subject);
//					$('#act_zi').html(bodys.description);
//					//地址图片
//					var mapStr = bodys.mapPic;
//					$('#add_ress').css('background-image', 'url(' + mapStr + ')');
//					$('#act_time').html(stringHandel(bodys.beginDateTime) + '-' + stringHandel(bodys.endDateTime));
//					$('#act_address').html(bodys.address);
//					$('#act_fee').html(bodys.fee);
//					$('#act_num').html(bodys.activityNum);
//					$('#act_date').html(bodys.registerEndTime);
//					$('#num').html(bodys.attenceNum);
//					$('#y_num').html(bodys.focusNum);
//
//					//				联系方式
//					$('.masking_organ').html('<h2 class="cont">联系主办方</h2><div class="phone"><a href="tel:' + bodys.mobile + '" id="mobile"></a><a href="tel:' + bodys.telephone + '" id="telephone"></a></div>');
//
//					$('.masking_organs').html('<h2 class="conts">联系平台</h2><div class="phones"><a href="tel:' + bodys.platformPhone + '" id="platformPhone"></a></div>');
//
//					$('#mobile').html(bodys.mobile);
//					$('#telephone').html(bodys.telephone);
//					$('#platformPhone').html(bodys.platformPhone);
//					//主办方信息
//					var organArr = bodys.organizers;
//					if(organArr == '') {
//						return;
//					} else {
//						organArr.forEach(function(item, index) {
//							//						$('.or_name').html('<span class="orgin"><img src="' + item.headPic + '" alt="" id="or_img"/><span id="or_name">' + item.username + '</span></span>');
//							$('.or_name').append('<span class="orgin"><span id="or_name">' + item.username + '</span></span>');
//							if($('.or_name').find('img').length > 0) {
//								$(this).css({
//									padding: 0
//								});
//							}
//						});
//					}
//				},
//				//			error: function() {
//				//				alert('框架信息请求出错');
//				//			}
//			});
//			//详细信息
//			$.ajax({
//				type: "get",
//				url: "/api/activity/contents/" + aid + "",
//				async: true,
//				dataType: "json",
//				success: function(data) {
//					//body里面的数据
//					console.log(data)
//					var bodys = data.body;
//					var actStatus = data.status;
//					$('#details').html(bodys.contents[2].content.text);
//					$.each($('#details').find('p'), function(index, element) {
//						if($(element).find('img').length > 0) {
//							$(this).css({
//								padding: 0
//							});
//						}
//					});
//				},
//				//			error: function() {
//				//				alert('详情请求出错');
//				//			}
//			});
//			//公告
//			$.ajax({
//				type: "get",
//				url: "/api/activity/announcement/" + aid + "/1/6/",
//				async: true,
//				success: function(data) {
//					var dataStr = JSON.parse(data);
//					console.log(dataStr)
//					var bodys = dataStr.body;
//					var commentNumber = bodys.commentNumber;
//					$('#announcement').html(commentNumber);
//					var comments = bodys.comments;
//					if(JSON.stringify(comments) == '[]') {
//						$('.cement').hide();
//					} else {
//						$('.cement').show();
//						comments.forEach(function(item, index) {
//							var commentContent = item.commentContent;
//							$('#announcements').html(commentContent);
//							var commentTime = item.commentTime;
//							$('#commentTime').html(commentTime);
//						})
//					}
//				},
//				//			error: function() {
//				//				alert('公告请求出错');
//				//			}
//
//			});
//			//评论
//			$.ajax({
//				type: "get",
//				url: "/api/activity/comment/" + aid + "/1/",
//				async: true,
//				success: function(data) {
//					var jsonData = JSON.parse(data);
//					console.log(jsonData)
//					var bodys = jsonData.body;
//					commentNumber = bodys.commentNumber;
//					$('#comment').html(bodys.commentNumber);
//					var commentArr = bodys.comments;
//					commentArr.forEach(function(item, index) {
//						var eid = item.cid;
//						var comTime = item.commentTime;
//						var resData = comTime;
//						resData = resData.replace(/-/g, '/');
//						var time = Date.parse(new Date(resData)) / 1000;
//						getDateDiff(time);
//						var times = getDateDiff(time);
//
//						$('.comment_content').append('<div id="comment_one' + index + '" class="comment_one"><div class="comment_qu"><img src="' + item.headPic + '" alt="" id="comment_img"/><div class="comment_right get-focus" data-cid="' + eid + '" id="commentRight' + index + '"><div class="com_rig"><span id="comment_name">' + item.username + '</span><span id="comment_time">' + times + '</span></div><span id="comment_cont">' + item.commentContent + '</span></div></div></div>');
//						if($('.comment_content').find('img').length > 0) {
//							$(this).css({
//								padding: 0
//							});
//						}
//					})
//				},
//				//			error: function() {
//				//				alert('评论请求出错');
//				//			}
//			});
//		}
//
//		$('#contactOrganizer').click(function() {
//			$('.masking_cont').show();
//			$('.masking_organ').show();
//		});
//		$('#contactPlatform').click(function() {
//			$('.masking_cont').show();
//			$('.masking_organs').show();
//		});
//		$('.masking_cont').click(function() {
//			$(this).hide();
//			$('.masking_organ').hide();
//			$('.masking_organs').hide();
//		});
//
//		//获取指定url的参数
//		function GetUrlParam(paraName) {　　　　
//			var url = document.location.toString();　　　　
//			var arrObj = url.split("?");
//
//			　　　　
//			if(arrObj.length > 1) {　　　　　　
//				var arrPara = arrObj[1].split("&");　　　　　　
//				var arr;
//				for(var i = 0; i < arrPara.length; i++) {　　　　　　　　
//					arr = arrPara[i].split("=");
//					if(arr != null && arr[0] == paraName) {　　　　　　　　　　
//						return arr[1];　　　　　　　　
//					}　　　　　　
//				}　　　　　　
//				return "";　　　　
//			}　　　　
//			else {　　　　　　
//				return "";　　　　
//			}　　
//		}
//		var aid = GetUrlParam("id");
//		pass(aid);
//
////		wx.config({
////			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
////			appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
////			timestamp: '', // 必填，生成签名的时间戳
////			nonceStr: '', // 必填，生成签名的随机串
////			signature: '', // 必填，签名，见附录1
////			jsApiList: [
////				// 所有要调用的 API 都要加到这个列表中  
////				'onMenuShareTimeline',
////				'onMenuShareAppMessage',
////			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
////		});
////		wx.ready(function() {
////			//	分享到朋友圈
////			wx.onMenuShareTimeline({
////				title: subject, // 分享标题
////				link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
////				imgUrl: headPic, // 分享图标
////				success: function() {
////					// 用户确认分享后执行的回调函数
////				},
////				cancel: function() {
////					// 用户取消分享后执行的回调函数
////				}
////			});
////
////			//	分享给朋友
////			wx.onMenuShareAppMessage({
////				title: subject, // 分享标题
////				desc: description, // 分享描述
////				link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
////				imgUrl: headPic, // 分享图标
////				type: '', // 分享类型,music、video或link，不填默认为link
////				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
////				success: function() {
////					// 用户确认分享后执行的回调函数
////				},
////				cancel: function() {
////					// 用户取消分享后执行的回调函数
////				}
////			});
////		})
////		wx.error(function(res) {
////			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
////		});
//		//点击弹出报名/关注
//		$('.suspension_img').click(function() {
//			$('.suspension span').toggle({
//				'transform': 'translateY(100px)'
//			});
//			var suspensionImg = $('.suspension_img').attr('src');
//			if(suspensionImg == 'images/btn_open.png') {
//				$('.suspension_img').attr('src', 'images/btn_close(1).png');
//			} else {
//				$('.suspension_img').attr('src', 'images/btn_open.png');
//			}
//		});
//		//关注
//		function attention(device, aid, isAttentions) {
//			$.ajax({
//				type: "post",
//				url: "/api/activity/" + device + "/attention/" + aid + "/",
//				headers: {
//					rsid: rsid
//				},
//				data: {
//					isAttention: isAttentions
//				},
//				async: true,
//				success: function(data) {
//					var dataArr = JSON.parse(data);
//					console.log(dataArr)
//					//				console.log(data);
//					var status = dataArr.status;
//					var msg = dataArr.msg;
//					if(status != '0') {
//						alert(msg);
//						//					console.log(msg);
//
//					}
//				},
//				error: function() {
//					alert('请求失败');
//				}
//			});
//		}
//		var status;
//		var msg;
//		//报名
//		function signUp(device, aid, selfIntroductions, isSignUps) {
//			$.ajax({
//				type: "post",
//				url: "/api/activity/" + device + "/signUp/" + aid + "/",
//				headers: {
//					rsid: rsid
//				},
//				data: {
//					selfIntroduction: selfIntroductions,
//					isSignUp: isSignUps
//				},
//				async: false,
//				success: function(data) {
//					var dataArr = JSON.parse(data);
//					status = dataArr.status;
//					msg = dataArr.msg;
//					console.log(dataArr);
//				},
//				error: function() {
//					alert('请求出错');
//				}
//			});
//		}
//		//点击取消
//		$('#cancel').click(function() {
//			$('.masking').hide();
//
//		});
//		if(isAndroid) {
//			//关注
//			var isAttentions = sessionStorage.isAttentions;
//			//报名
//			var isSignUps = sessionStorage.isSignUps;
//			//点击关注
//			$('.likesBtn').click(function() {
//				if(rsid == undefined) {
//					window.location.replace('login.html');
//				} else {
//					var likesBth = $('.likesBtn').attr('src');
//					if(likesBth == 'images/btn_like_before.png') {
//						isAttentions = '1';
//						sessionStorage.isAttentions = isAttentions;
//						$('.likesBtn').attr('src', 'images/btn_like_after.png');
//						alert('关注成功,请在APP内查看');
//					}
//					if(likesBth == 'images/btn_like_after.png') {
//						isAttentions = '0';
//						sessionStorage.isAttentions = isAttentions;
//						$('.likesBtn').attr('src', 'images/btn_like_before.png');
//					}
//					attention('android', aid, isAttentions);
//				}
//			});
//			if(isAttentions == '1') {
//				var likesBth = $('.likesBtn').attr('src');
//				$('.likesBtn').attr('src', 'images/btn_like_after.png');
//			}
//			if(isAttentions == '0') {
//				var likesBth = $('.likesBtn').attr('src');
//				$('.likesBtn').attr('src', 'images/btn_like_before.png');
//			}
//
//			//点击报名
//			$('.enrollBtn').click(function() {
//				if(rsid == undefined) {
//					window.location.replace('login.html');
//				} else {
//					var enrollBtn = $('.enrollBtn').attr('src');
//					if(enrollBtn == 'images/btn_enroll_before.png') {
//						$('.masking').show();
//						isSignUps = '1';
//						sessionStorage.isSignUps = isSignUps;
//					}
//					if(enrollBtn == 'images/btn_enroll_after.png') {
//						var selfIntroductions = '';
//						isSignUps = '0';
//						sessionStorage.isSignUps = isSignUps;
//						signUp('android', aid, selfIntroductions, isSignUps);
//						console.log(selfIntroductions)
//						if(status == '0') {
//							$('.enrollBtn').attr('src', 'images/btn_enroll_before.png');
//						} else {
//							alert(msg);
//						}
//					}
//
//				}
//
//			});
//			//点击报名
//			$('.sign').click(function() {
//				var selfIntroductions = $('.introduction_area').val();
//				//			console.log(selfIntroductions);
//				if(selfIntroductions != '') {
//					$('.masking').hide();
//					signUp('android', aid, selfIntroductions, isSignUps);
//					if(status == '0') {
//						alert('报名成功,请在APP内查看');
//						$('.enrollBtn').attr('src', 'images/btn_enroll_after.png');
//					} else {
//						alert(msg);
//					}
//
//				}
//			});
//
//			if(isSignUps == '1') {
//				var enrollBtn = $('.enrollBtn').attr('src');
//				$('.enrollBtn').attr('src', 'images/btn_enroll_after.png');
//
//			}
//			if(isSignUps == '0') {
//				var enrollBtn = $('.enrollBtn').attr('src');
//				$('.enrollBtn').attr('src', 'images/btn_enroll_before.png');
//
//			}
//		}
//});
