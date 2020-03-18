<template>
  <div>
    <el-row>

      <!--首页文章列表-->
      <el-col :span="18">
        <template v-for="item in 10">
          <el-row class="list-main-item">
            <el-col :span="22" :offset="1">
              <el-card class="list-card-item" shadow="hover">
                <el-row class="list-card-item-row">
                  <el-col :span="24"  >
                    <div class="float-left">
                      <el-avatar :size="50" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=403810582,2864351555&fm=26&gp=0.jpg" ></el-avatar>
                    </div>
                    <div class="float-left margin-top-5" >
                      <div class="list-main-item-authtor"><!--<i class="el-icon-user"></i>--><b>Linfen</b></div>
                      <div class="list-main-item-time"><!--<i class="el-icon-date"></i>-->时间：2020-02-25</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="list-main-item-cover">
                      <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1970368607,3500779700&fm=26&gp=0.jpg" width="100%" height="250px">
                      <div class="list-main-item-title" style="">这是标题</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="margin-top-12">
                  <el-col :span="24" >
                    <div class="list-main-item-abstracts">
                      今天找到两个远古压缩包，密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。
                      程序生成的是三段式密码，组合输出生成密码表。<br/>
                      请原谅我早已回到解放前的 C++ 编程水平）
                    </div>
                  </el-col>
                </el-row>
                <el-row class="margin-top-20">
                  <el-col :span="24" >
                    <div class="list-main-item-tag">
                      <i class="el-icon-collection-tag"></i>
                      <el-tag type="success"  size="mini" effect="dark">标签</el-tag>
                      <el-tag type="success"  size="mini" effect="dark">标签</el-tag>
                      <el-tag type="success"  size="mini" effect="dark">标签</el-tag>
                    </div>
                    <div class="list-main-item-classify">
                      <i class="el-icon-folder"></i>
                      <el-tag type="warning"  size="mini" effect="dark"> 默认分类</el-tag>
                    </div>
                    <div class="list-main-item-visible">
                      <i class="el-icon-lollipop"></i> 0人围观
                    </div>
                    <div class="list-main-item-dicuss">
                      <i class="el-icon-chat-dot-round"></i> 0条评论
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </template>
      </el-col>

      <!--首页右边部分-->
      <el-col :span="6" class="margin-top-46">
        <!--显示联系-->
        <el-row>
          <el-col :span="24">
            <div style="width: 80%">
              <el-card :body-style="{ padding: '0px'}">
                <img class="main-right-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1189453540,1107575607&fm=26&gp=0.jpg" >
                <div class="main-right-box">
                  <span class="main-right-box-title">你能抓到我吗？</span>
                  <div class="main-right-box-text">
                    <span ><el-button @click="openWindows('github')" round><img width="15px" height="15px"  :src="github"/> GitHub</el-button></span>
                    <span ><el-button @click="openWindows('csdn')" round><img width="15px" height="15px"  :src="csdn"/> CSDN</el-button></span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <!--显示标签-->
        <el-row>
          <el-col :span="24">
            <!--暂无-->
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import qq from '@/assets/icon/qq.png'
  import github from '@/assets/icon/github.png'
  import csdn from '@/assets/icon/csdn.png'
export default {
  name: 'Index',
  data() {
    return {
      qq:qq,
      csdn:csdn,
      github: github
    }
  },
  methods: {
    openWindows(type) {
      switch (type) {
        case 'github':
          window.open('https://github.com/linfen123456')
          break
        case 'csdn':
          window.open('https://blog.csdn.net/linfen1520')
          break
      }
    }
  }
}
</script>

<style scoped>
  .list-main-item {
    margin-top: 46px;
  }

  .list-card-item{
    border-radius: 10px
  }

  .list-card-item-row{
    margin-top: 12px
  }

  .float-left{
    float: left;
  }

  .margin-top-5{
    margin-top: 5px;
  }

  .margin-top-12{
    margin-top: 12px;
  }

  .margin-top-20{
    margin-top: 20px;
  }

  .margin-top-46{
    margin-top: 46px;
  }

  .list-main-item-authtor{
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  .list-main-item-time {
    margin-left: 8px;
    margin-top: 5px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R';
  }

  .list-main-item-cover {
    font-size: 30px;
    font-weight:bold;
    font-family: 'Adobe 黑体 Std R'
  }

  .list-main-item-title{
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
  }

  /*摘要*/
  .list-main-item-abstracts {
    font-size: 15px;
    color: #666666;
    line-height: 30px;
  }

  /*标签*/
  .list-main-item-tag {
    float:left;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  /*分类*/
  .list-main-item-classify {
    float:left;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  /*分类*/
  .list-main-item-visible {
    float:right;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R';
  }

  /*浏览*/
  .list-main-item-visible {
    float:right;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R';
  }

  /*评论*/
  .list-main-item-dicuss {
    float:right;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  /*右边图片*/
  .main-right-img{
    width: 100%;
    height:280px;
    object-fit:fill;
    background-repeat: no-repeat;
    overflow:hidden
  }

  .main-right-box{
    width: 100%;
    text-align: center;
    margin: 20px auto;
  }

  .main-right-box-title{
    font-weight: bold;
    font-size: 14px
  }

  .main-right-box-text{
    font-size:12px;
    color: #666666;
    margin-top: 20px;
    text-align: center
  }

  .main-right-box-img{
    font-size:12px;
    color: #666666;
    margin-top: 20px;
    text-align: center
  }

</style>
