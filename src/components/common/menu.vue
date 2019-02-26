<template>
  <div class="menu">
    <div class="title">
      {{$t('data.helper')}}
    </div>
    <div class="menuContent">
      <el-scrollbar
        class="menu_scrollbar"
        :style="`background-color:#fff;`"
        view-style="max-height:100%;"
        wrap-style="overflow-x:hidden;"
      >

        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          background-color="#fff"
          text-color="rgba(0,0,0,.65)"
          active-text-color="#1890ff"
          ref="menu"
          @select="selectMenu"
        >
          <template v-for="(item,index) in menus">

            <el-submenu
              v-if="item.sub_menus"
              :index="`${item.id}`"
              :key="index"
              :show-timeout="0"
              :hide-timeout="0"
            >
              <template slot="title">
                <i :class="`icon-${item.id}`"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item
                class="menu_item"
                v-for="(i,idx) in item.sub_menus"
                :key="idx"
                :index="`${i.id}`"
              >{{i.name}}</el-menu-item>
            </el-submenu>

            <el-menu-item
              v-else
              :key="index"
              :index="`${item.id}`"
            >
              <i :class="`icon-${item.id}`"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

          </template>

        </el-menu>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import { menus } from '@/assets/api/menus'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('menu')

export default {
  data () {
    return {
      menus: []
    }
  },
  watch: {
    $route: {
      handler: 'queryPath',
      immediate: true
    }
  },
  computed: {
    ...mapState(['path', 'pathItem']),
    defaultActive () {
      let path = this.$route.path.split('/')
      let special = ['Add', 'Edit']
      let overPathIndex = ''
      path.shift()
      if (path[0] === '') {
        return 'Index'
      } else {
        path.forEach((ele, idx) => {
          special.forEach(spe => {
            if (ele.includes(spe)) {
              overPathIndex = idx
              return false
            }
          })
        })
        overPathIndex = overPathIndex || path.length
        let pathName = path[overPathIndex - 1]
        return pathName
      }
    }
  },
  created () {
    menus().then(res => {
      this.menus = res.data.items
    })
  },
  methods: {
    ...mapMutations(['setPath']),
    selectMenu (path) {
      this.$router.push({
        name: path
      })
    },
    queryPath (to, from) {
      let newPath = this.$route.path.replace('/', '') ? this.$route.path.replace('/', '').split('/') : ['Index']
      let newPaths = []
      let path = this.path
      let pathItem = []
      let query = this.$route.query || {}

      newPath = newPath.map(ele => {
        ele = ele.includes('Add') ? 'Add' : ele
        ele = ele.includes('Edit') ? 'Edit' : ele
        return ele
      })
      newPaths = [...newPath]
      if (path && path.length !== 0) { // 不是第一次进入页面
        newPaths.forEach((ele, idx) => {
          if (ele !== path[idx] || !path[idx]) {
            let morePath = newPaths.splice(idx) // -》多余的部分都加上query
            pathItem = morePath.map(ele => {
              return {
                name: ele,
                query: query
              }
            })
            if (idx !== 0) {
              this.pathItem.splice(idx)
              pathItem = this.pathItem.concat(pathItem)
            }
            return false
          } else if ((newPaths.length - 1) === idx && ele === path[idx]) { // 相同路径 或者 在本来的路径之上后退
            pathItem = this.pathItem.slice(0, idx + 1)
            pathItem[idx].query = query
          }
        })
      } else if (!this.path) { // 第一次进入页面
        pathItem = newPaths.map(ele => {
          return {
            name: ele,
            query: query
          }
        })
      }
      this.setPath({ pathItem, newPath })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/config/ui.scss";
.menu {
  height: 100%;
  position: relative;
  padding-top: $headerHeight;
  i {
    font-size: 18px;
    padding-right: 10px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: $uncollapseWidth;
  }
  .menu_scrollbar {
    height: 100%;
  }
  .menuContent {
    background-color: rgb(84, 92, 100);
    height: 100%;
    overflow: hidden;
  }
  .title {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: $headerHeight;
    line-height: $headerHeight;
    z-index: 2;
    background-color: $publicColor;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
