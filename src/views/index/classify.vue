<template>
    <div>
      <el-row>

        <!--侧边菜单-->
        <el-col :span="4" :offset="1" class="margin-top-46">
          <el-menu
            default-active="3"
            class="el-menu-vertical-demo">
            <el-menu-item index="2" disabled>
              <i class="el-icon-menu"></i>
              <span slot="title">分类</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" >
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">导航四</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">导航四</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span slot="title">导航四</span>
            </el-menu-item>
            <el-menu-item index="7">
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>

        <!--右边文章-->
        <el-col :span="18">
          <template v-for="item in 10">
            <el-row class="list-main-item">
              <el-col :span="22" :offset="1">
                <el-card class="list-card-item" shadow="hover">
                  <div class="list-main-item-title " style="">这是标题</div>
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
                      <div class="list-main-item-classify">
                        <i class="el-icon-user"></i>
                        <el-tag type="danger"  size="mini" effect="dark"> 淋汾</el-tag>
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
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'classify'
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
    font-size: 14px;
    font-family: 'Adobe 黑体 Std R'
  }

  .list-main-item-time {
    margin-left: 8px;
    margin-top: 5px;
    font-size: 12px;
    font-family: 'Adobe 黑体 Std R';
  }

  .list-main-item-title {
    font-size: 18px;
    font-weight: bold;
    margin: 10px auto;
    font-family: 'Adobe 黑体 Std R';
    color: black;
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
