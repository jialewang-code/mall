<template>
	<div class="cart">
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{ cartLength }})</div>
		</nav-bar>
		<scroll class="content" :probe-type="3" ref="scroll">
			<cart-list />
		</scroll>
		<cart-bottom-bar />
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import Scroll from "components/common/scroll/Scroll";

	import CartList from "./childComps/CartList";
	import CartBottomBar from "./childComps/CartBottomBar";

	import { mapGetters } from "vuex"; //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

	export default {
		name: "Cart",
		components: {
			NavBar,
			Scroll,
			CartList,
			CartBottomBar
		},
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(["cartLength"])
		},
		activated() {
			this.$refs.scroll.refresh();
		}
	};
</script>
<style scoped>
	.cart {
		height: 100vh;
	}
	.nav-bar {
		background: var(--color-tint);
		color: white;
	}
	.content {
		height: calc(100% - 44px - 49px - 40px);
		overflow: hidden;
	}
</style>
