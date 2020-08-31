<template>
  <div class="echart-wrapper">
    <el-row>
        <el-col>
            <h1>Bar Line Chart demo</h1>
        </el-col>
    </el-row>
      <el-row>
        <el-col>
            <el-button type="primary" @click="getFetch">点击请求</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <map-chart /> 
        </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
        <el-col>
            <Bar-line-chart :chartData="chartData" v-if="isReadyLoad" /> 
        </el-col>
    </el-row>
  
  </div>
</template>

<script>
import MapChart from '@components/echart/MapChart.vue'
const BarLineChart =  () => import(/* webpackChunkName: "BarLineChart" */ '@components/echart/BarLineChart.vue')

import { throttle } from '@utils/index.js'

export default {
  name: 'Echartdemo',
  components: {
      BarLineChart,
      MapChart
  },
  data() {
    return {
        chartData:{},
        isReadyLoad:false
    }
  },
  methods:{
      getFetch(){
          console.log('api');
          
          this.chartData = Object.assign({},{
                legendData: ['板块1','key1','key2','key3'],
                XData: ['1号','2号','3号','4号'],
                seriesData:[
                    {name:'板块1',type:'bar',data:[1,2,3,4]},
                    {name:'key1',type:'line',data:[10,20,30,40]},
                    {name:'key2',type:'line',data:[1,50,10,20]},
                    {name:'key3',type:'line',data:[40,30,20,10]}
                ]
          })
      },
      onReadyLoad(){
        console.log('scroll');
        this.isReadyLoad= true
      },
      handleScroll(){
            let _this = this
            let clientHeight = document.documentElement.clientHeight;
            let scrollHeight = document.body.scrollHeight;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let proLoadDis = 5; // 预设值
        
            // console.log('scrollTop:',scrollTop);
            // console.log('clientHeight:', clientHeight)
            // console.log('scrollHeight:',scrollHeight);
                
            if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
                if(this.isReadyLoad) return
                throttle(_this.onReadyLoad(),300,1)
            }
      }
  },
  mounted() {
      window.addEventListener('scroll', this.handleScroll);
      setTimeout(()=>{
        this.chartData = {
            legendData: ['板块1','key1','key2'],
            XData: ['1号','2号','3号'],
            seriesData:[
                {name:'板块1',type:'bar',data:[1,2,3]},
                {name:'key1',type:'line',data:[10,20,30]},
                {name:'key2',type:'line',data:[1,50,10]}
            ]
        }
      },1000)
  },
  beforeDestory(){
     window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
<style lang="scss" scoped>


</style>

