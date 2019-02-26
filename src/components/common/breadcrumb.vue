<template>
  <div class="bread_box cl full_width">
    <el-button @click="back" v-if="showBack" class="back" type="primary" size="mini" icon="el-icon-arrow-left" circle></el-button>
    <el-breadcrumb :class="{bread_padding:showBack}" separator="/" separator-class="el-icon-arrow-right">
      <template v-for="(item,index) in pathItem">
        <el-breadcrumb-item v-if="(index === 0 && overPathIndex!==1) || index === (pathItem.length-1)" :key="index" :class="{'current':index === pathItem.length - 1}">{{ item ? $t(`menu.${item.name}`) : ''}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="index"
          :to="{name:item.name,query:item.query}"
        >{{ item.name ? $t(`menu.${item.name}`) : ''}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <slot />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('menu')
export default {
  data () {
    return {
      special: ['Add', 'Edit'],
      overPathIndex: '' // 当这个值为1的时候就表示第二页为新增或者编辑
    }
  },
  computed: {
    ...mapState(['pathItem']),
    showBack () {
      return (this.pathItem[0] !== '' && this.pathItem.length > 2) || (this.pathItem[0] !== '' && this.overPathIndex === 1)
    }
  },
  created () {
    this.checkIndex()
  },
  methods: {
    back () {
      this.$router.back()
    },
    checkIndex () { // 判断新增或者编辑页面在哪个位置
      this.pathItem.forEach((element, idx) => {
        this.special.forEach(ele => {
          if (element.name.includes(ele)) {
            this.overPathIndex = idx
            return false
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/config/ui.scss";
.bread_box {
  background: white;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  display: table;
  position: relative;
  & > div {
    display: table-cell;
    vertical-align: middle;
  }
  .bread_padding{
    padding-left: 38px;
  }
  .back{
    position: absolute;
    top: 50%;
    transform: translate(0,-50%);
  }
}
</style>
