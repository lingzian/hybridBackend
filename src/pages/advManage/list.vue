<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="advSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <div class="line_height_medium margin_bottom_10 cl">
        <el-button type="primary" class="float_right" @click="add" size="medium">{{$t('operation.add')}}</el-button>
      </div>

      <el-table :data="list" border stripe v-loading.box="loading">
        <el-table-column prop="type_name" :label="$t('data.adType')"></el-table-column>
        <el-table-column prop="name" :label="$t('data.adName')"></el-table-column>
        <el-table-column :label="$t('data.thumb')" width="120">
          <template slot-scope="scope">
            <images :thumb="scope.row.image"></images>
          </template>
        </el-table-column>
        <el-table-column prop="action" :label="$t('data.operationType')" :formatter="tableFilter.formatAction"></el-table-column>
        <el-table-column :label="$t('data.operationTarget')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.url}">{{scope.row.url | formatDataNull}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('status.status')" :formatter="tableFilter.formatActive"></el-table-column>
        <el-table-column :label="$t('data.showTime')">
          <template slot-scope="scope">
            <div>
              <span class="text_light_blue">{{ $t('data.onlineTime') }}：</span>
              <span :class="{text_gray: !scope.row.start_time || scope.row.start_time === '0'}">{{scope.row.start_time | formatTime}}</span>
            </div>
            <div>
              <span class="text_light_blue">{{ $t('data.offlineTime') }}：</span>
              <span :class="{text_gray: !scope.row.end_time || scope.row.end_time === '0'}">{{scope.row.end_time | formatTime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('data.operationTime')">
          <template slot-scope="scope">
            <div>
              <span class="text_light_blue">{{ $t('data.createTime') }}：</span>
              <span :class="{text_gray: !scope.row.create_time || scope.row.create_time === '0'}">{{scope.row.create_time | formatTime}}</span>
            </div>
            <div>
              <span class="text_light_blue">{{ $t('data.updateTime') }}：</span>
              <span :class="{text_gray: !scope.row.update_time || scope.row.update_time === '0'}">{{scope.row.update_time | formatTime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation.operation')" width="152">
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
        </el-table-column>
      </el-table>

      <pagination ref="pagination" @changePage="requestList"></pagination>

    </div>

  </div>
</template>
<script>
import { advertistings, delAdvertisting } from '@/assets/api/advertisting'
import { messageTips, deleteConfirm } from '@/assets/js/utils'
import { advSearch } from '@/assets/js/searchOption'

export default {
  data () {
    return {
      advSearch,
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
      advertistings(Object.assign(sendData, search)).then(res => {
        let data = res.data
        this.list = res.data.items
        pagination.totalCount = parseInt(data.total_amount)
      }).finally(() => {
        this.loading = false
      })
    },
    add () {
      this.$router.push({
        name: 'AddAdManage'
      })
    },
    edit (val) {
      this.$router.push({
        name: 'EditAdManage',
        query: {
          id: val.id
        }
      })
    },
    del (item) {
      deleteConfirm().then(() => {
        let id = item.id
        delAdvertisting(id).then(res => {
          messageTips(this.$t('tips.deleteSuccess'))
          this.requestList()
        })
      })
    }
  }
}
</script>
