<template>

      <div class="home">

            <div>名字：{{ name }}</div>

            <ul>

                  <li v-for="item in list" :key="item" @click="show(item)">{{ item }}</li>

                </ul>

          </div>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Home",

  components: {},

  setup() {
    const data = reactive({
      list: ["深圳", "北京", "上海"],

      name: "",

      show: (index: string) => {
        data.name = index;
      }
    });

    const refData = toRefs(data); //不能直接解析 ...data 必须用 toRefs()

    return {
      ...refData
    };
  }
});
</script>