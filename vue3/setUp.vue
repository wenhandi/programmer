<template>

    <div class="home">

        <div>名字：{{ name }}</div>

        <ul>

            <li v-for="item in list" :key="item" @click="show(item)">{{ item }}</li>

          </ul>

      </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// 注：defineComponent 在TypeScript下，给予了组件正确的参数类型推断

export default defineComponent({
  name: "Home",

  components: {},

  props: ["msg"],

  setup(props, context) {
    // 注：setup函数是处于生命周期函数 beforeCreate 和 Created 两个钩子函数之间的函数 也就说在 setup 函数中是无法使用 data 和 methods 中的数据和方法，而methods等可以使用setup中return出去的数据。

    /*

    一.函数的第一个参数是 props 用于接收 props.msg

      这个props是一个响应式的Proxy对象，不可以解构，解构后会失去响应，如果要用解构的方式，要用toRefs

      let { msg } = toRefs(props) //但是解析成ref了要用msg.value,所以直接用props.msg更简单

    二.context对象在setup()中暴露三个属性 attrs 、slots 和 emit 因为在setup函数中还没有创建Vue实例，
是无法使用vm.$attrs、vm.$slots和vm.$emit的，所以这三个属性充当了这样的作用，使用方法相同。

    注意：
      context.attrs和vm.$attrts包含的是在实例vm.props中没有被声明识别的attribute（class和style除外）。
所以setup()中参数props中暴露的变量，就不会在context.attrs中暴露。

      context.slots和vm.$slots只能访问具名插槽，没有命名的插槽或者v-slot:default的是没有暴露的。

      context的attrs和slots是有状态的，当组件更新时也会实时更新，所以也不要解构。但与props不同的是，它们不是响应式的，
在setup()中的使用应保持只读的状态，如果要改变可以在onUpdated的周期函数中进行。

      context.emit和vm.$emit可以触发实例上的监听事件。

    */

    const list = ref(["深圳", "北京", "上海"]);

    const name = ref("");
    //注：用ref是为了转换成引用类型，让全局引用保持一致，而之前原始类型是不行的，所以要name.value的方示赋值

    const show = (index: string) => {
      name.value = index;
    }; // 注：不return出去的数据，模板是无法使用的。

    return {
      list,

      name,

      show
    };
  }
});
</script>