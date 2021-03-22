<template>

      <div class="Demo">

            <div>名字：{{ name }}</div>

          </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Demo",

  components: {},

  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({ name: "我是 Suspense 异步请求组件" });
      }, 2100);
    });
  }
});
</script>

2. 使用引入 home.vue

<template>

      <div class="home">

            <Suspense>

                  <template #default>
                       
                <Demo />

                      </template>

                  <template #fallback>

                        <p>加载中...</p>

                      </template>

                </Suspense>

          </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Demo",

  components: {},

  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({ name: "我是 Suspense 异步请求组件 " });
      }, 2100);
    });
  }
});
</script>