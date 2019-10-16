<template>
  <div class="ebay-US">
    <el-tabs v-model="activeName" @tab-click="handle_click">
      <el-tab-pane label="关键字搜索" name="first" >
        <keywords-search @router_push_listing="router_push_listing" @router_push_shop="router_push_shop" />
      </el-tab-pane>
      <el-tab-pane label="我的Listing跟踪" name="second" >
        <my-listing-track :index="index" @router_push_shop="router_push_shop" />
      </el-tab-pane>
      <el-tab-pane label="我的店铺跟踪" name="third">
        <my-shop-track :index="index" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.ebay-US {
    padding: 0px 20px 0 20px;
}
</style>

<script>
export default {
  components: {
    keywordsSearch: require('./keywords-search/index').default,
    myListingTrack: require('./my-listing-track/index').default,
    myShopTrack: require('./my-shop-track/index').default
  },
  props: {
  },
  data() {
    return {
      activeName: 'first',
      index: 0
    }
  },
  mounted() {
  },
  methods: {
    handle_click(tab, event) {
      this.index = Number(tab.index)
    },
    router_push_listing() {
      this.index = 1
      this.activeName = 'second'
    },
    router_push_shop() {
      this.index = 2
      this.activeName = 'third'
    }
  }
}
</script>
