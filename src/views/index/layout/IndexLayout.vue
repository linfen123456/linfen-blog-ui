<template>
  <div :class="classObj" class="app-wrapper">
    <el-container>
      <el-header style="border-bottom: #dddddd 1px solid">
        <el-backtop :right="25">
          <div
            style="width: 2px;height: 1500px; color:black;background: #444444;position: absolute;bottom: 45px; right: 11px"
          />
          <img width="80px" height="80px" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906644322,1554970062&fm=26&gp=0.jpg">

        </el-backtop>
        <Header />
      </el-header>
      <el-main>

        <app-main />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>

    </el-container>
  </div>

</template>

<script>
import RightPanel from '@/components/RightPanel'
import { Navbar, Sidebar, AppMain, TagsView, Settings } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Footer from './Footer'
import Header from './Header'

export default {
  name: 'IndexLayout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Footer,
    Header
  },
  mixins: [ResizeMixin],
  data() {
    return {

    }
  },
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
