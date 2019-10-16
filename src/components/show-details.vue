<template>
	<div class="o-info-details">
		<p class="center">{{this.content}}</p>
	</div>
</template>

<style>
.o-info-details {
    padding: 10px;
    min-height: 50px;
    max-height: 400px;
    min-width: 200px;
    max-width: 500px;
    overflow-y: auto;
}
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
	    content: {
            type: String
        }
	},
	components: {
	}
};
</script>
