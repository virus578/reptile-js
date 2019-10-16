<template>
  <div class="ebay-keywords-search">
    <seach-list
      v-if="isShow"
      :is-loading="isLoading"
      :form="form"
      @search="search" />
    <pack-up
      :is-show="isShow"
      @pack_up="pack_up" />
    <data-table
      :table="table.tableDate"
      :is-show="isShow"
      :info="table"
      :table-loading="tableLoading"
      :height="height"
      @search="search"
      @router_push_listing="router_push_listing"
      @router_push_shop="router_push_shop" />
  </div>
</template>

<style lang="scss">
.ebay-keywords-search {
    position: relative;
}

</style>

<script>
import { ebay_us_search, get_ebay_us_search } from '@/api/ebay-keywords'
import { mapMutations, mapState } from 'vuex'
let timeId
export default {
  components: {
    seachList: require('../keywords-search/search-list').default,
    dataTable: require('../keywords-search/data-table').default,
    packUp: require('../../../../components/pack-up').default
  },
  data() {
    return {
      tables: {
        category: '',
        result: '',
        colorArr: [],
        tableDate: [],
        currentPage: 1,
        pageSize: 100
      },
      n: 0,
      // arr:[],
      request_time: 0,
      // table:[],
      tableLoading: false,
      site: [],
      isShow: true,
      height: 460
    }
  },
  computed: {
    ...mapState({
      table: state => state.ebay_us.table,
      form: state => state.ebay_us.form,
      isLoading: state => state.ebay_us.isLoading
    })
  },
  mounted() {
    this.t = 5
  },
  methods: {
    ...mapMutations({
      set_ebay_us_table: 'set_ebay_us_table',
      set_ebay_us_is_loading: 'set_ebay_us_is_loading'
    }),
    pack_up() {
      this.isShow = !this.isShow
      this.height = this.isShow ? 460 : 750
    },
    search() {
      if (this.isLoading) {
        clearInterval(timeId)
        // this.isLoading = false
        this.set_ebay_us_is_loading(false)
      } else {
        this.tables.tableDate = []
        this.n = 0
        this.request_time = new Date().toLocaleDateString()
        const data = { category: this.form.category[this.form.category.length - 1], keyWord: this.form.keyword, request_time: this.request_time }
        let timeId
        let tem
        if (this.form.keyword) {
          this.tables.currentPage = 1
          this.tableLoading = true
          // this.isLoading = true
          this.set_ebay_us_is_loading(true)
          ebay_us_search(data).then(res => {
            if (!res.status) {
              this.$message.error('错了哦，这是一条错误消息')
            }
            if (res.status) {
              this.tables.result = ''
              this.tables.category = ''
              this.tables.colorArr = []
              // 轮询
              timeId = setInterval(() => {
                this.site = []
                this.tables.tableDate.map((item) => {
                  this.site.push(item.site)
                })
                get_ebay_us_search({ key_word: this.form.keyword, request_time: this.request_time, offset: this.tables.tableDate.length, site: this.site.join() }).then(res => {
                  if (this.tables.tableDate.length >= 100 && this.tables.tableDate.every((item) => item.is_gain_sale > 0)) {
                    clearInterval(timeId)
                    // this.isLoading = false
                    this.set_ebay_us_is_loading(false)
                  }
                  if (res.data.length === 0) {
                    this.n++
                    if (this.n >= 100) {
                      clearInterval(timeId)
                      // this.isLoading = false
                      this.set_ebay_us_is_loading(false)
                    }
                  } else {
                    this.n = 0
                  }
                  if (res.status && res.data.length > 0) {
                    if (this.tableLoading) {
                      this.tableLoading = false
                    }
                    this.tables.category = res.data[0].goods_category
                    this.tables.tableDate = this.tables.tableDate.concat(this.init_res_data(res.data))
                    this.tables.result = `1- ${this.tables.tableDate.length} of over ${res.data[0].result_message}`
                    this.tables.tableDate.sort((a, b) => {
                      return a.site - b.site
                    })
                    this.tables.tableDate = this.init_table_data(this.tables.tableDate)
                    this.tables.tableDate.forEach((item, index) => {
                      if (item.is_store_track || item.is_goods_track) {
                        this.tables.colorArr.push(index)
                        this.$set(this.tables.tableDate[index], 'clickIndex', index)
                      }
                    })
                  }
                  // this.arr.push(res.data)
                })
                // .catch(()=>{
                //         clearInterval(timeId)
                //         this.$message.error('请求服务器错误')
                //     })
                this.set_ebay_us_table(this.tables)
              }, 10000)
            }
          })
          //  .catch((err) => {
          //     this.$message.error('请求服务器错误')
          //     clearInterval(timeId)
          // })
        } else {
          this.$message.error('请输入搜索关键字')
        }
      }
    },
    init_po_table(obj, isPrice = false) {
      let count = 0
      const arr = []
      let tem
      for (const k in obj) {
        tem = 0
        obj[k].forEach(item => {
          // tem += Number(item.data)
          tem = Number(item.data)
        })
        if (isPrice) {
          tem = tem.toFixed(2)
        }
        // arr.push({color:k.split('&')[0],size:k.split('&')[1],count:tem})
        arr.push({ color: k.split('&')[0], size: k.split('&')[1], count: obj[k][0].data })
      }
      arr.forEach(row => {
        count += Number(row.count)
      })
      if (isPrice) {
        count = count.toFixed(2)
      }
      return {
        arr,
        count
      }
    },
    // 格式化list为table格式
    init_res_data(list) {
      return list.map((item, index) => {
        if (item.publish_date) {
          item.publish_date = new Date(item.publish_date).toLocaleDateString().replace(/\//g, '-')
        } else {
          item.publish_date = ''
        }
        item.marketing.large_message = item.marketing.marketing_arr.length ? {
          hint_date: item.marketing.large_message.hint_date,
          price_number: item.marketing.large_message.price_data[0].data,
          sale_number: item.marketing.large_message.sale_data[0].data,
          // 销售额变体options
          priceVariant: this.init_po_table(item.marketing.large_message.price_variant_data, true).arr,
          // 销量变体options
          numberVariant: this.init_po_table(item.marketing.large_message.sale_variant_data).arr,
          isShow: true,
          id1: `id${new Date().getTime}${index}`,
          id2: `id${new Date().getTime}${index}`
        } : { price_number: '', sale_number: '', priceVariant: [], numberVariant: [], isShow: false }
        item.marketing.middle_message = item.marketing.marketing_arr.length ? {
          hint_date: item.marketing.middle_message.hint_date,
          price_number: item.marketing.middle_message.price_data[0].data,
          sale_number: item.marketing.middle_message.sale_data[0].data,
          // 销售额变体options
          priceVariant: this.init_po_table(item.marketing.middle_message.price_variant_data, true).arr,
          // 销量变体options
          numberVariant: this.init_po_table(item.marketing.middle_message.sale_variant_data).arr,
          isShow: true,
          id1: `id${new Date().getTime}${index}`,
          id2: `id${new Date().getTime}${index}`
        } : { price_number: '', sale_number: '', priceVariant: [], numberVariant: [], isShow: false }
        item.marketing.small_message = item.marketing.marketing_arr.length ? {
          hint_date: item.marketing.small_message.hint_date,
          price_number: item.marketing.small_message.price_data[0].data,
          sale_number: item.marketing.small_message.sale_data[0].data,
          // 销售额变体options
          priceVariant: this.init_po_table(item.marketing.small_message.price_variant_data, true).arr,
          // 销量变体options
          numberVariant: this.init_po_table(item.marketing.small_message.sale_variant_data).arr,
          isShow: true,
          id1: `id${new Date().getTime}${index}`,
          id2: `id${new Date().getTime}${index}`
        } : { price_number: '', sale_number: '', priceVariant: [], numberVariant: [], isShow: false }
        item.marketing.price_currency = item.marketing.marketing_arr.length ? item.marketing.price_currency : 0
        return {
          smallSale: item.marketing.small_message.sale_number,
          smallPrice: Number(item.marketing.small_message.price_number),
          middleSale: item.marketing.middle_message.sale_number,
          middlePrice: Number(item.marketing.middle_message.price_number),
          largeSale: item.marketing.large_message.sale_number,
          largePrice: Number(item.marketing.large_message.price_number),
          smallSaleStatus: false,
          middleSaleStatus: false,
          largeSaleStatus: false,
          smallPriceStatus: false,
          middlePriceStatus: false,
          largePriceStatus: false,
          ...item
        }
      })
    },
    init_table_data(list) {
      return list.map((item, index) => {
        return {
          number: index + 1,
          _publish_date: new Date(item.publish_date).getTime(),
          ...item
        }
      })
    },
    // 跳转 listing跟踪页面
    router_push_listing() {
      this.$emit('router_push_listing')
    },
    // 跳转到shop跟踪页面
    router_push_shop() {
      this.$emit('router_push_shop')
    }
  }
}
</script>
