<template>

</template>
<script  lang="ts" setup>
	import { getCurrentInstance } from 'vue';

	const { proxy } = getCurrentInstance();
	proxy.$caches.setCache('isapp',1)

</script>

<style>
	/* #ifdef APP-PLUS-NVUE */
	@import './tmui/scss/nvue.css';
	/* #endif */
	/* #ifndef APP-PLUS-NVUE */
	@import './tmui/scss/noNvue.css';
	/* #endif */



</style>