<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control
			:titles="['流行', '新款', '精选']"
			@tabClick="tabClick"
			ref="tabControl1"
			class="tab-control"
			v-show="isFixed"
		></tab-control>
		<scroll
			class="content"
			ref="scroll"
			:probe-type="3"
			@scroll="contentScroll"
			:pull-up-load="true"
			@pullingUp="loadMore"
		>
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
			<recommend-view :recommends="recommends" />
			<feature-view />
			<tab-control
				:titles="['流行', '新款', '精选']"
				@tabClick="tabClick"
				ref="tabControl2"
			></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShow" />
	</div>
</template>

<script>
	import HomeSwiper from "./childComps/HomeSwiper";
	import RecommendView from "./childComps/RecommendView";
	import FeatureView from "./childComps/FeatureView";

	import NavBar from "components/common/navbar/NavBar";
	import TabControl from "components/content/tabcontrol/TabControl";
	import GoodsList from "components/content/goods/GoodsList";
	import Scroll from "components/common/scroll/Scroll";
	import BackTop from "components/common/backtop/BackTop";

	import { getHomeMultidata, getHomeGoods } from "network/home";

	import { itemListenerMixin } from "common/mixin";

	export default {
		name: "Home",
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					pop: { page: 0, list: [] },
					new: { page: 0, list: [] },
					sell: { page: 0, list: [] }
				},
				currentType: "pop",
				isShow: false,
				tabOffsetTop: 0,
				isFixed: false,
				saveY: 0
			};
		},
		mixins: [itemListenerMixin],
		computed: {
			showGoods() {
				return this.goods[this.currentType].list;
			}
		},
		created() {
			//创建组件就请求轮播图和推荐数据
			this.getHomeMultidata();
			//请求商品数据
			this.getHomeGoods("pop");
			this.getHomeGoods("new");
			this.getHomeGoods("sell");
		},
		mounted() {},
		destroyed() {
			console.log("destroyed");
		},
		activated() {
			// console.log("activated");
			//活跃时刷新位置，再滚动到记录的位置
			this.$refs.scroll.refresh();
			this.$refs.scroll.scrollTo(0, this.saveY, 0);
		},
		deactivated() {
			// console.log("deactivated");
			//不活跃时记录下滚动位置
			this.saveY = this.$refs.scroll.getScrollY();
			//离开时，取消监听图片加载
			this.$bus.$off("imageItemLoad", this.imageItemListener);
		},
		methods: {
			/**
			 * 网络请求相关方法
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// console.log(res);
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				});
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					// console.log(res);
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					//上拉加载完要调用一次finishPullUp,完成上拉加载
					this.$refs.scroll.finishPullUp();
				});
			},
			/**
			 * 事件监听相关方法
			 */
			tabClick(index) {
				// console.log(index);
				switch (index) {
					case 0:
						this.currentType = "pop";
						break;
					case 1:
						this.currentType = "new";
						break;
					case 2:
						this.currentType = "sell";
						break;
				}
				this.$refs.tabControl2.currentIndex = index;
				this.$refs.tabControl1.currentIndex = index;
			},
			backClick() {
				// 点击返回顶部
				this.$refs.scroll.scrollTo(0, 0);
			},
			contentScroll(position) {
				// console.log(position);
				//判断BackTop是否显示
				this.isShow = -position.y > 1000;
				//决定tabControl是否吸顶
				this.isFixed = -position.y > this.tabOffsetTop;
			},
			loadMore() {
				this.getHomeGoods(this.currentType);
			},
			swiperImageLoad() {
				//获取tabControl的offsetTop
				//所有的组件都有一个属性$el,用于获取组件中的元素
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			}
		}
	};
</script>
<style scoped>
	.home {
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	.home-nav {
		background: var(--color-tint);
		color: white;
		/* 导航原生滚动时使用，使用了better-scroll插件时不用 */
		/* position: fixed; */
	}
	.tab-control {
		position: relative;
		z-index: 9;
	}
	.content {
		/* calc（）会计算值 */
		/* height: calc(100% - 49px); */
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
