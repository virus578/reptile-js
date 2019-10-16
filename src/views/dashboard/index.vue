<template>
  <div class="dashboard-container">
    <div class="dashboard-text">工号:{{ workId }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'workId',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
    background: url('../../assets/bj.jpg') center center  no-repeat;
    width: 100%;
    height: calc(100vh - 84px);
  }
  &-text {
      padding: 20px;
    color:#fff;
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
