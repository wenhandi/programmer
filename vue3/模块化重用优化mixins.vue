1.新建useTime.ts文件

import { ref } from "vue";

const time = ref("00:00:00");

const getTime = () => {

    const now = new Date();

    const h= now.getHours() < 10 ? "0" + now.getHours() : now.getHours();

    const m = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

    const s= now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

    time.value = h + ":" + m + ":" + s;

    setTimeout(getTime, 1000);

};

export { time, getTime }

2.引入

<template>

  <div class="home">

    <div>时间：{{time}} <button @click="startTime">开始</button></div>

  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { time, getTime } from "./useTime";

export default defineComponent({
  name: "Home",

  components: {},

  setup() {
    const startTime = () => {
      getTime();
    };

    return {
      startTime,

      time
    };
  }
});
</script>