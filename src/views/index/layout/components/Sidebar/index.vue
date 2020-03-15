<template>
  <div style="vertical-align:middle;position: relative;" :class="{'has-logo':showLogo}">
    <logo style="display: inline-block;float: left" v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar style="display: inline-block;float: left;margin-left: 20px;" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse-transition="false"
        :unique-opened="true"
        mode="horizontal"
        style="border: none"
      >
        <sidebar-item  style="float: left;width: 100px;text-align: center;" v-for="route in getIndexRotes(permission_routes)" :key="route.path" :item="route" :base-path="route.path" />

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Logo from './Logo'
import AppLink from './Link'

export default {
  components: { SidebarItem, Logo ,AppLink},
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return false
    },
    showLogo() {
      return this.$store.state.setting.sidebarLogo
    },
    hasOneShowingChild(children = [], parent) {
      if (children != null) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      }
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  },
  methods:{
    getIndexRotes(rotes){
      for (let i = 0; i <rotes.length; i++) {
        let rote = rotes[i]
        if (rote.path === '/') {
          return rote.children;
        }
      }
      return [];

    }
  }
}
</script>
