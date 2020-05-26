<template>
	<div class="menu-list">
		<div
			class="menu-list-item"
			:class="{ active: index === currentIndex }"
			v-for="(item, index) in categories"
			:key="index"
			@click="itemClick(index)"
		>
			{{ item.title }}
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabMenu",
		props: {
			categories: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		methods: {
			itemClick(index) {
				// console.log(index);
				this.currentIndex = index;
				this.$emit("selectItem", index);
			}
		}
	};
</script>
<style scoped>
	.menu-list {
		width: 100px;
		background-color: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}
	.menu-list-item {
		font-size: 14px;
		height: 45px;
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.active {
		font-weight: 700;
		color: var(--color-high-text);
		background-color: #fff;
		border-left: solid 3px var(--color-high-text);
	}
</style>
