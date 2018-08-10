<template>
  <div class="lottery-wrap">
    <div class="lottery" style="overflow-x:hidden;">
      <img id="shan-img" style="display:none;" />
      <img id="sorry-img" style="display:none;" />
      <div class="banner">
        <div class="turnplate" style="background-image:url(../../images/turnplate-bg.png);background-size:100% 100%;">
          <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
          <img class="pointer" src="images/turnplate-pointer.png" @click="clickPointer" />
        </div>
        <div class="lottery-times">您今天还有
          <span class="lottery-times-span">{{lotteryTimes}}</span>
          次抽奖机会
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="winning-record-btn" @click="enterApp"></div>
      <div class="share-btn" @click="sharePage"></div>
    </div>
    <div v-if="modalStatus" class="modal">
      <div class="modal-img-wrap">
        <img class="modal-img" :src="imgUrl" />
        <div class="prizesName-style" v-if="prizesType==2">{{prizesName}}</div>
      </div>
      <img class="modal-img-btn" src="../../images/modal_btn.png" @click="modalStatus=false" />

    </div>
  </div>
</template>
<script>
import baseUrl from "../../libs/baseUrl";
import util from "../../libs/util";
export default {
  data() {
    return {
      turnplate: {
        restaraunts: [], //大转盘奖品名称
        colors: [], //大转盘奖品区块对应背景颜色
        outsideRadius: 180, //大转盘外圆的半径
        textRadius: 155, //大转盘奖品位置距离圆心的距离
        insideRadius: 50, //大转盘内圆的半径
        startAngle: 0, //开始角度
        bRotate: false //false:停止;ture:旋转
      },
      lotteryTimes: 0,
      modalStatus: false,
      imgUrl: "../../images/meteor_drill.png",
      prizesType: 2,
      prizesName: "流星钻0.1克拉",
      navigatorUserAgent:"",
      isAndroid:"",
      isiOS:"",
      title:"标题",
      desc:"描述描述描述描述描述描述描述描述描述描述描述描述描述",
      imgUrl:"https://dedc-statics.oss-cn-beijing.aliyuncs.com/images/service/3/F/2AC10A09-E1CE-4E98-A826-E3C0B7E111C7.jpg"
    };
  },
  created() {
    this.navigatorUserAgent = navigator.userAgent
    this.isAndroid = this.navigatorUserAgent.indexOf("Android")>-1 || this.navigatorUserAgent.indexOf("Adr")>-1
    this.isiOS = !!this.navigatorUserAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    window.sessionStorage.setItem('isAndroid',this.isAndroid)
  },
  mounted() {
    util.get(baseUrl.list_prizes_url).then(resp => {
      if (resp.data.success) {
        resp.data.data.map(item => {
          this.turnplate.restaraunts.push(item);
        });
        this.drawRouletteWheel();
      } else {
        console.log(resp.data.msg);
      }
    });
    this.turnplate.colors = [
      { startColor: "#FFF5A1", endColor: "#FFF5A1" },
      { startColor: "#F00A38", endColor: "#FC5576" },
      { startColor: "#FFF5A1", endColor: "#FFF5A1" },
      { startColor: "#F00A38", endColor: "#FC5576" },
      { startColor: "#FFF5A1", endColor: "#FFF5A1" },
      { startColor: "#F00A38", endColor: "#FC5576" },
      { startColor: "#FFF5A1", endColor: "#FFF5A1" },
      { startColor: "#F00A38", endColor: "#FC5576" },
      { startColor: "#FFF5A1", endColor: "#FFF5A1" },
      { startColor: "#F00A38", endColor: "#FC5576" },
      { startColor: "#FFF5A1", endColor: "#FFF5A1" },
      { startColor: "#F00A38", endColor: "#FC5576" }
    ];
  },
  methods: {
    drawRouletteWheel() {
      var canvas = document.getElementById("wheelcanvas");
      if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = "#FFBE04";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = "16px Microsoft YaHei";
        for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
          var angle = this.turnplate.startAngle + i * arc;
          var startX =
            211 + Math.cos(angle + arc / 2) * this.turnplate.outsideRadius;
          var startY =
            211 + Math.sin(angle + arc / 2) * this.turnplate.outsideRadius;
          var endX =
            211 + Math.cos(angle + arc / 2) * this.turnplate.insideRadius;
          var endY =
            211 + Math.sin(angle + arc / 2) * this.turnplate.insideRadius;
          var grd = ctx.createLinearGradient(startX, startY, endX, endY);
          var startColor = this.turnplate.colors[i].startColor;
          var endColor = this.turnplate.colors[i].endColor;
          grd.addColorStop(0, startColor);
          grd.addColorStop(1, endColor);
          ctx.fillStyle = grd;
          ctx.beginPath();
          //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
          ctx.arc(
            211,
            211,
            this.turnplate.outsideRadius,
            angle,
            angle + arc,
            false
          );
          ctx.arc(
            211,
            211,
            this.turnplate.insideRadius,
            angle + arc,
            angle,
            true
          );
          ctx.stroke();
          ctx.fill();
          //锁画布(为了保存之前的画布状态)
          ctx.save();

          //----绘制奖品开始----
          if (i % 2) {
            ctx.fillStyle = "#FFF5A1";
          } else {
            ctx.fillStyle = "#F00A38";
          }
          var text = this.turnplate.restaraunts[i].prizesName;
          var line_height = 45;
          //translate方法重新映射画布上的 (0,0) 位置
          ctx.translate(
            211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius,
            211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius
          );

          //rotate方法旋转当前的绘图
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
          if (text.indexOf("钻") > 0) {
            //流量包
            var texts = text.split("钻");
            for (var j = 0; j < texts.length; j++) {
              ctx.font =
                j == 0 ? "28px PingFang-SC-Medium" : "24px PingFang-SC-Medium";
              if (j == 0) {
                ctx.fillText(
                  texts[j] + "钻",
                  -ctx.measureText(texts[j] + "钻").width / 2,
                  j * line_height + 10
                );
              } else {
                ctx.fillText(
                  texts[j],
                  -ctx.measureText(texts[j]).width / 2,
                  j * line_height
                );
              }
            }
          } else if (text.indexOf("金") > 0) {
            //流量包
            var texts = text.split("金");
            for (var j = 0; j < texts.length; j++) {
              ctx.font =
                j == 0 ? "28px PingFang-SC-Medium" : "24px PingFang-SC-Medium";
              if (j == 0) {
                ctx.fillText(
                  texts[j] + "金",
                  -ctx.measureText(texts[j] + "金").width / 2,
                  j * line_height + 10
                );
              } else {
                ctx.fillText(
                  texts[j],
                  -ctx.measureText(texts[j]).width / 2,
                  j * line_height
                );
              }
            }
          } else if (text.indexOf("谢谢") != -1) {
            var texts = text.split("谢谢");
            for (var j = 0; j < texts.length; j++) {
              ctx.font =
                j == 0 ? "32px PingFang-SC-Medium" : "32px PingFang-SC-Medium";
              if (j == 0) {
                ctx.fillText(
                  texts[j] + "谢谢",
                  -ctx.measureText(texts[j] + "谢谢").width / 2,
                  j * line_height + 10
                );
              } else {
                ctx.fillText(
                  texts[j],
                  -ctx.measureText(texts[j]).width / 2,
                  j * line_height + 10
                );
              }
            }
          } else if (text.indexOf("x") != -1) {
            var texts = text.split("x");
            for (var j = 0; j < texts.length; j++) {
              ctx.font =
                j == 0 ? "28px PingFang-SC-Medium" : "28px PingFang-SC-Medium";
              if (j == 0) {
                ctx.fillText(
                  texts[j] + "x",
                  -ctx.measureText(texts[j] + "x").width / 2,
                  j * line_height + 10
                );
              } else {
                ctx.fillText(
                  texts[j],
                  -ctx.measureText(texts[j]).width / 2,
                  j * line_height
                );
              }
            }
          } else {
            //在画布上绘制填色的文本。文本的默认颜色是黑色
            //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          }

          // //添加对应图标
          // if (text.indexOf("闪币") > 0) {
          //   var img = document.getElementById("shan-img");
          //   img.onload = function() {
          //     ctx.drawImage(img, -15, 10);
          //   };
          //   ctx.drawImage(img, -15, 10);
          // } else if (text.indexOf("谢谢参与") >= 0) {
          //   var img = document.getElementById("sorry-img");
          //   img.onload = function() {
          //     ctx.drawImage(img, -15, 10);
          //   };
          //   ctx.drawImage(img, -15, 10);
          // }
          //把当前画布返回（调整）到上一个save()状态之前
          ctx.restore();
          //----绘制奖品结束----
        }
      }
    },
    clickPointer() {
      if (this.turnplate.bRotate) return;
      this.turnplate.bRotate = !this.turnplate.bRotate;
      //获取随机数(奖品个数范围内
      util.get(baseUrl.draw_prizes_url).then(resp => {
        if (resp.data.success) {
          let id = resp.data.data.id;
          let tempIndex;
          this.turnplate.restaraunts.map((item, index) => {
            if (item.id == id) {
              tempIndex = index;
            }
          });
          let item = tempIndex + 1;
          util.get(baseUrl.get_prizes_count_url).then(resp => {
            if (resp.data.success) {
              this.lotteryTimes = resp.data.data.count;
              //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
              this.rotateFn(item, this.turnplate.restaraunts[item - 1]);
            }
          });
        } else {
          console.log(resp.msg);
        }
      });
    },
    rotateTimeOut() {
      $("#wheelcanvas").rotate({
        angle: 0,
        animateTo: 2160,
        duration: 8000,
        callback: function() {
          alert("网络超时，请检查您的网络设置！");
        }
      });
    },
    //旋转转盘 item:奖品位置; txt：提示语;
    rotateFn(item, txt) {
      let that = this;
      var angles =
        item * (360 / this.turnplate.restaraunts.length) -
        360 / (this.turnplate.restaraunts.length * 2);
      if (angles < 270) {
        angles = 270 - angles;
      } else {
        angles = 360 - angles + 270;
      }
      $("#wheelcanvas").stopRotate();
      $("#wheelcanvas").rotate({
        angle: 0,
        animateTo: angles + 1800,
        duration: 8000,
        callback() {
          that.turnplate.bRotate = !that.turnplate.bRotate;
          that.imgUrl = "../../images/";
          that.prizesType = 1;
          that.modalStatus = true;
          if (txt.prizesType == 1) {
            that.imgUrl = that.imgUrl + "iPhonex.png";
          } else if (txt.prizesType == 2) {
            that.prizesType = 2;
            that.prizesName = txt.prizesName;
            that.imgUrl = that.imgUrl + "meteor_drill.png";
          } else if (txt.prizesType == 3) {
            if (txt.prizesName.indexOf("50") != -1) {
              that.imgUrl = that.imgUrl + "cash_50.png";
            } else {
              that.imgUrl = that.imgUrl + "cash_100.png";
            }
          } else if (txt.prizesType == 4) {
            if (txt.prizesName.indexOf("谢谢") != -1) {
              that.imgUrl = that.imgUrl + "thanks.png";
            }
          }
        }
      });
    },
    enterApp(){
      if(isAndroid){
        android.enterApp()
      }
      if(isiOS){
        window.webkit.messageHandlers.enterApp.postMessage({})
      }
    },
    sharePage(){
      if(isAndroid){
        android.sharePage(this.title,this.desc,this.imgUrl)
      }
      if(isiOS){
        window.webkit.messageHandlers.sharePage.postMessage({title:this.title,desc:this.desc,imgUrl:this.imgurl})
      }
    }
  }
};
</script>
<style>
@import "../../style/public.css";
.lottery-wrap {
  width: 100%;
  background-color: #ffe2b0;
}
.lottery {
  width: 750px;
  height: 920px;
  margin: 0 auto;
  background: url("../../images/lottery_bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 250px;
}
.banner {
  width: 750px;
  height: 600px;
  box-sizing: border-box;
  padding: 20px 84px 0 84px;
}
.banner .turnplate {
  display: block;
  width: 584px;
  height: 600px;
  position: relative;
  margin-bottom: 10px;
}
.item {
  width: 100%;
}
.banner .turnplate img.pointer {
  position: absolute;
  width: 31.5%;
  height: 42.5%;
  left: 34.6%;
  top: 23%;
}
.lottery-times {
  text-align: center;
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-family: "PingFang-SC-Medium";
  font-size: 24px;
  color: rgb(240, 10, 56);
}
.lottery-times-span {
  font-size: 30px;
  color: rgb(0, 0, 0);
}
.btn-wrap {
  width: 750px;
  height: 80px;
  box-sizing: border-box;
  padding: 0 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.winning-record-btn,
.share-btn {
  width: 284px;
  height: 80px;
  background: url("../../images/winning_record_btn.png") no-repeat;
  background-size: 100% 100%;
}
.share-btn {
  background: url("../../images/share_btn.png") no-repeat;
  background-size: 100% 100%;
}
.modal {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
}
.modal-img-wrap {
  width: 610px;
  height: 530px;
  padding-top: 180px;
  display: block;
  margin: 0 auto;
  position: relative;
}
.modal-img {
  width: 610px;
  height: 530px;
}
.modal-img-btn {
  width: 244px;
  height: 82px;
  padding-top: 40px;
  display: block;
  margin: 0 auto;
}
.prizesName-style {
  width: 100%;
  height: 38px;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 38px;
  line-height: 38px;
  position: absolute;
  top: 586px;
}
</style>