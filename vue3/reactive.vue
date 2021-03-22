<template>

    <div class="home">

        <div>名字：{{ data.name }}</div>

        <ul>

            <li v-for="item in data.list" :key="item" @click="data.show(item)">{{ item }}</li>

          </ul>

      </div>

</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

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

    return {
      data
    };
  }
});
</script>