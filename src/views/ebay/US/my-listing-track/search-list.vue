<template>
  <div class="c-serach-listing">
    <search-card :margin-left="marginLeft" @search="search">
      <label for="" class="m-font">关键词：</label>
      <el-select v-model="form.key_word" filterable clearable size="mini" placeholder="输入搜索更多">
        <el-option
          v-for="item in keyWordArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <div class="label">
        <label for="" class="m-font">Item：</label>
        <order-input
          v-model="form.goods_item"
          class="inline l-width-large"
          placeholder="可批量搜索，Shift+回车换行..."
          @keydown="key_down" />
      </div>
    </search-card>
  </div>
</template>

<style lang="scss">
.c-serach-listing {
	// padding: 0 10px;
	padding: 0;
	.textarea-cell {
		position: relative;
		display: inline-block;
		width: 100px;
		height: 40px;
	}
    .textarea-cell {
        // margin-left: 20px;
    }
    .label {
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
    // 			this.form.goods_item = this.form.goods_item.split(/\n/)
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
      	// 		    window.event.returnValue = false;
    	// 		} else {
      	// 		    e.preventDefault(); //for firefox
    	// 		}
  		// 	}
    // },
    // is_show() {
    // 	this.isShowTextarea =  !this.isShowTextarea
    // },
    // fan () {
    // 	this.isShowTextarea =  !this.isShowTextarea
    // 	this.clone_ASIN = this.form.goods_item.replace(/\n/g, ' ')
    // 	this.marginLeft = 0
    // },
  }
}
</script>
