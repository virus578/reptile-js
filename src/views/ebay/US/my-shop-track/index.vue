<template>
  <div class="p-my-shop">
    <search-list :form="form" :store-name-list="storeNameList" @search="search" />
    <div class="track-cell">
      <el-input v-model="myTrack" placeholder="请输入需要跟踪的店铺名" class="l-width-large" size="mini"/>
      <el-button :disabled="trackLoading" type="primary" size="mini" @click.native="add_my_trak">添加到我的店铺跟踪</el-button>
    </div>
    <data-table :track-list="trackList" :paginate="paginate" :table-loading="tableLoading" @search="search" />
  </div>
</template>

<style lang="scss">
.p-my-shop {
	.track-cell {
		padding: 10px 0;
	}
}
</style>

<script>
import { ebay_us_store_name, ebay_us_store_track_search, ebay_us_store_name_track } from '@/api/ebay-my-store'
import { create_options_single_line } from '@/utils/chart'
export default {
  components: {
    searchList: require('./search-list').default,
    dataTable: require('./data-table').default
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        store_name: '',
        goods_item: ''
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
    index(val) {
      if (val === 2) {
        this.get_store_name()
        this.search()
      }
    }
  },
  methods: {
    search(val = false) {
      this.tableLoading = true
      let tem
      if (this.form.goods_item.length) {
        tem = this.form.goods_item.replace(/\s/g, '\n').split('\n')
      } else {
        tem = []
      }
      let data
      if (val) {
        data = { pageSize: this.paginate.pageSize, page: this.paginate.page, store_name: this.form.store_name, goods_item: tem }
      } else {
        data = { pageSize: this.paginate.pageSize, page: 1, store_name: this.form.store_name, goods_item: tem }
      }
      ebay_us_store_track_search(data).then(res => {
        this.paginate.count = res.count
        if (res.status) {
          this.tableLoading = false
          this.trackList = res.data
          this.trackList = this.format_list(this.trackList)
        }
      }).catch(() => {
        this.$message.error('请求服务器错误')
      })
    },
    format_list(list) {
      list = list.map((item, index) => {
        item.feedback = {
          title: item.feedback[item.feedback.length - 1].feedback,
          options: create_options_single_line('feedback总量', this.format_charst_params(item.feedback, 'updated_time'),
            this.format_charst_params(item.feedback, 'feedback')),
          id: `id6${index}`
        }
        item.follower = {
          title: item.follower[item.follower.length - 1].follower,
          options: create_options_single_line('收藏量', this.format_charst_params(item.follower, 'updated_time'),
            this.format_charst_params(item.follower, 'follower')),
          id: `id7${index}`
        }
        item.view = {
          title: item.view[item.view.length - 1].view,
          options: create_options_single_line('浏览量', this.format_charst_params(item.view, 'updated_time'),
            this.format_charst_params(item.view, 'view')),
          id: `id8${index}`
        }
        item.new_goods_lists = {
          today_new_goods_title: item.new_goods_lists.today_new_goods_number ? item.new_goods_lists.today_new_goods_title : ''
        }
        return {
          recently_track_date: item.recently_track_time.split(' ')[0],
          recently_track_hour: item.recently_track_time.split(' ')[1],
          start_track_date: item.start_track_time.split(' ')[0],
          start_track_hour: item.start_track_time.split(' ')[1],
          ...item
        }
      })
      return list
    },
    format_charst_params(list, name) {
      const arr = []
      list.forEach(item => {
        arr.push(item[name])
      })
      return arr
    },
    add_my_trak() {
      if (!this.myTrack) {
        this.$message.error('请输入需要跟踪的店铺名')
        return
      }
      this.trackLoading = true
      const data = { stroe_name: this.myTrack }
      ebay_us_store_name_track(data).then(res => {
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
      }).catch(() => {
        this.$message.error('请求服务器错误')
      })
    },
    get_store_name() {
      ebay_us_store_name().then(res => {
        if (res.status) {
          this.storeNameList = res.data
        } else {
          // this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('请求服务器错误')
      })
    },
    create_options_single_line(title, xAxis, series, yAxis = []) {
      series = series.map(item => {
        return Number(item)
      })
      return {
        title: {
          text: title
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value',
          data: yAxis
        },
        series: [{
          data: series,
          type: 'line',
          itemStyle: { normal: { label: { show: true }}}
        }]
      }
    },
    create_options_stack_line(title, xAxis, series, legend) {
      series = series.map((item, index) => {
        return {
          name: legend[index],
          type: 'line',
          data: item
        }
      })
      return {
        title: {
          text: title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series
      }
    },

    /**
         *
         * @param {*} name 初始化的数组 每一项的键 是否是排名 是否是日期 是否是价格
         * @return { Array } 返回e-charst需要的格式
         */
    init_charst_params(list, name, isDate = false, isPrice = false) {
      const data = []
      list.map(row => {
        if (isPrice) {
          row = row[name].replace(/\$/, '').trim()
          return data.push(Number(row))
        }
        if (isDate) {
          return data.push(new Date(row[name]).toLocaleString('chinese', { hour12: false }))
        } else {
          return data.push(Number(row[name]))
        }
      })
      return data
    },
    init_track_list(list) {
      list = list.map((item, index) => {
        item.grade = {
          title: item.grade[item.grade.length - 1].grade,
          options: this.create_options_single_line('评分', this.init_charst_params(item.grade, 'updated_time', true),
            this.init_charst_params(item.grade, 'grade'), [1, 2, 3, 4, 5]),
          id: `id1${index}`
        }
        item.review_number = {
          title: item.review_number[item.review_number.length - 1].review_number,
          options: this.create_options_single_line('review', this.init_charst_params(item.review_number, 'updated_time', true),
            this.init_charst_params(item.review_number, 'review_number'), [500, 1000]),
          id: `id2${index}`
        }
        item.seller_number = {
          title: item.seller_number[item.seller_number.length - 1].seller_number,
          options: this.create_options_single_line('卖家数量', this.init_charst_params(item.seller_number, 'updated_time', true),
            this.init_charst_params(item.seller_number, 'seller_number'), [500, 1000]),
          id: `id3${index}`
        }
        item.main_bsr = {
          title: item.main_bsr[item.main_bsr.length - 1].main_bsr,
          options: this.create_options_single_line('BSR主排名', this.init_charst_params(item.main_bsr, 'updated_time', true),
            this.init_charst_params(item.main_bsr, 'ranking'), [500, 1000]),
          id: `id4${index}`
        }
        item.other_bsr = item.other_bsr.map((r, i) => {
          return {
            title: r[r.length - 1].other_bsr,
            options: this.create_options_single_line('BSR副排名', this.init_charst_params(r, 'updated_time', true),
              this.init_charst_params(r, 'ranking'), [500, 1000]),
            id: `id5${i}`
          }
        })
        return {
          price: {
            max_price: item.max_price[item.max_price.length - 1].max_price,
            min_price: item.min_price[item.min_price.length - 1].min_price,
            options: this.create_options_stack_line('最小价格-最大价格', this.init_charst_params(item.max_price, 'updated_time', true),
              [this.init_charst_params(item.max_price, 'max_price', false, true), this.init_charst_params(item.min_price, 'min_price', false, true)],
              ['最小价格', '最大价格']),
            id: `id6${index}`
          },
          ...item
        }
      })
      return list
    }
  }
}
</script>
