<template>
  <el-table
    class="no_hover"
    :data="auths"
    :span-method="authsTableMerge"
    v-loading.box="loading"
    border>

    <el-table-column :label="$t('menu.level_one')" width="150">
      <template slot-scope="scope">
        <div v-if="scope.row.level === 1">
          <el-checkbox v-if="checkbox" v-model="scope.row.isSelect" @change="checkBoxChange(scope.row)">{{scope.row.description}}</el-checkbox>
          <span v-else>{{scope.row.description}}</span>
        </div>
        <div v-else-if="scope.row.parant">
          <el-checkbox v-if="checkbox" v-model="scope.row.parant.isSelect" @change="checkBoxChange(scope.row.parant)">{{scope.row.parant.description}}</el-checkbox>
          <span v-else>{{scope.row.parant.description}}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('menu.level_two')">
      <template slot-scope="scope">
        <div v-if="scope.row.level === 2">
          <el-checkbox v-if="checkbox" v-model="scope.row.isSelect" @change="checkBoxChange(scope.row)">{{scope.row.description}}</el-checkbox>
          <span v-else>{{scope.row.description}}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('menu.level_three')">
      <template v-if="scope.row.level === 2 && scope.row.items" slot-scope="scope">
        <div class="inline_block margin_right_20" v-for="(item,index) in scope.row.items" :key="index">
          <el-checkbox v-if="checkbox" v-model="item.isSelect" @change="checkBoxChange(item)">{{item.description}}</el-checkbox>
          <span v-else>{{item.description}}</span>
        </div>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { getAuths } from '@/assets/api/auth'
import { roleAuthsSort, authsTableMerge, roleAuthsCheckBoxSelect, roleAuthsFormatId } from '@/assets/js/logic'
import { cloneObject } from '@/assets/js/utils'

export default {
  props: {
    roleId: null,
    checkbox: {
      type: Boolean,
      default: true
    },
    role: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      id: this.roleId,
      authsTableMerge, // 权限表格合并规则
      auths: [], // 权限列表
      roles: this.role, // 角色限权
      originAuths: [], // 原权限列表数据
      loading: false
    }
  },
  created () {
    if (!this.id) {
      this.getAuths()
    }
  },
  watch: {
    role (val) {
      // 获取角色权限
      this.getRoles(val)
    }
  },
  methods: {
    // 选框改变值
    checkBoxChange (data) {
      roleAuthsCheckBoxSelect(data, this.auths)
    },
    // 获取权限列表
    getAuths () {
      this.loading = true
      getAuths({
        account_type: this.account_type
      }).then(res => {
        this.originAuths = cloneObject(res.data.items)

        this.auths = roleAuthsSort(res.data.items)
      }).finally(() => {
        this.loading = false
      })
    },
    getRoles (val) {
      this.loading = true
      getAuths({
        account_type: this.account_type
      }).then(res => {
        this.originAuths = cloneObject(res.data.items)

        this.auths = roleAuthsSort(res.data.items, val)
      }).finally(() => {
        this.loading = false
      })
    },
    // 获取结果
    getResult () {
      return roleAuthsFormatId(this.auths)
    }
  }
}
</script>
