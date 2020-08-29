<template>
  <div class="app-container">
    <el-form :model="FormData" ref="FormData" label-width="120px" label-position="left">
				<el-form-item
					v-for="(item, index) in FormData.lists"
					:label="'域名' + index"
					:key="item.key"
					:prop="'lists.' + index + '.value'"
				>
						<el-input v-model="item.value" class="p_input fl"></el-input>
						<el-button class="p_button fl" @click.prevent="removeDomain(item)">删除</el-button>
				</el-form-item>
				<el-form-item>
						<el-button @click="addDomain">新增域名</el-button>
				</el-form-item>
    </el-form>
		<div>
			{{FormData}}
		</div>
  </div>
</template>

<script>

export default {
  name: 'Observe',
  components: {
  },
  data() {
    return {
			 FormData: {
          lists: [{
            value: ''
          }]
        }
    }
  },
  mounted() {
   
  },
  methods:{
		removeDomain(item) {
        var index = this.FormData.lists.indexOf(item)
        if (index !== -1) {
          this.FormData.lists.splice(index, 1)
        }
      },
      addDomain() {
        this.FormData.lists.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
.p_input{
	width:300px !important;
}
.fl{
	float: left;
}
</style>

