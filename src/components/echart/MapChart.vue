<template>
  <div class="map-chart" id="map-chart" ref="map-chart">
  </div>
</template>

<script>
// import echarts from 'echarts'

// 按需引入
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/map') //地图
require('echarts/lib/chart/scatter') //散点
require('echarts/lib/chart/effectScatter') //特殊点

require('echarts/lib/component/tooltip')//提示框组件
require('echarts/lib/component/title'), //标题组件
require('echarts/lib/component/toolbox') //toolbox组件
require('echarts/lib/component/legend') //legend组件
require('echarts/lib/component/visualMap') //visualMap组件
require('echarts/lib/component/geo') //geo组件

// ----------------
//import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
// ------------------
import resize from './mixins/resize'
import {getMockdata, getMockToolData } from './mock_map_data.js'
export default {
  name: 'Mapchart',
  mixins: [resize],
  components: {
  },
  beforeDestroy() {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
  },
  props:{
	  chartData:{
		  type:[Object],
		  default:()=>{
			return {
				 typeData: getMockdata(), // series type的data
                 toolTipData: getMockToolData() // hover里需要遍历的
			  }
		   }
	  }
  },
  data() {
    return {
		chart: null
    }
  },
  watch:{
	   chartData: {
            handler(oldVal, val) {
				console.log('watch');
				this.chart && this.chart.dispose()
				this.initChart()
			},
			// deep: true // 深度监听
        }
  },
  methods:{
	initChart(){
		this.$nextTick(function(){
			/*
                typeData = getMockdata() // series type的data
                // [{name:"北京",value:396},{name:"天津",value:131}]
                
                toolTipData = getMockToolData() // hover里需要遍历的
				// [{name:"北京",value:[{name:"确诊",value:396},{name:"疑似",value:114},{name:"死亡",value:4}]}]
				
			*/
            this.chart = echarts.init(this.$refs[`map-chart`])
            let geoCoordMap = {}
			this.getmapGeoData(geoCoordMap)
			// 点击事件
			this.chart.on('click', function (params) {
				console.log('clisk:',params);
				//逻辑控制
			})
		})
    },
    getmapGeoData(geoCoordMap){
        this.chart.showLoading();
		let mapFeatures = echarts.getMap('china').geoJson.features;
		this.chart.hideLoading();
		mapFeatures.forEach(function(v) {
			// 地区名称
			var name = v.properties.name;
			// 地区经纬度
			geoCoordMap[name] = v.properties.cp;
        })
        
		this.setChartOption(geoCoordMap)
    },
	setChartOption(geoCoordMap){
		this.chart.setOption(this.getChartParams(geoCoordMap))
	},
	getChartParams(geoCoordMap){
		let _this = this

        /* init data */
        let name_title = "主Title"
		let subname = '副Title'
		let nameColor = " rgb(55, 75, 113)"
		let name_fontFamily = '等线'
		let subname_fontSize = 15
		let name_fontSize = 18
		let mapName = 'china'
		 let data = this.chartData.typeData// series type的data
        // [{name:"北京",value:396},{name:"天津",value:131}]

        let toolTipData = this.chartData.toolTipData // hover里需要遍历的
        // [{name:"北京",value:[{name:"确诊",value:396},{name:"疑似",value:114},{name:"死亡",value:4}]}]

        let max = 6000
		let min = 9 // todo 
		let maxSize4Pin = 35
		let minSize4Pin = 30
		let convertData = function(data) {
			var res = []
			for (var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
					});
				}
			}
			return res;
		}
        /* option */
		return{
			title: {
				text: name_title, // title
				subtext: subname, // sub-title
				x: 'center',
				textStyle: {
					color: nameColor, // title css
					fontFamily: name_fontFamily, // title css
					fontSize: name_fontSize // title css
				},
				subtextStyle:{
					fontSize:subname_fontSize, // sub-title css
					fontFamily:name_fontFamily // sub-title css
				}
			},
			// hover
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					// console.log('params.value：',params.value, typeof(params.value[2]) === 'undefined')
					
					if (typeof(params.value[2]) === 'undefined') {
						var toolTiphtml = ''

						if(!params.value){
							toolTiphtml = params.name+'<br>'+'无数据'
						}else{
							for(var i = 0;i<toolTipData.length;i++){
								if(params.name==toolTipData[i].name){
									toolTiphtml += toolTipData[i].name+'<br>'
									for(var j = 0;j<toolTipData[i].value.length;j++){
										toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
									}
								}
							}
							// console.log(toolTiphtml)
							// console.log(convertData(data))
						}
						return toolTiphtml;
					} else {
						var toolTiphtml = ''
						for(var i = 0;i<toolTipData.length;i++){
							if(params.name==toolTipData[i].name){
								toolTiphtml += toolTipData[i].name+'<br>'
								for(var j = 0;j<toolTipData[i].value.length;j++){
									toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
								}
							}
						}
						// console.log(toolTiphtml)
						// console.log(convertData(data))
						return toolTiphtml;
					}
				}
			},
			// legend: {
			//     orient: 'vertical',
			//     y: 'bottom',
			//     x: 'right',
			//     data: ['credit_pm2.5'],
			//     textStyle: {
			//         color: '#fff'
			//     }
			// },
			visualMap: {
				show: true,
				min: 1,
				max: 1000,
				left: 'left',
				top: 'bottom',
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: true,
				seriesIndex: [1],
				inRange: { // 颜色range
					// color: ['#3B5077', '#031525'] // 蓝黑
					 color: ['#ededed', '#f09a09'] // 浅黄
					// color: ['#ffc0cb', '#800080'] // 红紫
					// color: ['#3C3B3F', '#605C3C'] // 黑绿
					// color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
					//color: ['#23074d', '#cc5333'] // 紫红
					//color: ['#00467F', '#A5CC82'] // 蓝绿
					//  color: ['#1710c0', '#0b9df0', '#74add1', '#abd9e9', '#00fea8', '#00ff0d', '#f5f811', '#f09a09'] // 浅蓝
					// color: ['#00467F', '#A5CC82'] // 蓝绿
					// color: ['#00467F', '#A5CC82'] // 蓝绿
					// color: ['#00467F', '#A5CC82'] // 蓝绿
					// color: ['#00467F', '#A5CC82'] // 蓝绿

				}
			},
			/*工具按钮组*/
			toolbox: {
				 show: true,
				 orient: 'vertical',
				 left: 'right',
				 top: 'center',
				//  feature: {
				// 	 saveAsImage: {}
				//  }
			},
			geo: {
				show: true, // 
				map: mapName, // 'china'
				label: {
					normal: {
						show: false // 展示默认地区(文字)
					},
					emphasis: {
						show: false,
					}
				},
				roam: false, // 是否进行缩放
				itemStyle: {
					normal: {
						areaColor: '#fff', // 各地区默认area 颜色
						borderColor: '#3B5077',  // 各地区边界border
					}, 
					emphasis: {
						areaColor: '#2B91B7', // hover上去 area颜色
					}
				}
			},
			series: [
				// 散点
				{
					name: '散点',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertData(data.sort(function(a, b) {
						return b.value - a.value;
					}).slice(5, data.length)),
					symbolSize: function(val) {
						let d_val
						if(val[2]>1000){
							d_val = val[2]/ 100;
						}else if(val[2]>500){
							d_val = val[2] / 100;
						}else{
							d_val = val[2] / 50
						}
						if(d_val>11){
						    // console.log(d_val);
							d_val = 11
						}
						if(d_val < 1 && d_val > 0){
							d_val = 1
						}
						return d_val
						
						
					},
					label: {
						normal: {
							formatter: function(params){ // 改变文字位置
                                // console.log(params);
                                if(params.name == '香港'){
                                    return params.name
                                }else if(params.name == '澳门'){
									return "\r\n"+ params.name
								}else{
                                	return params.name
                                }
                            },
							position:'bottom',
							show: true // 显示散点(点+文字)
						},
						emphasis: {
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#000' //#05C3F9 // 地区名字(点和文字)
						}
					}
				},
				// map
				{
					type: 'map',
					map: mapName, // 'china'
					geoIndex: 0,
					aspectScale: 0.75, //长宽比
					showLegendSymbol: false, // 存在legend时显示
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: false,
							textStyle: {
								color: '#fff'
							}
						}
					},
					roam: true,
					itemStyle: {
						normal: {
							areaColor: '#031525',
							borderColor: '#3B5077',
						},
						emphasis: {
							areaColor: '#2B91B7'
						}
					},
					animation: false,
					data: data
				},
				// 气泡
				// {
				// 	name: '点',
				// 	type: 'scatter',
				// 	coordinateSystem: 'geo',
				// 	symbol: 'pin', //气泡
				// 	symbolSize: function(val) {
				// 		var a = (maxSize4Pin - minSize4Pin) / (max - min);
				// 		var b = minSize4Pin - a * min;
				// 		b = maxSize4Pin - a * max;
				// 		return a * val[2] + b;
				// 	},
				// 	label: {
				// 		normal: {
				// 			formatter:function(obj){
				// 				return obj.data.value[2];
				// 			},
				// 			show: true,
				// 			textStyle: {
				// 				color: '#fff',
				// 				fontSize: 9,
				// 			}
				// 		}
				// 	},
				// 	itemStyle: {
				// 		normal: {
				// 			color: '#F62157', //标志颜色
				// 		}
				// 	},
				// 	zlevel: 6,
				// 	data: convertData(data),
				// },
				// top 5
				{
					name: 'Top 5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(data.sort(function(a, b) {
						return b.value - a.value;
					}).slice(0, 5)),
					symbolSize: function(val) {
						let d_val
						if(val[2]>1000){
							d_val = val[2]/ 100;
						}else if(val[2]>500){
							d_val = val[2] / 100;
						}else{
							d_val = val[2] / 50
						}
						if(d_val>15){
						    // console.log(d_val);
							d_val = 15
						}
						if(d_val < 1 && d_val > 0){
							d_val = 1
						}
						return d_val
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: 'yellow',
							shadowBlur: 10,
							shadowColor: 'yellow'
						}
					},
					zlevel: 1
				},

			]
		}
	}
  },
  mounted() {
	 console.log('mounted');
	 
	 this.initChart()
  }
}
</script>
<style lang="scss" scoped>
.map-chart{
	height:700px;
}
</style>

