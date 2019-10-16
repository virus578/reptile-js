<template>
  <div :id="id" style="width:800px;height:300px;"/>
</template>

<style>

</style>

<script>
import echarts from 'echarts'
export default {
  components: {

  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById(this.id))
    myChart.setOption(this.options)
  },
  methods: {
  }
}
</script>
