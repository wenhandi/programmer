<template>
    <div class="container">

        <div class="floor-box">
            <div v-for="item in myList" :key="item.name">
                <a :href="'#'+item.id" >{{item.name}}</a>
            </div>
        </div>
        <div class="content-box">
            <div :id="item.id" v-for="item in myList" :key="item.name">
                <div>{{item.name}}</div>
                <div class="goods-box">
                    <div class="goods" v-for="row in item.list" :key="row.goodsNo">
                        <img class="img" :src="row.picUrl" alt="">
                        <div>{{row.price}}</div>
                    </div>
                </div>
            </div>
            <!-- <div v-for="i in arr" :key="i">11222222</div> -->
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
        arr: [],
      myList: [
        {
          id: 8,
          name: "优惠爆品",
          list: [
            {
              goodsNo: "BLG-p-bskl-330ml",
              name: "百事可乐330ml",
              picUrl:
                "https://image.missfresh.cn/2237c1af665a4a9db1141a43784f5e8a.png",
              price: 300
            },
            {
              goodsNo: "BLG-p-bskl-330ml",
              name: "百事可乐330ml",
              picUrl:
                "https://image.missfresh.cn/2237c1af665a4a9db1141a43784f5e8a.png",
              price: 300
            },
            {
              goodsNo: "BLG-p-bskl-330ml",
              name: "百事可乐330ml",
              picUrl:
                "https://image.missfresh.cn/2237c1af665a4a9db1141a43784f5e8a.png",
              price: 300
            },
            {
              goodsNo: "BLG-p-bskl-330ml",
              name: "百事可乐330ml",
              picUrl:
                "https://image.missfresh.cn/2237c1af665a4a9db1141a43784f5e8a.png",
              price: 300
            },
            {
              goodsNo: "BLG-p-bskl-330ml",
              name: "百事可乐330ml",
              picUrl:
                "https://image.missfresh.cn/2237c1af665a4a9db1141a43784f5e8a.png",
              price: 300
            },
            {
              goodsNo: "BLG-p-bskl-330ml",
              name: "百事可乐330ml",
              picUrl:
                "https://image.missfresh.cn/2237c1af665a4a9db1141a43784f5e8a.png",
              price: 300
            }
          ]
        },
        {
          id: 9,
          name: "乳制品类",
          list: [
            {
              goodsNo: "blg-p-xxwxjnn-4h",
              name: "新希望香蕉牛奶200ml",
              picUrl:
                "https://image.missfresh.cn/cd15a0502f3049d1a768e0dd4aafc890.png",
              price: 490
            },
            {
              goodsNo: "blg-p-xxwxjnn-4h",
              name: "新希望香蕉牛奶200ml",
              picUrl:
                "https://image.missfresh.cn/cd15a0502f3049d1a768e0dd4aafc890.png",
              price: 490
            }
          ]
        },
        {
          id: 10,
          name: "饮品饮料",
          list: [
            {
              goodsNo: "blg-p-hdrpwtyw-4h",
              name: "维他原味豆奶250ml",
              picUrl:
                "https://image.missfresh.cn/53956efd9eb448d3a45e3b44e2db44f6.png",
              price: 380
            },
            {
              goodsNo: "blg-p-hdrpwtyw-4h",
              name: "维他原味豆奶250ml",
              picUrl:
                "https://image.missfresh.cn/53956efd9eb448d3a45e3b44e2db44f6.png",
              price: 380
            }
          ]
        },
        {
          id: 11,
          name: "休闲零食",
          list: [
            {
              goodsNo: "blg-p-wtnmcgz-310ml",
              name: "维他柠檬茶（罐）310ml",
              picUrl:
                "https://image.missfresh.cn/f47f82bf42484b90b8d237295d20e666.png",
              price: 500
            },
            {
              goodsNo: "blg-p-wtnmcgz-310ml",
              name: "维他柠檬茶（罐）310ml",
              picUrl:
                "https://image.missfresh.cn/f47f82bf42484b90b8d237295d20e666.png",
              price: 500
            }
          ]
        },
        {
          id: 12,
          name: "速食快餐",
          list: [
            {
              goodsNo: "blg-p-wtnmcgz-310ml",
              name: "维他柠檬茶（罐）310ml",
              picUrl:
                "https://image.missfresh.cn/f47f82bf42484b90b8d237295d20e666.png",
              price: 500
            },
            {
              goodsNo: "blg-p-wtnmcgz-310ml",
              name: "维他柠檬茶（罐）310ml",
              picUrl:
                "https://image.missfresh.cn/f47f82bf42484b90b8d237295d20e666.png",
              price: 500
            }
          ]
        }
      ]
    };
  },

  created(){
      this.arr.length = 100
      this.arr.fill(9)
  }
};
</script>


<style scoped>
.container {
  display: flex;
  height: 200px;
}

.floor-box {
  width: 200px;
}

.content-box {
  display: flex;
  flex-direction: column;
}
.goods-box {
  display: flex;
  flex-wrap: wrap;
}
.goods {
  justify-content: center;
  align-items: center;
  border: 1px solid #cccccc;
}

.img {
  width: 60px;
  height: 60px;
}
</style>
