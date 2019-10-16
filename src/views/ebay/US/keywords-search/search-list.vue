<template>
  <div class="ebay-US-search">
    <div class="l-select">
      <label class="block label m-font color" for=""><span>选择类目</span>
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="click"
          content="eBay官网的类目，不选择则系统自动匹配">
          <img slot="reference" class="img-middle" src="../../../../assets/tip.jpg" alt="">
        </el-popover>
      </label>
      <el-cascader
        v-model="form.category"
        :options="options"
        separator=">"
        clearable
        filterable
        change-on-select
        class="select"
        size="medium"
        placeholder="请选择类目"
        @change="handle_change"
      />
      <p v-for="item in selectList" :key="item">{{ item }}</p>
    </div>
    <div class="r-search">
      <label class="block label m-font" for=""><span>输入关键字</span>
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="click"
          content="关键词必填，模拟官网搜索得出结果">
          <img slot="reference" class="img-middle" src="../../../../assets/tip.jpg" alt="">
        </el-popover>
      </label>
      <el-input
        v-model="form.keyword"
        placeholder="如:flashlight"
        clearable
        size="small"
        class="search"
        @keyup.enter.native="search"/>
      <div class="search-button">
        <!-- :disabled="isLoading"  -->
        <el-button type="primary" size="mini" @click.native="search">{{ isLoading ? '取消搜索' : '加入搜索队列' }}</el-button>
        <span v-if="isLoading" class="i-block">&emsp;{{ `请求中` }}
          <span class="slideInDown1 i-block">.</span>
          <span class="slideInDown2 i-block">.</span>
          <span class="slideInDown3 i-block">.</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
    .ebay-US-search {
        padding: 10px 0 10px 30px;
        display: flex;
          border-bottom:1px solid #ccc;
        .l-select {
            flex: 1;
            border-right:1px solid #ccc;
            .select {
                width: 65%;
            }
            .label {
                // margin: 30px 0;
                margin: 10px 0;
            }
        }
        .r-search {
            padding:0 30px ;
             flex: 1;
             .search {
                width: 25%;
                margin-bottom: 30px;
             }
             .label {
                // margin: 30px 0;
                margin: 10px 0;
            }
            .search-button {
                margin-bottom: 65px;
            }
        }
        .label {
            color: gray;
            font-size: 14px;
        }
    }
</style>

<script>
import { ebay_us_search_category } from '@/api/ebay-keywords'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    searchCard: require('@/components/search-card').default
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    ...mapState({
      selectList: state => state.ebay_us.selectList
    })
  },
  watch: {
    form: {
      handler(val) {
        this.set_ebay_us_form(val)
      },
      deep: true
    }
  },
  mounted() {
    ebay_us_search_category().then(res => {
      if (res.status) {
        this.options = res.data
      } else if (res.status) {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
    }).catch(() => {
      this.$message.error('请求服务器错误')
    })
  },
  methods: {
    ...mapMutations({
      set_ebay_us_form: 'set_ebay_us_form',
      set_ebay_us_select_list: 'set_ebay_us_select_list'
    }),
    // 根据 key值找到vualue值并去重
    handle_change(val) {
      const arr = []
      const find = function(list, value, arr) {
        list.forEach(item => {
          if (value === item.value) {
            arr.push(item.label)
            return
          }
          if (item.children) {
            find(item.children, value, arr)
          }
        })
      }
      this.form.category.forEach(row => {
        find(this.options, row, arr)
      })
      for (let i = arr.length - 1; i >= 1; i--) {
        if (arr[i] === arr[i - 1]) {
          arr.splice(i, 1)
        }
      }
      this.set_ebay_us_select_list(arr)
    },
    search() {
      this.$emit('search')
    }
  }
}
</script>
