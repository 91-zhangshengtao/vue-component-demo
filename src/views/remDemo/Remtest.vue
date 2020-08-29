<template>
  <div class="rem-wrapper">
     <div class="header-content">
         <div class="title-text">rem demo 1.相对于body滚动加载</div>
     </div>
     <div class="list-wrapper">
         <!-- <div class="list-content"> -->
            <Scrollview @addList="addList">
                <div slot="item">
                    <div v-for="(item,index) in listData" :key="index" class="item-content">
                        {{  `滚动${item}` }}
                    </div>
                </div>
            </Scrollview>
        <!-- </div> -->
     </div>
     <div class="bottom-bar">
         <div class="home tab-item">首页</div>
         <div class="order tab-item">点菜</div>
         <div class="my tab-item">我的</div>
     </div>

  </div>
</template>

<script>
import Scrollview from '@components/Scrollview/index-body.vue'
export default {
  name: 'Remrest',
  components: {
      Scrollview: Scrollview
  },
  data() {
    return {
        listData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  },
  methods:{
      addList(){
          const t_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
          const n_list = t_list.map(item=>{
              return `add${this.listData.length}`
          })
          this.listData.push(...n_list)
      },

     
  },
  mounted() {
   
  }
}
</script>
<style lang="scss" scoped>
@import '@styles/rem_function.scss'; // rem(手动方式)
.rem-wrapper{
    width:100%;
    height:100%;
    .header-content{
        .title-text{
            width:100%;
            position: fixed;
            left:0;
            top:0;
            text-align:center;
            line-height: px2rem(64px);
            height: px2rem(64px);
            background:#ededed;
        }
    }
    .list-wrapper{
        height:100%;
        // .list-content{
        //     padding-top: px2rem(80px);
        //     padding-bottom: px2rem(70px);
        // }
        .item-content{
                height: px2rem(20px);
                border-bottom:1px solid #ccc;
            }
        // .more{
        //     text-align:center;
        // }
    }
    
    .bottom-bar{
        z-index:99;
        background:#ededde;
        width:100%;
        border-top:px2rem(3px) solid #ccc;
        position: fixed;
        left:0;
        bottom:0;
        height:px2rem(50px);
        color:#999;
        display:flex;
        .tab-item{
            flex:1;
            display:flex;
            justify-content: center;
            align-items: center;
        }
    }
}

</style>

