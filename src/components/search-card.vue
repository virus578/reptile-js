<template>
  <div class="o-search-card">
    <slot />
    <el-button :style="styles" type="primary button" size="mini" @click.native="search">{{ searchTitle }}</el-button>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  props: {
    searchTitle: {
      type: String,
      default: '搜索'
    },
    marginLeft: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    styles() {
      return { marginLeft: `${this.marginLeft}px` }
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>
