<template>
  <div class="ali-RUS-listing-track">
    <search-list
      :form="form"
      :key-word-arr="keyWordArr"
      @search="search"
    />
    <data-table
      :paginate="paging"
      :track-list="trackList"
      :table-loading= "tableLoading"
      class="data-table"
      @search="search"
      @router_push_shop_track="router_push_shop_track"
    />
  </div>
</template>

<style lang="scss">
.ali-RUS-listing-track {
    .data-table {
        margin-top: 20px;
    }
}
</style>

<script>
import { aliexpress_goods_track_search, get_ali_listing_follow_keyword } from '@/api/ali-listing-track'
import { create_options_single_line } from '@/utils/chart'
export default {
  components: {
    searchList: require('./search-list').default,
    dataTable: require('./data-table').default
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    },
    id: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        keyword: '',
        start_track_date: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
        end_track_date: new Date()
      },
      paging: {
        currentPage: 1,
        pageSize: 50,
        count: 0
      },
      keyWordArr: [],
      trackList: [],
      tableLoading: false
    }
  },
  watch: {
    tabIndex(v) {
      if (v === 2) {
        this.get_keyword_list()
        this.search()
      }
    }
  },
  methods: {
    router_push_shop_track(id) {
      this.$emit('router_push_shop_track', id)
    },
    get_keyword_list() {
      get_ali_listing_follow_keyword().then(res => {
        if (res.status) {
          this.keyWordArr = res.data.map(r => {
            return {
              lable: r.user_id,
              value: r.key_word
            }
          })
        }
      })
    },
    search(isPaging = false) {
      if (!this.form.start_track_date || !this.form.end_track_date) {
        this.$message({
          type: 'warning',
          message: '开始和结束时间不能为空'
        })
      }
      this.tableLoading = true
      let requestDate = {
        key_word: this.form.keyword,
        start_track_time: new Date(this.form.start_track_date.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString(),
        end_track_time: new Date(this.form.end_track_date.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString(),
        pageSize: this.paging.pageSize
      }
      if (isPaging) {
        requestDate = {
          page: this.paging.currentPage,
          ...requestDate
        }
      } else {
        this.trackList =[]
        this.paging.currentPage = 1
        requestDate = {
          page: 1,
          ...requestDate
        }
      }
      if (this.id.trackId) {
        requestDate = { key_word: '', start_focus_time: '', end_focus_time: '', pageSize: 50, page: 1, goods_id: this.id.trackId }
      }
      aliexpress_goods_track_search(requestDate).then(res => {
        if (res.status) {
          this.paging.count = res.count
          this.trackList = res.data.map(r => {
            return {
              search_category: r.search_result_category.replace(/\s/g, '').split('>'),
              start_focus_date: new Date(r.start_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[0].replace(/\//g, '-'),
              start_focus_hour: new Date(r.start_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[1].replace(/\//g, '-'),
              recently_track_date: new Date(r.recently_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[0].replace(/\//g, '-'),
              recently_track_hour: new Date(r.recently_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[1].replace(/\//g, '-'),
              $goods_sales: {
                value: r.goods_sales[r.goods_sales.length - 1].goods_sales,
                options: create_options_single_line('近6个月销量',
                  this.init_charst_params(r.goods_sales, 'created_time', true),
                  this.init_charst_params(r.goods_sales, 'goods_sales')
                ),
                id: `1${Date.now()}`
              },
              $review_value: {
                value: r.review[r.review.length - 1].review,
                options: create_options_single_line('评论',
                  this.init_charst_params(r.review, 'created_time', true),
                  this.init_charst_params(r.review, 'review')
                ),
                id: `2${Date.now()}`
              },
              $difference_value: {
                value: r.difference_value[r.difference_value.length - 1].difference_value,
                options: create_options_single_line('近6个月销量',
                  this.init_charst_params(r.difference_value, 'created_time', true),
                  this.init_charst_params(r.difference_value, 'difference_value')
                ),
                id: `3${Date.now()}`
              },
              ...r
            }
          })
        } else {
          this.$message.error(res.message)
        }
        this.tableLoading = false
        this.id.trackId = 0
      })
    },
    init_charst_params(list, name, isDate = false) {
      const data = []
      list.map(row => {
        if (isDate) {
          return data.push(new Date(row[name]).toLocaleString().split(' ')[0])
        } else {
          return data.push(row[name])
        }
      })
      return data
    }
  }
}
</script>
