<template>
  <div class="ali-RUS-listing-follow">
    <search-list
      :form="form"
      :key-word-arr="keyWordArr"
      @search="search" />
    <div class="track-cell">
      <el-input v-model="myTrack" placeholder="请输入需要跟踪的商品平台ID" class="l-width-large" size="mini"/>
      <el-button :disabled="trackLoading" type="primary" size="mini" @click.native="add_my_trak">添加到我的Listing关注</el-button>
    </div>
    <data-table
      :track-list="trackList"
      :paginate="paging"
      :table-loading= "tableLoading"
      class="data-table"
      @search="search"
      @router_push_track_goods="router_push_track_goods"
      @router_push_shop_track="router_push_shop_track" />
  </div>
</template>

<style lang="scss">
.ali-RUS-listing-follow {
    .track-cell {
		padding: 10px 0;
	}
}
</style>
<script>
import {
  get_ali_listing_follow_search,
  get_ali_listing_follow_keyword,
  aliexpress_my_focus_goods_id_focus
} from '@/api/ali-listing-follow'
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
        goodsId: 0,
        start_focus_date: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
        end_focus_date: new Date()
      },
      paging: {
        currentPage: 1,
        pageSize: 50,
        count: 0
      },
      myTrack: '',
      trackLoading: false,
      tableLoading: false,
      trackList: [],
      keyWordArr: []
    }
  },
  watch: {
    tabIndex(v) {
      if (v === 1) {
        this.get_keyword_list()
        this.search()
      }
    }
  },
  methods: {
    router_push_shop_track(id) {
      this.$emit('router_push_shop_track', id)
    },
    router_push_track_goods(id) {
      this.$emit('router_push_track_goods', id)
    },
    get_keyword_list() {
      get_ali_listing_follow_keyword().then(res => {
        if (res.status) {
          this.keyWordArr = res.data.map(r => {
            return {
              lable: r.key_word,
              value: r.key_word
            }
          })
        }
      })
    },
    search(isPaging = false) {
      if (!this.form.start_focus_date || !this.form.end_focus_date) {
        this.$message({
          type: 'warning',
          message: '开始和结束时间不能为空'
        })
      }
      this.tableLoading = true
      let requestDate = {
        key_word: this.form.keyword,
        start_focus_time: new Date(this.form.start_focus_date.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString(),
        end_focus_time: new Date(this.form.end_focus_date.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString(),
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
      if (this.id.focusId) {
        requestDate = { key_word: '', start_focus_time: '', end_focus_time: '', pageSize: 50, page: 1, goods_id: this.id.focusId }
      }
      get_ali_listing_follow_search(requestDate).then(res => {
        if (res.status) {
          this.paging.count = res.count
          this.trackList = res.data.map(r => {
            return {
              search_category: r.search_result_category.replace(/\s/g, '').split('>'),
              start_focus_date: new Date(r.start_focus_time).toLocaleString('chinese', { hour12: false }).split(' ')[0].replace(/\//g, '-'),
              start_focus_hour: new Date(r.start_focus_time).toLocaleString('chinese', { hour12: false }).split(' ')[1].replace(/\//g, '-'),
              ...r
            }
          })
        } else {
          this.$message.error(res.message)
        }
        this.id.focusId = 0
        this.tableLoading = false
      })
    },
    add_my_trak() {
      if (!this.myTrack) {
        this.$message.error('请输入需要跟踪的店铺名')
        return
      }
      this.trackLoading = true
      const data = { goods_id: this.myTrack, start_focus_time: new Date() }
      aliexpress_my_focus_goods_id_focus(data).then(res => {
        if (res.status) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.search()
        } else {
          // this.$message.error(res.message)
        }
        this.myTrack = ''
        this.trackLoading = false
      }).catch(() => {
        this.trackLoading = false
        this.$message.error('请求服务器错误')
      })
    }
  }
}
</script>
