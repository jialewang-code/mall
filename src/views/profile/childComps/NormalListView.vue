<template>
	<div class="normal-list">
		<div v-for="(item, index) in listData" :key="index" class="item">
			<span class="icon"><img :src="iconURL(item)" alt=""/></span>
			<div class="info">{{ item.info }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "NormalListView",
		props: {
			listData: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		methods: {
			iconURL(item) {
				return require("assets/img/profile/" + item.icon);
			}
		}
	};
</script>
<style scoped>
	.normal-list {
		font-size: 15px;
		color: #333;
		border-top: solid 15px #eee;
	}
	.item {
		height: 44px;
		display: flex;
		align-items: center;
	}
	.item .icon {
		padding-left: 15px;
	}
	.icon img {
		width: 20px;
		height: 20px;
	}
	.item .info {
		width: 100%;
		height: 44px;
		line-height: 44px;
		padding-left: 10px;
		border-bottom: 1px solid rgba(100, 100, 100, 0.1);
	}
	.item:last-of-type .info {
		border-bottom: none;
	}
</style>
