<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";

	export default {
		name: "Scroll",
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			};
		},
		//挂载DOM
		mounted() {
			//创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			});
			//监听滚动位置，数字为2，3时监听，0，1时不监听
			if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on("scroll", position => {
					// console.log(position);
					this.$emit("scroll", position);
				});
			}
			//监听上拉事件
			if (this.pullUpLoad) {
				this.scroll.on("pullingUp", () => {
					// console.log("上拉加载更多");
					this.$emit("pullingUp");
				});
			}
		},
		methods: {
			// 点击滚动到x,y位置
			scrollTo(x, y, time = 300) {
				this.scroll && this.scroll.scrollTo(x, y, time);
			},
			//上拉加载完要运行一次finishPullUp
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp();
			},
			//刷新一次scrollHeight
			refresh() {
				this.scroll && this.scroll.refresh();
				// console.log("----");
			},
			//获取滚动高度
			getScrollY() {
				return this.scroll ? this.scroll.y : 0;
			}
		}
	};
</script>
<style scoped>
</style>
