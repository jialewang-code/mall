<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image" alt="" />
				<div>{{ item.title }}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RecommendView",
		props: {
			recommends: {
				type: Array,
				default() {
					return [];
				}
			}
		}
	};
</script>
<style scoped>
	.recommend {
		display: flex;
		justify-content: center;
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
		border-bottom: solid 8px #eee;
	}
	.recommend-item {
		flex: 1;
	}
	.recommend-item img {
		width: 80px;
		height: 80px;
	}
	.recommend-item div {
		padding: 5px 0;
	}
</style>
