<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="authSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <!-- <div class="line_height_medium margin_bottom_10 cl">
        <el-button type="primary" class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </div> -->
      <el-table :data="list" border stripe v-loading.box="loading">
        <el-table-column prop="name" :label="$t('data.name')"></el-table-column>
        <el-table-column prop="group_name" :label="$t('data.group_name')"></el-table-column>
        <el-table-column prop="description" :label="$t('data.description')"></el-table-column>
        <el-table-column prop="description" :label="$t('data.group_description')"></el-table-column>
        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatTime"></el-table-column>
        <el-table-column prop="update_time" :label="$t('data.updateTime')" :formatter="tableFilter.formatTime"></el-table-column>
        <!-- <el-table-column :label="$t('operation.operation')" width="152">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="edit(scope.row)">{{$t('operation.edit')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)">{{$t('operation.del')}}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { auths } from '@/assets/api/auth'
import { authSearch } from '@/assets/js/searchOption'
export default {
  data () {
    return {
      authSearch,
      list: [],
      loading: false
    }
  },
  methods: {
    edit (item) {
      let id = item.id
      this.$router.push({
        name: 'EditAuthManage',
        query: {
          id: id
        }
      })
    },
    add () {
      this.$router.push({
        name: 'AddAuthManage'
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
      auths(Object.assign(sendData, search)).then(res => {
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
