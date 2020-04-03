<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form
          ref="dataForm"
          :model="dataForm"
          :rules="dataRule"
          label-width="80px"
          style="text-align:left;"
          @keyup.enter.native="submitForm()"
        >

          <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
            <el-input v-model="dataForm.title" placeholder="请输入文章名称" />
          </el-form-item>

          <el-form-item label="" prop="content" :label-width="formLabelWidth">
            <tinymce v-model="dataForm.content" />
          </el-form-item>

          <el-form-item label="摘要" prop="abstracts" :label-width="formLabelWidth">
            <el-input v-model="dataForm.abstracts" type="textarea" placeholder="请输入文章摘要" />
          </el-form-item>

          <el-form-item label="封面" prop="cover" :label-width="formLabelWidth">
            <el-input v-model="dataForm.cover" placeholder="请输入文章摘要" >
              <el-button slot="append" @click="dialogCoverPreVisible=true" icon="el-icon-view"></el-button>
            </el-input>
                        <el-button type="text" @click="showCoverDrawer">选则封面</el-button>
          </el-form-item>

          <el-form-item label="分类" prop="categoryId" :label-width="formLabelWidth">
            <el-select v-model="dataForm.categoryId" placeholder="请选择" style="width: 500px">
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="标签" prop="categoryId" :label-width="formLabelWidth">
            <el-select v-model="dataForm.tags" multiple placeholder="请选择" style="width: 500px">
              <el-option
                v-for="item in tags"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
            <el-select v-model="dataForm.type" placeholder="请选择" style="width: 500px">
              <el-option key="0" label="原创" value="0" />
              <el-option key="1" label="转载" value="1" />
              <el-option key="2" label="翻译" value="2" />
            </el-select>
          </el-form-item>

          <el-form-item label="评论" prop="openDiscuss" :label-width="formLabelWidth">
            <el-switch
              v-model="dataForm.openDiscuss"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
            />
          </el-form-item>

          <el-form-item label="公开" prop="isView" :label-width="formLabelWidth">
            <el-switch
              v-model="dataForm.isView"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
            />
          </el-form-item>

          <el-form-item label="置顶" prop="isTop" :label-width="formLabelWidth">
            <el-switch
              v-model="dataForm.isTop"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
            />
          </el-form-item>

          <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
            <el-input-number v-model="dataForm.sort" :step="1" />
          </el-form-item>

          <el-form-item>
            <el-button type="success" round @click="submitEditForm(0)">发布文章</el-button>
            <el-button type="primary" round @click="submitEditForm(3)">保存草稿</el-button>
            <el-button type="danger" round @click="cancleSubit">取消发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


    <el-dialog width="600px" title="选择封面" :visible.sync="dialogCoverVisible">
      <div style="width: 500px;height: 300px">
        <el-image style="width: 500px; height: auto;max-height: 320px" :src="coverList[coverPosition].imgurl" lazy />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getPreImage">上一张</el-button>
        <el-button @click="getNextImage">下一张</el-button>
        <el-button @click="dialogCoverVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectImageCover">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="600px" title="封面预览" :visible.sync="dialogCoverPreVisible">
      <div style="width: 500px;height: 300px">
        <el-image style="width: 500px; height: auto;max-height: 320px" :src="dataForm.cover" lazy />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogCoverPreVisible = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { saveArticle, getArticle, updateArticle, deleteArticle, getArticleById } from '@/api/blog/article'
import { getCategory, getAllCategory } from '@/api/blog/category'
import { getTag, getAllTag } from '@/api/blog/tag'
import { parseTime } from '@/utils/index'
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getIamge } from '../../api/blog/restTemplate'

export default {
  name: 'PublishArticle',
  components: {
    Tinymce
  },
  data() {
    return　{
      formLabelWidth: '120px',
      dataForm: {
        title: '',
        content: '',
        cover: '',
        openDiscuss: '0',
        isView: '0',
        isTop: '1',
        categoryId: '',
        tags: [],
        type: '',
        sort: 0
      },
      // 表单校验
      dataRule: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        openDiscuss: [{ required: true, message: '请选择是否开启评论', trigger: 'blur' }],
        isView: [{ required: true, message: '选择是否公开', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        tag: [{ required: true, message: '请选择标签', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }]
      },
      editLoading: false,
      category: [],
      tags: [],
      articleId: -1,
      dialogCoverVisible: false,
      dialogCoverPreVisible: false,
      coverList: [{imgUrl:''}],
      coverPosition:0
    }
  },
  created() {
    const data = this.$route.query.articleId
    try {
      this.articleId = (data).substring(data.indexOf('|') + 1, data.lastIndexOf('|'))
      this.getArticleById()
    } catch (e) {

    }
    this.getCategory()
    this.getTag()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    parseTime,
    // 获取分类
    getCategory() {
      const params = new URLSearchParams()
      params.userId = this.user.userId
      getAllCategory(params).then(response => {
        this.category = response.data.data
      })
    },
    // 获取分类
    getTag() {
      const params = new URLSearchParams()
      params.userId = this.user.userId
      getAllTag(params).then(response => {
        this.tags = response.data.data
      })
    },
    getArticleById() {
      getArticleById(this.articleId).then((response) => {
        this.dataForm = response.data.data
      })
    },
    selectImageCover() {
      this.dataForm.cover = this.coverList[this.coverPosition].imgurl
      this.dialogCoverVisible = false
    },
    getPreImage() {
      if (this.coverPosition >1) {
        this.coverPosition--
      } else {
        this.$message.success("已经是第一张了")
      }

    },
    getNextImage() {
      if (this.coverPosition < this.coverList.length - 1) {
        this.coverPosition++
      } else {
        this.getCoverImage()
      }

    },
    getCoverImage() {
      const params = new URLSearchParams()
      let that=this
      axios({
        headers: {
          'Authorization': 'Bearer ' + getToken()
        },
        method: 'get',
        url: '/pre/restTemplate/image',
        data: ''
      })
        .then(function (response) {
          that.coverList.push(response.data)
          that.coverPosition++
        })
        .catch(function (error) {
          console.log(error);
        });

      /*getIamge(params).then(response => {
        console.log(response)
        alert(JSON.stringify(response))
        this.coverData = response
      })*/
    },
    submitEditForm: function(isHalf) {
      if (isHalf === 3) {
        this.dataForm.isView = 3
      }
      if (this.articleId != -1) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm(isHalf !== 3 ? '确认发布吗？' : '确认保存草稿吗', '提示', {}).then(() => {
              this.editLoading = true
              updateArticle(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              saveArticle(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
              })
            })
          }
        })
      }
    },
    cancleSubit() {
      this.$confirm('确认取消吗？', '提示', {}).then(() => {
        this.$router.push({ path: '/page/article' })
      })
    },
    showCoverDrawer() {//显示封面选择框
      this.getCoverImage()
      this.dialogCoverVisible = true
    }
  }
}
</script>

<style scoped>

</style>
