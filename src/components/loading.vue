<template>
	<span v-if="loading" class="i-block">&emsp;{{`${title}`}}
        <span class="slideInDown1 i-block">.</span>
        <span class="slideInDown2 i-block">.</span>
        <span class="slideInDown3 i-block">.</span>
    </span>
</template>

<style>

</style>

<script>
export default {
	data() {
    	return {
			
    	};
  	},
  	methods: {
    	
	},
	props: {
        loading: Boolean,
        title: String
	},
	components: {
	
	}
};
</script>
