<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="resumeSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <el-table :data="list" border stripe v-loading.box="loading">

        <el-table-column :label="$t('data.username')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.user_name}">{{scope.row.user_name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.jobType')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.type_name}">{{scope.row.type_name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="user_no" :label="$t('data.number')"></el-table-column>

        <el-table-column prop="status" :label="$t('status.status')" :formatter="tableFilter.formatStatuss"></el-table-column>

        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatTime"></el-table-column>
        <el-table-column prop="update_time" :label="$t('data.updateTime')" :formatter="tableFilter.formatTime"></el-table-column>

        <el-table-column :label="$t('operation.operation')" width="90">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              style="text-algin: center;"
              @click="edit(scope.row)">{{ $t('data.detail') }}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { resumes } from '@/assets/api/resume'
import { resumeSearch } from '@/assets/js/searchOption'
export default {
  data () {
    return {
      resumeSearch,
      list: [],
      loading: false
    }
  },
  methods: {
    edit (data) {
      this.$router.push({
        name: 'EditResumeManage',
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
      resumes(Object.assign(sendData, search)).then(res => {
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

<style lang="scss" scoped>

</style>
