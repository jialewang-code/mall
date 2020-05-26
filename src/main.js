import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

import toast from "components/common/toast";

Vue.config.productionTip = false;
//$bus,事件总线
Vue.prototype.$bus = new Vue();
//安装toast插件
Vue.use(toast);

//解决移动端300ms延迟
FastClick.attach(document.body);
//安装vue-lazyload
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/placeholder.png")
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
