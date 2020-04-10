<template>
  <div>
    <el-row>
      <!--右边文章-->
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" :offset="1">
        <!--面包屑-->
        <el-row>
          <el-col>
            <el-card>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{pageData.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
          </el-col>
        </el-row>

        <!--内容-->
        <el-row style="margin-top: 25px;margin-bottom: 30px">
          <el-col>
            <el-card>

              <el-divider />


              <el-row class="margin-top-12">
                <el-col :span="24">
                  <div class="list-main-item-context">
                    <div v-html="pageData.content"/>
                  </div>
                </el-col>
              </el-row>


            </el-card>
          </el-col>
        </el-row>

      </el-col>

  </el-row>
  </div>
</template>

<script>
import { getPageByLink } from '@/api/blog/page'
import { parseTime, formatTime } from '@/utils/index'
import { mapGetters } from 'vuex'
import '../../components/ProgressCatalog/progress-catalog.css'
import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: 'page',
  data() {
    return {
      pageData:{},
      path: undefined,
      rules: {
        nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, {
          pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '输入邮箱不合法'
        }]
      }
    }
  },
  created() {
    this.path = this.$route.params.path
    this.getPageById()
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
    getPageById() {
      if (this.path === undefined) {
        this.$router.push({ path: '/404' })
        return
      }
      const params = new URLSearchParams()
      params.append('path', this.path)

      getPageByLink(params).then(response => {
        if (response.data.code === 200 && response.data.data != null) {
          this.pageData = response.data.data
        } else {
          this.$router.push({ path: '/404' })
        }
      })
    },

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
