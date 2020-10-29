<template>
  <div class="box">
    <div>
      <div>书名</div>
      <div>作者</div>
      <div>正</div>
    </div>
    <div v-for="item in list" :key="item.title">
      <div>{{item.title}}</div>
      <div>{{item.author}}</div>
      <div>{{item.zheng}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        },
        {
          title: "《财富自由之路》",
          author: "李笑来",
          zheng: "3"
        }
      ]
    };
  },
  methods: {},
  created() {}
};
</script>
<style scoped>
</style>

