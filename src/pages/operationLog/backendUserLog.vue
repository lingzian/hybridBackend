<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="userLogSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <el-table :data="list" border stripe v-loading.box="loading">

        <el-table-column :label="$t('data.userName')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.username}">{{scope.row.username | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.username')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.name}">{{scope.row.name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('operation.operation')" prop="operation"> </el-table-column>

        <el-table-column prop="status" :label="$t('data.status')" :formatter="tableFilter.formatSuccess"></el-table-column>

        <el-table-column prop="create_time" :label="$t('data.operationTime')" :formatter="tableFilter.formatTime"></el-table-column>

      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { userLogSearch } from '@/assets/js/searchOption'
import { operations } from '@/assets/api/userLog'
export default {
  data () {
    return {
      userLogSearch,
      list: [],
      loading: false
    }
  },
  methods: {
    requestList (searchForm) {
      let search = {}
      if (!searchForm) {
        search = this.searchForm
      } else {
        this.searchForm = searchForm
        search = searchForm
      }
      let pagination = this.$refs.pagination
      this.loading = true
      let sendData = {
        page: pagination.page,
        page_size: pagination.perPage
      }
      operations(Object.assign(sendData, search)).then(res => {
        let data = res.data
        this.list = res.data.items
        pagination.totalCount = parseInt(data.total_amount)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
