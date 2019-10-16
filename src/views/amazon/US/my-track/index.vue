<template>
  <div class="p-my-following">
    <search-list :form="form" :key-word-list="keyWordList" :category-list="categoryList" @search="search" />
    <div class="track-cell">
      <el-input v-model="myTrack" placeholder="请输入需要跟踪的ASIN" class="l-width-large" size="mini"/>
      <el-button :disabled="isTrack" type="primary" size="mini" @click.native="add_my_trak">添加到我的追踪</el-button>
      <span v-if="isTrack" class="i-block">&emsp;{{ `添加中` }}
        <span class="slideInDown1 i-block">.</span>
        <span class="slideInDown2 i-block">.</span>
        <span class="slideInDown3 i-block">.</span>
      </span>
    </div>
    <data-table :paginate="paginate" :table-loading="tableLoading" :track-list="trackList" @search="search" />
  </div>
</template>

<style lang="scss">
.p-my-following {
	.track-cell {
		padding: 0 0 20px 20px;
	}
}
</style>

<script>
import { get_amazon_us_my_track_key_word,
  get_amazon_us_my_track_category,
  get_amazon_us_my_track_details,
  add_amaozn_us_asin_track } from '@/api/amazon-my-following'
import { create_options_single_line, create_options_stack_line } from '@/utils/chart.js'
export default {
  components: {
    searchList: require('./search-list').default,
    dataTable: require('./data-table').default
  },
  props: {
    value: {},
    index: {
      type: Number,
      default: 0
    },
    trackArr: {
      type: Object,
      default: () => {}
    }
    //  asin: {
    //      type: Array
    //  }
  },
  data() {
    return {
      form: {
        keyword: '',
        category: '',
        asin: ''
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
      categoryList: [],
      trackList: [],
      isTrack: false,
      page: 1,
      asin: []
    }
  },
  watch: {
    index(val) {
      if (val === 1) {
        this.get_key_word()
        this.get_category()
        this.search()
      }
    },
    asin(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.asin = val
    }
  },
  methods: {
    search(isPaginate = false) {
      // isSearch 判断是翻页还是搜索
      // 清空原数组 初始化
      this.tableLoading = true
      this.trackList = []
      let tem
      let data
      if (this.form.asin.length) {
        tem = this.form.asin.replace(/\s/g, '\n').split('\n')
      } else {
        tem = []
      }
      // 是否是分页
      if (isPaginate) {
        data = { pageSize: this.paginate.pageSize, page: this.paginate.page, keyword: this.form.keyword, category: this.form.category, asin: tem }
      } else {
        data = { pageSize: this.paginate.pageSize, page: this.page, keyword: this.form.keyword, category: this.form.category, asin: tem }
      }
      // 只会有一条数据
      if (this.asin.length) {
        data = { pageSize: this.paginate.pageSize, page: this.page, keyword: this.form.keyword, category: this.form.category, asin: this.asin }
      }
      get_amazon_us_my_track_details(data).then(res => {
        this.tableLoading = false
        this.trackList = res.data
        this.trackList = this.init_track_list(this.trackList)
        this.paginate.count = res.count
        if (this.asin.length) {
          this.asin = []
        }
      })
        .catch(() => {
          this.$message.error('请求服务器错误')
        })
    },
    // 通过asin添加到我的跟踪
    add_my_trak() {
      if (!this.myTrack) {
        this.$message.error('请输入需要跟踪的ASIN')
        return
      }
      this.isTrack = true
      const data = { asin: this.myTrack, start_track_time: new Date().getTime() }
      add_amaozn_us_asin_track(data).then(res => {
        this.isTrack = false
        if (res.status) {
          this.trackArr.colorArr.push({ asin: this.myTrack })
          this.$message({
            type: 'success',
            message: res.message
          })
          this.myTrack = ''
          this.search()
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.isTrack = false
        this.$message.error('请求服务器错误')
      })
    },
    //  获取类目
    get_category() {
      get_amazon_us_my_track_category().then(res => {
        if (res.status) {
          this.categoryList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
        .catch(() => {
          this.$message.error('请求服务器错误')
        })
    },
    // 获取搜索关键字历史
    get_key_word() {
      get_amazon_us_my_track_key_word().then(res => {
        if (res.status) {
          this.keyWordList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
        .catch(() => {
          this.$message.error('请求服务器错误')
        })
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
          // return data.push(new Date(row[name]).toLocaleString('chinese',{hour12: false}))
          return data.push(new Date(row[name]).toLocaleDateString())
        } else {
          return data.push(Number(row[name]))
        }
        return row
      })
      return data
    },
    // 格式化时间
    init_date(date) {
      if (date) {
        const temArr = new Date(date).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
        return temArr.split(' ')
      } else {
        return []
      }
    },
    // 格式化 echart数据格式
    init_track_list(list) {
      list = list.map((item, index) => {
        item.start_track_time = this.init_date(item.start_track_time)
        item.recently_track_time = this.init_date(item.recently_track_time)
        console.log(item.start_track_time)
        console.log(item.recently_track_time)
        item.putaway_date = item.putaway_date ? new Date(item.putaway_date).toLocaleDateString().replace(/\//g, '-') : ''
        item.grade = item.grade.length ? {
          title: item.grade[item.grade.length - 1].grade,
          options: create_options_single_line('评分', this.init_charst_params(item.grade, 'updated_time', true),
            this.init_charst_params(item.grade, 'grade'), [1, 2, 3, 4, 5]),
          id: `id1${new Date().getTime()}${index}`
        } : { options: false }
        item.review_number = item.review_number.length ? {
          title: item.review_number[item.review_number.length - 1].review_number,
          options: create_options_single_line('review', this.init_charst_params(item.review_number, 'updated_time', true),
            this.init_charst_params(item.review_number, 'review_number'), [500, 1000]),
          id: `id2${new Date().getTime()}${index}`
        } : { options: false }
        item.seller_number = item.seller_number.length ? {
          title: item.seller_number[item.seller_number.length - 1].seller_number,
          options: create_options_single_line('卖家数量', this.init_charst_params(item.seller_number, 'updated_time', true),
            this.init_charst_params(item.seller_number, 'seller_number'), [500, 1000]),
          id: `id3${new Date().getTime()}${index}`
        } : { options: false }
        item.main_bsr = item.main_bsr.length ? {
          title: item.main_bsr[item.main_bsr.length - 1].main_bsr,
          options: create_options_single_line(`BSR主排名-${item.main_bsr[item.main_bsr.length - 1].main_bsr}`, this.init_charst_params(item.main_bsr, 'updated_time', true),
            this.init_charst_params(item.main_bsr, 'ranking'), [500, 1000]),
          id: `id4${new Date().getTime()}${index}`
        } : { options: false }
        item.other_bsr = item.other_bsr.length ? item.other_bsr.map((r, i) => {
          return {
            title: r[r.length - 1].other_bsr,
            options: create_options_single_line(`BSR副排名-${r[r.length - 1].other_bsr}`, this.init_charst_params(r, 'updated_time', true),
              this.init_charst_params(r, 'ranking'), [500, 1000]),
            id: `id${new Date().getTime()}${i}`
          }
        }) : { options: false }
        item.variant = item.variant.length ? item.variant.map((row, index) => {
          for (let i = row.length - 1; i > 0; i--) {
            if (i > 0 && (row[i].variant_type === row[i - 1].variant_type)) {
              row[i].variant_type = ' '
            }
          }
          return { ...row }
        }) : []
        //  item.max_price = item.max_price.length < item.min_price.length ? for (let i =item.min_price.length - item.max_price.length; i > 0;i--) {item.max_price.push ({max_price: 0})} : item.max_price
        return {
          price: {
            max_price: item.max_price[item.max_price.length - 1].max_price,
            min_price: item.min_price[item.min_price.length - 1].min_price,
            options: create_options_stack_line('最小价格-最大价格', this.init_charst_params(item.max_price, 'updated_time', true),
              [this.init_charst_params(item.min_price, 'min_price', false, true), this.init_charst_params(item.max_price, 'max_price', false, true)],
              ['最小价格', '最大价格']),
            id: `id6${new Date().getTime()}${index}`
          },
          isVariant: false,
          ...item
        }
      })
      return list
    }
  }
}
</script>
