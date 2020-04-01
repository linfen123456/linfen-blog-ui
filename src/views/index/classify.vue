<template>
  <div>
    <el-row>

      <!--侧边菜单-->
      <el-col :span="4" :offset="1" class="margin-top-46">
        <el-menu
          default-active="-1"
          class="el-menu-vertical-demo"
          @select="changeArticleData"
        >
          <el-menu-item index="-1">
            <i class="el-icon-menu" />
            <span slot="title" @click="changeArticleData">全部分类</span>
          </el-menu-item>
          <el-menu-item v-for="(category,index) in categoryData" :key="index" :index="category.id.toString()">
            <span slot="title" @click="changeArticleData">{{ category.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <!--右边文章-->
      <el-col :span="18">
        <template v-for="item in tableData">
          <el-row class="list-main-item">
            <el-col :span="22" :offset="1">
              <el-card class="list-card-item" shadow="hover">
                <div class="list-main-item-title " style="" @click="selectArticle(item)">{{ item.title }}</div>
                <el-row class="list-card-item-row">
                  <el-col :span="24">
                    <div class="float-left">
                      <el-avatar :size="50" :src="item.avatar" />
                    </div>
                    <div class="float-left margin-top-5">
                      <div class="list-main-item-authtor"><!--<i class="el-icon-user"></i>--><b>{{ item.nickname }}</b></div>
                      <div class="list-main-item-time"><!--<i class="el-icon-date"></i>-->时间：{{ parseTime(item.createTime) }}</div>
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
                  <el-col :span="24">
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
                    <div class="list-main-item-classify">
                      <i class="el-icon-user" />
                      <el-tag type="danger" size="mini" effect="dark"> {{ item.nickname }}</el-tag>
                    </div>
                    <div class="list-main-item-visible">
                      <i class="el-icon-lollipop" /> {{ item.views }}人围观
                    </div>
                    <div class="list-main-item-dicuss">
                      <i class="el-icon-chat-dot-round" /> {{ item.discuss }}条评论
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
import { getAllCategory } from '@/api/blog/category'
import { getAllPageArticle } from '@/api/blog/article'
import { parseTime } from '@/utils/index'

export default {
  name: 'Classify',
  data() {
    return {
      categoryData: [], // 分类数据
      categoryId: -1,
      tableData: [], // 文章数据
      currentPage: 1,
      pageSize: 10,
      total: 0 // 总数量
    }
  },
  created() {
    this.getAllCategoryData()
  },
  methods: {
    parseTime,
    getAllCategoryData() {
      const params = new URLSearchParams()
      getAllCategory(params).then(response => {
        if (response.data.code === 200 && response.data.data != null) {
          this.categoryData = response.data.data
          this.getArticleList()
        } else {
          this.$router.push({ path: '/404' })
        }
      })
    },
    getArticleList: function() {
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      /*        if (!this.isRealNum()){//非ID过滤
          return
        }*/
      try {
        if (this.categoryId !== '-1' && parseInt(this.categoryId) > 0) {
          params.append('categoryId', this.categoryId)
        }
      } catch (e) {
        return
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
    changeArticleData(key, keyPath) {
      this.categoryId = key
      this.currentPage = 1
      this.getArticleList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getAllPageArticle()
    },
    selectArticle(item) {
      this.$router.push({ path: '/detial', query: { articleId: item.id }})
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
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 10px auto;
    font-family: 'Adobe 黑体 Std R';
    color: black;
  }

  /*摘要*/
  .list-main-item-abstracts {
    cursor: pointer;
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
