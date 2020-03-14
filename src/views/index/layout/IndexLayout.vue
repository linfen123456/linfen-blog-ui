<template>
  <div :class="classObj" class="app-wrapper">
    <el-container>
      <el-header>
        <!--<router-link to="/admin">Go to Foo</router-link>
        <router-link to="/login">Go to Bar</router-link>-->
        <div style="float: left;line-height: 40px;text-align: center"><h1>淋汾博客</h1></div>
        <sidebar style="float: right; overflow: visible; margin-right: 50px" />
      </el-header>
      <el-main >
        <app-main />
      </el-main>
      <el-footer>
        这是底部
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { Navbar, Sidebar, AppMain, TagsView, Settings } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'IndexLayout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    showSettings() {
      return this.$store.state.setting.showSettings
    },
    needTagsView() {
      return this.$store.state.setting.tagsView
    },
    fixedHeader() {
      return this.$store.state.setting.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 70%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

</style>
