<template>
    <div v-if="error">failed to load</div>
    <div v-else-if="loading">loading...</div>
    <div v-else>hello {{fullName}}!</div>
</template>

<script>
import { createComponent, computed } from 'vue'

export default {
  data() {
    // 集中式的data定义 如果有其他逻辑相关的数据就很容易混乱
    return {
        data: {
            firstName: '',
            lastName: ''
        },
        loading: false,
        error: false,
    },
  },
  async created() {
      try {
        // 管理loading
        this.loading = true
        // 取数据
        const data = await this.$axios('/api/user')
        this.data = data
      } catch (e) {
        // 管理error
        this.error = true
      } finally {
        // 管理loading
        this.loading = false
      }
  },
  computed() {
      // 没人知道这个fullName和哪一部分的异步请求有关 和哪一部分的data有关 除非仔细阅读
      // 在组件大了以后更是如此
      fullName() {
          return this.data.firstName + this.data.lastName
      }
  }
}
</script>