<template>
	<div id="category">
		<nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
		<div class="content">
			<scroll class="tab-menu" :probe-type="3" ref="menu">
				<tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
			</scroll>
			<scroll class="tab-content" :probe-type="3" ref="content">
				<tab-content-category
					:subcategories="showSubcategory"
				></tab-content-category>
				<tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" />
				<goods-list :goods="showCategoryDetail" />
			</scroll>
		</div>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import Scroll from "components/common/scroll/Scroll";
	import TabControl from "components/content/tabcontrol/TabControl";
	import GoodsList from "components/content/goods/GoodsList";

	import TabMenu from "./childComps/TabMenu";
	import TabContentCategory from "./childComps/TabContentCategory";

	import {
		getCategory,
		getSubcategory,
		getCategoryDetail
	} from "network/category";

	import { tabControlMixin } from "common/mixin";

	export default {
		name: "Category",
		data() {
			return {
				categories: [], //存放分类数据
				categoryDate: {}, //存放子分类的所有数据
				currentIndex: -1
			};
		},
		components: {
			NavBar,
			Scroll,
			TabControl,
			GoodsList,
			TabMenu,
			TabContentCategory
		},
		mixins: [tabControlMixin],
		created() {
			//1.请求分类数据
			this._getCategory();
			//2.监听图片加载完成
			this.$bus.$on("imageItemLoad", () => {
				this.$refs.content.refresh();
			});
		},
		computed: {
			showSubcategory() {
				if (this.currentIndex === -1) return {};
				return this.categoryDate[this.currentIndex].subcategories;
			},
			showCategoryDetail() {
				if (this.currentIndex === -1) return [];
				return this.categoryDate[this.currentIndex].categoryDetail[
					this.currentType
				];
			}
		},
		methods: {
			/**
			 * 网络请求
			 */
			_getCategory() {
				getCategory().then(res => {
					// console.log(res);
					//1.获取分类数据
					this.categories = res.data.category.list;
					//2.初始化每个类别的子数据
					for (let i = 0; i < this.categories.length; i++) {
						this.categoryDate[i] = {
							//存放子分类的分类数据
							subcategories: {},
							//存放子分类的详细数据
							categoryDetail: {
								pop: [],
								new: [],
								sell: []
							}
						};
					}
					//3.请求第一个分类的数据
					this._getSubcategory(0);
				});
			},
			_getSubcategory(index) {
				this.currentIndex = index;
				const mailKey = this.categories[index].maitKey;
				getSubcategory(mailKey).then(res => {
					//获取每一个子分类的数据
					// console.log(res);
					this.categoryDate[index].subcategories = res.data;
					this.categoryDate = { ...this.categoryDate };
					this._getCategoryDetail("pop");
					this._getCategoryDetail("new");
					this._getCategoryDetail("sell");
				});
			},
			_getCategoryDetail(type) {
				//1.获取请求的miniWallkey
				const miniWallkey = this.categories[this.currentIndex].miniWallkey;
				//2.发送请求，传入miniWallkey和type
				getCategoryDetail(miniWallkey, type).then(res => {
					// console.log(res);
					//3.将获取的数据保存下来
					this.categoryDate[this.currentIndex].categoryDetail[type] = res;
					this.categoryDate = { ...this.categoryDate };
				});
			},
			/**
			 * 监听相关事件
			 */
			selectItem(index) {
				this._getSubcategory(index);
			}
		}
	};
</script>
<style scoped>
	#category {
		width: 100vw;
		height: 100vh;
	}
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
	}
	.content {
		position: absolute;
		left: 0;
		right: 0;
		top: 44px;
		bottom: 49px;

		display: flex;
	}
	.tab-menu {
		overflow: hidden;
	}
	.tab-content {
		flex: 1;
		overflow: hidden;
	}
</style>
