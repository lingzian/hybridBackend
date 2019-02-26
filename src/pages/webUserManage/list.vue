<template>
  <div>
    <bread-crumb></bread-crumb>
    <common-search :options="webUserSearch" @search="requestList" :loading="loading"></common-search>
    <div>
      <!-- <div class="line_height_medium padding_bottom_10 cl">
        <el-button type="primary" class="float_right" @click="add" size="medium">{{$t('menu.Add')}}</el-button>
      </div> -->
      <el-table :data="list" border stripe v-loading.box="loading">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="padding_top_15 padding_bottom_15">
              <span>
                <span class="text_light_blue">{{$t('data.phone')}} :</span>
                <span class="padding_left_8" :class="{text_gray:!scope.row.tel}">{{scope.row.tel | formatDataNull}}</span>
              </span>
              <span class="padding_left_30">
                <span class="text_light_blue">{{$t('data.email')}} :</span>
                <span class="padding_left_8" :class="{text_gray:!scope.row.email}">{{scope.row.email | formatDataNull}}</span>
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.userName')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.username}">{{scope.row.username | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.number')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.no}">{{scope.row.no | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="type" :label="$t('data.type')" :formatter="tableFilter.formatType"></el-table-column>

        <el-table-column :label="$t('data.names')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.first_name}">{{scope.row.first_name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('data.surnames')">
          <template slot-scope="scope">
            <div :class="{text_gray:!scope.row.last_name}">{{scope.row.last_name | formatDataNull}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="status" :label="$t('data.status')" :formatter="tableFilter.formatStatus"></el-table-column>

        <el-table-column prop="create_time" :label="$t('data.createTime')" :formatter="tableFilter.formatTime"></el-table-column>
        <el-table-column prop="update_time" :label="$t('data.updateTime')" :formatter="tableFilter.formatTime"></el-table-column>

        <el-table-column :label="$t('operation.operation')" width="90">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="edit(scope.row)">{{ $t('data.detail') }}</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)">{{ $t('operation.del') }}</el-button> -->
          </template>
        </el-table-column>

      </el-table>
      <pagination ref="pagination" @changePage="requestList"></pagination>
    </div>
  </div>
</template>

<script>
import { webUserSearch } from '@/assets/js/searchOption'
// import { messageTips, deleteConfirm } from '@/assets/js/utils'
import { webUsers } from '@/assets/api/web'
export default {
  data () {
    return {
      webUserSearch,
      list: [],
      loading: false
    }
  },
  methods: {
    add () {
      // this.$router.push({
      //   name: 'AddWebUserManage'
      // })
    },
    edit (data) {
      this.$router.push({
        name: 'EditWebUserManage',
        query: {
          id: data.id
        }
      })
    },
    del (item) {
      // deleteConfirm().then(() => {
      //   let id = item.id
      //   delCompany(id).then(res => {
      //     messageTips(this.$t('tips.deleteSuccess'))
      //     this.requestList()
      //   })
      // })
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
      webUsers(Object.assign(sendData, search)).then(res => {
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
