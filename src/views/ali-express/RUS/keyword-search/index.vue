<template>
  <div class="ali-RUS-search">
    <search-list
      v-if="isShow"
      :form="form"
      @search="search"
      @join_search="join_search" />
    <pack-up
      :is-show="isShow"
      @pack_up="pack_up"
    />
    <data-table
      :height="height"
      :is-show="isShow"
      :table="tableData.table"
      :info="tableData.info"
      :is-loading="isLoading"
      @router_push_listing_follow="router_push_listing_follow"
      @router_push_shop_track="router_push_shop_track" />
  </div>
</template>

<style>
.ali-RUS-search {
    position: relative;
}
</style>

<script>
import { aliexpress_keyWord_search, aliexpress_addsearch_track } from '../../../../api/ali-keyword-search'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    searchList: require('./search-list').default,
    dataTable: require('./data-table').default,
    packUp: require('../../../../components/pack-up').default
  },
  data() {
    return {
      isShow: true,
      height: 450,
      list: []
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.ali_us.tableData,
      form: state => state.ali_us.form,
      isLoading: state => state.ali_us.isLoading
    })
  },
  methods: {
    ...mapMutations({
      set_ali_us_table: 'set_ali_us_table',
      set_ali_us_is_loading: 'set_ali_us_is_loading'
    }),
    router_push_shop_track(id) {
      this.$emit('router_push_shop_track', id)
    },
    router_push_listing_follow(id) {
      this.$emit('router_push_listing_follow', id)
    },
    pack_up() {
      this.isShow = !this.isShow
      this.height = this.isShow ? 450 : 760
    },
    join_search() {
      if (!this.form.keyword.length) {
        this.$message.error('关键字不能为空')
        return
      }
      if (!isNaN(this.form.keyword)) {
        this.$message.error('关键字不能为纯数字')
        return
      }
      const _questData = {
        key_word: this.form.keyword,
        created_time: new Date().toLocaleDateString(),
        category_id: this.form.category.length >= 1 ? this.form.category[this.form.category.length - 1].split('$')[0] : this.form.category[this.form.category.length - 1],
        sort_type: this.form.type
      }
      aliexpress_addsearch_track(_questData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warnings'
          })
        }
      })
    },
    search() {
      if (!this.form.keyword.length) {
        this.$message.error('关键字不能为空')
        return
      }
      if (!isNaN(this.form.keyword)) {
        this.$message.error('关键字不能为纯数字')
        return
      }
      const questData = {
        key_word: this.form.keyword,
        created_time: new Date().toLocaleDateString(),
        category_id: this.form.category.length >= 1 ? this.form.category[this.form.category.length - 1].split('$')[0] : this.form.category[this.form.category.length - 1],
        sort_type: this.form.type
      }
      this.set_ali_us_is_loading(true)
      aliexpress_keyWord_search(questData).then(res => {
        if (res.status) {
          this.tableData.info.currentPage = 1
          this.tableData.info.category = res.data[0].search_result_category
          this.tableData.table = res.data
          this.tableData.table.forEach((r, i) => {
            r.number = i + 1
          })
          this.tableData.info.result = `1- ${this.tableData.table.length} of ${res.data[0].search_result_count} results`
          this.set_ali_us_table(this.tableData)
        } else {
          this.$message.error(res.message)
        }
        this.set_ali_us_is_loading(false)
      }).catch(() => {
        this.$message.error('请求服务器错误')
        this.set_ali_us_is_loading(false)
      })
    }
  }
}
</script>
