1. index.html 页面新加插入点（会挂载到 #headTitie DOM下）

<div id="headTitie"></div>

<div id="app"></div>

2. 在components目录下新建 headTitle.vue

<template>

      <teleport to="#headTitie">

            <div class="head">

                  <h1>{{ title }}</h1>

                </div>

          </teleport>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "headTitie",

  setup() {
    const title = ref("Vue3 新特性示例");

    return {
      title
    };
  }
});
</script>

3. 在 App.vue 加

<template>

     
    <headTitle />

     
    <router-view />

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "headTitie",

  setup() {
    const title = ref("Vue3 新特性示例");

    return {
      title
    };
  }
});
</script>