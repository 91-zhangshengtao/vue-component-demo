<template>
  <div class="app-container">
  </div>
</template>

<script>
import { testAES } from '../utils/aes'
import { testRSA } from '../utils/rsa'
export default {
  name: 'Rsatrest',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    // testAES()
    testRSA()
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>

</style>

