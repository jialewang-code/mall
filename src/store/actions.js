export default {
  //context==$store
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      if (oldProduct) {
        //商品数量加1
        context.commit("addCounter", oldProduct);
        resolve("商品数量+1");
      } else {
        //添加新商品
        payload.count = 1;
        context.commit("addToCart", payload);
        resolve("成功添加新商品");
      }
    });
  }
};
