<template>
  <div class="bar-line-chart" id="bar-line-chart" ref="bar-line-chart">
  </div>
</template>

<script>
// import echarts from 'echarts'

// 按需引入
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar') // 柱状图
require('echarts/lib/chart/line') // 折线
require('echarts/lib/component/tooltip')//提示框组件
require('echarts/lib/component/grid')//grid组件
require('echarts/lib/component/dataZoom')//dataZoom组件

require('echarts/lib/component/title'), //标题组件
require('echarts/lib/component/legend') //legend组件

import resize from './mixins/resize'
      
export default {
	name: 'BarLinechart',
	mixins: [resize],
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
	components: {
	},
	props:{
		chartData:{
			type:[Object],
			default:()=>{
				return {
					legendData: ['板块1','key1','key2'],
					XData: ['1号','2号','3号'],
					seriesData:[
						{name:'板块1',type:'bar',data:[1,2,3]},
						{name:'key1',type:'line',data:[10,20,30]},
						{name:'key2',type:'line',data:[1,50,10]}
					]
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
					// this.chart && this.chart.dispose()
					this.initChart()
				},
				// deep: true // 深度监听
			}
	},
	methods:{
		initChart(){
			let _this =this
			this.$nextTick(function(){
				/*
					legendData:  ['板块1','key1','key2'] 
					XData:         ['1号','2号','3号']
					seriesData:         [{name:'板块1',type:'bar',data:['1','2','3']}]
				*/
				this.chart = echarts.init(this.$refs[`bar-line-chart`])
				this.setChartOption()

				// 点击事件
				/* 在canvas区域点击就会触发(不过信息没click事件全) */
				// this.chart.getZr().on('click',function(params){
				// 	console.log('canvas-click 触发了:',params)
				// 	let point=[params.offsetX, params.offsetY]
				// 	if(_this.chart.containPixel('grid',point)){
						
				// 		// x轴序号(索引)
				// 		let xIndex=_this.chart.convertFromPixel({seriesIndex:0},point)[0];
						
				// 		// 获取当前图表的option
				// 		let op=_this.chart.getOption()
				// 		// 获取想要的数据
				// 		let Xname=op.xAxis[0].data[xIndex]
				// 		let value=op.series[0].data[xIndex]
				// 		console.log('op.series:',op.series)
						
				// 		console.log('xIndex：',xIndex);
				// 		console.log();
						
				// 	}
				// })

				/* 只有点击柱状图或折线才能触发 toolsbar不触发(不过信息全)*/
				this.chart.on('click',function(params){
					console.log('click 触发了',params) // params.seriesName params.value
					// x轴序号
					let xIndex=params.dataIndex
					// 获取当前图表的option
					let op=_this.chart.getOption()
					// 获取想要的数据
					let Xname=op.xAxis[0].data[xIndex]
					let value=op.series[0].data[xIndex]
				})
			})
		},
		setChartOption(){
			let _this = this
			this.chart.setOption(this.getChartParams(), true)
		},
		getChartParams(){
			let _this = this
			return{
				// backgroundColor: '#394056',
				// 自定义颜色(按顺序显示)
				color:[
					'#3366cc','#F8601E','#109618','#990099','ff9900',
					'#0099c6','#dd4477','#66aa00','#b82e2e','#316395',
					'#994499','#ff4412','#22aa99','#aaaa11','#6633cc',
					'#e67300','#8b0707','#651067','#329262','#5574a6',
					'#3b3eac'
				],
				// 整体控制边界宽高
				grid: {
					top:'15%', // 100
					left: '2%',
					right: '2%',
					bottom: '12%',
					containLabel: true
				},
				// 标题
				title: {
					// subtext:'subtext',
					top: 20,
					text: '命中趋势图',
					textStyle: {
					fontWeight: 'normal',
					fontSize: 18,
					color: '#F1F1F3' // #F8601E
					},
					left: '1%' // right:'1%'
				},
				// legend(对应toolsbar )  
				legend: {
					data: _this.chartData.legendData, // ['板块1', 'key1', 'key2']
					// type:'plain',
					// selected:{'全部':true,'key1':true,'key2':true} //控制选中状态
					/*
					top: 20,
					icon: 'rect',
					itemWidth: 14,
					itemHeight: 5,
					itemGap: 13,
					right: '4%',
					textStyle: {
						fontSize: 12,
						color: '#F1F1F3'
					}
					*/
				},
				// 坐标指示器tooltip
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器,坐标触发有效
						type:'cross',
						crossStyle:'#999',
					},
					// 自定义hover效果
					formatter: function(params){
						// console.log('params：',params);
						// if(!Array.isArray(params)){
						// 	return params
						// }else{
							let relVal = params[0].name
							for(let i = 1;i < params.length;i++){
								relVal +=
									'<br/>' +
									params[i].marker +
									params[i].seriesName +
									':' +
									params[i].value 
									// + '<br/>'
							}
							return relVal
						// }
					}
				},
				
				// 自定义缩放条
				dataZoom: [
					{ 
						type: "slider",/* 类型 */
						xAxisIndex: 0,/* 对应的轴 */
						start: 0,/* 开始 */
						end: 100,/* 结束 */
						height: 5,
						bottom: '25',/* 位置，定位 */
						left:85,
						right:95,
						fillerColor:'rgba(248,96,30,1)',/* 被start和end遮住的部分 */
						// fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
						// 	//给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
						// 	//给第一个设置0，第四个设置1，就是垂直渐变
						// 	offset: 0,
						// 	color: '#1eb5e5'
						// }, {
						// 	offset: 1,
						// 	color: '#1eb5e5'
						// }]),
						borderColor:"#ededed",
						backgroundColor:'rgba(248,96,30,0.4)',/* 背景 #a2a6ad  #F8601E */
						showDataShadow: false, //是否显示数据阴影 默认auto
						showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
						handleIcon:
						'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', 
						// handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
						handleSize: '16',
						handleStyle:{
							/* 手柄的样式 */
							shadowBlur:6,
							shadowOffsetX:1,
							shadowOffsetY:2,
							shadowColor:'#fff',
							color:"#fff",
							borderColor:'rgb(248,96,30)'
						},
						dataBackground:{
							/* 数据背景 */
							lineStyle:{
								color:'transparent'
							},
							areaStyle:{
								color:'transparent',
								shadowColor:'transparent',
								opacity:0
							}
						}
					}
				],
				// x轴(坐标 文字 样式)
				xAxis: [
					{
					type: 'category',
					// 坐标label
					axisLabel:{
						rotate:30,
						// interval:0, //间隔
						// formatter: function(value){
						//   return value.split('').join('/n')
						// }
					},
					axisPointer:{
						type:'shadow'
					},
					data: _this.chartData.XData, // ['1号','2号','3号']
					/* 
						// 垂直x轴的线
						splitLine: {
						show: false
						},
						// 坐标轴
						axisLine: {
						// show: false,
						lineStyle: {
							color: '#57617B'
						}
						},
					*/ 
					}
				],
				// y轴(坐标 单位/文字 设置)
				yAxis: [
					{
					type: 'value',
					name: '调用量',
					min:0,
					max:100,
					// 坐标轴文字
					axisLabel: {
						/*
						margin: 10,
						textStyle: {
							fontSize: 14
						},
						*/
						formatter:`{value}个`
					},
					/* 
						// 坐标轴刻度
						axisTick: {
							show: false
						},
						// 坐标轴
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						splitLine: {
							lineStyle: {
								color: '#57617B'
							}
						}
					*/
					},
					{
					type: 'value',
					name: '命中数',
					min:0,
					max:100,
					// 坐标轴文字
					axisLabel: {
						margin: 10,
						textStyle: {
							fontSize: 14
						},
						formatter:`{value}个`
					},
					}
				],
				// 数据(各type类型(bar line) 数据)
				series: _this.chartData.seriesData, // [{name:'板块1',type:'bar',data:['1','2','3']}]
				// series: [
				// 	{
				// 		name:'板块1',
				// 		type:'bar',
				// 		data: [50,100,150]
				// 	},
				// 	{
				// 	name: 'key1',
				// 	type: 'line',
				// 	data: [220, 182, 191]
				// 	/*
				// 		smooth: true,
				// 		symbol: 'circle',
				// 		symbolSize: 5,
				// 		showSymbol: false,
				// 		lineStyle: {
				// 			normal: {
				// 				width: 1
				// 			}
				// 		},
				// 		areaStyle: {
				// 		normal: {
				// 			color: new echarts.graphic.LinearGradient(0,0,0,1,
				// 				[
				// 					{
				// 						offset: 0,
				// 						color: 'rgba(137, 189, 27, 0.3)'
				// 					},
				// 					{
				// 						offset: 0.8,
				// 						color: 'rgba(137, 189, 27, 0)'
				// 					}
				// 				],
				// 				false
				// 			),
				// 			shadowColor: 'rgba(0, 0, 0, 0.1)',
				// 			shadowBlur: 10
				// 		}
				// 		},
				// 		itemStyle: {
				// 			normal: {
				// 				color: 'rgb(137,189,27)',
				// 				borderColor: 'rgba(137,189,2,0.27)',
				// 				borderWidth: 12
				// 			}
				// 		}
				// 	*/
				// 	}
				// ]
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
.bar-line-chart{
	height:400px;
}
</style>

