$(function() {
	var aid = sessionStorage.aid;
	var rsidDate = localStorage.rsidDate;
	//	console.log(aid)

	function weChat(aid, fn) {
		$.ajax({
			type: "get",
			url: "/api/activity/weChatShareClickRateStatistics/" + aid + "",
			async: true,
			success: fn,
			error: function() {
				alert('请求失败');
			}
		});
	}

	function weChatShare(data) {
		var jsonArr = JSON.parse(data);
		console.log(jsonArr);
		var bodys = jsonArr.body;
		//		区域
		var administrativeRegionsNum = bodys.administrativeRegionsNum;
		//		区域总数
		var totalNum = administrativeRegionsNum.totalNum;
		//		中南
		var southAfrica = administrativeRegionsNum.southAfrica;
		//		华东
		var eastChina = administrativeRegionsNum.eastChina;
		//		西南
		var southwest = administrativeRegionsNum.southwest;
		//		西北
		var northwest = administrativeRegionsNum.northwest;
		//		华北
		var northChina = administrativeRegionsNum.northChina;
		//		东北
		var northeast = administrativeRegionsNum.northeast;
		//		港澳台
		var hongKongMaucao = administrativeRegionsNum.hongKongMaucao;

		//区域点击数量
		var myChart_pie = echarts.init(document.getElementById('main_pie'));
		var options = {
			title: {
				text: ''
			},
			legend: {},
			tooltip: {},
			series: {
				type: 'pie',
				data: [{
						name: '中南',
						value: southAfrica
					},
					{
						name: '华东',
						value: eastChina
					},
					{
						name: '西南',
						value: southwest
					}, {
						name: '西北',
						value: northwest
					}, {
						name: '华北',
						value: northChina
					}, {
						name: '东北',
						value: northeast
					}, {
						name: '港澳台',
						value: hongKongMaucao
					}
				]
			}
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart_pie.setOption(options);

		//		今天每小时的点击量
		var hourNum = bodys.hourNum;
		var hours = [];
		var hours_num = [];
		for(var key in hourNum) {
			hours.push(key);
		}

		hours.sort();
		for(var i = 0; i < hours.length; i++) {
			hours_num.push(hourNum[hours[i]]);
		}
		//		console.log(hours,hours_num);
		var myChart_hour = echarts.init(document.getElementById('main_hour'));

		// 指定图表的配置项和数据
		var option_hour = {
			title: {
				text: '今天每小时的点击量'
			},
			tooltip: {},
			legend: {
				data: ['每小时的点击量']
			},
			xAxis: {
				data: hours
			},
			yAxis: {},
			series: [{
				name: '每小时的点击量',
				type: 'bar',
				data: hours_num
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart_hour.setOption(option_hour);

		//		本月每天的点击量
		var dayNum = bodys.dayNum;
		var days = [];
		var days_num = [];
		for(var key in dayNum) {
			days.push(key);
		}

		days.sort();
		for(var i = 0; i < days.length; i++) {
			days_num.push(dayNum[days[i]]);
		}
		//		console.log(hours,hours_num);
		var myChart_day = echarts.init(document.getElementById('main_day'));

		// 指定图表的配置项和数据
		var option_day = {
			title: {
				text: '本月每天的点击量'
			},
			tooltip: {},
			legend: {
				data: ['本月每天的点击量']
			},
			xAxis: {
				data: days
			},
			yAxis: {},
			series: [{
				name: '本月每天的点击量',
				type: 'bar',
				data: days_num
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart_day.setOption(option_day);

		//		今年每月的点击量
		var monthNum = bodys.monthNum;
		var months = [];
		var months_num = [];
		for(var key in monthNum) {
			months.push(key);
		}

		months.sort();
		for(var i = 0; i < months.length; i++) {
			months_num.push(monthNum[months[i]]);
		}
		//		console.log(hours,hours_num);
		var myChart_month = echarts.init(document.getElementById('main_month'));

		// 指定图表的配置项和数据
		var option_month = {
			title: {
				text: '今年每月的点击量'
			},
			tooltip: {},
			legend: {
				data: ['今年每月的点击量']
			},
			xAxis: {
				data: months
			},
			yAxis: {},
			series: [{
				name: '今年每月的点击量',
				type: 'bar',
				data: months_num
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart_month.setOption(option_month);

		//地图
		var provinceNum = bodys.provinceNum;
		var citys = [];
		var citys_num = [];
		var citys_city = [];
		var city_num = [];
		for(var key in provinceNum) {
			citys.push(key);
			$.each(provinceNum[key], function(key,value) {
				citys_city.push(key);
				city_num.push(value);
//				console.log(key+":"+value)
			});
		}
		citys.sort();
		for(var i = 0; i < citys.length; i++) {
			citys_num.push(provinceNum[citys[i]].totalNum);
			citys_city.push(provinceNum[citys[i]]);
		}
		//各省总人数
		function cityData(citys) {
			var city = [];
			for(var i = 0; i < citys.length; i++) {
				var key = citys[i];
				key = key.substring(0, 2);
				if(key == '内蒙') {
					key = '内蒙古';
				} else if(key == '黑龙') {
					key = '黑龙江';
				}
				var val = citys_num[i];
				var obj = ({
					name: key,
					value: val
				});
				city.push(obj)
			}
			return city;
		};
		//各市总人数
		function cityNum(citys_city) {
			var city_s = [];
			for(var i = 0; i < citys_city.length; i++) {
				var key = citys_city[i];
//				key = key.substring(0, 2);
//				if(key == '内蒙') {
//					key = '内蒙古';
//				} else if(key == '黑龙') {
//					key = '黑龙江';
//				}
				var val = city_num[i];
				var obj = ({
					name: key,
					value: val
				});
				city_s.push(obj)
			}
			return city_s;
		};
		
		$().ready(function() {
			/*echarts*/
			$.get('echarts-master/json/china.json', function(mapJson) {
				//                      echarts.registerMap('china', mapJson);
				var chart = echarts.init(document.getElementById('cont_pro_map')); //在id为mainMap的dom元素中显示地图
				chart.setOption({
						tooltip: {
                          trigger: 'item',
                          formatter: function loadData(result){//回调函数，参数params具体格式参加官方API
                              //鼠标放到某个地市上，显示这个地市的名称加人口数
                              //例如 params.name：当前地市名称。params.value：你传入的json数据与当前地市匹配的一项。
                              //params.data.value:你传入的json数据与当前地市匹配的一项中'value'对应的数据
//                                  console.log(result)
                              return result.name+'<br />数据:'+result.value;
                          }
						},
						visualMap: {
//							min: 0,
//							max: 1500,
							left: 'left',
							top: 'bottom',
							text: ['High', 'Low'],
							seriesIndex: [1],
							inRange: {
								color: ['#e0ffff', '#006edd']
							},
							calculable: true
						},
						geo: {
							map: 'china',
							roam: true,
							label: {
								normal: {
									show: true,
									textStyle: {
										color: 'rgba(0,0,0,0.4)'
									}
								}
							},
							itemStyle: {
								normal: {
									borderColor: 'rgba(0, 0, 0, 0.2)'
								},
								emphasis: {
									areaColor: null,
									shadowOffsetX: 0,
									shadowOffsetY: 0,
									shadowBlur: 20,
									borderWidth: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						},
						series: [{
								type: 'scatter',
								coordinateSystem: 'geo',
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									},
									emphasis: {
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#F06C00'
									}
								},
							},
							{
								name: '查看人数',
								type: 'map',
								geoIndex: 0,
								data: cityData(citys)
							}
						]
					}),

					chart.on('click', function(result) { //回调函数，点击时触发，参数params格式参加官方API
						setTimeout(function() {
							$('#cont_pro_map').css('display', 'none');
							$('#cont_city_map').css('display', 'block');
							$('.retPro').css('display', 'block');
						}, 500);
						//选择地级市的单击事件
						var selectCity = result.name;
						//    调取后台数据
						$.get('echarts-master/json/' + selectCity + '/' + selectCity + '.json', function(Citymap) {
							echarts.registerMap(selectCity, Citymap);
							var myChartCity = echarts.init(document.getElementById('cont_city_map'));
							myChartCity.setOption({
								tooltip: {
									trigger: 'item',
									formatter: function loadData(result) { //回调函数，参数params具体格式参加官方API
										//鼠标放到某个地市上，显示这个地市的名称加人口数
										//例如 params.name：当前地市名称。params.value：你传入的json数据与当前地市匹配的一项。
										//params.data.value:你传入的json数据与当前地市匹配的一项中'value'对应的数据
										return result.name + '<br />数据:' + result.value;
									}
								},
								dataRange: {
//									min: 0,
//									max: 50,
									text: ['高', '低'],
//									realtime: false,
//									calculable: false,
//									splitNumber: 0,
//									itemWidth: 10,
//									itemHeight: 60,
									color: ['lightskyblue', 'lightblue']
								},
//								geo: {
//									map: selectCity,
//									roam: true
//								},
								title: {
									text: selectCity + '地图数据总览',
									//subtext:'',
									x: 'center',
									y: 'top',
									textAlign: 'left'
								},
								series: [{
//									type: 'scatter',
									type: 'map',
//									coordinateSystem: 'geo',
									map: selectCity, //要和echarts.registerMap（）中第一个参数一致
									scaleLimit: {
										min: 0.8,
										max: 1.9
									}, //缩放
									mapLocation: {
										y: 60
									},
									itemSytle: {
										emphasis: {
											label: {
												show: false
											}
										}
									},
									label: {
										normal: {
											show: true
										},
										emphasis: {
											show: true
										}
									},
									data: cityNum(citys_city)//dataParam//人口数据：例如[{name:'济南',value:'100万'},{name:'菏泽'，value:'100万'}......]
								}]
							})
							//                                  myChartCity.on('click',function(rel){
							//                                      setTimeout(function () {
							//                                          //$('#cont_pro_map').css('display','block');
							//                                          //$('#cont_city_map').css('display','none');
							//                                      }, 500);
							//                                       
							//                                  })
						});
					});
			});
		});

	}
	weChat(aid, weChatShare);

	//初始化echarts实例  地图

});