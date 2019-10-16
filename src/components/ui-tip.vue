<template>
  <div :style="styles" class="o-ui-tip ellipsis">
    <slot />
    <a v-if="isLink" :href="url" :title="urlContent" target="_blank" class="link center">{{ urlContent }}</a>
    <span v-else :title="date" class="center">{{ date }}</span>
  </div>
</template>

<style>
.o-ui-tip {
    text-align: center;
}
</style>

<script>
export default {
  components: {
  },
  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    content: {
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    isDate: {
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    styles() {
      return { width: `${this.width}px` }
    },
    date() {
      return this.isDate ? new Date(this.content).toLocaleString('chinese', { hour12: false }) : this.content ? this.content : '--'
    },
    urlContent() {
      return this.content ? this.content : '--'
    }
  },
  methods: {}
}
</script>
