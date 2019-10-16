<template>
  <div class="ali-US-search">
    <div class="l-select">
      <label class="block label m-font color" for=""><span>选择类目</span>
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="click"
          content="AliExpress官网的类目，关键词搜索可不选择类目，系统自动匹配；也可直接类目选品。">
          <img slot="reference" class="img-middle" src="../../../../assets/tip.jpg" alt="">
        </el-popover>
      </label>
      <el-cascader
        v-model="form.category"
        :options="list"
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
      <label for="" class="block">
        <span>选择排序：</span>
        <el-radio v-model="form.type" label="default">最佳</el-radio>
        <el-radio v-model="form.type" label="create_desc">新品</el-radio>
      </label>
      <div class="search-button">
        <!-- :disabled="isLoading"  -->
        <el-button type="success" size="mini" @click.native="$emit('join_search')">加入搜索队列</el-button>
        <el-button type="primary" size="mini" @click.native="search">{{ isLoading ? '取消搜索' : '搜索' }}</el-button>
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
    .ali-US-search {
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
                margin: 20px 0 45px 0;
            }
        }
        .label {
            color: gray;
            font-size: 14px;
        }
    }
</style>

<script>
import { get_aliexpress_searchCategory } from '../../../../api/ali-keyword-search'
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
      default: false
    }
  },
  data() {
    return {
      list: []
      // selectList: []
    }
  },
  computed: {
    ...mapState({
      selectList: state => state.ali_us.selectList
    })
    // selectList () {
    //     let arr = []
    //     let find = function (list,value,arr) {
    //        list.forEach(item => {
    //             if(value === item.value) {
    //                 arr.push(item.label)
    //             }
    //             else if (item.children) {
    //                 find(item.children,value,arr)
    //             }
    //         })
    //    }
    //    this.form.category.forEach(row => {
    //        find(this.options,row,arr)
    //    })
    //    return arr
    // }
  },
  watch: {
    form: {
      handle_change(val) {
        this.set_ali_us_form(val)
      }
    },
    deep: true
  },
  mounted() {
    get_aliexpress_searchCategory().then(res => {
      if (res.status) {
        this.list = res.data
      }
    }).catch(() => {
      this.$message.error('请求服务器错误')
    })
  },
  methods: {
    // 根据 key值找到vualue值
    ...mapMutations({
      set_ali_us_form: 'set_ali_us_form',
      set_ali_us_select_list: 'set_ali_us_select_list'
    }),
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
        find(this.list, row, arr)
      })
      for (let i = arr.length - 1; i >= 1; i--) {
        if (arr[i] === arr[i - 1]) {
          arr.splice(i, 1)
        }
      }
      //    this.selectList = arr
      this.set_ali_us_select_list(arr)
    },
    search() {
      this.$emit('search')
    }
  }
}
</script>
