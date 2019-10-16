<template>
  <div class="o-info-details">
    <div v-if="bsrArr.length">
      <p v-for="(item) in bsrArr" :key="item">{{ `${item}` }}</p>
    </div>
    <div v-if="list.length">
      <p v-for="(item, index) in list" :key="`${item}${index}`">{{ `${index+1}.${item}` }}</p>
    </div>
  </div>
</template>

<style>
.o-info-details {
    padding: 10px;
    min-height: 50px;
    max-height: 400px;
    min-width: 200px;
    max-width: 400px;
    overflow-y: auto;
}
</style>

<script>
export default {
  props: {
    content: {
      default: false
    },
	    list: {
      // list 数据
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    bsrArr() {
      const temArr = []
      if (this.content) {
        temArr.push(`#${this.content.main_bsr_value} ${this.content.main_bsr}`)
        this.content.other_bsr.map(item => {
          temArr.push(`#${item.value} ${item.type}`)
        })
        return temArr
      } else {
        return temArr
      }
    }
  },
  methods: {
  }
}
</script>
