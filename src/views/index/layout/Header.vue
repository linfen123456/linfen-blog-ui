<template>
  <div>
    <div class="menu-view">
      <sidebar />
    </div>
    <div class="right-view" >
      <div style="clear: both;text-align: center">



        <div v-if="roles.length === 0" style="float: right;">
          <!--登录注册按钮-->
          <span  style="margin-left: 25px">
            <router-link to="/lgoin">
              <el-link :underline="false">登录</el-link>
            </router-link>
            <router-link to="/register">
              <el-link :underline="false">注册</el-link>
            </router-link>
          </span>
        </div>

        <div v-else style="float: right;margin-top: 10px">
          <!--个人-->
          <span  style="">
            <el-dropdown class="avatar-container" trigger="click">
              <el-avatar  :src="avatar" ></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/">
                  <el-dropdown-item>
                    首页
                  </el-dropdown-item>
                </router-link>
                <router-link to="/user/center">
                  <el-dropdown-item>
                    个人中心
                  </el-dropdown-item>
                </router-link>
                <router-link to="/personal">
                  <el-dropdown-item>
                    后台管理
                  </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                  <span style="display:block;" @click="logout">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>

        <div style="float: right;">
          <span  v-on:mouseover="changeActive($event)"
                 v-on:mouseout="removeActive">
            <span   v-if="isVisibleSearch">
              <el-input v-model="search" :clearable="true" class="search-input">
                <el-button style="border: 0px"  slot="suffix" icon="el-icon-search" @click="handleSearch" circle></el-button>
              </el-input>
            </span>
            <span v-else><el-button icon="el-icon-search" circle></el-button></span>
          </span>
        </div>
      </div>




    </div>
  </div>

</template>

<script>
  import { Sidebar } from './components'
  import { mapGetters } from 'vuex'

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
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'device',
        'roles'
      ])
    },
    methods:{
      setting() {
        this.$store.commit('openSettingBar', true)
      },
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },

      // 退出登录
      logout() {
        this.$confirm('是否退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload()
          })
        })
      },
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
        this.$router.push({ path:  '/search',query:{search:this.search} })
        this.search=''
      }
    }
  }
</script>

<style scoped>
  .menu-view{
    float: left
  }
  .right-view {
    clear: both;
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

  .avatar-container{
    clear: both;
    margin-left: 25px;
  }

  .avatar-img{

    margin-top: 15px;
  }

</style>
