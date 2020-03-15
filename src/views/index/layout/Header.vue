<template>
  <div>
    <div class="menu-view">
      <sidebar />
    </div>
    <div class="right-view" style="">
      <span  v-on:mouseover="changeActive($event)"
            v-on:mouseout="removeActive">
        <span  v-if="isVisibleSearch"><el-input v-model="search"class="search-input"/>搜索</span>
        <span v-else>搜索</span>
      </span>
      <span>登录  /  注册</span>
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
    width: 300px;
  }
</style>
