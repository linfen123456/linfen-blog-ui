<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo!==undefined&&logo!=='false'" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title"><span v-html="title" /></h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo!==undefined&&logo!=='false'" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title"><span v-html="title" /></h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { getBasicInfo } from '@/store/mutation'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: getBasicInfo('site_name', '淋汾博客'),
      logo: getBasicInfo('site_logo', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1189453540,1107575607&fm=26&gp=0.jpg')
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }
  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }
  .sidebar-logo-container {
    position: relative;
    width: auto;
    height: 45px;
    line-height: 50px;
    background: #ffffff;
    text-align: center;
    overflow: hidden;
    border: 0px;
    & .sidebar-logo-link {
      height: 32px;
      width: auto;
      & .sidebar-logo {
        border: 0px;
        width: auto;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }
      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #000;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }
    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
</style>
