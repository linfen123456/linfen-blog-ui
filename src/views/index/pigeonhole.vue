<template>
  <!--归档-->
    <div>
      <el-row>
        <el-col :span="18" :offset="3">
          <el-timeline>
            <template v-for="item in 10">
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card shadow="hover">
                  <h4>更新 Github 模板</h4>
                  <div class="list-main-item-abstracts">今天找到两个远古压缩包，密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。 程序生成的是三段式密码，组合输出生成密码表。
                    请原谅我早已回到解放前的 C++ 编程水平）</div>

                  <div>
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
                  </div>
                </el-card>
              </el-timeline-item>
            </template>
          </el-timeline>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'pigeonhole',
  }
</script>

<style scoped>

  /*摘要*/
  .list-main-item-abstracts {
    margin: 18px 0px;
    font-size: 15px;
    color: #666666;
    line-height: 20px;
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
</style>
