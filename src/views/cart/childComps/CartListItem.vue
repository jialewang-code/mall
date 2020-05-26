<template>
	<div class="list-item">
		<div class="item-selector">
			<check-button :isChecked="product.checked" @click.native="checkClick" />
		</div>
		<div class="item-img"><img :src="product.image" alt="" /></div>
		<div class="item-info">
			<p class="title">{{ product.title }}</p>
			<p class="desc">{{ product.desc }}</p>
			<div class="bottom">
				<div class="price">￥{{ product.price }}</div>
				<div class="count">x{{ product.count }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CheckButton from "components/content/checkbutton/CheckButton";

	export default {
		name: "CartListItem",
		props: {
			product: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		components: {
			CheckButton
		},
		methods: {
			checkClick() {
				this.product.checked = !this.product.checked;
			}
		}
	};
</script>
<style scoped>
	.list-item {
		width: 100%;
		display: flex;
		padding: 5px;
		border-bottom: solid 1px #ccc;
	}
	.item-selector {
		width: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img {
		padding: 5px;
	}
	.item-img > img {
		width: 80px;
		height: 100px;
		display: block;
		border-radius: 5px;
	}
	.item-info {
		font-size: 17px;
		color: #333;
		padding: 5px 10px;
		overflow: hidden;
		position: relative;
	}
	.item-info p {
		/* white-space:nowrap 禁止换行 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.item-info .desc {
		font-size: 14px;
		color: #666;
		margin-top: 15px;
		margin-bottom: auto;
	}
	.item-info .bottom {
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-info .bottom .price {
		color: var(--color-high-text);
	}
</style>
