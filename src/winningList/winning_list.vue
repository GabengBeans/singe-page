<template>
    <div class="list-wrap">
        <div class="winning-list">
            <div class="winning-list-text">
                <ul class="winning-list-ul">
                    <li v-for=" item in  winningListLogs" :key="item.index">恭喜 {{item.phone}} 刚刚获得 {{item.prizesName}}</li>
                </ul>
            </div>
        </div>
        <div>
            <div class="lottery-rules-header"></div>
            <div class="lottery-rules-text">
                1、每位用户每天登录APP有3次抽奖机会，分享到微信好友或朋友圈可额外获得1次机会；<br> 2、若用户中得实物奖品和现金红包，流星狗客服将在1-3个工作日与该用户联系兑奖事宜；

                <br> 3、请中奖用户向客服提供姓名、地址、手机号等信息；

                <br> 4、客服若7日内无法联系到中奖用户，则视为该用户自动放弃领取本次奖励；

                <br> 5、本次活动最终解释权归大恩德成科技(北京)有限公司所有.

                <br>
            </div>
        </div>
    </div>
</template>

<script>
import baseUrl from "../../libs/baseUrl";
import util from "../../libs/util";
export default {
  data() {
    return {
      winningListLogs: [],
      rollingStatus: ""
    };
  },
  mounted() {
    let params={
      limit:20
    }
    util.get(baseUrl.list_prizes_reveive_logs_url,params).then(resp => {
      if (resp.data.success) {
        let arr = resp.data.data;
        arr.map(item => {
          let strArr = Array.from(item.phone);
          strArr.splice(3, 4, "****");
          item.phone = strArr.join("");
        });
        arr = arr.concat(arr);
        this.winningListLogs = arr;
        //  let val = 0
        // clearInterval(this.rollingStatus)
        // let that = this
        // this.rollingStatus = setInterval(function(){
        //      let length = that.winningListLogs.length
        //      if(window.sessionStorage.getItem('isAndroid')){
        //          if(Math.abs(val)>=length/4*50){
        //               val = 0
        //          }
        //      }else{
        //          if(Math.abs(val)>=length/2*50){
        //              val = 0
        //             }
        //      }

        //     $(".winning-list-ul").css("top",val-- + "px")
        // },17)
      } else {
        console.log(resp.data.msg);
      }
    });
  }
};
</script>
<style>
@import "../../style/public.css";
.list-wrap {
  background-color: #ffe2b0;
  padding-top: 30px;
}
.winning-list {
  width: 663px;
  height: 381px;
  background: url("../../images/winning_list.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  box-sizing: border-box;
  padding-top: 120px;
  padding-bottom: 60px;
}
/* .winning-list-text{
    width: 663px;
    height: 200px;
    overflow: hidden;
    position: relative;
}
.winning-list-ul{
     width: 663px;
    height: 200px;
    text-align: center;
    line-height: 50px;
    font-family: PingFang-SC-Mediim;
    font-size: 24px;
    color: rgb(240,10,56);
    position:absolute;
    top:0;
} */
.lottery-rules-header {
  width: 551px;
  height: 32px;
  background: url("../../images/lottery_rules_header.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-bottom: 30px;
}
.lottery-rules-text {
  width: 551px;
  margin: 0 auto;
  font-family: "PingFang-SC-Medium";
  font-size: 18px;
  color: rgb(240, 10, 56);
  padding-bottom: 30px;
}
@keyframes scrollText1 {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(-50px);
  }
  20% {
    transform: translateY(-100px);
  }
  30% {
    transform: translateY(-150px);
  }
  40% {
    transform: translateY(-200px);
  }
  50% {
    transform: translateY(-250px);
  }
   60% {
    transform: translateY(-300px);
  }
   70% {
    transform: translateY(-350px);
  }
   80% {
    transform: translateY(-400px);
  }
   90% {
    transform: translateY(-450px);
  }
   100% {
    transform: translateY(-500px);
  }
}
.winning-list-text {
  position: relative;
  width: 663px;
  height: 200px;
  overflow: hidden;
}
.winning-list-ul {
  width: 663px;
  height: 200px;
  text-align: center;
  line-height: 50px;
  font-family: PingFang-SC-Mediim;
  font-size: 24px;
  color: rgb(240, 10, 56);
  position: absolute;
  top: 0;
  -webkit-animation: scrollText1 10s infinite cubic-bezier(1, 0, 0.5, 0);
  animation: scrollText1 10s infinite cubic-bezier(1, 0, 0.5, 0);
}
.winning-list-ul li {
  height: 50px;
}
</style>
