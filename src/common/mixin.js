import { debounce } from "common/utils";
import BackTop from "components/common/backtop/BackTop";
/**
 * 生命周期函数里面的函数的代码可以一部分放组件，一部分放mixin
 * methods属性里面的函数的代码则不可以，会替换
 */

//两个组件复用代码，使用Vue提供的mixins: [itemListenerMixin],
export const itemListenerMixin = {
  data() {
    return {
      imageItemListener: null
    };
  },
  mounted() {
    //监听图片加载完成,执行刷新
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.imageItemListener = () => refresh();
    this.$bus.$on("imageItemLoad", this.imageItemListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    backClick() {
      // 点击返回顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      //判断BackTop是否显示
      this.isShow = -position.y > 1000;
    }
  }
};

export const tabControlMixin = {
  data() {
    return {
      currentType: "pop"
    };
  },
  methods: {
    tabClick(index) {
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
    }
  }
};
