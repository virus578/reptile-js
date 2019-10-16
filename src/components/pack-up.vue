<template>
  <div class="pack-up">
    <div v-if="isShow" class="top" title="收起" @click="pack_up"/>
    <div v-else class="down" title="展开" @click="pack_up"/>
  </div>
</template>

<style lang="scss">
    .pack-up {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        .top {
            width: 20px;
            height: 20px;
            background:  url('../assets/top-triangle.png') no-repeat center center;
            background-size: cover;
        }
        .down {
            width: 20px;
            height: 20px;
            background:  url('../assets/bottom-triangle.png') no-repeat center center;
            background-size: cover;
        }
    }
</style>

<script>
export default {
  components: {

  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    pack_up() {
      this.$emit('pack_up')
    }
  }
}
</script>
