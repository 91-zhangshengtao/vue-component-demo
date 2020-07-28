<template>
  <div class="tree">

    <h1>Element tree 纵向</h1>
    <div>
        <el-row style="margin:20px 20px;">
          <el-col :span="12">
            <etree :expression-clob="expressionClob" />
          </el-col>
          <el-col :span="2" :pull="2">
            数据源：
          </el-col>
          <el-col :span="10">
            {{ expressionClob }}
          </el-col>
        </el-row>
    </div>

    <h1>Tree self 纵向</h1>
    <div>
        <el-row>
          <el-col :span="8">
            <tree :treedata="treedata1" :is-one-level="true" />
          </el-col>
          <el-col :span="2" :push="2">
            数据源：
          </el-col>
          <el-col :span="10" :push="2">
            {{ treedata1 }}
          </el-col>
        </el-row>
    </div>
   
   

    <h1>Tree self 横向</h1>
    <div>
        <el-row>
          <el-col :span="12">
            <div id="tree_wrapper">
              <itree style="padding-left:0px;" :treedata="treedata2" :is-one-level="true" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          数据源:
          {{ treedata2 }}
        </el-row>
    </div>
    

  </div>
</template>

<script>
import tree from '@/components/Tree/index'
import itree from '@/components/Tree/itree'
import etree from '@/components/Tree/ElemenTree'
export default {
  name: 'Tree',
  components: {
    tree,
    itree,
    etree
  },
  data() {
    return {
       // 逻辑规则tree结构
      expressionClob: {
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
      },
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

