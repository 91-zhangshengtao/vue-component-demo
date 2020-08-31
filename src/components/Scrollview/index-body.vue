<template>
    <div class="list-content">
            <div v-show="readyToLoad">
               <slot name="item" > </slot> 
                <!-- <div v-for="(item,index) in listData" :key="index" class="item-content">
                    {{  `滚动${item}` }}
                 </div> -->
            </div>
           
            <div @click="onLoadPage()" class="more">
                {{isend ? '已加载完成' : '加载更多'}}
            </div>
     </div>

</template>

<script>
export default {
  name: 'ScrollviewBody',
  components: {
  },
  data() {
    return {
        
    }
  },
  props:{
    isend:{
      type: [Boolean],
      default: false
    },
    readyToLoad:{
      type: [Boolean],
      default: true
    }
  },
  methods:{
    //   addList(){
    //       const t_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    //       const n_list = t_list.map(item=>{
    //           return `add${this.listData.length}`
    //       })
    //       this.listData.push(...n_list)
    //   },

    onLoadPage(){
       if(this.isend){
            return
        }
        if(!this.readyToLoad){
            return
        }
        // 滚动加载
        // scrollTop + clientHeight >= scrollHeight
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let proLoadDis = 5; // 预设值
       
        console.log('scrollTop:',scrollTop);
        console.log('clientHeight:', clientHeight)
        console.log('scrollHeight:',scrollHeight);
             
        if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
            this.$emit('onLoadPage')
        }
    }
  },
  mounted() {
     window.addEventListener('scroll', this.onLoadPage);
  },
  beforeDestory(){
     window.removeEventListener('scroll', this.onLoadPage);
  }
}
</script>
<style lang="scss" scoped>
// 注意外面 app层不要设置scroll:auto;
@import '@styles/rem_function.scss'; // rem(手动方式)
.list-content{
    padding-top: px2rem(80px);
    padding-bottom: px2rem(70px);
}
.more{
    text-align:center;
}
</style>

