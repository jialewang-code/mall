<template>
	<div class="base-info" v-if="Object.keys(goods).length !== 0">
		<div class="info-title">{{ goods.title }}</div>
		<div class="info-price">
			<span class="n-price">{{ goods.newPrice }}</span>
			<span class="o-price">{{ goods.oldPrice }}</span>
			<span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
		</div>
		<div class="info-other">
			<span>{{ goods.columns[0] }}</span>
			<span>{{ goods.columns[1] }}</span>
			<span>{{ goods.services[goods.services.length - 1].name }}</span>
		</div>
		<div class="info-service">
			<span
				class="info-service-item"
				v-for="index in goods.services.length - 1"
				:key="index"
			>
				<img :src="goods.services[index - 1].icon" alt="" />
				<span>{{ goods.services[index - 1].name }}</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
		props: {
			goods: {
				type: Object,
				default() {
					return {};
				}
			}
		}
	};
</script>
<style scoped>
	.base-info {
		display: flex;
		flex-direction: column;
		padding: 15px 10px;
		border-bottom: solid 5px #eee;
	}
	.info-title {
		font-size: 16px;
		font-weight: bold;
	}
	.info-price {
		margin-top: 10px;
	}
	.n-price {
		font-size: 22px;
		color: var(--color-high-text);
	}
	.o-price {
		font-size: 14px;
		text-decoration: line-through;
		margin-left: 5px;
	}
	.discount {
		font-size: 14px;
		background-color: var(--color-tint);
		color: white;
		padding: 5px;
		border-radius: 12px;
		margin-left: 5px;
		/*让元素上浮一些: 使用相对定位即可*/
		position: relative;
		top: -6px;
	}
	.info-other {
		margin-top: 10px;
		display: flex;
		font-size: 14px;
		border-bottom: solid 1px rgba(100, 100, 100, 0.3);
	}
	.info-other span {
		flex: 1;
		padding: 10px 0;
	}
	.info-other span:nth-of-type(2) {
		text-align: center;
	}
	.info-other span:nth-of-type(3) {
		text-align: right;
	}
	.info-service {
		padding: 15px 0;
		font-size: 14px;
		display: flex;
	}
	.info-service-item {
		flex: 1;
		display: flex;
		align-items: center;
	}
	.info-service-item:nth-of-type(2) {
		justify-content: center;
	}
	.info-service-item:nth-of-type(3) > img {
		margin-left: auto;
	}
	.info-service-item img {
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}
</style>
