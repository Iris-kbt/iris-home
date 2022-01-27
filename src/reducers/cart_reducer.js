import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let { id, color, amount, product } = action.payload;
      let tempItem = state.cart.find((item) => item.id === id + color);
      if (tempItem) {
        let newCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            newAmount > item.stock && (newAmount = item.stock);
            return { ...item, amount: newAmount };
          }
          return item;
        });
        return { ...state, cart: newCart };
      } else {
        tempItem = {
          id: id + color,
          amount,
          color,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          stock: product.stock,
        };
        return { ...state, cart: [...state.cart, tempItem] };
      }
      break;

    case REMOVE_CART_ITEM:
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: newCart };
      break;

    case CLEAR_CART:
      return { ...state, cart: [] };
      break;

    case TOGGLE_CART_ITEM_AMOUNT:
      let { id: itemId, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === itemId) {
          let newAmount = item.amount;
          if (value === "inc") {
            newAmount < item.stock && (newAmount = newAmount + 1);
          }
          if (value === "dec") {
            newAmount > 1 && (newAmount = newAmount - 1);
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
      break;

    case COUNT_CART_TOTALS:
      let totalItems = state.cart.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
      let totalPrice = state.cart.reduce((sum, item) => {
        return sum + item.amount * item.price;
      }, 0);
      return { ...state, totalItems, totalPrice };
      break;

    default:
      throw new Error(`No Matching "${action.type}" action type`);
      break;
  }
};

export default cart_reducer;
