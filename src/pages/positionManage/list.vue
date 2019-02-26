<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="positionSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <div class="line_height_medium padding_bottom_10 cl">
        <work-list></work-list>
      </div>
      <el-table :data="list" border stripe v-loading.box="loading">

        <el-table-column :label="$t('data.jobType')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.type_name}">{{scope.row.type_name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.nameOfEmployer')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.employer_name}">{{scope.row.employer_name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="status" :label="$t('status.status')" :formatter="tableFilter.formatStatus"></el-table-column>

        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatTime"></el-table-column>

        <el-table-column prop="update_time" :label="$t('data.updateTime')" :formatter="tableFilter.formatTime"></el-table-column>

        <el-table-column :label="$t('operation.operation')" width="80">
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
import workList from '../../components/common/workerList'
import { jobs } from '@/assets/api/job'
import { positionSearch } from '@/assets/js/searchOption'
export default {
  components: {
    workList
  },
  data () {
    return {
      positionSearch,
      list: [],
      loading: false,
      searchForm: {}
    }
  },
  methods: {
    edit (data) {
      this.$router.push({
        name: 'EditPositionManage',
        query: {
          id: data.id,
          type: data.type_id
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
      jobs(Object.assign(sendData, search)).then(res => {
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
