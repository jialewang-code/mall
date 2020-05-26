<template>
	<div class="shop-info">
		<div class="logo">
			<img :src="shop.logo" alt="" />
			<span class="title">{{ shop.name }}</span>
		</div>
		<div class="shop-middle">
			<div class="shop-middle-left shop-middle-item">
				<div class="info-sells">
					<div class="sells-count">{{ shop.sells | sellCountFilter }}</div>
					<div class="sells-text">总销量</div>
				</div>
				<div class="info-goods">
					<div class="goods-count">{{ shop.goodsCount }}</div>
					<div class="goods-text">全部宝贝</div>
				</div>
			</div>
			<div class="shop-middle-right shop-middle-item">
				<table>
					<tr v-for="(item, index) in shop.score" :key="index">
						<td>{{ item.name }}</td>
						<td class="score" :class="{ 'score-better': item.isBetter }">
							{{ item.score }}
						</td>
						<td class="better" :class="{ 'better-more': item.isBetter }">
							<span>{{ item.isBetter ? "高" : "低" }}</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="shop-bottom">
			<div class="enter-shop">进店逛逛</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailShopInfo",
		props: {
			shop: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		//过滤器，{{args | filter}} |前面的值会作为filter函数的参数传入
		filters: {
			sellCountFilter(value) {
				if (value < 10000) return value;
				return (value / 10000).toFixed(1) + "万"; //toFixed(num)舍入保留num小数
			}
		}
	};
</script>
<style scoped>
	.shop-info {
		padding: 25px 10px;
		border-bottom: solid 5px #eee;
	}
	.logo {
		display: flex;
		align-items: center;
	}
	.logo img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	.logo .title {
		margin-left: 10px;
	}

	.shop-middle {
		margin-top: 15px;
		display: flex;
		align-items: center;
	}
	.shop-middle-item {
		flex: 1;
	}
	.shop-middle-left {
		display: flex;
		justify-content: space-evenly;
		color: #333;
		align-items: center;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
	}
	.sells-count,
	.goods-count {
		font-size: 18px;
	}
	.sells-text,
	.goods-text {
		margin-top: 10px;
		font-size: 12px;
	}
	.shop-middle-right {
		font-size: 13px;
		color: #333;
	}
	.shop-middle-right table {
		width: 120px;
		margin-left: 30px;
	}

	.shop-middle-right table td {
		padding: 5px 0;
	}

	.shop-middle-right .score {
		color: #5ea732;
	}

	.shop-middle-right .score-better {
		color: #f13e3a;
	}

	.shop-middle-right .better span {
		background-color: #5ea732;
		color: #fff;
		text-align: center;
	}

	.shop-middle-right .better-more span {
		background-color: #f13e3a;
	}

	.shop-bottom {
		text-align: center;
		margin-top: 15px;
	}

	.enter-shop {
		display: inline-block;
		font-size: 14px;
		background-color: #f2f5f8;
		width: 150px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border-radius: 10px;
	}
</style>
