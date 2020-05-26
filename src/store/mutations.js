export default {
  //mutations里方法功能尽量单一，以便知道是做了什么
  addCounter(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};
