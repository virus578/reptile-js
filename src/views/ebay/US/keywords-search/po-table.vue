<template>
  <div class="table-cell">
    <table class="table" border="1" cellspacing="0" cellpadding="0">
      <tr>
        <th v-for="(item,index) in heads" :key="`${id}${item}${index}`">{{ item }}</th>
      </tr>
      <tr v-for="(item, index) in table" :key="`${id}${item.size}${item.size}${index}`">
        <td v-if="item.color ? item.color : false">{{ item.color }}</td>
        <td v-if="item.size ? item.size : false">{{ item.size }}</td>
        <td>{{ item[params] }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
        .table-cell {
            max-height: 400px;
            overflow-y: auto
        }
        .table {
        border: 1px solid #ccc;
        border-collapse:collapse;
        td {
             border: 1px solid #ccc;
             text-align: center;
        }
        th {
             border: 1px solid #ccc;
             text-align: center;
        }
        tr {
            border: 1px solid #ccc;
        }
    }
</style>

<script>
export default {
  components: {
  },
  props: {
    table: {
      type: Array,
      required: true
    },
    heads: {
      type: Array,
      required: true
    },
    id: {
      type: Number
    },
    params: {
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
