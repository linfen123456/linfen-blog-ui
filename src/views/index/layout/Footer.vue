<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div class="footer-runtime"><span >博客已萌萌哒运行{{sitetime}}</span>
          <span class="footer-runtime">{{sitesmaill}}</span></div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div class="footer-copyright" v-html="siteBeiAn"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { BASIC_INFO, getBasicInfo } from '../../../store/mutation'

  export default {
    name: 'Footer',
    computed: {
      copyright() {
        alert(this.$store.state.setting.title)
        return 'dd'
      }
    },
    data() {
      return {
        sitetime: '',
        sitesmaill: '(●\'◡\'●)ﾉ♥',
        timer: "",
        siteBeiAn:''
      }
    },
    created: function() {
      //定时器：当前时间
      this.timer = setInterval(() => {
        this.show_runtime()
      }, 1000)

  /*   var data=JSON.parse(localStorage.getItem(BASIC_INFO)).data

      console.log('网站基本信息' +JSON.stringify(data))
      console.log('网站基本信息' +data['site_name'])
      console.log('网站基本信息' +data['site_name'].name)

      alert(getBasicInfo('site_name'))*/
      this.siteBeiAn = getBasicInfo('site_beian', '©2012-2020 Linfen')
    },
    methods:{
      getBasicInfo,
      show_runtime(){
        // window.setTimeout('this.show_runtime()',1000);
        var that = this;
        setTimeout(function () {
          that.show_runtime();
        },1000);
        let X=new Date(this.getBasicInfo('site_runing_time',"1/12020 00:00:00"));//"10/16/2017 5:22:00"
        let Y=new Date();
        let T=(Y.getTime()-X.getTime());
        let M=24*60*60*1000;
        let a=T/M;
        let A=Math.floor(a);
        let b=(a-A)*24;
        let B=Math.floor(b);
        let c=(b-B)*60;
        let C=Math.floor((b-B)*60);
        let D=Math.floor((c-C)*60);
        this.sitetime=""+A+"天"+B+"小时"+C+"分"+D+"秒"
        if (D % 2 === 0) {
          this.sitesmaill = "(●\'◡\'●)ﾉ♥"
        } else {
          this.sitesmaill = "(●\'◡\'●)ﾉ       ♥"
        }
      },
      beforeDestroy() {
        //在vue实例销毁前，清除定时器
        if (this.timer) {
          clearInterval(this.timer);
        }
      },
    }
  }
</script>

<style scoped>
  .footer-runtime{
    font-size: 14px;
    line-height: 20px;
    font-family: "Adobe 黑体 Std R";
    text-align: center;
  }
  .footer-copyright{
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    font-family: "Adobe 宋体 Std L";
  }

</style>
