<template>
  <div class="c-search-ls">
    <div class="l-radio">
      <label class="block label m-font" for="">
        <span>选择类目</span>
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="click"
          content="Amazon搜索类目,非排行榜类目">
          <img slot="reference" class="img-middle" src="../../../../assets/tip.jpg" alt="">
        </el-popover>
      </label>
      <div v-for="(item,index) in list" :key="`${item}${index}`" class="classify"><el-radio :label="item.value" v-model="form.category">{{ item.label }}</el-radio></div>
    </div>
    <div class="r-search">
      <label for="" class="block label m-font">
        <span>输入关键字</span>
        <el-popover
          placement="top-start"
          title=""
          width="200"
          trigger="click"
          content="模拟Amazon首页搜索栏，搜出结果">
          <img slot="reference" class="img-middle" src="../../../../assets/tip.jpg" alt="">
        </el-popover>
      </label>
      <el-input v-model="form.type" placeholder="如:flashlight" class="block s-width-large" @keyup.enter.native="get_table_data"/>
      <el-button
        :disabled="tableLoading"
        class="button"
        size="small"
        type="primary"
        @click.native="get_table_data" >开始搜索</el-button>
      <span v-if="tableLoading" class="i-block">&emsp;{{ `搜索中` }}
        <span class="slideInDown1 i-block">.</span>
        <span class="slideInDown2 i-block">.</span>
        <span class="slideInDown3 i-block">.</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.c-search-ls{
	display: flex;

	.l-radio {
		padding: 10px 30px;
		flex: 1;
		border-style: transpare;
    border-right: 1px solid #ccc;
		.classify {
			display: inline-block;
			width: 50%;
		}
	}
	.r-search {
		flex: 1;
		padding: 20px;
		.button {
			margin-top: 50px;
		}
	}

	.label {
		margin-bottom: 20px;
	}
	border-style:transpare;
  border-bottom:1px solid #ccc;
}
</style>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    tableLoading: {}
  },

  data() {
    return {
      pageSize: 0
    }
  },

  watch: {
    form: {
      handler(val) {
        this.set_amazon_us_form(val)
      },
      deep: true
    }
  },

  methods: {
    ...mapMutations({
      set_amazon_us_form: 'set_amazon_us_form'
    }),
    check_search_content() {
      if (!this.form.category) {
        this.$message({
          type: 'error',
          message: '请选择类目'
        })
        return
      }
    },
    get_table_data() {
      this.$emit('get_table_data')
    }
  }
}
</script>
