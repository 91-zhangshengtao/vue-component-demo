<template>
  <div class="scroll-wrapper">
    <div class="title-content">
        <b>scroll demo</b><br/>
            1.不相对于body滚动
            2.点击加载更多
            3.设置动态高度
    </div>
    <div class="list-wrapper" :style="{'height': remHeight + 'rem'}">
         <!-- <div class="list-content"> -->
            <Scrollview @addList="addList" @getHeight="getHeight">
                <div slot="item">
                    <div v-for="(item,index) in listData" :key="index" class="item-content">
                        {{  `滚动${item}` }}
                    </div>
                </div>
            </Scrollview>
        <!-- </div> -->
    </div>
    

  </div>
</template>

<script>
import Scrollview from '@components/Scrollview/index-not-body.vue'
import { px2rem } from '@styles/rem_function.js'
export default {
  name: 'Scrolltestest',
  components: {
      Scrollview: Scrollview
  },
  data() {
    return {
        listData:[1,2,3,4,5,6,7,8,9,10],
        remHeight: px2rem(300)
    }
  },
  methods:{
      addList(){
          const t_list = [1,2,3,4,5,6]
          const n_list = t_list.map(item=>{
              return `add${this.listData.length}`
          })
          this.listData.push(...n_list)
      },
      getHeight(height){
        //   this.$nextTick()
          this.remHeight = px2rem(height)
      }

     
  },
  mounted() {
   
  }
}
</script>
<style lang="scss" scoped>
@import '@styles/rem_function.scss'; // rem(手动方式)
.scroll-wrapper{
    margin-top:5px;
    background:#fff;
    z-index:99;
}
.title-content{
    background: #ededed;
    height:px2rem(60px);
    white-space: pre-wrap;
}
.list-wrapper{
    box-sizing: border-box;
    margin-bottom:10px;
    width:100%;
    max-height: px2rem(500px); // max-height
    border:2px solid orchid;
    overflow: auto;
    .item-content{
        height: px2rem(20px);
     }
                
}

</style>

