<template>
  <div class="ali-express-index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关键字搜索" name="first">
        <keyword-search
          @router_push_listing_follow="router_push_listing_follow"
          @router_push_shop_track="router_push_shop_track"/>
      </el-tab-pane>
      <el-tab-pane label="我的Listing关注" name="second">
        <my-listing-follow
          :tab-index="tabIndex"
          :id="id"
          @router_push_track_goods="router_push_track_goods"
          @router_push_shop_track="router_push_shop_track"/>
      </el-tab-pane>
      <el-tab-pane label="我的Listing跟踪" name="third">
        <my-listing-track
          :tab-index="tabIndex"
          :id="id"
          @router_push_shop_track="router_push_shop_track"/>
      </el-tab-pane>
      <el-tab-pane label="我的店铺跟踪" name="fourth">
        <my-shop-track
          :tab-index="tabIndex"
          :id="id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.ali-express-index {
    padding: 0 10px 0;
}
</style>
<script>
export default {
  components: {
    keywordSearch: require('./keyword-search/index').default,
    myListingFollow: require('./my-listing-follow/index').default,
    myListingTrack: require('./my-listing-track/index').default,
    myShopTrack: require('./my-shop-track/index').default
  },
  data() {
    return {
      activeName: 'first',
      tabIndex: 0,
      id: {
        trackId: 0,
        focusId: 0,
        storeId: 0
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.tabIndex = Number(tab.index)
    },
    router_push_listing_follow(id) {
      this.tabIndex = 1
      this.activeName = 'second'
      this.id.focusId = id
    },
    router_push_track_goods(id) {
      this.tabIndex = 2
      this.activeName = 'third'
      this.id.trackId = id
    },
    router_push_shop_track(id) {
      this.tabIndex = 3
      this.activeName = 'fourth'
      this.id.storeId = id
    }
  }
}
</script>
