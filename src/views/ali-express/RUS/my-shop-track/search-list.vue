<template>
  <div class="c-serach-shop">
    <search-card :margin-left="marginLeft" @search="search">
      <label for="" class="m-font">店铺：</label>
      <el-select v-model="form.store_name" filterable clearable size="mini" placeholder="输入搜索更多">
        <el-option
          v-for="(item,index) in storeNameList"
          :key="`${item.value}${index}`"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <div class="lable">
        <label for="" class="m-font">店铺ID：</label>
        <order-input
          v-model="form.store_id"
          class="inline l-width-large order-input"
          placeholder="可批量搜索，Shift+回车换行..."
          @keydown="search" />
      </div>
    </search-card>
  </div>
</template>

<style lang="scss">
.c-serach-shop {
	// padding: 0 10px;
	.textarea-cell {
		position: relative;
		display: inline-block;
		width: 100px;
		height: 40px;
	}
	.textarea {
		position: absolute;
    width: 250px;
    top: 0px;
		margin-right: 40px;
		left:0;
	}
    .lable {
        display: inline-block;
        margin-left: 20px;
    }
}
</style>

<script>

export default {
  components: {
    searchCard: require('@/components/search-card').default,
    orderInput: require('@/components/order-input').default
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    storeNameList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      clone_ASIN: '',
      isShowTextarea: false,
      marginLeft: 0
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>
