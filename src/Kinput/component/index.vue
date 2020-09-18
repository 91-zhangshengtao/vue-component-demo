<template>
  <div class="k-input-container">
    <input type="text"
        :value="text1"
        @input="$emit('change1', $event.target.value)"
    />

  </div>
</template>

<script>
export default {
    model: {
        prop: 'text1', 
        event: 'change1'
    },
    props: {
        text1: String,
        default() {
            return ''
        }
    }
}

import tree from '@/components/Tree/index'
import itree from '@/components/Tree/itree'
import etree from '@/components/Tree/ElemenTree'
export default {
  name: 'Tree',
  components: {
    filterList
  },
  data() {
    return {
       // 逻辑规则tree结构
      expressionClob: [
        {
          operator: 'OR',
          type: 'logicCondition',
          activeChecked: false,
          name: '全部',
          // children: [
          //   {
          //     operator: 'AND',
          //     type: 'logicCondition',
          //     activeChecked: false,
          //     name: '组合1',
          //     children: [
          //       // { type: 'nodeCondition', name: '1' },
          //       { type: 'nodeCondition', name: '11' }
          //     ]
          //   },
          //   { type: 'nodeCondition', name: '22' }
          // ]
        }
      ],
      treedata1: [
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
                { type: 'nodeCondition', name: '1' },
                { type: 'nodeCondition', name: '11' }
              ]
            },
            { type: 'nodeCondition', name: '22' }
          ]
        }
      ],
      treedata2: [
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
                { type: 'nodeCondition', name: '1' },
                { type: 'nodeCondition', name: '11' }
              ]
            },
            { type: 'nodeCondition', name: '22' },
            { type: 'nodeCondition', name: '355' }
          ]
        }
      ]
    }
  },
  created() {
    this.expressionClob = [
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
}
</script>
<style lang="scss" scoped>
#tree_wrapper{
  width:100%;
  height:300px;
  overflow: auto;
}
</style>

