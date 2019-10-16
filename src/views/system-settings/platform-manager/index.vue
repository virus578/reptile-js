<template>
  <div class="platform-manager">
    <search-list :search="search" @search_data="search_data" />
    <table-data :form="form" :table-data="tableData" @mdf_info="mdf_info" />
    <!-- <el-button @click="test">测试</el-button>
        <iframe src="https://www.aliexpress.com/" frameborder="0"></iframe> -->
    <!-- <iframe src="https://www.baidu.com/" frameborder="0"></iframe> -->
  </div>
</template>

<style>
.platform-manager {
    padding: 10px;
}
</style>

<script>
import {
  platform_manage_search,
  platform_manage_addAccount
} from '@/api/platform-manager'
export default {
  components: {
    searchList: require('./search-list').default,
    tableData: require('./table-data').default
  },
  props: {
  },
  data() {
    return {
      search: {
        plateform: 'aliexpress',
        key: '',
        username: ''
      },
      form: {
        plateform: 'aliexpress',
        key: '',
        username: '',
        password: '',
        expire_time: 0,
        title: '编辑',
        loading: false
      },
      tableData: []
    }
  },
  mounted() {
    this.search_data()
  },
  methods: {
    search_data() {
      const params = {
        ...this.search
      }
      platform_manage_search(params).then(res => {
        if (res.status) {
          this.tableData = res.data.map(r => {
            return {
              operation_value: '删除',
              ...r
            }
          })
        }
      })
    },
    mdf_info() {
      if (this.form.title === '添加') {
        this.form.loading = true
        const data = {
          platform: this.form.plateform,
          key: this.form.key,
          username: this.form.username,
          password: this.form.password,
          expire_time: this.form.expire_time
        }
        platform_manage_addAccount(data).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.search_data()
          } else {
            this.$message.error(res.message)
          }
          this.form.loading = false
        }).catch(() => {
          this.$message.error('请求服务器失败')
          this.form.loading = false
        })
      }
    }
  }
}
</script>
