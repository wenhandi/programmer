<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from "vue";

export default defineComponent({
  name: "Home",

  components: {},

  setup() {
    const text = ref("测试单个值");

    const data = reactive({
      list: ["深圳", "北京", "上海"],

      name: "",

      show: (index: string) => {
        data.name = index;
      }
    }); //watch(text, 单个用法，watch([text,()=>data.name], 多个用法，注：()=>data.name 为了兼容vue2

    watch([text, () => data.name], (newValue, oldValue) => {
      console.log(`new--->${newValue}`);

      console.log(`old--->${oldValue}`);
    });

    const refData = toRefs(data);

    return {
      ...refData
    };
  }
});
</script>