<template>
  <div class="o-ui-table">
    <table border="1" cellspacing="0" cellpadding="0">
      <tr v-if="isTh">
        <th v-for="(head, index) in head" :key="`${head}${index}`" :width="head_width(head.width)">{{ head.label }}</th>
      </tr>
      <slot/>
    </table>
  </div>
</template>

<style lang="scss">
.o-ui-table {
table {
    border: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    width: 100%;
    color: #333;
    border-collapse:collapse;
    th {
        padding: 5px 10px;
        background-color: #eaf0f7
    }
}
}
</style>

<script>
export default {
  components: {

  },
  props: {
    head: {
      type: Array
    },
    isTh: {
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    head_width(width) {
      return `${width}px`
    }
  }
}
</script>
