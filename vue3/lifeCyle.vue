# Vue3 生命周期函数用法, 需要引入 (注：vue2 生命周期函数不影响)

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from "vue";

export default defineComponent({
  name: "Home",

  components: {},

  setup() {
    //setup() 开始创建组件之前，在beforeCreate和created之前执行。

    const data = reactive({
      list: ["深圳", "北京", "上海"]
    });

    onBeforeMount(() => {
      //组件挂载到节点上之前执行的函数。
    });

    onMounted(() => {
      //组件挂载完成后执行的函数。
    });

    onBeforeUpdate(() => {
      //组件更新之前执行的函数
    });

    onUpdated(() => {
      //组件更新完成之后执行的函数。
    });

    onBeforeUnmount(() => {
      //组件卸载之前执行的函数。
    });

    onUnmounted(() => {
      //组件卸载完成后执行的函数。
    });

    onActivated(() => {
      //被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。
    });

    onDeactivated(() => {
      //比如从 A 组件，切换到 B 组件，A 组件消失时执行。
    });

    onErrorCaptured(() => {
      //当捕获一个来自子孙组件的异常时激活钩子函数。
    }); //< 调试用生命函数

    onRenderTracked(event => {
      //跟踪所有状态触发

      console.log(event);
    });

    onRenderTriggered(event => {
      //跟踪当前状态触发

      console.log(event); 
      //key 那边变量发生了变化 //newValue 更新后变量的值 //oldValue 更新前变量的值 //target 目前页面中的响应变量和函数
    }); // 调试用生命函数 />

    const refData = toRefs(data);

    return {
      ...refData
    };
  },

  mounted() {
    console.log("vue2 生命周期");
  }
});
</script>