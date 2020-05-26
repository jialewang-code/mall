<template>
	<div id="detail">
		<detail-nav-bar @titleClick="titleClick" ref="navbar" />
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
			<detail-swiper :top-images="topImages" />
			<detail-base-info :goods="goods" />
			<detail-shop-info :shop="shop" />
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
			<detail-param-info :param-info="paramInfo" ref="params" />
			<detail-comment-info :comment-info="commentInfo" ref="comment" />
			<goods-list :goods="recommends" ref="recommend" />
		</scroll>
		<detail-bottom-bar @addCart="addToCart" />
		<back-top @click.native="backClick" v-show="isShow" />
		<!-- <toast :message="message" :show="show" /> -->
	</div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar";
	import DetailSwiper from "./childComps/DetailSwiper";
	import DetailBaseInfo from "./childComps/DetailBaseInfo";
	import DetailShopInfo from "./childComps/DetailShopInfo";
	import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
	import DetailParamInfo from "./childComps/DetailParamInfo";
	import DetailCommentInfo from "./childComps/DetailCommentInfo";
	import DetailBottomBar from "./childComps/DetailBottomBar";

	import Scroll from "components/common/scroll/Scroll";
	import GoodsList from "components/content/goods/GoodsList";
	// import Toast from "components/common/toast/Toast";

	import { itemListenerMixin, backTopMixin } from "common/mixin";

	import {
		getDetail,
		Goods,
		Shop,
		GoodsParam,
		getRecommend
	} from "network/detail";

	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList
			// Toast
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopY: [],
				currentIndex: 0
				// message: "",
				// show: false
			};
		},
		mixins: [itemListenerMixin, backTopMixin],
		created() {
			//1.保存传入的ID
			this.iid = this.$route.params.id; //$route当前路由
			//2.根据ID请求详情数据
			getDetail(this.iid).then(res => {
				// console.log(res);
				const data = res.result;
				//获取顶部轮播图数据
				this.topImages = data.itemInfo.topImages;
				//获取商品描述信息
				this.goods = new Goods(
					data.itemInfo,
					data.columns,
					data.shopInfo.services
				);
				//获取店铺信息
				this.shop = new Shop(data.shopInfo);
				//获取商品的详情数据
				this.detailInfo = data.detailInfo;
				//获取商品参数信息
				this.paramInfo = new GoodsParam(
					data.itemParams.info,
					data.itemParams.rule
				);
				//获取评论信息
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0];
				}
				// this.$nextTick(() => {
				//根据最新的数据，对应的DOM是已经被渲染
				//但是图片依然没有加载完（获取到的offsetTop不包含其中的图片）
				// });
			});
			//3.请求推荐商品信息
			getRecommend().then(res => {
				// console.log(res);
				this.recommends = res.data.list;
			});
		},
		mounted() {},
		destroyed() {
			//离开时，取消监听图片加载
			this.$bus.$off("imageItemLoad", this.imageItemListener);
		},
		methods: {
			imageLoad() {
				this.$refs.scroll.refresh();
				//获取主题标题的偏移量
				this.themeTopY = [];
				this.themeTopY.push(0);
				this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
				this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
				this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
				this.themeTopY.push(Number.MAX_VALUE);
				// console.log(this.themeTopY);
			},
			titleClick(index) {
				// console.log(index);
				//滚动到相应的位置
				this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100);
			},
			detailScroll(position) {
				const scrollY = -position.y;
				// scrollY和主题偏移量进行比较
				// [0, 28764, 29525, 29746]
				// scrollY在 0 和 28764 之间，index = 0
				// scrollY在 28764 和 29525 之间，index = 1
				// scrollY在 29525 和 29746 之间，index = 2
				// scrollY大于 29746和最大值 之间 ，index = 3
				const length = this.themeTopY.length;
				for (let i = 0; i < length - 1; i++) {
					// 判断条件-hack做法
					if (
						this.currentIndex !== i &&
						scrollY >= this.themeTopY[i] &&
						scrollY < this.themeTopY[i + 1]
					) {
						this.currentIndex = i;
						// console.log(this.currentIndex);
						this.$refs.navbar.currentIndex = this.currentIndex;
					}
				}
				// for (let i = 0; i < length; i++) {
				// 	// 判断条件-普通做法
				// 	if (
				// 		this.currentIndex !== i &&
				// 		((i < length - 1 &&
				// 			scrollY >= this.themeTopY[i] &&
				// 			scrollY < this.themeTopY[i + 1]) ||
				// 			(i === length - 1 && scrollY >= this.themeTopY[i]))
				// 	) {
				// 		this.currentIndex = i;
				// 		// console.log(this.currentIndex);
				// 		this.$refs.navbar.currentIndex = this.currentIndex;
				// 	}
				// }
				//判断BackTop是否显示
				this.listenShowBackTop(position);
			},
			addToCart() {
				//获取购物车需要展示的信息
				const product = {};
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				//将商品添加到vuex state
				// this.$store.cartList.push(product)
				// this.$store.commit('addCart',product)
				//为了更好的监听动作，使用dispatch
				this.$store.dispatch("addCart", product).then(res => {
					console.log(res);
					//注册全局插件方法
					this.$toast.show(res);
					// console.log(this.$toast);

					//普通组件方法
					// this.show = true;
					// this.message = res;

					// setTimeout(() => {
					// 	this.show = false;
					// 	this.message = "";
					// }, 1500);
				});
			}
		}
	};
</script>
<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.content {
		/* calc()四则运算符号左右两边要有空格 */
		height: calc(100% - 44px - 49px);
		overflow: hidden;
	}
</style>
