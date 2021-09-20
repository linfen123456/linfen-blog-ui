<template>
  <div>
    <el-row>

      <!--首页文章列表-->
      <el-col :xs="24" :sm="22" :md="20" :lg="15" :xl="15" :offset="2">
        <div v-for="(item,index) in tableData" :key="index">
          <el-row class="list-main-item">
            <el-col :span="22" :offset="1">
              <el-card class="list-card-item" :body-style="{ padding: '12px' }" shadow="hover">
                <div>
                  <el-row>
                    <el-col :span="24">
                      <div class="list-main-item-cover" @click="selectArticle(item)">
                        <img :src="item.cover?item.cover:getImageUrl()+'?test='+index" lazy style="width:100%;  height:250px">
                        <div class="list-main-item-title" style="">{{ item.title }}</div>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row class="list-card-item-row">
                    <el-col :span="24">
                      <div class="float-left">
                        <el-avatar :size="45" :src="item.avatar" />
                      </div>
                      <div class="float-left margin-top-5">
                        <div class="list-main-item-authtor"><!--<i class="el-icon-user"></i>--><b>{{ item.nickname }}</b></div>
                        <div class="list-main-item-time"><!--<i class="el-icon-date"></i>-->{{ parseTime(item.createTime) }}</div>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row class="margin-top-12">
                    <el-col :span="24">
                      <div class="list-main-item-abstracts" @click="selectArticle(item)">
                        <span v-if="item.abstracts" v-html="item.abstracts" />
                        <span v-else v-html="item.content.length>50?item.content.substring(0,50):item.content" />
                      </div>
                    </el-col>
                  </el-row>

                  <el-row class="margin-top-20">
                    <el-col :xs="18" :sm="18" :md="12" :lg="12" :xl="12" >
                      <div class="list-main-item-tag">
                        <i class="el-icon-collection-tag" />
                        <span v-for="tag in item.tags" style="margin: 0px 2px">
                          <el-tag type="success" size="mini" effect="dark">{{ tag.name?tag.name:"默认标签" }}</el-tag>
                        </span>
                        <el-tag v-if="item.tags.length===0" type="success" size="mini" effect="dark">默认标签</el-tag>
                      </div>
                      <div class="list-main-item-classify">
                        <i class="el-icon-folder" />
                        <el-tag type="warning" size="mini" effect="dark"> {{ item.categoryName?item.categoryName:"默认分类" }}</el-tag>
                      </div>
                    </el-col>
                    <el-col :xs="18" :sm="18" :md="12" :lg="12" :xl="12" >

                      <div class="list-main-item-visible">
                        <i class="el-icon-lollipop" /> {{ item.views }}人围观
                      </div>
                      <div class="list-main-item-dicuss">
                        <i class="el-icon-chat-dot-round" /> {{ item.discuss }}条评论
                      </div>
                    </el-col>
                  </el-row>

                </div>
              </el-card>
            </el-col>
          </el-row>

        </div>

        <el-row>
          <el-col :span="24">
            <!--分页-->
            <div class="pagination" style=" justify-content: center;">
              <el-pagination
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
                background
                @current-change="handleCurrentChange"
              />
            </div>
          </el-col>
        </el-row>
      </el-col>

      <!--首页右边部分-->
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"  class="margin-top-46 hidden-sm-and-down">
        <!--显示联系-->
        <el-row>
          <el-col :span="24">
            <div style="width: 80%">
              <el-card :body-style="{ padding: '0px'}">
                <img class="main-right-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1189453540,1107575607&fm=26&gp=0.jpg">
                <div class="main-right-box">
                  <span class="main-right-box-title">你能抓到我吗？</span>
                  <div class="main-right-box-text">
                    <span><el-button round @click="openWindows('github')"><img width="15px" height="15px" :src="social.github"> GitHub</el-button></span>
                    <span><el-button round @click="openWindows('csdn')"><img width="15px" height="15px" :src="social.csdn"> CSDN</el-button></span>
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
import { getAllPageArticle } from '@/api/blog/article'
import { parseTime } from '@/utils/index'
import 'element-ui/lib/theme-chalk/display.css';
import { getBasicInfo } from '../../store/mutation'


export default {
  name: 'Index',
  data() {
    return {
      social: {
        qq: qq,
        csdn: csdn,
        github: github
      },
      currentPage: 1,
      pageSize: 10,
      total: 0, // 总数量
      tableData: [],
      query: {
        title: ''
      }
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    parseTime,
    getArticleList: function() {
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      if (this.query.title) {
        params.append('title', this.query.title)
      }
      getAllPageArticle(params).then(response => {
        if (response.data.code === 200) {
          this.tableData = response.data.data.records
          this.total = response.data.data.total
        } else {
          alert('数据获取失败')
        }
      })
    },
    selectArticle(item) {
      this.$router.push({ path: '/detial', query: { articleId: item.id }})
    },
    openWindows(type) {
      switch (type) {
        case 'github':
          window.open('https://github.com/linfen123456')
          break
        case 'csdn':
          window.open('https://blog.csdn.net/linfen1520')
          break
      }
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getArticleList()
    },
    getImageUrl(){
      return getBasicInfo('random_img', 'http://www.dmoe.cc/random.php');
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
    color: #ff333d;
    margin-left: 16px;
    font-size: 18px;
    font-family: 'Adobe 黑体 Std R'
  }

  .list-main-item-time {
    margin-left: 8px;
    margin-top: 5px;
    font-size: 13px;
    color: white;
    font-family: 'Adobe 黑体 Std R';
    border-radius: 30px;
    color: rgb(18, 155, 255);
    padding: 3px 6px;
  }

  .list-main-item-cover {
    cursor: pointer;
    font-size: 25px;
    font-weight:bold;
    font-family: 'Adobe 黑体 Std R'
  }

  .list-main-item-cover>img {
    display: block;
    width: 100%;
    heigth: 300px;
    object-fit: cover;
    border-radius: 10px;
  }

  .list-main-item-title{
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background-color: black;
    border-radius: 30px;
    padding: 5px 15px;
    filter:alpha(Opacity=60);
    -moz-opacity:0.6;
    opacity: 0.6;

  }

  /*摘要*/
  .list-main-item-abstracts {
    cursor: pointer;
    font-size: 16px;
    color: #222222;
    line-height: 20px;
    min-height: 60px;
    border-radius: 5px;
    padding:10px 18px;
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
