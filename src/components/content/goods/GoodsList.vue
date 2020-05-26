<template>
	<div class="goods">
		<goods-list-item
			v-for="(item, index) in goods"
			:key="index"
			:goods-item="item"
		></goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from "./GoodsListItem";
	export default {
		name: "GoodsList",
		components: {
			GoodsListItem
		},
		props: {
			goods: {
				type: Array,
				default() {
					return [];
				}
			}
		}
	};
</script>
<style scoped>
	.goods {
		display: grid;
		grid-template-columns: repeat(2, 46%);
		justify-content: space-evenly;
		/* justify-items: center; */
	}
</style>