<template>
  <div class="amazon-keywords-search">
    <search-list
      v-loading="showSearch"
      :form="form"
      :list="list"
      :table-loading="tableLoading"
      @get_table_data="get_table_data" />
    <div v-loading="tableLoading" class="amazon-table-cell" element-loading-text="拼命加载中">
      <data-table
        :content="tables"
        :table-loading="tableLoading"
        @router_push="router_push"
        @pagination_arr="pagination_arr" />
    </div>
    <pagination
      v-if="content.tables.length > 1"
      :length="content.tables.length"
      :scoll-top-arr="scollTopArr"
      :current-scroll-top="currentScrollTop" />
    <back-top />
  </div>
</template>

<style lang="scss" scope>
.amazon-keywords-search {
    .amazon-table-cell {
        // .el-loading-spinner {
        //     top: 80px !important;
        // }
        min-height: calc(100vh - 800px);
    }
}
</style>

<script>

import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  components: {
    searchList: require('./search-list.vue').default,
    dataTable: require('./data-table').default,
    backTop: require('@/components/back-top').default,
    pagination: require('@/components/pagination').default
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    trackArr: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scollTopArr: [],
      currentScrollTop: 0,
      loading: true,
      content: {
        keyword: '',
        classify: '',
        category: '',
        pageSize: 0,
        tables: [
          {
            searchNum: '',
            table: []
          }
        ]

      },
      isShowTable: false
    }
  },
  computed: {
    ...mapState({
      tables: state => state.amzon_us.tables,
      isShow: state => state.amzon_us.isShow,
      tableLoading: state => state.amzon_us.tableLoading,
      form: state => state.amzon_us.form
    })
  },
  watch: {
    // 监听index为0时 把asin跟踪颜色不请求后端更新
    index(val) {
      if (val === 0) {
        this.trackArr.colorArr.map((a, b) => {
          this.content.tables.map((item, index) => {
            item.table.map((r, i) => {
              if (a.asin === r.asin) {
                this.$set(this.content.tables[index].table[i], 'is_track_goods', 1)
              }
            })
          })
        })
      }
    }
  },
  methods: {
    ...mapMutations({
      set_amazon_us_is_show: 'set_amazon_us_is_show',
      set_amazon_us_table_loading: 'set_amazon_us_table_loading'
    }),
    ...mapActions({
      get_amazon_us_table: 'get_amazon_us_table'
    }),
    // 清空数组
    clear_table(list) {
      if (list.length > 1) {
        for (let i = 1; i < list.length;) {
          list.pop(list.length - 1)
        }
        this.$set(list[0], 'iscurrentpage', false)
      }
    },
    // 获取table
    get_table_data() {
      if (!this.form.type.length) {
        this.$message.error('关键字不能为空')
        return
      }
      if (!isNaN(this.form.type)) {
        this.$message.error('关键字不能为纯数字')
        return
      }
      this.set_amazon_us_table_loading(true)
      // this.isShowTable = true
      // this.tableLoading = true
      this.tables.pageSize = 0
      const data = { pageSize: this.content.pageSize }
      Object.assign(data, this.form)
      this.clear_table(this.content.tables)
      // 纯函数
      this.get_amazon_us_table({ data, list: this.list })
      // amazon_us_goods(data).then(res => {
      //     this.isShow = true
      // 	this.tableLoading = false
      // 	if (!res.status) {
      //         this.$message.error(res.message)
      // 	} else {
      //         // 请求回来的table转换数据格式
      // 		this.content.keyword = res.searchContent
      //         this.content.category = res.category
      //         this.list.map((item,index) => {
      //             if(item.value === res.category) {
      //                 this.content.classify =  item.label
      //                 return
      //             }
      //         })
      //         this.content.is_last_page = res.is_last_page
      //         this.content.tables[0].searchNum = res.pageTtile
      //         this.content.tables[0].table = res.data
      //        if(this.content.tables[0].table.length) {
      //             this.content.tables[0].tableShow = true
      //        }
      // 	}
      // }).catch((err) => {
      //     this.tableLoading = false
      //     this.$message.error('请求服务器错误')
      // })
    },
    router_push(val) {
      this.$emit('router_push', val)
    },
    pagination_arr(arr) {
      this.scollTopArr = arr
    }
  }
}
</script>
