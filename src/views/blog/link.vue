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
        placeholder="请输入友联名称"
        @keyup.enter.native="handleFind"
      />
      <el-input
        v-model="query.linkAddress"
        clearable
        class="filter-item"
        style="width: 200px;"
        size="small"
        placeholder="请输入友联地址"
        @keyup.enter.native="handleFind"
      />
      <el-select v-model="query.status">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFind">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size="small" @click="handleReset">重置
      </el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加友联</el-button>
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
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" width="120" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            title="描述"
            width="200"
            trigger="hover">
            {{ scope.row.descriptions}}
            <span slot="reference">{{ scope.row.descriptions==undefined||scope.row.descriptions === ""||(scope.row.descriptions.length < 20) ? scope.row.descriptions :scope.row.descriptions.substring(0,20)+'...'  }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="地址" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.linkAddress }}</span>
        </template>
      </el-table-column>

       <el-table-column label="访问量" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pv }}</span>
        </template>
      </el-table-column>

       <el-table-column label="类型" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <span><el-tag  effect="dark"  :type="statusOption[scope.row.status].type">{{statusOption[scope.row.status].label}}</el-tag></span>
        </template>
      </el-table-column>



      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="140" align="center">
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
      :title="!dataForm.id ? '新增友联' : '修改友联'"
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
        <el-form-item label="logo" prop="logo" :label-width="formLabelWidth">
          <el-input v-model="dataForm.logo" placeholder="请输入友联名称" />
        </el-form-item>

        <el-form-item label="友联名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="dataForm.name" placeholder="请输入友联名称" />
        </el-form-item>

        <el-form-item label="描述" prop="descriptions" :label-width="formLabelWidth">
          <el-input v-model="dataForm.descriptions" placeholder="请输入描述" />
        </el-form-item>

        <el-form-item label="访问地址" prop="linkAddress" :label-width="formLabelWidth">
          <el-input v-model="dataForm.linkAddress" placeholder="请输入访问地址" />
        </el-form-item>

        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-input v-model="dataForm.type" placeholder="请输入类型" />
        </el-form-item>

        <el-form-item v-model="isEditForm" label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="dataForm.status">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
import { getLink, saveLink, updateLink, deleteLink } from '@/api/blog/link'
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
        name: '',
        code: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      // 表单校验
      dataRule: {
        name: [{ required: true, message: '友联名称不能为空', trigger: 'blur' }],
        linkAddress: [{ required: true, message: '友联地址不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
      },
      statusOption: [{
        value: 0,
        label: '审核中',
        type: ''
      }, {
        value: 1,
        label: '审核通过',
        type: 'success'
      }, {
        value: 2,
        label: '禁止访问',
        type: 'danger'
      }, {
        value: 3,
        label: '隐藏',
        type: 'info'
      }],
      loading: false,
      dialogVisible: false,
      editLoading: false

    }
  },
  created() {
    this.getLinkList()
  },
  methods: {
    parseTime,
    getLinkList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('current', this.currentPage)
      params.append('size', this.pageSize)
      if (this.query.name) {
        params.append('name', this.query.name)
      }
      if (this.query.linkAddress) {
        params.append('linkAddress', this.query.linkAddress)
      }
      if (this.query.status) {
        params.append('status', this.query.status)
      }
      getLink(params).then(response => {
        this.loading = false
        this.tableData = response.data.data.records
        this.total = response.data.data.total
      })
    },
    // 查找
    handleFind: function() {
      this.getLinkList()
    },
    handleReset: function() {
      this.query = {
        name: '',
        linkAddress: '',
        status:undefined,

      }
      this.getLinkList()
    },
    // 换页
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getLinkList()
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
      this.$confirm('此操作将删除【' + row.name + '】友联, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteLink(row.id).then(response => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.getLinkList()
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
              updateLink(this.dataForm).then((res) => {
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getLinkList()
              })
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.dataForm)
              saveLink(this.dataForm).then((res) => {
                this.editLoading = true
                if (res.data.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: res.data.msg, type: 'error' })
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.dialogVisible = false
                this.getLinkList()
              })
            })
          }
        })
      }
    }
  }
}
</script>
