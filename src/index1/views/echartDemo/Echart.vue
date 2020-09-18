<template>
  <div class="echart-wrapper">
    <el-row>
        <el-col>
            <h1>Bar Line Chart demo</h1>
        </el-col>
    </el-row>
      <el-row>
        <el-col>
            <el-button type="primary" @click="getFetch(true)">点击请求1</el-button>
            <el-button type="primary" @click="getFetch(false)">点击请求2</el-button>
            <el-button type="primary" @click="()=>{isSyncChange=!isSyncChange}">测试异步更新</el-button>
            <span>{{`isSyncChange:${isSyncChange}`}}</span>
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
        isReadyLoad:false,
        isSyncChange: false
    }
  },
  methods:{
      getFetch(flag){
          console.log('api');
          if(flag){
              this.chartData = Object.assign({},{
                legendData: ['板块1','key1','key2','key33'],
                XData: ['1号','2号','3号','4号'],
                seriesData:[
                    {name:'板块1',type:'bar',data:[1,2,3,4]},
                    {name:'key1',type:'line',data:[10,20,30,40]},
                    {name:'key2',type:'line',data:[1,50,10,20]},
                    {name:'key33',type:'line',data:[40,30,20,10]}
                ]
            })
          }else{
              this.chartData = Object.assign({},{
                legendData: ['板块1','key11','key33'],
                XData: ['1号','2号','3号','4号'],
                seriesData:[
                    {name:'板块1',type:'bar',data:[1,2,3,4]},
                    {name:'key11',type:'line',data:[10,20,30,40]},
                    // {name:'key2',type:'line',data:[1,50,10,20]},
                    {name:'key33',type:'line',data:[40,30,20,10]}
                ]
            })
          }
          
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
            let proLoadDis = 0; // 预设值
        
            console.log('scrollTop:',scrollTop);
            console.log('clientHeight:', clientHeight)
            console.log('scrollHeight:',scrollHeight);
            console.log('scrollTop + clientHeight:',scrollTop + clientHeight)
                
            if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
                if(this.isReadyLoad) return
                throttle(_this.onReadyLoad(),300,1)
            }
      }
  },
  updated(){
      console.log('父-updated')
  },
  created(){
    //   console.log('父-created')
     
  },
  mounted() {
    //   console.log('父-mounted')
    //   document.documentElement.scrollTop = 0
    // document.documentElement.scrollTop = 200
     window.scrollTo(0, 0)
    // document.body.scrollTop = 0
    console.log('scrollTop：',document.documentElement.scrollTop , document.body.scrollTop)

    setTimeout(()=>{
        window.addEventListener('scroll', this.handleScroll);
        this.chartData = {
            legendData: ['板块1','key1','key2','key3'],
                XData: ['1号','2号','3号','4号'],
                seriesData:[
                    {name:'板块1',type:'bar',data:[1,2,3,4]},
                    {name:'key1',type:'line',data:[10,20,30,40]},
                    {name:'key2',type:'line',data:[1,50,10,20]},
                    {name:'key3',type:'line',data:[40,30,20,10]}
                ]
        }
    },1000) 
  },
  beforeDestory(){
     console.log('父-beforeDestory');
     window.removeEventListener('scroll', this.handleScroll);
  },
  destoryed(){
      console.log('父-Destoryed');
      
  }
}
</script>
<style lang="scss" scoped>


</style>

