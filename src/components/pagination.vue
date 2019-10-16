<template>
  <div class="c-pagination" >
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="1"
      :total="length"
      layout="prev, pager, next, jumper"
      @prev-click="prev_click"
      @next-click="next_click"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<style>
.c-pagination {
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
     position: fixed;
     bottom:0;
     right:0;
}
</style>

<script>
export default {
  // computed: {
  //     scrollTop() {
  //         return document.documentElement.scrollTop
  //     }
  // },
  props: {
    length: {
      type: Number,
      default: 0
    },
    scollTopArr: {
      type: Array,
      default: () => []
    },
    currentScrollTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 0,
      arr: []
    }
  },
  mounted() {
    window.onscroll = () => {
      const b = document.documentElement.scrollTop - this.scollTopArr[this.currentPage]
      const o = this.arr[this.arr.length - 1] - document.documentElement.scrollTop
      const s = document.documentElement.scrollTop - (this.scollTopArr[this.currentPage + 1] ? this.scollTopArr[this.currentPage + 1] : this.scollTopArr[this.currentPage - 1])
      if ((b > 0) && (s < 0)) {
        this.currentPage++
        this.arr.push(document.documentElement.scrollTop)
      } else if ((b < 0) && (o > 0)) {
        this.currentPage--
        this.arr.pop()
      }
    }
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      // 分页 跳转
    //    if(this.flag) {
      this.currentPage = val
      document.documentElement.scrollTop = this.scollTopArr[val - 1]
    //    }
    },
    prev_click(val) {
      this.currentPage--
      //   this.flag = false
    },
    next_click(val) {
      this.currentPage++
      // 获取当前位置
      // 判断自己所在页数
      //    this.flag = false
    }
  }
}
</script>

