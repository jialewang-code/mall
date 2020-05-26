<template>
	<div class="goods-item" @click="itemClick">
		<img v-lazy="showImage" alt="" @load="imageLoad" />
		<div class="goods-info">
			<p>{{ goodsItem.title }}</p>
			<span class="price">{{ goodsItem.price }}</span>
			<span class="collect">{{ goodsItem.cfav }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GoodsListItem",
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		computed: {
			showImage() {
				return (
					this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
				);
			}
		},
		methods: {
			imageLoad() {
				this.$bus.$emit("imageItemLoad");
			},
			itemClick() {
				//路由push而不是repalce，push可以back
				this.$router.push("/detail/" + this.goodsItem.iid);
			}
		}
	};
</script>
<style scoped>
	.goods-item {
		width: 100%;
		margin-top: 15px;
	}
	.goods-item img {
		width: 100%;
		border-radius: 5%;
	}
	.goods-info {
		margin-top: 10px;
	}
	.goods-info p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 30px;
		position: relative;
		margin-left: 15px;
	}
	.goods-info .price::before {
		content: "￥";
		width: 12px;
		height: 12px;
		position: absolute;
		top: -3px;
		left: -15px;
	}
	.goods-info .collect {
		position: relative;
	}
	.goods-info .collect::before {
		content: "";
		width: 14px;
		height: 14px;
		/* background-color: red; */
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
		position: absolute;
		top: 2px;
		left: -15px;
	}
</style>
