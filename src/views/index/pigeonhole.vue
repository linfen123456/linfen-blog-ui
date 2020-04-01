<template>
  <!--归档-->
  <div>
    <el-row v-infinite-scroll="handleCurrentChange" class="infinite-scroll infinite-scroll-css">
      <el-col :span="18" :offset="3">
        <div v-for="(item, pindex) in articleData" :key="pindex">
          <el-timeline>
            <el-timeline-item
              v-for="(article, index) in item.articles"
              :key="index"
              :timestamp="parseTime(article.createTime)"
              placement="top"
              size="large"
            >

              <span v-if="index===0" slot="dot">
                <span style="position: absolute;left: -40px;top: 0px;font-weight: bold;">{{ item.year }}</span>
                <span style="text-align: center;position:absolute;top: 1px;left: -2px; color:white ;background-color: #50d96d;border-radius: 10px;width: 15px;height: 15px"><b>{{ item.month }}</b></span>

              </span>
              <el-card shadow="hover">
                <span class="list-main-item-title" @click="selectArticle(article)"><h4>{{ article.title }}</h4></span>
                <div class="list-main-item-abstracts" @click="selectArticle(article)">
                  <span v-if="article.abstracts" v-html="article.abstracts" />
                  <span v-else v-html="article.content.length>50?article.content.substring(0,50):article.content" />
                </div>

                <div>
                  <el-row class="margin-top-20">
                    <el-col :span="24">
                      <div class="list-main-item-tag">
                        <i class="el-icon-collection-tag" />
                        <span v-for="tag in article.tags" style="margin: 0px 2px">
                          <el-tag type="success" size="mini" effect="dark">{{ tag.name?tag.name:"默认标签" }}</el-tag>
                        </span>
                        <el-tag v-if="article.tags.length===0" type="success" size="mini" effect="dark">默认标签</el-tag>
                      </div>
                      <div class="list-main-item-classify">
                        <i class="el-icon-folder" />
                        <el-tag type="warning" size="mini" effect="dark"> {{ article.categoryName?article.categoryName:"默认分类" }}</el-tag>
                      </div>
                      <div class="list-main-item-classify">
                        <i class="el-icon-user" />
                        <el-tag type="danger" size="mini" effect="dark">  {{ article.nickname }}</el-tag>
                      </div>
                      <div class="list-main-item-visible">
                        <i class="el-icon-lollipop" /> {{ article.views }}人围观
                      </div>
                      <div class="list-main-item-dicuss">
                        <i class="el-icon-chat-dot-round" /> {{ article.discuss }}条评论
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-timeline-item>

          </el-timeline>

        </div>
        <el-divider v-if="currentPage==total">我是有底线的</el-divider>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { getArticlePigeonhole } from '@/api/blog/article'
export default {
  name: 'Pigeonhole',
  data() {
    return {
      articleData: [], // 文章数据
      currentPage: 1,
      pageSize: 10,
      total: 0 // 总数量
    }
  },
  created() {
    this.getArticlePigeonhole()
  },
  methods: {
    parseTime,
    getArticlePigeonhole() {
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      getArticlePigeonhole(params).then(response => {
        console.log(JSON.stringify(response))
        if (response.data.code === 200 && response.data.data != null) {
          this.articleData = this.articleData.concat(response.data.data.records)
          this.total = response.data.data.total
        } else {

        }
      })
    },
    // 换页
    handleCurrentChange: function() {
      if (this.currentPage < this.total) {
        this.currentPage += 1
        this.getArticlePigeonhole()
      } else {
      }
    },
    selectArticle(item) {
      this.$router.push({ path: '/detial', query: { articleId: item.id }})
    }
  }
}
</script>

<style scoped>

  .list-main-item-title{
    cursor: pointer;
  }

  /*摘要*/
  .list-main-item-abstracts {
    cursor: pointer;
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

  .infinite-scroll-css{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: auto;
  }

  /**滚动条样式*/
  .infinite-scroll::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .infinite-scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(170, 255, 128, 0.69);

  }

  .infinite-scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

    border-radius: 10px;

    background: #f9f9f9;

  }

</style>
