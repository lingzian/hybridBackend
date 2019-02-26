<template>
  <el-pagination
    class="pagination text_right"
    @current-change="handleCurrentChange"
    :current-page.sync="page"
    :page-size="perPage"
    layout="prev, pager, next, jumper"
    :total="totalCount">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      page: 1, // 当前页
      perPage: this.pageSize === 0 ? parseInt(process.env.VUE_APP_PAGINATION_SIZE) : this.pageSize, // 一页获取多少数据
      totalCount: 0 // 数据总数
    }
  },
  mounted () {
    this.$emit('changePage')
  },
  methods: {
    handleCurrentChange () {
      if (this.totalCount <= this.perPage) return false
      this.$emit('changePage')
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
