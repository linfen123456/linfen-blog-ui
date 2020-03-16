<template>
  <div>
    <div class="menu-view">
      <sidebar />
    </div>
    <div class="right-view" style="">
      <span  v-on:mouseover="changeActive($event)"
            v-on:mouseout="removeActive">
        <span  v-if="isVisibleSearch">
          <el-input v-model="search" clearable="true" class="search-input">
          <el-button style="border: 0px"  slot="suffix" icon="el-icon-search" @click="handleSearch" circle></el-button>
          </el-input>
        </span>
        <span v-else><el-button icon="el-icon-search" circle></el-button></span>
      </span>

      <span style="margin-left: 25px">
        <router-link to="/lgoin">
          <el-link :underline="false">登录</el-link>
        </router-link>
        <router-link to="/register">
          <el-link :underline="false">注册</el-link>
        </router-link>
      </span>
    </div>
  </div>

</template>

<script>
  import { Sidebar } from './components'

  export default {
    name: 'Header',
    components: {
      Sidebar
    },
    data() {
      return{
        isVisibleSearch: false,
        search:''
      }
    },
    methods:{
    // 鼠标移入
    changeActive(e) {
      this.isVisibleSearch = true;
      // alert(e.clientX - 180+'')
    },
    // 鼠标移出
    removeActive() {
      // 设置不显示
      this.isVisibleSearch = false;
    },
      handleSearch() {
        if (this.search === '') {
          this.$message({
            showClose: true,
            message: '搜索内容能为空',
            type: 'success'
          });
          return;
        }
        alert(this.search)
      }
    }
  }
</script>

<style scoped>
  .menu-view{
    float: left
  }
  .right-view {
    position: absolute;
    right: 30px;
    top: 0px;
    z-index: 99999;
    line-height: 56px;
    text-align: center;
  }
  .search-input{
    border-radius: 80px;
    width: 300px;
  }

  input.el-input__inner {
    border-radius:15px;
  }

</style>
