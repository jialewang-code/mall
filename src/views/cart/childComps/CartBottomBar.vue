<template>
	<div class="bottom-bar">
		<div class="checked" @click="allChecked">
			<check-button :isChecked="isSelectAll" />
			<span>全选</span>
		</div>
		<div class="price">总计:{{ totalPrice }}</div>
		<div class="calculate" @click="calcuClick">去计算({{ checkedLength }})</div>
	</div>
</template>

<script>
	import CheckButton from "components/content/checkbutton/CheckButton";
	import { mapGetters } from "vuex";

	export default {
		name: "CartBottomBar",
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(["cartList"]),
			totalPrice() {
				return (
					"￥" +
					this.cartList
						.filter(item => {
							return item.checked;
						})
						.reduce((prePrice, curItem) => {
							return (prePrice += curItem.price * curItem.count);
						}, 0)
						.toFixed(2)
				);
			},
			checkedLength() {
				return this.cartList.filter(item => {
					return item.checked;
				}).length;
			},
			isSelectAll() {
				if (this.cartList.length === 0) return false;
				//这里也可以用数组的find方法
				return !this.cartList.some(item => {
					return item.checked === false;
				});
			}
		},
		methods: {
			allChecked() {
				if (this.isSelectAll) {
					//全部选中
					this.cartList.map(item => {
						return (item.checked = false);
					});
				} else {
					//部分或是全部不选中
					this.cartList.map(item => {
						return (item.checked = true);
					});
				}
			},
			calcuClick() {
				if (this.checkedLength === 0) {
					this.$toast.show("请选择购买的商品");
				}
			}
		}
	};
</script>
<style scoped>
	.bottom-bar {
		height: 40px;
		background-color: #eee;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.checked {
		display: flex;
		align-items: center;
		margin-left: 10px;
	}
	.checked span {
		margin-left: 5px;
	}
	.price {
		margin-left: 30px;
		margin-right: auto;
	}
	.calculate {
		background-color: var(--color-tint);
		color: white;
		height: 40px;
		padding: 0 20px;
		line-height: 40px;
		cursor: pointer;
	}
</style>
