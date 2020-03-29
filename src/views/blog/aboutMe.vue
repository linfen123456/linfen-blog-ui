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
        placeholder="请输入标题"
        @keyup.enter.native="handleFind"
      />
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加关于我</el-button>
    </div>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%">

      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="内容" width="180" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            title="描述"
            width="200"
            trigger="hover">
            {{ scope.row.content}}
            <span slot="reference">{{ scope.row.content==undefined||scope.row.content === ""||(scope.row.content.length < 15) ? scope.row.content :scope.row.content.substring(0,20)+'...'  }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="150" align="center">
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
      :title="!dataForm.id ? '新增关于我' : '修改关于我'"
      width="60%"
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
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="dataForm.title" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="15"  v-model="dataForm.content" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-input v-model="dataForm.type" placeholder="请输入内容类型" />
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
import { getAboutMe, saveAboutMe, updateAboutMe, deleteAboutMe } from '@/api/blog/aboutMe'
import { parseTime } from '@/utils/index'
import TextThumbnail from '@/components/TextThumbnail'

export default {
  components:{
    TextThumbnail
  },
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
      // 分类菜单列表
      deptData: [],
      // tree配置项
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        name: '',
        content: '',
        type: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      // 表单校验
      dataRule: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '类型不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getAboutMeList()
  },
  methods: {
    parseTime,
    getAboutMeList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      if (this.query.name) {
        params.append('name', this.query.name)
      }
      getAboutMe(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 查找
    handleFind: function() {
      this.getAboutMeList()
    },
    handleReset: function() {
      this.query = {
        name: ''
      }
      this.getAboutMeList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getAboutMeList()
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogVisible = true
      this.dataForm = {}
    },
    // 编辑界面
    handleEdit: function(row) {
      this.isEditForm = true
      this.dialogVisible = true
      this.dataForm = row
    },

    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将删除【' + row.name + '】关于我, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteAboutMe(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getAboutMeList()
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
              updateAboutMe(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getAboutMeList()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              saveAboutMe(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getAboutMeList()
              })
            })
          }
        })
      }
    }
  }
}
</script>
