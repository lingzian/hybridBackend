<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="workplaceSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <div class="line_height_medium padding_bottom_10 cl">
        <el-button type="primary" class="float_right" @click="add" size="medium">{{$t('menu.Add')}}</el-button>
      </div>
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

        <el-table-column :label="$t('operation.operation')" width="152">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="edit(scope.row)">{{ $t('operation.edit') }}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)">{{ $t('operation.del') }}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { messageTips, deleteConfirm } from '@/assets/js/utils'
import { workplaces, delWorkplace } from '@/assets/api/workplace'
import { workplaceSearch } from '@/assets/js/searchOption'
export default {
  data () {
    return {
      workplaceSearch,
      list: [],
      loading: false
    }
  },
  methods: {
    add () {
      this.$router.push({
        name: 'AddWorkplace'
      })
    },
    edit (data) {
      this.$router.push({
        name: 'EditWorkplace',
        query: {
          id: data.id
        }
      })
    },
    del (item) {
      deleteConfirm().then(() => {
        let id = item.id
        delWorkplace(id).then(res => {
          messageTips(this.$t('tips.deleteSuccess'))
          this.requestList()
        })
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
      workplaces(Object.assign(sendData, search)).then(res => {
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
