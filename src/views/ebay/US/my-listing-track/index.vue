<template>
  <div class="p-my-listing">
    <search-list :form="form" :key-word-list="keyWordList" @search="search" />
    <div class="track-cell">
      <el-input v-model="myTrack" size="mini" placeholder="请输入需要跟踪的listing" class="l-width-large"/>
      <el-button :disabled="trackLoading" type="primary" size="mini" @click.native="add_my_trak">添加到我的Listing跟踪</el-button>
    </div>
    <data-table v-model="colorArr" :track-list="trackList" :paginate="paginate" :table-loading="tableLoading" @search="search" @router_push_shop="router_push_shop" />
  </div>
</template>

<style lang="scss">
.p-my-listing {
	.track-cell {
		padding: 10px 0;
	}
}
</style>

<script>
import { ebay_us_user_key_word,
  ebay_us_goods_item_track,
  ebay_us_user_goods_track_details
} from '@/api/ebay-my-listing.js'
import { create_options_stack_line, create_options_single_line } from '@/utils/chart'
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
        key_word: '',
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
      keyWordList: [],
      trackList: [],
      colorArr: [],
      trackLoading: false
    }
  },
  watch: {
    index(val) {
      if (val === 1) {
        this.get_key_word()
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
        data = { pageSize: this.paginate.pageSize, page: this.paginate.page, key_word: this.form.key_word, goods_item: tem }
      } else {
        data = { pageSize: this.paginate.pageSize, page: 1, key_word: this.form.key_word, goods_item: tem }
      }
      ebay_us_user_goods_track_details(data).then(res => {
        if (res.status) {
          this.tableLoading = false
          this.trackList = res.data
          this.paginate.count = res.count
          this.trackList = this.format_list(this.trackList)
          this.trackList.forEach((item, index) => {
            if (item.is_store_track) {
              this.colorArr.push(index)
              this.$set(this.trackList[index], 'clickIndex', index)
            }
          })
        } else if (!res.status) {
          this.$message.error(res.message)
        }
      })
      // .catch(() => {
      //   this.$message.error('请求服务器错误')
      // })
    },
    router_push_shop() {
      this.$emit('router_push_shop')
    },
    // 格式化list
    format_list(list) {
      return list.map((item, index) => {
        item.start_track_time = item.start_track_time.split(' ')
        item.recently_track_time = item.recently_track_time.split(' ')
        console.log(item.start_track_time, item.recently_track_time)
        item.goods_category = item.goods_category.split('>')
        item.publish_date = item.publish_date === 'Invalid Date' ? '' : item.publish_date
        item.price = item.price.length ? {
          max_price: item.price[item.price.length - 1].goods_max_price ? `${item.price[0].price_currency} ${item.price[item.price.length - 1].goods_max_price}` : '',
          min_price: `${item.price[0].price_currency} ${item.price[item.price.length - 1].goods_min_price}`,
          options: create_options_stack_line('最小价格-最大价格',
            this.init_charst_params(item.price, 'updated_time', true),
            [this.init_charst_params(item.price, 'goods_max_price'),
              this.init_charst_params(item.price, 'goods_min_price')],
            ['最小价格', '最大价格']),
          id: `id9${index}`
        } : { max_price: '', options: false }
        item.marketing.large_message = item.marketing.large_message ? {
          hint_date: item.marketing.hint_date,
          price_number: `${item.marketing.price_currency} ${item.marketing.large_message.price_data[0].data}`,
          sale_number: item.marketing.large_message.sale_data[0].data,
          // sale_number: item.marketing.large_message.sale_number,
          // 销售额options
          priceOptions: create_options_single_line('近30天销售额',
            this.init_charst_params(item.marketing.large_message.price_data, 'date'),
            this.init_charst_params(item.marketing.large_message.price_data, 'data')),
          // 销售额变体options
          priceVariantOptions: create_options_stack_line('',
            this.init_variant(item.marketing.large_message.price_variant_data, false, true),
            this.init_variant(item.marketing.large_message.price_variant_data),
            this.init_variant(item.marketing.large_message.price_variant_data, true)),
          // 销量options
          numberOptions: create_options_single_line('近30天销售量',
            this.init_charst_params(item.marketing.large_message.sale_data, 'date'),
            this.init_charst_params(item.marketing.large_message.sale_data, 'data')),
          // 销量变体options
          numberVariantOptions: create_options_stack_line('',
            this.init_variant(item.marketing.large_message.sale_variant_data, false, true),
            this.init_variant(item.marketing.large_message.sale_variant_data),
            this.init_variant(item.marketing.large_message.sale_variant_data, true)),
          id: `id10${index}`,
          id1: `id31${index}`
        } : { max_price: '', options: false }
        item.marketing.middle_message = item.marketing.middle_message ? {
          hint_date: item.marketing.hint_date,
          price_number: `${item.marketing.price_currency} ${item.marketing.middle_message.price_data[0].data}`,
          sale_number: item.marketing.middle_message.sale_data[0].data,
          // 销售额options
          priceOptions: create_options_single_line('近15天销售额',
            this.init_charst_params(item.marketing.middle_message.price_data, 'date'),
            this.init_charst_params(item.marketing.middle_message.price_data, 'data')),
          // 销售额变体options
          priceVariantOptions: create_options_stack_line('',
            this.init_variant(item.marketing.middle_message.price_variant_data, false, true),
            this.init_variant(item.marketing.middle_message.price_variant_data),
            this.init_variant(item.marketing.middle_message.price_variant_data, true)),
          // 销量options
          numberOptions: create_options_single_line('近15天销量',
            this.init_charst_params(item.marketing.middle_message.sale_data, 'date'),
            this.init_charst_params(item.marketing.middle_message.sale_data, 'data')),
          // 销量变体options
          numberVariantOptions: create_options_stack_line('',
            this.init_variant(item.marketing.middle_message.sale_variant_data, false, true),
            this.init_variant(item.marketing.middle_message.sale_variant_data),
            this.init_variant(item.marketing.middle_message.sale_variant_data, true)),
          id: `id11${index}`,
          id1: `id41${index}`
        } : { max_price: '', options: false }

        item.marketing.small_message = item.marketing.small_message ? {
          hint_date: item.marketing.hint_date,
          price_number: `${item.marketing.price_currency} ${item.marketing.small_message.price_data[0].data}`,
          sale_number: item.marketing.small_message.sale_data[0].data,
          // 销售额options
          priceOptions: create_options_single_line('近7天销售额',
            this.init_charst_params(item.marketing.small_message.price_data, 'date'),
            this.init_charst_params(item.marketing.small_message.price_data, 'data')),
          // 销售额变体options
          priceVariantOptions: create_options_stack_line('', this.init_variant(
            item.marketing.small_message.price_variant_data, false, true),
          this.init_variant(item.marketing.small_message.price_variant_data),
          this.init_variant(item.marketing.small_message.price_variant_data, true)),
          // 销量options
          numberOptions: create_options_single_line('近7天销量',
            this.init_charst_params(item.marketing.small_message.sale_data, 'date'),
            this.init_charst_params(item.marketing.small_message.sale_data, 'data')),
          // 销量变体options
          numberVariantOptions: create_options_stack_line('',
            this.init_variant(item.marketing.small_message.sale_variant_data, false, true),
            this.init_variant(item.marketing.small_message.sale_variant_data),
            this.init_variant(item.marketing.small_message.sale_variant_data, true)),
          id: `id111${index}`,
          id1: `id91${index}`
        } : { max_price: '', options: false }
        return {
          smallSaleDialog: false,
          middleSaleDialog: false,
          bigSaleDialog: false,
          smallPriceDialog: false,
          middlePriceDialog: false,
          bigPriceDialog: false,
          // item.marketing.large_message.
          ...item
        }
      })
    },
    // 格式化变体以外的其他数据
    init_charst_params(list, name, isDate = false) {
      const data = []
      list.map(row => {
        if (isDate) {
          return data.push(new Date(row[name]).toLocaleString().split(' ')[0])
        } else {
          return data.push((row[name]))
        }
      })
      return data.reverse()
    },
    // 初始化变体 时间  name 更坐标  data echars 的曲线图
    init_variant(obj, name = false, date = false) {
      const arr = []
      const nameArr = []
      const dataList = []
      const dateList = []
      for (const k in obj) {
        arr.push(obj[k])
        nameArr.push(k)
      }
      if (name) {
        return nameArr.reverse()
      }
      if (date) {
        arr.map(item => {
          item = item.map(row => {
            return row.date
          })
          dateList.push(item)
        })
        return dateList[0]
        // return dateList[0].reverse()
      }
      arr.map(item => {
        item = item.map(row => {
          return row.data
        }).reverse()
        dataList.push(item)
      })
      return dataList
    },
    add_my_trak() {
      if (!this.myTrack) {
        this.$message.error('请输入需要跟踪的listing')
        return
      }
      this.trackLoading = true
      const data = { goods_item: this.myTrack }
      ebay_us_goods_item_track(data).then(res => {
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
    get_key_word() {
      ebay_us_user_key_word().then(res => {
        if (res.status) {
          this.keyWordList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('请求服务器错误')
      })
    }
  }
}
</script>
