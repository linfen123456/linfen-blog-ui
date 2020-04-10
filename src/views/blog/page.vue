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
        placeholder="请输入页面标题"
        @keyup.enter.native="handleFind"
      />
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加页面</el-button>
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
          <div><span v-if="scope.row.isView==='3'" class="Page-half">草稿</span>{{ scope.row.title }}</div>
        </template>
      </el-table-column>

      <el-table-column label="链接地址" width="250" align="center">
        <template slot-scope="scope">
            {{ scope.row.link }}
        </template>
      </el-table-column>

      <el-table-column label="图标" width="100" align="center">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.logo" />
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
      :title="!dataForm.id ? '新增页面' : '修改页面'"
      width="80rem"
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
        @keyup.enter.native="submitEditForm()"
      >
        <el-form-item label="页面标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="dataForm.title" placeholder="请输入页面标题" />
        </el-form-item>

        <el-form-item label="链接" prop="link" :label-width="formLabelWidth">
          <el-input v-model="dataForm.link"  placeholder="请输入短链接" />
        </el-form-item>

        <el-form-item label="图标" prop="logo" :label-width="formLabelWidth">
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="dataForm.logo" placeholder="点击选择图标" readonly>
              <svg-icon
                v-if="dataForm.logo"
                slot="prefix"
                :icon-class="dataForm.logo"
                class="el-input__icon"
                style="height: 32px;width: 16px;"
              />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>

        <el-form-item label="内容：" prop="content" :label-width="formLabelWidth">
          <tinymce ref="editor" v-model="dataForm.content" />
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
import { savePage, getPage, updatePage, deletePage } from '@/api/blog/page'
import { parseTime } from '@/utils/index'
import { mapGetters } from 'vuex'
import IconSelect from '@/components/IconSelect'
import Tinymce from '@/components/Tinymce'

export default {
  components: {IconSelect,Tinymce},
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
      // 页面菜单列表
      deptData: [],
      // tree配置项
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        title: '',
        content: '',
        link: '',
        logo: ''
      },
      typeTag: ['', 'success', 'warning'],
      // 表单校验
      dataRule: {
        title: [{ required: true, message: '页面名称不能为空', trigger: 'blur' }],
        link: [{ required: true, message: '链接不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getPageList()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    parseTime,
    selected(name) {
      this.dataForm.logo = name
    },
    getPageList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      if (this.query.title) {
        params.append('title', this.query.title)
      }
      getPage(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 查找
    handleFind: function() {
      this.getPageList()
    },
    handleReset: function() {
      this.query = {
        name: ''
      }
      this.getPageList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getPageList()
    },
    // 显示新增界面
    handleAdd: function() {
      this.isEditForm = false
      this.dialogVisible = true
      this.dataForm = {title: '', content: '', link: '', logo: ''}
    },
    // 编辑界面
    handleEdit: function(row) {
       this.isEditForm = true
        this.dialogVisible = true
        this.dataForm = row
    },

    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将删除【' + row.title + '】页面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePage(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getPageList()
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
              updatePage(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getPageList()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              savePage(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getPageList()
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
  .Page-half {
    border-radius:10px;
    padding:2px 5px;
    border:#E65D6E 1px solid;
    font-size: 12px;
    color: #E65D6E;
    margin-right: 5px;
  }
</style>
