<template>
  <div class="box">
    <h4>每日优鲜总部如厕指南</h4>
    <div class="btn-grounp-wrap">
      <div class="btn-grounp">
        <div class="btn" :class="{ active: maleFlag}" @click="tapOne(true)">男生</div>
        <div class="btn" :class="{ active: !maleFlag}" @click="tapOne(false)">女生</div>
      </div>
    </div>
    <div class="tip">当前所在<span class="main-color">{{floorList[curFloorIndex]}}</span>层，剩余空位<span class="main-color">{{curRemain}}</span>个{{noticeFlag ? '，选楼层可开启空闲提醒' : ''}}</div>
    <div class="floor-box">
      <div class="floor-text">
        <div class="empty-text"></div>
        <div class="elevator-text">近电梯</div>
        <div class="window-text">近东侧窗户</div>
      </div>
      <div class="floor-content">
        <div class="floor">
          <div class="one-floor" :class="{'one-floor-active': index === curFloorIndex}" v-for="(item,index) in floorList" :key="item.layer" @click="clickFloor(index)">
            {{item}}
          </div>
        </div>
        <div class="pit-list m-r">
          <div class="pit-box" v-for="item in cur_elevator_list" :key="item.toiletNo">
            <div class="pit" :class="{'pit-active': item.useStatus === 1}"></div>
            <div>{{item.useStatus === 1? "占用" : "空闲"}}</div>
          </div>
        </div>
        <div class="pit-list">
          <div class="pit-box" v-for="item in cur_window_list" :key="item.toiletNo">
            <div class="pit" :class="{'pit-active': item.useStatus === 1}"></div>
            <div>{{item.useStatus === 1? "占用" : "空闲"}}</div>
          </div>
        </div>
        <div class="">
          <div class="notice-link" v-for="(item, index) in curList" :key="item.layer" @click="setNotice">
            {{!item.remain && noticeFlag && index === curFloorIndex ? "提醒" : ""}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import post from "./net.js";
import Dialog from "vant/lib/dialog";
import "vant/lib/dialog/style";
export default {
  data() {
    return {
      timer: null,
      noticeFlag: true,
      maleFlag: true,
      floorList: [8, 9, 10, 11, 12, 13],
      curList: [],
      curFloorIndex: 0,
      curNoticeList: [],
      maleNoticeFlag: "",
      curNoticeFloorIndex: null,
      curFloorData: {},
      curRemain: null,
      boy_elevator_list: [],
      boy_window_list: [],
      girl_elevator_list: [],
      girl_window_list: [],
      cur_elevator_list: [],
      cur_window_list: [],
      boy_remain: 0,
      girl_remain: 0
    };
  },
  methods: {
    _listQry() {
      const url =
        "http://grampus-hardware.dev19.staging.imrfresh.com/api/hardware/hackathon/list";
      post(url).then(
        res => {
          this.boy_elevator_list = [];
          this.boy_window_list = [];
          this.girl_elevator_list = [];
          this.girl_window_list = [];
          // 男生
          this.boyList = res.boyList;
          res.boyList.forEach(item => {
            this.boy_elevator_list = this.boy_elevator_list.concat([
              item.list[0],
              item.list[1]
            ]);
            this.boy_window_list = this.boy_window_list.concat([
              item.list[2],
              item.list[3]
            ]);
          });
          this.boy_remain = res.boyList[this.curFloorIndex].remain;
          // 女生
          this.girlList = res.girlList;
          res.girlList.forEach(item => {
            this.girl_elevator_list = this.girl_elevator_list.concat([
              item.list[0],
              item.list[1]
            ]);
            this.girl_window_list = this.girl_window_list.concat([
              item.list[2],
              item.list[3]
            ]);
          });
          this.girl_remain = res.girlList[this.curFloorIndex].remain;
          // 当前层、性别
          this.setCurData();
          // 通知
          this._notice();
        },
        err => {
          console.log(err)
          // alert(err);
        }
      );
    },
    // 当前层、性别数据
    setCurData() {
      this.curRemain = this.maleFlag ? this.boy_remain : this.girl_remain;
      this.cur_elevator_list = this.maleFlag
        ? this.boy_elevator_list
        : this.girl_elevator_list;
      this.cur_window_list = this.maleFlag
        ? this.boy_window_list
        : this.girl_window_list;
      this.curList = this.maleFlag ? this.boyList : this.girlList;
      if (this.maleNoticeFlag === "男") {
        this.curNoticeList = this.boyList;
      } else if (this.maleNoticeFlag === "女") {
        this.curNoticeList = this.girlList;
      }else{
        this.curNoticeList = [];
      }
      console.log(1111111, this.cur_elevator_list);
      console.log(22222, this.cur_window_list);
    },

    tapOne(maleFlag) {
      this.maleFlag = maleFlag;
      this.setCurData();
    },
    clickFloor(index) {
      this.curFloorIndex = index;
    },

    setNotice() {
      if (this.noticeFlag) {
        this.maleNoticeFlag = this.maleFlag ? "男" : "女";
        this.curNoticeFloorIndex = this.curFloorIndex;
        Dialog.alert({
          title: "提醒",
          message:
            this.floorList[this.curNoticeFloorIndex] +
            "层" +
            (this.maleFlag ? "男厕" : "女厕") +
            "已设置空闲提醒"
        }).then(() => {
          // on close
          this.noticeFlag = false;
        });
      }
    },
    _notice() {
      if (!this.noticeFlag) {
        let curFoorData = this.curNoticeList[this.curNoticeFloorIndex];
        if (curFoorData && curFoorData.remain) {
          Dialog.alert({
            title: "提醒",
            message:
              this.floorList[this.curNoticeFloorIndex] +
              "层" +
              (this.maleFlag ? "男厕" : "女厕") +
              "有空闲坑位"
          }).then(() => {
            // on close
            this.noticeFlag = true;
          });
        }
      }
    }
  },
  created() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this._listQry();
    }, 2000);
  }
};
</script>
<!-- <style scoped> -->
<style>
.van-dialog {
  width: 90%;
  font-size: 46px;
}
.van-dialog__header {
  padding-top: 52px;
  line-height: 48px;
}
.van-dialog__message--has-title {
  padding-top: 16px;
  color: #646566;
}
.van-dialog__message {
  font-size: 40px;
  line-height: 40px;
  padding: 52px 48px;
}
.van-dialog__confirm {
  border: 1px solid #ebedf0;
  height: 96px;
}
.van-dialog__footer {
  font-size: 40px;
  line-height: 40px;
}
.van-button__text {
  font-size: 40px;
  line-height: 40px;
}

.box {
  color: #323233;
  font-size: 46px;
  text-align: center;
}
.main-color {
  color: #409eff;
}
.btn-grounp-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.btn-grounp {
  display: flex;
  justify-content: center;
  border: 1px solid #409eff;
  border-radius: 10px;
  width: 60%;
}
.btn {
  box-sizing: border-box;
  width: 50%;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
}
.active {
  color: #ffffff;
  background-color: #409eff;
}
.tip {
  font-size: 30px;
  margin-bottom: 30px;
}

.floor-box {
  display: flex;
  flex-direction: column;
  margin: 20px 40px;
}
.floor-text {
  display: flex;
  margin-bottom: 40px;
}

.empty-text {
  width: 10%;
}
.elevator-text,
.window-text {
  width: 35%;
  font-size: 40px;
}
.elevator-text {
  margin-left: 50px;
  margin-right: 60px;
}
.floor-content {
  display: flex;
  justify-content: space-around;
}

.floor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
}
.one-floor {
  height: 200px;
  line-height: 200px;
}
.one-floor-active {
  color: #409eff;
  font-weight: 700;
  border-top: 8px solid #409eff;
  border-bottom: 8px solid #409eff;
}
.pit-list {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid #cccccc;
  border-radius: 20px;
  width: 35%;
}
.m-r {
  margin-right: 40px;
}
.pit-box {
  font-size: 36px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pit {
  width: 80px;
  height: 80px;
  margin-left: 40px;
  margin-right: 40px;
  background: url("./img/seat-no.png") no-repeat;
  background-size: contain;
}
.pit-active {
  background-image: url("./img/seat-yes.png");
}

.notice-link {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #409eff;
  text-decoration: underline;
  height: 200px;
  margin-left: 10px;
}
</style>
