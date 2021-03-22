import { ref, onMounted, onUnmounted} from 'vue'

export function useMousePosition(){
  
  // 响应式变量
  const x = ref(0)
  const y = ref(0)

  function update(e){
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousemove", update)
  })

  onMounted(() => {
    window.removeEventListener("mousemove", update)
  })

  return {x, y}
}

import { useMousePosition} from "./mouse"

export default{
  // 生产data
  setup(){
    const {x, y} = useMousePositon()

    return {x, y}
  }
}