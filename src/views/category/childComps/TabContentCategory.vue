<template>
	<div class="content-category">
		<div class="item" v-for="(item, index) in subcategories.list" :key="index">
			<a :href="item.link">
				<img class="item-img" :src="item.image" alt="" />
				<div class="item-title">{{ item.title }}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabContentCategory",
		props: {
			subcategories: {
				type: Object,
				default() {
					return {};
				}
			}
		}
	};
</script>
<style scoped>
	.content-category {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		/* padding-top: 20px; */
		padding: 20px 10px;
	}
	.item {
		width: 82px;
		height: 116px;
	}
	.item a {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
	}
	.item-img {
		width: 64px;
		height: 64px;
	}
	.item-title {
		padding-top: 20px;
		font-size: 12px;
	}
</style>
