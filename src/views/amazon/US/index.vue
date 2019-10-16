<template>
  <div class="p-US">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关键词搜索" name="first">
        <!-- v-if="tabShow['0']" -->
        <keywords-search
          :index="Number(index)"
          :list="list"
          :track-arr="trackArr"
          :show-search="showSearch"
          @router_push="router_push" />
      </el-tab-pane>
      <el-tab-pane id="trank" label="我的跟踪" name="second" >
        <my-track :index="Number(index)" :track-arr="trackArr" v-model="asin" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.p-US {
	padding-left: 20px;
}
</style>

<script>
import { get_amazon_us_search_category } from '@/api/amazon-key-word'
export default {
  components: {
    keywordsSearch: require('./keywords-search/index.vue').default,
    myTrack: require('./my-track/index.vue').default
  },
  data() {
    return {
      activeName: 'first',
      index: 0,
      tabShow: {
        '0': true,
        '1': false
      },
      list: [],
      showSearch: false,
      trackArr: {
        colorArr: []
      },
      // 通过跟踪进入我的跟踪标志符
      asin: []
    }
  },
  created() {
    this.showSearch = true
    get_amazon_us_search_category().then(res => {
      this.showSearch = false
      this.list = res.data.map((item, index) => {
        return {
          label: item.label,
          value:	item.value
        }
      })
    }).catch(() => {
      this.$message.error('请求服务器错误')
    })
  },
  methods: {
    handleClick(tab, event) {
      this.index = tab.index
      this.tabShow = {
        '0': false,
        '1': false
      }
      this.tabShow[`${this.index}`] = true
      if (Number(this.index) === 0) {
        this.asin = []
      }
    },
    router_push(val) {
      this.index = 1
      this.activeName = 'second'
      this.asin.push(val)
      //  = val
    }
  }
}
</script>
