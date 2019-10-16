<template>
  <div class="ali-RUS-flower-search">
    <search-card @search="search">
      <label for="">
        <span>关键词:</span>
        <el-select v-model="form.keyword" filterable clearable size="mini" placeholder="输入搜索更多">
          <el-option
            v-for="item in keyWordArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </label>
      <label for="" class="time">
        <span>跟踪时间:</span>
        <el-date-picker
          v-model="form.start_track_date"
          :picker-options="pickerOptionsStart"
          size="mini"
          align="right"
          type="date"
          placeholder="选择日期"/>
        <span>-</span>
        <el-date-picker
          v-model="form.end_track_date"
          :picker-options="pickerOptionsEnd"
          size="mini"
          align="right"
          type="date"
          placeholder="选择日期"/>
      </label>
    </search-card>
  </div>
</template>

<style lang="scss">
.ali-RUS-flower-search {
    .keyword {
        width: 10%;
    }
    .time {
        margin-left: 20px;
    }
}
</style>

<script>
export default {
  components: {
    searchCard: require('@/components/search-card').default
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    keyWordArr: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      pickerOptionsEnd: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsStart: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>
