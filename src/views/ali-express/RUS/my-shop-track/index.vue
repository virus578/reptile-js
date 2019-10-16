<template>
  <div class="my-shop-track">
    <search-list
      :form="form"
      :store-name-list="storeNameList"
      @search="search" />
    <!-- <div class="track-cell">
			<el-input v-model="myTrack" placeholder="请输入需要跟踪的店铺名" class="l-width-large" size="mini"></el-input>
			<el-button type="primary" size="mini" @click.native="add_my_trak" :disabled="trackLoading">添加到我的店铺跟踪</el-button>
		</div> -->
    <data-table
      :track-list="trackList"
      :paginate="paginate"
      :table-loading="tableLoading"
      class="table-data"
      @search="search" />
  </div>
</template>

<style lang="scss">
.my-shop-track {
	.track-cell {
		padding: 10px 0;
	}
    .table-data {
        margin-top: 15px;
    }
}
</style>

<script>
import {
  aliexpress_get_user_store_name_lists,
  aliexpress_store_id_track,
  aliexpress_store_track_search
} from '@/api/ali-shop-track'
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
        store_name: '',
        store_id: ''
      },
      myTrack: '',
      paginate: {
        page: 1,
        pageSize: 50,
        count: 0,
        currentPage: 1
      },
      tableLoading: false,
      storeNameList: [],
      trackList: [],
      trackLoading: false
    }
  },
  watch: {
    tabIndex(val) {
      if (val === 3) {
        this.get_shop_name()
        this.search()
      }
    }
  },
  methods: {
    search(val = false) {
      this.tableLoading = true
      let tem
      if (this.form.store_id.length) {
        tem = this.form.store_id.replace(/\s/g, '\n').split('\n')
      } else {
        tem = []
      }
      let data
      if (val) {
        data = { pageSize: this.paginate.pageSize, page: this.paginate.page, store_name: this.form.store_name, store_id: tem }
      } else {
        data = { pageSize: this.paginate.pageSize, page: 1, store_name: this.form.store_name, store_id: tem }
      }
      if (this.id.storeId) {
        const searchTem = []
        searchTem.push(this.id.storeId)
        data = { pageSize: this.paginate.pageSize, page: 1, store_name: this.form.store_name, store_id: searchTem }
      }
      aliexpress_store_track_search(data).then(res => {
        this.paginate.count = res.count
        if (res.status) {
          this.tableLoading = false
          this.trackList = res.data.map(r => {
            return {
              // search_category: r.search_result_category.replace(/\s/g,'').split('>'),
              start_focus_date: new Date(r.start_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[0].replace(/\//g, '-'),
              start_focus_hour: new Date(r.start_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[1].replace(/\//g, '-'),
              recently_track_date: new Date(r.recently_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[0].replace(/\//g, '-'),
              recently_track_hour: new Date(r.recently_track_time).toLocaleString('chinese', { hour12: false }).split(' ')[1].replace(/\//g, '-'),
              ...r
            }
          })
        }
      })
      // .catch((err) => {
      //     this.$message.error('请求服务器错误')
      //     this.tableLoading = false
      // })
      this.id.storeId = 0
    },
    add_my_trak() {
      if (!this.myTrack) {
        this.$message.error('请输入需要跟踪的店铺名')
        return
      }
      this.trackLoading = true
      const data = { store_id: this.myTrack }
      aliexpress_store_id_track(data).then(res => {
        if (res.status) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.search()
        } else {
          this.$message.error(res.message)
        }
        this.myTrack = ''
        this.trackLoading = false
      }).catch(_ => {
        this.$message.error('请求服务器错误')
      })
    },
    get_shop_name() {
      aliexpress_get_user_store_name_lists().then(res => {
        // if(res.status) {
        this.storeNameList = res.map(r => {
          return {
            lable: r.store_name,
            value: r.store_name
          }
        })
        // } else {
        // }
      })
      // .catch((err) => {
      //     this.$message.error('请求服务器错误')
      // })
    }
  }
}
</script>
