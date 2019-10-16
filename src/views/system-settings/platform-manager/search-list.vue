<template>
  <div class="platform-manager-search-list">
    <search-card :margin-left="marginLeft" @search="$emit('search_data')">
      <label for="">
        <span>平台：</span>
        <el-select v-model="search.plateform" size="mini" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </label>
      <label for="">
        <span>key:</span>
        <el-input
          v-model="search.key"
          class="c-input"
          size="mini"
        />
      </label>
      <label for="">
        <span>账号:</span>
        <el-input
          v-model="search.username"
          class="c-input"
          size="mini"
        />
      </label>
    </search-card>
  </div>
</template>

<style>
.c-input {
    width: 10%;
}
.platform-manager-search-list {
    padding: 10px;
}
</style>

<script>
export default {
  components: {
    searchCard: require('@/components/search-card').default
  },
  props: {
    search: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      marginLeft: 0,
      options: [{
        value: 'aliexpress',
        label: '速卖通'
      }]
    }
  },
  methods: {
  }
}
</script>
