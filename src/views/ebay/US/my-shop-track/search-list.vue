<template>
  <div class="c-serach-shop">
    <search-card :margin-left="marginLeft" @search="search">
      <label for="" class="m-font">店铺：</label>
      <el-select v-model="form.store_name" filterable clearable size="mini" placeholder="输入搜索更多">
        <el-option
          v-for="(item,index) in keyWordArr"
          :key="`${item.value}${index}`"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <div class="lable">
        <label for="" class="m-font">Item：</label>
        <order-input
          v-model="form.goods_item"
          class="inline l-width-large order-input"
          placeholder="可批量搜索，Shift+回车换行..."
          @keydown="key_down" />
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
    .textarea-cell {
        // margin-left: 20px;
    }
    .lable {
        display: inline-block;
        margin-left: 20px;
    }
    .order-input {
    }
}
</style>

<script>
export default {
  props: {
    form: {
      type: Object
    },
    storeNameList: {
      type: Array
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
      val = this.storeNameList.map(item => {
        return {
          lable: item.store_name,
          value: item.store_name
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
    },
    batch_search(e = '') {
      const et = e || window.event
  			const keycode = et.charCode || et.keyCode
			  if (keycode == 13 && !et.shiftKey) {
    			if (window.event) {
          this.form.goods_item = this.form.goods_item.split(/\n/)
      			this.$emit('search')
    			} else {
      			this.$emit('search')
    			}
  			}
    },
    checkEnter(e = '') {
  			const et = e || window.event
  			const keycode = et.charCode || et.keyCode
  			if (keycode == 13 && !et.shiftKey) {
    			if (window.event) {
      			window.event.returnValue = false
    			} else {
      			e.preventDefault() // for firefox
    			}
  			}
    },
    is_show() {
      this.isShowTextarea = !this.isShowTextarea
      this.marginLeft = 160
    },
    fan() {
      this.isShowTextarea = !this.isShowTextarea
      this.clone_ASIN = this.form.goods_item.replace(/\n/g, ' ')
      this.marginLeft = 0
    }
  },
  components: {
    searchCard: require('@/components/search-card').default,
    orderInput: require('@/components/order-input').default
  }
}
</script>
