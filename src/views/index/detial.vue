<template>
  <div>
    <el-row>
      <!--右边文章-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" :offset="1">
        <!--面包屑-->
        <el-row>
          <el-col>
            <el-card>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>文章详情</el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
          </el-col>
        </el-row>

        <!--内容-->
        <el-row style="margin-top: 25px">
          <el-col>
            <el-card>

              <el-row class="list-card-item-row">
                <el-col :span="24">
                  <div class="float-left">
                    <el-avatar :size="45" :src="articleData.avatar" />
                  </div>
                  <div class="float-left margin-top-5">
                    <div class="list-main-item-authtor"><!--<i class="el-icon-user"></i>--><b>{{ articleData.nickname }}</b></div>
                    <div class="list-main-item-time"><!--<i class="el-icon-date"></i>-->最后发布于：{{ parseTime(articleData.createTime) }}</div>
                  </div>

                </el-col>
              </el-row>

              <div>
                <h3>{{ articleData.title }} </h3>
              </div>

              <el-divider />

              <div class="list-main-item-cover">
                <img :src="articleData.cover?articleData.cover:getImageUrl()" width="100%" height="250px">
              </div>

              <el-row class="margin-top-12">
                <el-col :span="24">
                  <div class="list-main-item-context">
                    <div id="articleContent" />
                  </div>
                </el-col>
              </el-row>

              <el-row class="margin-top-20">
                <el-col :span="24">
                  <div class="article-type float-left">{{ articleData.type===0?'原创':articleData.type===1?'翻译':'转载' }}</div>
                  <div class="list-main-item-tag">
                    <i class="el-icon-collection-tag" />
                    <span v-for="tag in articleData.tags" style="margin: 0px 2px">
                      <span class="tag-item">{{ tag.name?tag.name:"默认标签" }}</span>
                    </span>
                    <span v-if="articleData.tags.length===0" class="tag-item">默认标签</span>
                  </div>
                  <div class="list-main-item-classify">
                    <i class="el-icon-folder" />
                    <span class="classify-item"> {{ articleData.categoryName?articleData.categoryName:"默认分类" }}</span>
                  </div>
                  <div class="list-main-item-visible">
                    <i class="el-icon-lollipop" /> {{ articleData.views }}人围观
                  </div>
                  <div class="list-main-item-dicuss">
                    <i class="el-icon-chat-dot-round" /> {{ articleData.discuss }}条评论
                  </div>
                </el-col>
              </el-row>

              <el-row style="margin-top: 25px">
                <el-col />
              </el-row>

            </el-card>
          </el-col>

          <!--评论列表-->
          <el-col v-if="articleData.openDiscuss==='1'" :span="24" class="margin-top-46">
            <el-card>
              <h4>评论</h4>
              <div class="list-discuss-item-content">
                评论已被作者关闭
              </div>
            </el-card>
          </el-col>

          <!--评论列表-->
          <el-col v-if="articleData.openDiscuss==='0'" :span="24" class="margin-top-46">
            <el-card>
              <h4>评论</h4>

              <!--评论编辑框-->
              <div class="discuss-box">
                <div>
                  <el-input
                    v-model="discussContent"
                    placeholder="写下你的评论.."
                    type="textarea"
                    :rows="4"
                  />
                </div>
                <div class="discuss-btn">
                  <el-button type="primary" round @click="saveParentFrom">发布</el-button>
                  <el-button round>取消</el-button>
                </div>
              </div>

              <!--评论列表-->
              <div class="list-card-item-main">
                <h4>全部评论 <small>{{ articleData.discusses.length }}</small></h4>
                <!--用户信息-->
                <div v-for="(discusse,index ) in articleData.discusses" key="index" class="list-card-item-main-div">
                  <el-card shadow="hover">
                    <!--一级评论-->
                    <div>
                      <el-row class="list-card-item-row">
                        <el-col :span="24">
                          <div class="float-left">
                            <el-avatar :size="40" :src="discusse.type===0?discusse.avatar:avatar" />
                          </div>
                          <div class="float-left margin-top-5">
                            <div class="list-discuss-item-authtor">{{ discusse.type===0?discusse.nickname1:discusse.nickname }}
                              <span v-if="discusse.userId!==null&&discusse.userId===articleData.userId" class="article-type">作者</span>
                              <span v-if="discusse.type===1" class="tag-item">匿名</span></div>
                            <div class="list-discuss-item-time"><b>{{ index+1 }}楼</b> &nbsp;&nbsp; {{ parseTime(discusse.createTime) }}</div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="list-discuss-item-content">
                      {{ discusse.content }}
                    </div>

                    <div class="list-discuss-item-bottom">
                      <el-link icon="el-icon-chat-dot-round" :underline="false" @click="showDiscussInput(index)">回复</el-link>
                    </div>

                    <div v-if="discussPosition===index" class="discuss-box-child">
                      <div>
                        <el-input
                          v-model="discussChildContent"
                          placeholder="写下你的评论.."
                          type="textarea"
                          :rows="4"
                        />
                      </div>
                      <div class="discuss-btn">
                        <el-button type="primary" round @click="saveChildFrom(discusse.id)">发布</el-button>
                        <el-button round @click="hideDiscussInput">取消</el-button>
                      </div>
                    </div>

                    <!--二级评论-->
                    <div class="list-discuss-item-child">
                      <div v-for="(childern,index) in discusse.childrens" :key="'child'+index">
                        <el-divider />
                        <el-row class="list-card-item-row">
                          <el-col :span="24">
                            <div class="float-left">
                              <el-avatar :size="40" :src="childern.type===0?childern.avatar:avatar" />
                            </div>
                            <div class="float-left margin-top-5">
                              <div class="list-discuss-item-authtor">{{ childern.type===0?childern.nickname1:childern.nickname }}
                                <span v-if="childern.userId!==null&&childern.userId===articleData.userId" class="article-type">作者</span></div>
                              <div class="list-discuss-item-time">{{ parseTime(childern.createTime) }}</div>
                            </div>
                          </el-col>
                        </el-row>
                        <div class="list-discuss-item-content">
                          {{ childern.content }}
                        </div>
                      </div>

                    </div>

                  </el-card>
                </div>
                <div v-if="articleData.discusses.length===0" class="discuss-none">没有人评论快去抢沙发！</div>
              </div>

            </el-card>
          </el-col>
        </el-row>

      </el-col>

      <!--侧边菜单-->
      <el-col :xs="24" :sm="24" :md="20" :lg="4" :xl="4" :offset="1" class="hidden-sm-and-down">
        <div class="catelog-list">
          <el-card>
            <div>
              <h5>目录</h5>
            </div>
            <!-- 目录容器 -->
            <div id="articleCategory" />
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="匿名评论" :visible.sync="dialogUserFormVisible" :before-close="handleDiscussClose">
      <el-form :model="discussForm" :rules="rules">
        <el-form-item label="昵称" label-width="120px" prop="nickname">
          <el-input v-model="discussForm.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Email" label-width="120px" prop="email">
          <el-input v-model="discussForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="网址" label-width="120px">
          <el-input v-model="discussForm.website" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <router-link to="/login">
          <el-button @click="dialogUserFormVisible = false">账号登录</el-button>
        </router-link>
        <el-button @click="dialogUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFormFrom()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOneArticleById } from '@/api/blog/article'
import { parseTime, formatTime } from '@/utils/index'
import { saveDiscuss } from '../../api/blog/discuss'
import { mapGetters } from 'vuex'
import Catalog from '../../components/ProgressCatalog'
import '../../components/ProgressCatalog/progress-catalog.css'
import 'element-ui/lib/theme-chalk/display.css';
import { getBasicInfo } from '../../store/mutation'

export default {
  name: 'Detial',
  data() {
    return {
      dialogUserFormVisible: false,
      articleData: {
        tags: []
      },
      articleId: -1,
      discussContent: '',
      discussChildContent: '',
      discussPosition: -1, // 评论索引
      discussForm: {
        nickname: '',
        email: '',
        website: ''
      },
      rules: {
        nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, {
          pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '输入邮箱不合法'
        }]
      }
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    this.getArticleById()
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'user'
    ]),
      avatar() {
       // let name= Math.floor(Math.random() * (29 - 1)) + 1;
        return require(`@/assets/avatar/avatar_2_28.jpg`)
      }
  },
  mounted() {

  },
  methods: {
    parseTime,
    formatTime,
    createCategory() { // 生成文章目录
      new Catalog({
        contentEl: 'kCatelog',
        catalogEl: `catelogList`

      })
    },
    getArticleById() {
      if (this.articleId === -1 || this.articleId === undefined) {
        this.$router.push({ path: '/404' })
        return
      }
      const params = new URLSearchParams()
      params.append('id', this.articleId)

      getOneArticleById(params).then(response => {
        if (response.data.code === 200 && response.data.data != null) {
          this.articleData = response.data.data
          // 使用Dom进行节点赋值
          var content = document.getElementById('articleContent')
          content.innerHTML = this.articleData.content
          new Catalog({
            contentEl: 'articleContent',
            catalogEl: 'articleCategory',
            selector: ['h1','h2', 'h3', 'h4', 'h5', 'h6'],
            cool: false
          })
          /* new katelog({
              contentEl: 'articleContent',
              catelogEl: 'articleCategory',
              linkClass: 'linkClass1',
              linkActiveClass: 'linkActiveClass1',
              supplyTop: 20,
              selector: ['h2', 'h3'],
              active: function (el) {
                console.log(el);
              }
            });*/
        } else {
          this.$router.push({ path: '/404' })
        }
      })
    },
    showDiscussInput(index) {
      this.discussChildContent = ''
      this.discussPosition = index
    },
    handleDiscussClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    hideDiscussInput() {
      this.discussChildContent = ''
      this.discussPosition = -1
    },
    saveParentFrom() {
      if (this.discussContent === '') {
        this.$message.error('评论内容不能为空')
        return
      }
      this.discussForm.content = this.discussContent
      this.discussForm.type = 0
      this.discussForm.userId = this.user.userId
      this.discussForm.articleId = this.articleId
      if (!this.user.username) {
        this.dialogUserFormVisible = true
        return
      }
      saveDiscuss(this.discussForm).then(response => {
        if (response.data.code === 200) {
          this.$message.success('评论成功')
          this.discussPosition = -1
          this.getArticleById()

          this.discussForm = { nickname: '', email: '', website: '' }
          this.discussContent = ''
        } else {
          this.$message.error('评论失败')
        }
      })
    },
    saveChildFrom(parentId) {
      if (this.discussChildContent === '') {
        this.$message.error('评论内容不能为空')
        return
      }
      this.discussForm.parentId = parentId
      this.discussForm.content = this.discussChildContent
      this.discussForm.type = 0
      this.discussForm.userId = this.user.userId
      this.discussForm.articleId = this.articleId

      if (!this.user.username) {
        this.dialogUserFormVisible = true
        return
      }

      saveDiscuss(this.discussForm).then(response => {
        if (response.data.code === 200) {
          this.$message.success('评论成功')
          this.discussPosition = -1
          this.getArticleById()

          this.discussForm = { nickname: '', email: '', website: '' }
          this.discussChildContent = ''
        } else {
          this.$message.error('评论失败')
        }
      })
    },
    saveFormFrom() {
      if (this.discussForm.nickname === '') {
        this.$message.error('昵称不能为空')
        return
      } else if (this.discussForm.email === '') {
        this.$message.error('邮箱不能为空')
        return
      }

      this.discussForm.type = 1
      console.log('数据：' + this.discussForm)
      saveDiscuss(this.discussForm).then(response => {
        if (response.data.code === 200) {
          this.$message.success('评论成功')
          this.discussPosition = -1
          this.getArticleById()
          this.discussChildContent = ''
          this.discussContent = ''
          this.discussForm = { nickname: '', email: '', website: '' }
          this.dialogUserFormVisible = false
        } else {
          this.$message.error('评论失败')
        }
      })
    },
  getImageUrl(){
    return getBasicInfo('random_img', 'http://www.dmoe.cc/random.php');
  }
  }

}
</script>

<style scoped>

  .discuss-none{
    color: black;
    font-size: 16px;
    line-height: 35px;
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

  .list-discuss-item-authtor{
    color: #444444;
    margin-left: 16px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  .list-discuss-item-content{
    padding: 16px;
    color: black;
  }

  /**评论底部**/
  .list-discuss-item-bottom{
    padding: 16px;
    float: right;
    font-style: normal;
    text-decoration: none;
  }

  .list-card-item-main{
    margin-top: 25px;
    padding-top: 35px;
  }

  .list-card-item-main-div{
    margin: 15px 0px;

  }

  .list-discuss-item-time {
    margin-left: 8px;
    margin-top: 5px;
    font-size: 12px;
    color: white;
    font-family: 'Adobe 黑体 Std R';
    border-radius: 30px;
    color:#666666;
    padding: 3px 6px;
  }

  .list-main-item-cover>img {
    display: block;
    width: 100%;
    heigth: 300px;
    object-fit: cover;
    border-radius: 10px;
  }

  .article-type{
    background-color: rgba(255, 107, 124, 0.29);
    color: rgba(240, 100, 103, 0.98);
    border-radius: 15px;
    padding: 2px 6px;
    font-size: 13px;
    margin-right: 10px;
  }

  .tag-item{
    background-color: rgba(125, 255, 125, 0.47);
    color: rgb(81, 203, 102);
    border-radius: 15px;
    padding: 2px 6px;
    font-size: 13px;
    margin-right: 10px;
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

  .classify-item{
    background-color: rgba(238, 255, 97, 0.4);
    color: rgb(223, 211, 52);
    border-radius: 15px;
    padding: 2px 6px;
    font-size: 13px;
    margin-right: 10px;
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

  /*摘要*/
  .list-main-item-context {
    clear: both;
    margin: 18px 0px;
    font-size: 15px;
    color: #666666;
    line-height: 20px;
  }

  .discuss-box{
    text-align: center;
  }

  .discuss-box-child{
    text-align: center;
    padding-bottom: 25px;
  }

  .discuss-btn{
    float: right;
    margin: 12px 25px;
  }

  .list-discuss-item-child{
    margin-top: 45px;
    margin-left: 45px;
  }

  . linkClass1{
    line-height: 95px;
    font-family: "Adobe 黑体 Std R";
    background-color: #2C7BFB;

  }
  .linkActiveClass1{
    line-height: 95px;
    font-family: "Adobe 黑体 Std R";
    background-color: #2C7BFB;
  }

  .catelog-list{
    position: fixed;
    right: 20px;
    top: 80px;
    width: 25%;
  }

</style>
