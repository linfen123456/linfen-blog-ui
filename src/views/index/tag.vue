<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="0">
        <div style="margin: 0px auto;text-align: center;">
          <!--svg显示文字-->
          <svg :height="width" :width="height" @mousemove="listener($event)">
            <!--阴影效果-->
            <defs>
              <filter id="f1" x="0" y="0" width="200%" height="200%">
                <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
                <feColorMatrix
                  result="matrixOut"
                  in="offOut"
                  type="matrix"
                  values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
                />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <!--文字-->
            <a v-for="tag in tags" :href="tag.href" filter="url(#f1)" @click="changeTagId(tag.id,tag.text)">
              <text :fill="tag.color" :x="tag.x" :y="tag.y" :font-size="20 * (600/(600-tag.z))" :fill-opacity="((400+tag.z)/600)">{{ tag.text }}</text>
            </a>
          </svg>
        </div>

      </el-col>
    </el-row>

    <div style="width: 60%; margin: 0px auto; ">
      <!--标签内容-->
      <h3><i id="tag" class="el-icon-collection-tag" />
        <span>{{ tagTitle }}</span></h3>
      <div v-for="item in articleData" class="list-main-item">
        <el-card shadow="hover">
          <div>
            <div class="float-left list-main-item-title" @click="selectArticle(item)"><h4>{{ item.title }}</h4></div>
            <div class="float-right list-main-item-time">时间：{{ parseTime(item.createTime) }}</div>
          </div>

          <div class="list-main-item-abstracts" @click="selectArticle(item)">
            <span v-if="item.abstracts" v-html="item.abstracts" />
            <span v-else v-html="item.content.length>50?item.content.substring(0,50):item.content" />
          </div>

          <div>
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
          </div>
        </el-card>
      </div>
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

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { getAllTag } from '@/api/blog/tag'
import { getAllPageArticle, getArticleByTagId } from '@/api/blog/article'

export default {
  name: 'Tag',
  data() {
    return {
      width: 550,
      height: 550,
      tagsNum: 20,
      RADIUS: 200,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tags: [],
      tagId: -1,
      articleData: [], // 文章数据
      tagTitle: '所有标签列表',
      currentPage: 1,
      pageSize: 10,
      total: 0 // 总数量
    }
  },
  computed: {
    CX() {
      return this.width / 2
    },
    CY() {
      return this.height / 2
    }
  },
  created() { // 初始化标签位置
    /*      let tags=[];
      for(let i = 0; i < this.tagsNum; i++){
        let tag = {};
        let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
        let a = Math.acos(k);
        let b = a * Math.sqrt(this.tagsNum * Math.PI);
        tag.text = i + 'tag';
        tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);
        tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b);
        tag.z = this.RADIUS * Math.cos(a);
        var cr=Math.floor(Math.random()*256);
        var cg=Math.floor(Math.random()*256);
        var cb=Math.floor(Math.random()*256);
        tag.color = "rgb("+cr+','+cg+','+cb+")";
        tag.href = 'https://imgss.github.io';
        tags.push(tag);
      }

      this.tags = tags;*/

    this.getAllTag()
    this.getArticleByTagId()
  },
  mounted() { // 使球开始旋转
    setInterval(() => {
      this.rotateX(this.speedX)
      this.rotateY(this.speedY)
    }, 17)
  },
  methods: {
    parseTime,
    getAllTag() { // 获取标签数据
      const params = new URLSearchParams()
      getAllTag(params).then(response => {
        console.log(JSON.stringify(response))
        if (response.data.code === 200 && response.data.data != null) {
          const data = response.data.data
          this.getTagData(data)
        }
      })
    },
    changeTagId(tagId, tagName) {
      this.tagTitle = '标签--' + tagName
      this.tagId = tagId
      this.getArticleByTagId()
    },
    getArticleByTagId() {
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      if (this.tagId !== -1) { params.append('tagId', this.tagId) }
      getArticleByTagId(params).then(response => {
        console.log(JSON.stringify(response))
        if (response.data.code === 200 && response.data.data != null) {
          this.articleData = response.data.data.records
          this.total = response.data.data.total
          var t = document.getElementById('tag').getBoundingClientRect().top - 50
          window.scrollTo(0, t)// 滚动到锚点位置
        }
      })
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getArticleByTagId()
    },
    selectArticle(item) {
      this.$router.push({ path: '/detial', query: { articleId: item.id }})
    },
    rotateX(angleX) {
      var cos = Math.cos(angleX)
      var sin = Math.sin(angleX)
      for (const tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY
        var z1 = tag.z * cos + (tag.y - this.CY) * sin
        tag.y = y1
        tag.z = z1
      }
    },
    rotateY(angleY) {
      var cos = Math.cos(angleY)
      var sin = Math.sin(angleY)
      for (const tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX
        var z1 = tag.z * cos + (tag.x - this.CX) * sin
        tag.x = x1
        tag.z = z1
      }
    },
    listener(event) { // 响应鼠标移动
      var x = event.clientX - this.CX
      var y = event.clientY - this.CY
      this.speedX = x * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00003, x * 0.0003) : Math.max(-this.RADIUS * 0.00003, x * 0.0003)
      this.speedY = y * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00003, y * 0.0003) : Math.max(-this.RADIUS * 0.00003, y * 0.0003)
    },
    getTagData(data) { // 初始标签数据
      const tags = []
      if (this.tagsNum < data.length) {
        this.tagsNum = data.length
      }
      for (let i = 0; i < this.tagsNum; i++) {
        const tag = {}
        const k = -1 + (2 * (i + 1) - 1) / this.tagsNum
        const a = Math.acos(k)
        const b = a * Math.sqrt(this.tagsNum * Math.PI)
        tag.text = data[i % data.length].name.length < 5 ? data[i % data.length].name : data[i % data.length].name.substring(0, 5) + '..'
        tag.id = data[i % data.length].id
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b)
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b)
        tag.z = this.RADIUS * Math.cos(a)
        var cr = Math.floor(Math.random() * 256)
        var cg = Math.floor(Math.random() * 256)
        var cb = Math.floor(Math.random() * 256)
        tag.color = 'rgb(' + cr + ',' + cg + ',' + cb + ')'
        tag.href = '#'
        tags.push(tag)
      }
      this.tags = tags
    }
  }
}
</script>

<style scoped>

  .list-main-item {
    margin-top: 20px;
  }

  /*摘要*/
  .list-main-item-abstracts {
    cursor: pointer;
    clear: both;
    margin: 18px 0px;
    font-size: 15px;
    color: #666666;
    line-height: 20px;
  }

  .list-main-item-title{
    cursor: pointer;
  }

  /*时间*/
  .list-main-item-time {
    margin-left: 8px;
    margin-top: 15px;
    font-size: 12px;
    font-family: 'Adobe 黑体 Std R';
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

  .float-right{
    float: right;
  }

  .float-left{
    float: left;
  }
</style>
