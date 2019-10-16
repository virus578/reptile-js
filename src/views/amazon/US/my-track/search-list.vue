<template>
  <div class="c-serach-ls">
    <search-card :margin-left="marginLeft" @search="search">
      <label for="" class="m-font">关键词：</label>
      <el-select v-model="form.keyword" filterable clearable size="mini" placeholder="输入搜索更多">
        <el-option
          v-for="item in keyWordArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <label for="" class="m-font">类目：</label>
      <el-select v-model="form.category" filterable clearable size="mini" placeholder="输入搜索更多">
        <el-option
          v-for="item in categoryArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <label for="" class="m-font">ASIN：</label>
      <order-input
        v-model="form.asin"
        class="inline l-width-large"
        placeholder="可批量搜索，Shift+回车换行..."
        @keydown="key_down" />
    </search-card>
  </div>
</template>

<style lang="scss">
.c-serach-ls {
	padding: 20px;
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
    categoryList: {
      type: Array,
      default: () => {}
    },
    keyWordList: {
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
    categoryArr(val) {
      val = this.categoryList.map(item => {
        return {
          lable: item.category,
          value: item.category
        }
      })
      return val
    },
    keyWordArr(val) {
      val = this.keyWordList.map(item => {
        return {
          lable: item.keyword,
          value: item.keyword
        }
      })
      return val
    }
  },
  methods: {
    key_down() {
      this.$emit('search')
    },
    search() {
      this.$emit('search')
    }
    // batch_search (e = "") {
    // 	let et = e || window.event;
    // 	let keycode = et.charCode || et.keyCode;
    // 	  if (keycode == 13 && !et.shiftKey) {
    // 		if (window.event) {
    // 			this.form.asin = this.form.asin.split(/\n/)
    // 		this.$emit('search')
    // 		} else {
    // 		this.$emit('search')
    // 		}
    // 	}
    // },
    // checkEnter(e = "") {
    // 	let et = e || window.event;
    // 	let keycode = et.charCode || et.keyCode;
    // 	if (keycode == 13 && !et.shiftKey) {
    // 		if (window.event) {
    // 		window.event.returnValue = false;
    // 		} else {
    // 		e.preventDefault(); //for firefox
    // 		}
    // 	}
    // },
    // is_show() {
    // 	this.isShowTextarea =  !this.isShowTextarea
    // 	this.marginLeft = 160
    // },
    // fan () {
    // 	this.isShowTextarea =  !this.isShowTextarea
    // 	this.clone_ASIN = this.form.asin.replace(/\n/g, ' ')
    // 	this.marginLeft = 0
    // },
  }
}
</script>
