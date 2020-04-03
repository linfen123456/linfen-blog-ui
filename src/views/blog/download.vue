<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0;">
      <el-input
        v-model="query.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入文件名称"
        @keyup.enter.native="handleFind"
      />
      <el-select v-model="query.type">
        <el-option value="0" label="文档"></el-option>
        <el-option value="1" label="代码"></el-option>
        <el-option value="2" label="工具"></el-option>
        <el-option value="3" label="其他"></el-option>
      </el-select>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加文件</el-button>
    </div>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%">

      <el-table-column type="selection" />
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" width="120" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            title="描述"
            width="400"
            trigger="hover"
          >
            {{ scope.row.descriptions }}
            <span slot="reference">{{ scope.row.descriptions==undefined||scope.row.descriptions === ""||(scope.row.descriptions.length < 20) ? scope.row.descriptions :scope.row.content.substring(0,20)+'...' }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="大小" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fileSize }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="120" align="center">
        <template slot-scope="scope">
          <span>{{getType(scope.row.type)}}</span>
        </template>
      </el-table-column>


      <el-table-column label="链接" width="100" align="center">
        <template slot-scope="scope">
            <el-link type="primary" :underline="false"  :href="scope.row.url">下载</el-link>
        </template>
      </el-table-column>

      <el-table-column label="下载量" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.downloads}}
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
      :title="!dataForm.id ? '新增文件' : '修改文件'"
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
        <el-form-item label="文件名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="dataForm.title" placeholder="请输入文件名称" />
        </el-form-item>

        <el-form-item label="描述" prop="descriptions" :label-width="formLabelWidth">
          <el-input v-model="dataForm.descriptions" placeholder="请输入文件名称" />
        </el-form-item>

        <el-form-item label="大小" prop="fileSize" :label-width="formLabelWidth">
          <el-input v-model="dataForm.fileSize" placeholder="请输入文件名称" />
        </el-form-item>

        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-select v-model="dataForm.type" >
            <el-option value="0" label="文档"></el-option>
            <el-option value="1" label="代码"></el-option>
            <el-option value="2" label="工具"></el-option>
            <el-option value="3" label="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下载地址" prop="url" :label-width="formLabelWidth">
          <el-input v-model="dataForm.url" placeholder="请输入下载地址" />
          <el-link v-if="isEditForm" :underline="false" type="primary" :href="dataForm.url">下载</el-link>
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
import { getDownload, saveDownload, updateDownload, deleteDownload } from '@/api/blog/download'
import { parseTime } from '@/utils/index'

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
      // 分类菜单列表
      deptData: [],
      // tree配置项
      deptTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        title: '',
        descriptions: '',
        fileSize: '',
        type: '',
        downloads: '',
        endTime: '',
        status: ''
      },
      // 表单校验
      dataRule: {
        name: [{ required: true, message: '文件名称不能为空', trigger: 'blur' }]
      },
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getDownloadList()
  },
  methods: {
    parseTime,
    getDownloadList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      if (this.query.title) {
        params.append('title', this.query.title)
      }
      getDownload(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 查找
    handleFind: function() {
      this.getDownloadList()
    },
    handleReset: function() {
      this.query = {
        name: ''
      }
      this.getDownloadList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getDownloadList()
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
      this.$confirm('此操作将删除【' + row.name + '】文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDownload(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getDownloadList()
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
              updateDownload(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getDownloadList()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              saveDownload(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getDownloadList()
              })
            })
          }
        })
      }

    },
    getType(type) {
      switch (type) {
        case 0:
          return "文档"
        case 1:
          return "代码"
        case 2:
          return "工具"
        case 3:
          return "其他"
      }
    }
  }
}
</script>
