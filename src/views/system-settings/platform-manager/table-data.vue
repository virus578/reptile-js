<template>
  <div class="">
    <el-button
      v-loading="form.loading"
      size="mini"
      type="primary"
      element-loading-text="拼命加载中"
      @click="dialogFormVisible = true,init()"
    >
      添加
    </el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="platform"
        label="平台"
        width="180"/>
      <el-table-column
        prop="gkey"
        label="key"
        width="180"/>
      <el-table-column
        prop="username"
        label="账号"/>
      <el-table-column
        prop="password"
        label="密码"/>
      <el-table-column
        label="是否更新cookie">
        <template slot-scope="scope">
          <span> {{ scope.row.expire_time ? '已过期': '未过期' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <span v-if="scope"/>
          <el-dropdown
            split-button
            type="primary"
            size="mini"
            @command="handleCommand($event,scope)"
            @click="operation(scope)">
            {{ scope.row.operation_value }}
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item divided command="编辑">编辑</el-dropdown-item> -->
              <el-dropdown-item divided command="删除" size="small">删除</el-dropdown-item>
              <el-dropdown-item
                :disabled="!scope.row.expire_time"
                divided
                command="验证"
                size="small"
              >
                验证
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <platformInfo :form="form" v-model="dialogFormVisible" @mdf_info="$emit('mdf_info')" />
  </div>
</template>

<style>

</style>

<script>
import {
  platform_manage_delete,
  platform_manage_update_account_cookie
} from '@/api/platform-manager'
export default {
  components: {
    platformInfo: require('./platform-info').default
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      tem: ''
    }
  },
  methods: {
    handleCommand(command, scope) {
      this.$set(this.tableData[scope.$index], 'operation_value', command)
    },
    operation(scope) {
      switch (scope.row.operation_value) {
        case '编辑':
          break
        case '删除':
          this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            platform_manage_delete({ username: scope.row.username }).then(res => {
              if (res.status) {
                this.tableData.splice(scope.$index, 1)
                this.$message.error(res.message)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
        case '验证':
          platform_manage_update_account_cookie({ username: scope.row.name, password: scope.row.password })
            .then(res => {
              if (res.status) {
                this.tableData.splice(scope.$index, 1)
                this.$message.error(res.message)
              }
            })
          break
      }
    },
    init() {
      this.form.username = ''
      this.form.password = ''
      this.expire_time = 0
      this.form.title = '添加'
    }
  }
}
</script>
