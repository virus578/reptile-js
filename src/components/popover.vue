<template>
	<div class="c-popover">
		<el-dialog :visible="value" @update:visible="value => $emit('input',value)" :modal="modal" width="800px" :show-close="showClose">
            <slot />
        </el-dialog>
	</div>
</template>

<style>
.c-popover {
}
</style>
<script>
export default {
	data() {
    	return {
           modal: false,
           showClose:false
    	};
  	},
  	methods: {
        //   close(value){
        //       this.$emit('input',value)
        //   }
    },
	props: {
        value: {},
    },
};
</script>
