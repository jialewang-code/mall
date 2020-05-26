<template>
	<div id="tabBar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "TabBar"
	};
</script>
<style scoped>
	#tabBar {
		display: flex;
		background: #f3f3f3;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
		align-items: center;
	}
</style>
