<template>
    <div class="list-content">
            <slot name="item"> </slot> 
            <!-- <div v-for="(item,index) in listData" :key="index" class="item-content">
                    {{  `滚动${item}` }}
            </div> -->
            <div @click="onLoadPage()" class="more">
                加载更多
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
  methods:{
    //   addList(){
    //       const t_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    //       const n_list = t_list.map(item=>{
    //           return `add${this.listData.length}`
    //       })
    //       this.listData.push(...n_list)
    //   },

    onLoadPage(){
        // 加载更多
         const ulDom = document.querySelector('.list-content')

        this.$emit('addList')
        const ulDomObj = ulDom.getBoundingClientRect()
        console.log('ulDomObj,ulDomObj.height：',ulDomObj, ulDomObj.height)
        
        // 设置动态高度
        this.$nextTick(()=>{
            const ulDom2 = document.querySelector('.list-content')
            const Height =  ulDom2.getBoundingClientRect().height
            console.log('nextTick-ulDomObj.height:', Height)
            this.$emit('getHeight', Height )
        })
        
  
        
    }
  },
  mounted() {
   
  },
  beforeDestory(){
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

