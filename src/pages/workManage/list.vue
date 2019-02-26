<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="workSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <el-table :data="list" border stripe v-loading.box="loading">

        <el-table-column :label="$t('data.name')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.name}">{{scope.row.name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.thumb')" width="120">
          <template slot-scope="scope">
            <images :thumb="scope.row.image"></images>
          </template>
        </el-table-column>

        <el-table-column prop="status" :label="$t('data.status')" :formatter="tableFilter.formatActive"></el-table-column>

        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatTime"></el-table-column>

        <el-table-column prop="update_time" :label="$t('data.updateTime')" :formatter="tableFilter.formatTime"></el-table-column>

        <el-table-column :label="$t('operation.operation')" width="76">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="edit(scope.row)">{{ $t('operation.edit') }}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { works } from '@/assets/api/work'
import { workSearch } from '@/assets/js/searchOption'
export default {
  data () {
    return {
      workSearch,
      list: [],
      loading: false
    }
  },
  methods: {
    edit (data) {
      this.$router.push({
        name: 'EditWorkManage',
        query: {
          id: data.id
        }
      })
    },
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
      works(Object.assign(sendData, search)).then(res => {
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
