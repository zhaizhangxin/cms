$(function() {
	var rsidDate = localStorage.rsidDate;
	var uid = localStorage.uid;
	console.log(rsidDate);
	
	//点击出现箭头
	$('ul a').each(function() {
		if($($(this))[0].href == String(window.location))
			$('.a_index').addClass('a_index');
	});

	//点击上传图片（首页图）
	$('#avatar').click(function() {
		$('.video_one').show();
	});
	$('#upLoadVideo').click(function() {
		$('.videoMasking').show();
		$('#imgVideo').hide();
		$('#video_video').show();
	});
	$('.videoMask').click(function() {
		$('.videoMasking').hide();
	});
	$("#uploadfile").fileinput({
		language: 'zh', //设置语言
		uploadUrl: "/upload/imageCategory/" + uid + "/activity/1", //上传的地址
		//             allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
		//uploadExtraData:{"id": 1, "fileName":'123.mp3'},
		uploadAsync: true, //默认异步上传
		showUpload: true, //是否显示上传按钮
		showRemove: true, //显示移除按钮
		showPreview: true, //是否显示预览
		showCaption: false, //是否显示标题
		browseClass: "btn btn-primary", //按钮样式    
		dropZoneEnabled: false, //是否显示拖拽区域
		//minImageWidth: 50, //图片的最小宽度
		//minImageHeight: 50,//图片的最小高度
		//maxImageWidth: 1000,//图片的最大宽度
		//maxImageHeight: 1000,//图片的最大高度
		//maxFileSize:0,//单位为kb，如果为0表示不限制文件大小
		//minFileCount: 0,
		maxFileCount: 1, //表示允许同时上传的最大文件个数
		enctype: 'multipart/form-data',
		validateInitialCount: true,
		previewFileIcon: "<iclass='glyphicon glyphicon-king'></i>",
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
	}).on("fileuploaded", function(event, data, previewId, index) {
		var respon = data.response;
		var bodys = respon.body;
		var files = bodys.file;
		files.forEach(function(item, index) {
			filesPath = item.filePath;
			var video = item.videoImage;
			video.forEach(function(item, index) {
				$('#videoImage').val(item);
			})
		})
		$('.video_one').hide();
		$('.videoMasking').hide();
		$('#avatar video').attr('src', filesPath);
		$('#avatar img').attr('src', '');
		$('#indexPic').val(filesPath);
	});
	//上传图片
	$('#upLoad').click(function() {
		$('#avatar-modal').show();
		$('#imgVideo').show();
		$('#video_video').hide();
	});
	$('.avatar-save').click(function() {
		$('.video_one').hide();
		$(this).html('正在上传...，请稍等');
		$(this).css({
			'background': '#929292'
		});
		//		$(this).attr("disabled", true);
		var filesPath = $.prototype.filePath;
		var statusDate = $.prototype.status;
		var msgDate = $.prototype.msg;
		var avatarDate = $('.avatar-data').val();
		avatarDate = eval('(' + avatarDate + ')');
		var scrX = Math.round(avatarDate.x);
		var scrY = Math.round(avatarDate.y);
		var scrW = Math.round(avatarDate.width);
		var scrH = Math.round(avatarDate.height);
		var formData = new FormData();
		formData.append('file', $('#avatarInput')[0].files[0]);
		//		console.log(1111)
		//上传图片接口
		$.ajax({
			type: "post",
			cache: false,
			headers: {
				rsid: rsidDate
			},
			data: formData,
			url: "/upload/imageCategory/" + uid + "/activity/0",
			dataType: 'json',
			async: false,
			processData: false,
			contentType: false,
			success: function(data) {
				//				console.log(data.status);
				statusDate = data.status;
				msgDate = data.msg;
				var bodys = data.body;
				var files = bodys.file;
				files.forEach(function(item, index) {
					filesPath = item.filePath;
				})
			},
			error: function(msg) {
				alert(msg);
			}
		});

		if(!/\.(gif|GIF)$/.test($('#avatarInput').val())) {
			if(statusDate == 0) {
				//裁剪图片接口
				$.ajax({
					type: "post",
					url: "/upload/scale",
					data: {
						src: filesPath,
						type: 0,
						x: scrX,
						y: scrY,
						w: scrW,
						h: scrH
					},
					async: false,
					success: function(data) {
						var scrDate = JSON.parse(data);
						var bodyDate = scrDate.body;
						var lang = 'http://img.hodays.com//';
						var langDate = lang + bodyDate;
						$('#avatar-modal').hide();
						$('#avatar img').attr('src', langDate);
						$('#avatar video').attr('src', '');
						$('#indexPic').val(langDate);
						$('.avatar-save').html('确定');
						$('.avatar-save').css({
							'background': '#3071a9'
						});
						//						$('.avatar-save').removeAttr("disabled");
					},
					error: function(msg) {
						alert(msg);
					}
				})
			} else {
				alert(msgDate);
			};
		} else {
			if(msgDate == 'upload success') {
				$('#avatar-modal').hide();
				$('#avatar img').attr('src', filesPath);
				$('#avatar video').attr('src', '');
				$('#indexPic').val(filesPath);
				$('.avatar-save').html('确定');
				$('.avatar-save').css({
					'background': '#3071a9'
				});
				$('.avatar-save').removeAttr("disabled");
			} else {
				alert(msgDate);
			}
		}
	})

	//点击上传头图
	//点击选择上传文件
	$('#avatars').click(function() {
		$('.videoMasks').show();
	});
	//上传视频
	$('#uploadVideo').click(function() {
		$('.videosMasking').show();
		$('#imgPlay').hide();
		$('#videoPlay').show();
	});
	$('.videosMask').click(function() {
		$('.videosMasking').hide();
	});
	$("#uploadFile").fileinput({
		language: 'zh', //设置语言
		uploadUrl: "/upload/imageCategory/" + uid + "/activity/1", //上传的地址
		//             allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
		//uploadExtraData:{"id": 1, "fileName":'123.mp3'},
		uploadAsync: true, //默认异步上传
		showUpload: true, //是否显示上传按钮
		showRemove: true, //显示移除按钮
		showPreview: true, //是否显示预览
		showCaption: false, //是否显示标题
		browseClass: "btn btn-primary", //按钮样式    
		dropZoneEnabled: false, //是否显示拖拽区域
		//minImageWidth: 50, //图片的最小宽度
		//minImageHeight: 50,//图片的最小高度
		//maxImageWidth: 1000,//图片的最大宽度
		//maxImageHeight: 1000,//图片的最大高度
		//maxFileSize:0,//单位为kb，如果为0表示不限制文件大小
		//minFileCount: 0,
		maxFileCount: 1, //表示允许同时上传的最大文件个数
		enctype: 'multipart/form-data',
		validateInitialCount: true,
		previewFileIcon: "<iclass='glyphicon glyphicon-king'></i>",
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
	}).on("fileuploaded", function(event, data, previewId, index) {
		var respon = data.response;
		var bodys = respon.body;
		var files = bodys.file;
		files.forEach(function(item, index) {
			filesPath = item.filePath;
			var video = item.videoImage;
			video.forEach(function(item, index) {
				$('#videoImages').val(item);
			})
		})
		$('.videoMasks').hide();
		$('.videosMasking').hide();
		$('#avatars video').attr('src', filesPath);
		$('#logoPic').val(filesPath);
	});
	//上传图片
	$('#upload').click(function() {
		$('.fade_modal').show();
		$('#imgPlay').show();
		$('#videoPlay').hide();
	});
	$('.saveAvatar').click(function() {
		$('.videoMasks').hide();
		var filesPath = $.prototype.filePath;
		var statusDate = $.prototype.status;
		var msgDate = $.prototype.msg;
		var avatarDate = $('#AvaterData').val();
		avatarDate = eval('(' + avatarDate + ')');
		var scrX = Math.round(avatarDate.x);
		var scrY = Math.round(avatarDate.y);
		var scrW = Math.round(avatarDate.width);
		var scrH = Math.round(avatarDate.height);
		var formData = new FormData();
		formData.append('file', $('#avatars_Input')[0].files[0]);
		$(this).html('正在上传...，请稍等');
		$(this).css({
			'background': '#929292'
		});
		//		$(this).attr("disabled", true);
		//上传图片接口
		$.ajax({
			type: "post",
			cache: false,
			headers: {
				rsid: rsidDate
			},
			data: formData,
			url: "/upload/imageCategory/" + uid + "/activity/0",
			dataType: 'json',
			async: false,
			processData: false,
			contentType: false,
			success: function(data) {
				console.log(data);
				statusDate = data.status;
				msgDate = data.msg;
				var bodys = data.body;
				var files = bodys.file;
				files.forEach(function(item, index) {
					filesPath = item.filePath;
				})
			},
			error: function(msg) {
				alert(msg);
			}
		});

		if(!/\.(gif|GIF)$/.test($('#avatars_Input').val())) {
			if(statusDate == 0) {
				//裁剪图片接口
				$.ajax({
					type: "post",
					url: "/upload/scale",
					data: {
						src: filesPath,
						type: 1,
						x: scrX,
						y: scrY,
						w: scrW,
						h: scrH
					},
					async: false,
					success: function(data) {
						var scrDate = JSON.parse(data);
						var bodyDate = scrDate.body;
						var lang = 'http://img.hodays.com//';
						var langDate = lang + bodyDate;
						//					console.log(langDate);
						$('.fade_modal').hide();
						$('#avatars img').attr('src', langDate);
						$('#logoPic').val(langDate);
						$('.saveAvatar').html('确定');
						$('.saveAvatar').css({
							'background': '#3071a9'
						});
						//						$('.saveAvatar').removeAttr("disabled");
					},
					error: function(msg) {
						alert(msg);
					}
				})
				//		console.log(filesPath);

			} else {
				alert(msgDate);
			};
		} else {
			if(msgDate == 'upload success') {
				$('.fade_modal').hide();
				$('#avatars img').attr('src', filesPath);
				$('#logoPic').val(filesPath);
				$('.saveAvatar').html('确定');
				$('.saveAvatar').css({
					'background': '#3071a9'
				});
				$('.saveAvatar').removeAttr("disabled");

			} else {
				alert(msgDate);
			}
		}
	});

	var aid = localStorage.aid;
	var headPic = sessionStorage.headPic;
	var marqueePic = sessionStorage.marqueePic;
	var subject = sessionStorage.subject;
	var contents = sessionStorage.contents;
	var videoImageIndex = sessionStorage.videoImageIndex;
	var videoImageLogo = sessionStorage.videoImageLogo;
	//渲染
	//首图
	if(!/\.(mp4)$/.test(headPic)) {
		$('#avatar img').show();
		$('#avatar video').hide();
		$('#avatar img').attr('src', headPic);
	} else {
		$('#avatar img').hide();
		$('#avatar video').show();
		$('#avatar video').attr('src', headPic);
	}
	//头图
	if(!/\.(mp4)$/.test(marqueePic)) {
		$('#avatars img').show();
		$('#avatars video').hide();
		$('#avatars img').attr('src', marqueePic);
	} else {
		$('#avatars img').hide();
		$('#avatars video').show();
		$('#avatars video').attr('src', marqueePic);
	}
	//活动主题
	$("#activity_theme").val(subject);
	// 实例化编辑器
	var ue = UE.getEditor('editor');
	//异步回调
	ue.ready(function() {
		ue.execCommand('inserthtml', contents)
	});
	//是否存为草稿
	var y = 0;
	$('#status').click(function() {
		var type = $('#status').val();
		if(y % 2 == 0) {
			type = 1;
			$('#draft_c').val(type);
			if($('.entry').val() == '') {
				alert('请补充框架信息');
			} else {
				//首图
				var headPic = $('#avatar video').attr('src');
				if(headPic != '') {
					$('#indexPic').attr('src', headPic);
					$('#indexPic').val(headPic);
					$('#videoImage').val(videoImageIndex);
				} else {
					var headPic = $('#avatar img').attr('src');
					$('#indexPic').attr('src', headPic);
					$('#indexPic').val(headPic);
				}
				//头图
				var logoPic = $('#avatars video').attr('src');
				if(logoPic != '') {
					$('#logoPic').attr('src', logoPic);
					$('#logoPic').val(logoPic);
					$('#videoImages').val(videoImageLogo);
				} else {
					var logoPic = $('#avatars img').attr('src');
					$('#logoPic').attr('src', logoPic);
					$('#logoPic').val(logoPic);
				}
				draft_plore(aid)
			}
		} else {
			type = 0;
			$('#draft_c').val(type);
		}
		y++;
	});

	function draft_plore(aid) {
		$.ajax({
			type: "post",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/updateExploreActivityStatus/" + aid + "/",
			async: false,
			data: $('#plore').serialize(),
			dataType: 'json',
			success: function(data) {
				var msg = data.msg;
				var status = data.status;
				if(status == "0") {
					window.location.href = "management.html"
				} else {
					alert(msg)
				}
			},
			error: function() {
				alert('请求出错');
			}
		});
	}
	//ajax请求数据(发布)
	function nextPlore(aid) {
		$.ajax({
			type: "post",
			headers: {
				rsid: rsidDate
			},
			url: "/api/activity/updateExploreActivityStatus/" + aid + "/",
			async: false,
			data: $('#plore').serialize(),
			dataType: 'json',
			success: function(data) {
				console.log(data);
				var msg = data.msg;
				var status = data.status;
				if(status == "0") {
					window.location.href = "wait.html"
				} else {
					alert(msg)
				}
			},
			error: function() {
				alert('请求出错');
			}
		});

	}
	$('#nextScr').click(function() {
		console.log(aid)
		//首图
		var headPic = $('#avatar video').attr('src');
		if(headPic != '') {
			$('#indexPic').attr('src', headPic);
			$('#indexPic').val(headPic);
			$('#videoImage').val(videoImageIndex);
		} else {
			var headPic = $('#avatar img').attr('src');
			$('#indexPic').attr('src', headPic);
			$('#indexPic').val(headPic);
		}
		//头图
		var logoPic = $('#avatars video').attr('src');
		if(logoPic != '') {
			$('#logoPic').attr('src', logoPic);
			$('#logoPic').val(logoPic);
			$('#videoImages').val(videoImageLogo);
		} else {
			var logoPic = $('#avatars img').attr('src');
			$('#logoPic').attr('src', logoPic);
			$('#logoPic').val(logoPic);
		}
		nextPlore(aid);
		console.log($('#plore').serialize())

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
	//探索预览
	$('#subLogin').click(function() {
		//头图
		var totals_head = $('#avatars video').attr('src');
		if(totals_head != '') {
			$('#pic').css({
				'height': '190.4px'
			});
			$('#pause').show();
			$('#playVideos').show();
			$('#playVideos').attr('src', totals_head);
			$('#sources').attr('src', totals_head);
			//点击播放视频
			var myVideo = document.getElementById("playVideos");

			$('#pause').click(function() {
				if(myVideo.paused) {
					myVideo.play();
					$('#pause').hide();
				}
				$('#playVideos').attr('controls', 'true');
			});
		} else {
			var total_head = $('#avatars img').attr('src');
			$('#pic').css('background-image', 'url(' + total_head + ')');

		}
		//主题
		var activity_theme = $('#activity_theme').val();
		$('#active_zi').html(activity_theme);
		//		//主办方
		//		var act_place = $('#act_place').val();
		//		$('.or_name').html('<span class="orgin"><span id="or_name">' + act_place + '</span></span>');

		var conDate = ue.getContent();

		$('#details').html(conDate);
		$.each($('#details').find('p'), function(index, element) {
			if($(element).find('img').length > 0) {
				$(this).css({
					padding: 0
				});
			}
		});
		$('html,body').animate({
			scrollTop: 0
		}, 'slow');
		$('.a').show();
		$('.zhezhao').show();
	});
	//取消预览
	$('.zhezhao').click(function() {
		$('html,body').animate({
			scrollTop: 1990
		}, 'slow');
		$('.a').hide();
		$(this).hide()
	});
	//首页预览
	$('#showDate').click(function() {
		//头图
		var totals_index = $('#avatar video').attr('src');
		if(totals_index != '') {
			$('#home_pic').css('background-image', 'url()');
			$('.sec_play').css({
				'position': 'relative',
				'height': '241px'
			});
			$('.home_subject').remove();
			$('.sec_play').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_7.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_8.png" /></div></div>');
			
			$('#time').css({
				'height':'30px'
			});
			$('.home_subjectOne').css({
				'top': '-18px'
			})
			$('#subject').css({
				'color': '#434343'
			});
			$('.home_pics').css({
				'height': '180px'
			});
			$('#home_pic').css({
				'height': '100%'
			});
			$('#home_des').css({
				'height': '50px',
				'overflow': 'hidden',
				'textOverflow': 'ellipsis',
				'display': '-webkit-box',
				'-webkit-line-clamp': '2',
				'-webkit-box-orient': 'vertical'
			})
			$('.signUp').css({
				'marginTop': '10px',
				'marginBottom': '10px'
			});
			$('#paused').show();
			
			$('#playVideo').show();
			$('#playVideo').attr('src', totals_index);
			//点击播放视频
			var myVideo = document.getElementById("playVideo");

			$('#paused').click(function() {
				if(myVideo.paused) {
					myVideo.play();
					$('#paused').hide();
				}
				$('#playVideo').attr('controls', 'true');
			});
		} else {
			var total_index = $('#avatar img').attr('src');
			$('.home_subject').remove();
			$('.home_pics').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_5.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_6.png" /></div></div>');
			
			$('#home_pic').css('background-image', 'url(' + total_index + ')');
			
			$('#playVideo').hide();
			$('#paused').hide();
			$('.home_pics').append('<div class="home_subject"><div class="home_subjectOne"><img src="images/img_5.png" /></div><p id="subject"></p><div class="home_subjectTwo"><img src="images/img_6.png" /></div></div>');
			
			$('.home_pics').css({
				'height': '281px'
			});
			$('.sec_play').css({
				'height': '281px'
			});
			$('#home_des').css({
				'height': '24px',
				'overflow': 'hidden',
				'textOverflow': 'ellipsis',
				'display': '-webkit-box',
				'-webkit-line-clamp': '1',
				'-webkit-box-orient': 'vertical'
			})
			$('.signUp').css({
				'marginTop': '6px',
				'marginBottom': '4px'
			});
			$('#time').css({
				'height':'26px'
			});

		}
		var subject = $('#activity_theme').val();
		$('#subject').html(subject);
		
		$('html,body').animate({
			scrollTop: 0
		}, 'slow');
		$('.home').show();
		$('.zhezhao').show();
	});
	$('.zhezhao').click(function() {
		$('html,body').animate({
			scrollTop: 1990
		}, 'slow');
		$('.home').hide();
		$(this).hide()
	});

})