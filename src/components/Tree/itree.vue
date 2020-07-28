<template>
  <ul style="width:100%;display:flex;flex-direction:column;">
    <li v-for="(data,index) in treedata" :key="index" style="width:200px;margin:5px 0px;padding:0px;" class="custom-tree-node flex-wrapper">
      <!-- :class="data.type == 'logicCondition' ? '' : 'ml20'" -->
      <div style="border:0.5px #ccc solid;width:200px;flex-shrink:0;display:flex;justify-content: space-between;">
        <!-- 逻辑条件(并且或者) -->
        <span v-if="data.type == 'logicCondition'" >
          <el-select v-model="data.operator" placeholder="请选择" style="width:80px;">
            <el-option
              v-for="(k,v) in logicType"
              :key="v"
              :label="k"
              :value="v"
            />
          </el-select>
        </span>

        <!-- 关键字 -->
        <span v-if="data.type !== 'logicCondition'" >
          <!-- style="font-size:.6em" -->
          <span style="padding-left:15px;font-size:12px">关键字:</span>
          <el-input v-model="data.name" type="text" size="mini" style="width:110px;"/>
        </span>

        <!-- 图标新增/删除操作 -->
        <span style="display:flex;flex-direction:row;align-items:center;">
          <!-- + -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-button v-if="data.type == 'logicCondition'" type="text" size="mini">
                <i class="el-icon-circle-plus"/>
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(v,k) in nodeType" :key="k" class="dropdown-item-tree" >
                <!-- 坑 -->
                <span class="dropdown-item-span" @click="AppendNode(data,k)">
                  {{ v }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- - -->
          <el-button v-if="!isOneLevel" type="text" size="mini" @click="RemoveNode(index,data,treedata)">
            <i class="el-icon-remove"/>
          </el-button>
        </span>
      </div>
      <div v-if="data.children && data.children.length>0" style="width:200px;">
        <my-tree2 :is-one-level="false" :treedata="data.children" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MyTree2',
  props: {
    'is-one-level': {
      type: [Boolean],
      default: false
    },
    treedata: {
      type: [Array],
      default: () => [
        {
          operator: 'OR',
          type: 'logicCondition',
          activeChecked: false,
          name: '全部',
          children: [
            {
              operator: 'AND',
              type: 'logicCondition',
              activeChecked: false,
              name: '组合1',
              children: [
              // { type: 'nodeCondition', name: '1' },
                { type: 'nodeCondition', name: '11' }
              ]
            },
            { type: 'nodeCondition', name: '22' }
          ]
        }
      ]
    }
  },
  data() {
    return {
      // 逻辑类型
      logicType: {
        AND: '并且',
        OR: '或者'
      },
      nodeType: { nodeCondition: '关键字', logicCondition: '逻辑表达式' }
    }
  },
  created() {
    console.log('treedata：', this.treedata)
  },
  methods: {
    AppendNode(data, type) {
      console.log('Append:', data, type)
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      // condition时下拉数据源里的
      if (type == 'logicCondition') {
        data.children.push({
          operator: 'AND',
          type: 'logicCondition',
          name: '',
          activeChecked: false,
          children: []
        })
      }
      // keyword时下拉数据源里的
      if (type == 'nodeCondition') {
        data.children.push({
          name: '',
          type: 'nodeCondition'
        })
      }
    },
    // 最外层不可删除
    RemoveNode(index, data, treedata) {
      console.log('remove:', index, data, treedata)

      if (treedata[index].children && treedata[index].children.length > 1) {
        this.$alert('该节点下有子节点，请删除子节点再重复操作')
        return
      }
      treedata.splice(index, 1)
      /* {name:'',children:[{name:'',operator:'AND'},{}]} */
      // const _this = this
      // if (data.children && data.children.length > 0) {
      //   this.$alert('该节点下有子节点，请删除子节点再重复操作')
      //   return
      // }
      /* 在父元素里删子元素 */
      // const parent = node.parent
      // 没有children,相对于上一级 parent就是children
      /* eslint-disable */
    //   const children = parent.data.children || parent.data

    //   const length = children.length
    //   for (let i = 1; i < length; i++) {
    //     if (children[i] == data) {
    //       if (i == 0) {
    //         children.shift() // 删除第一个
    //         continue
    //       } else if (i == length - 1) {
    //         children.pop() // 删除最后一个
    //         continue
    //       } else {
    //         children.splice(i, 1) // 删除下标为i的元素
    //         continue
    //       }
    //     }
    //   }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-item-tree{
  padding:0px !important;
  .dropdown-item-span{
    width:70px;
    padding:5px;
    font-size:12px;
    display:block;
    text-align:center;
  }
}
.ml20{
  margin-left:20px;
}
.flex-wrapper{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.custom-tree-node{
  padding:2px;
}



</style>
