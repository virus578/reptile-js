<template>
  <div class="o-back-top" >
    <img
      v-show="isShow"
      src="../assets/back-top.png"
      title="返回顶部"
      alt=""
      @click="back_top">
  </div>
</template>

<style lang="scss">
.o-back-top {
    position: fixed;
    bottom: 30px;
	right: 30px;
	width: 50px;
	height: 50px;
    img {
		width: 100%;
	}
}
</style>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      isShow: true,
      scrollTop: 0
    }
  },
  computed: {
    top() {
      return this.scrollTop
    }
  },
  mounted() {
    //   let tem
    //    window.onscroll = function () {
    //        tem = document.documentElement.scrollTop - 600
    //      if (tem > 0) {
    //          this.isShow = true
    //          debugger
    //           debugger
    //      } else {
    //          this.isShow = false
    //      }
    //   }
  },
  methods: {
    back_top() {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const timeId = setInterval(() => {
        this.scrollTop = (this.scrollTop / 2) > 1 ? Math.ceil((this.scrollTop / 2)) : Math.floor((this.scrollTop / 1))
        document.body.scrollTop = this.scrollTop
        document.documentElement.scrollTop = this.scrollTop
        if (this.scrollTop === 2) {
          document.documentElement.scrollTop = 0
          clearInterval(timeId)
        }
        this.index++
      }, 20)
    }
  }
}
</script>
