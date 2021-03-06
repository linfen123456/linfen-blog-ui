<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0;">
      <el-input
        v-model="query.title"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入文章名称"
        @keyup.enter.native="handleFind"
      />
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加文章</el-button>
    </div>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%">

      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="200" align="left">
        <template slot-scope="scope">
          <div><span v-if="scope.row.isView==='3'" class="article-half">草稿</span>{{ scope.row.title }}</div>
        </template>
      </el-table-column>

      <el-table-column label="摘要" width="250" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            title="摘要"
            width="500"
            trigger="hover"
          >
            {{ scope.row.abstracts }}
            <span slot="reference">{{ scope.row.abstracts==undefined||scope.row.abstracts === ""||(scope.row.abstracts.length < 20) ? scope.row.abstracts :scope.row.content.substring(0,20)+'...' }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="typeTag[scope.row.type]" effect="dark">
            {{ type[scope.row.type] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pagination">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        background
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增修改界面 -->
    <el-dialog
      :title="!dataForm.id ? '新增文章' : '修改文章'"
      width="40%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        label-width="80px"
        :size="size"
        style="text-align:left;"
        @keyup.enter.native="submitForm()"
      >
        <el-form-item label="文章名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="dataForm.name" placeholder="请输入文章名称" />
        </el-form-item>

        <el-form-item label="描述" prop="name" :label-width="formLabelWidth">
          <el-input v-model="dataForm.descriptions" type="textarea" placeholder="请输入描述" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, addTenant, updateTenant, deleteTenant } from '@/api/tenant'
import { saveArticle, getArticle, updateArticle, deleteArticle } from '@/api/blog/article'
import { parseTime } from '@/utils/index'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      size: 'small',
      tableData: [],
      query: {
        name: ''
      },
      title: '',
      dialogFormVisible: false, // 控制弹出框
      formLabelWidth: '120px',
      isEditForm: false,
      currentPage: 1,
      pageSize: 10,
      total: 0, // 总数量
      // 文章菜单列表
      deptData: [],
      // tree配置项
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        name: '',
        code: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      type: ['原创', '转载', '翻译'],
      typeTag: ['', 'success', 'warning'],
      // 表单校验
      dataRule: {
        name: [{ required: true, message: '文章名称不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getArticleList()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    parseTime,
    getArticleList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      params.append('userId', this.user.userId)
      if (this.query.title) {
        params.append('title', this.query.title)
      }
      getArticle(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 查找
    handleFind: function() {
      this.getArticleList()
    },
    handleReset: function() {
      this.query = {
        name: ''
      }
      this.getArticleList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getArticleList()
    },
    // 显示新增界面
    handleAdd: function() {
      // this.dialogVisible = true
      // this.dataForm = {}
      this.$router.push({ path: '/page/publishArticle' })
    },
    // 编辑界面
    handleEdit: function(row) {
      /* this.isEditForm = true
        this.dialogVisible = true
        this.dataForm = row*/
      this.$router.push({ path: '/page/publishArticle', query: { articleId: Math.floor(1000) + 'd|' + row.id + '|%' + Math.random(200) }})
    },

    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将删除【' + row.title + '】文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteArticle(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getArticleList()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    submitEditForm: function() {
      if (this.isEditForm) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              updateArticle(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getArticleList()
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
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getArticleList()
              })
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .article-half {
    border-radius:10px;
    padding:2px 5px;
    border:#E65D6E 1px solid;
    font-size: 12px;
    color: #E65D6E;
    margin-right: 5px;
  }
</style>
