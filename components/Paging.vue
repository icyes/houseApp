<template>
		<view v-if="loading!=null" class="cu-load bg-grey" :class="loading ? 'loading' : 'over'"></view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			loading:{
				default:null
			}
		}
	}
</script>

<style>

</style>
