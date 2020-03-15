<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div class="footer-runtime">博客已萌萌哒运行2221天2小时15分58秒(●'◡'●)ﾉ♥</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div class="footer-copyright" >©2012-2020 Linfen 沪ICP备11018329号-5</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      copyright() {
        alert(this.$store.state.setting.title)
        return 'dd'
      }
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
