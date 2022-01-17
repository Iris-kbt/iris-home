import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import AddToCart from "../components/AddToCart";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
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

    default:
      throw new Error(`No Matching "${action.type}" action type`);
      break;
  }
};

export default cart_reducer;
